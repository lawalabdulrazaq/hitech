// ===== ANALYTICS FUNCTIONS =====
// convex/analytics.js

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Track analytics event
export const trackEvent = mutation({
  args: {
    eventType: v.union(
      v.literal("page_view"),
      v.literal("product_view"),
      v.literal("package_view"),
      v.literal("inquiry_submitted"),
      v.literal("download"),
      v.literal("video_play")
    ),
    entityType: v.optional(v.union(
      v.literal("single_item"),
      v.literal("solar_package")
    )),
    entityId: v.optional(v.string()),
    metadata: v.optional(v.object({
      userAgent: v.optional(v.string()),
      ipAddress: v.optional(v.string()),
      referrer: v.optional(v.string()),
      sessionId: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics_events", {
      ...args,
      createdAt: Date.now(),
    });

    // Update view counts
    if (args.eventType === "product_view" && args.entityId) {
      const item = await ctx.db.get(args.entityId);
      if (item) {
        if (args.entityType === "single_item" || args.entityType === "solar_package") {
          await ctx.db.patch(args.entityId, {
            viewCount: (item.viewCount || 0) + 1,
          });
        }
      }
    }
  },
});

// Get analytics dashboard data
export const getAnalyticsDashboard = query({
  args: {
    timeRange: v.optional(v.union(
      v.literal("7d"),
      v.literal("30d"),
      v.literal("90d"),
      v.literal("1y")
    )),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const timeRange = args.timeRange || "30d";
    const now = Date.now();
    const ranges = {
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "90d": 90 * 24 * 60 * 60 * 1000,
      "1y": 365 * 24 * 60 * 60 * 1000,
    };
    const startTime = now - ranges[timeRange];

    const events = await ctx.db
      .query("analytics_events")
      .withIndex("by_date", (q) => q.gte("createdAt", startTime))
      .collect();

    const inquiries = await ctx.db
      .query("inquiries")
      .withIndex("by_created", (q) => q.gte("createdAt", startTime))
      .collect();

    const products = await ctx.db
      .query("single_items")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .take(10);

    const packages = await ctx.db
      .query("solar_packages")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .take(10);

    return {
      events: events.length,
      inquiries: inquiries.length,
      topProducts: products
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 5),
      topPackages: packages
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 5),
      eventsByType: events.reduce((acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1;
        return acc;
      }, {}),
      inquiriesByStatus: inquiries.reduce((acc, inquiry) => {
        acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
        return acc;
      }, {}),
    };
  },
});
