// ===== INQUIRY FUNCTIONS =====
// convex/inquiries.js
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create customer inquiry
export const createInquiry = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    inquiryType: v.union(
      v.literal("product_info"),
      v.literal("quote_request"),
      v.literal("custom_solution"),
      v.literal("support"),
      v.literal("installation")
    ),
    message: v.string(),
    itemIds: v.optional(v.array(v.id("single_items"))),
    packageIds: v.optional(v.array(v.id("solar_packages"))),
    requirements: v.optional(v.object({
      powerNeeds: v.optional(v.string()),
      location: v.optional(v.string()),
      budget: v.optional(v.string()),
      timeline: v.optional(v.string()),
    })),
    source: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const inquiryId = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      priority: "medium",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Update inquiry count for related packages
    if (args.packageIds) {
      for (const packageId of args.packageIds) {
        const pkg = await ctx.db.get(packageId);
        if (pkg) {
          await ctx.db.patch(packageId, {
            inquiryCount: pkg.inquiryCount + 1,
            updatedAt: Date.now(),
          });
        }
      }
    }

    return inquiryId;
  },
});

// Get inquiries with filters
export const getInquiries = query({
  args: {
    status: v.optional(v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("quoted"),
      v.literal("closed"),
      v.literal("lost")
    )),
    assignedTo: v.optional(v.id("users")),
    priority: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    let q = ctx.db.query("inquiries");

    if (args.status) {
      q = q.withIndex("by_status", (q2) => q2.eq("status", args.status));
    } else if (args.assignedTo) {
      q = q.withIndex("by_assigned", (q2) => q2.eq("assignedTo", args.assignedTo));
    } else if (args.priority) {
      q = q.withIndex("by_priority", (q2) => q2.eq("priority", args.priority));
    }

    return await q.order("desc").take(args.limit || 50);
  },
});


// Update inquiry status
export const updateInquiryStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("quoted"),
      v.literal("closed"),
      v.literal("lost")
    ),
    assignedTo: v.optional(v.id("users")),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    const { id, note, ...updates } = args;
    const inquiry = await ctx.db.get(id);
    if (!inquiry) throw new Error("Inquiry not found");

    // Add note if provided
    let notes = inquiry.notes || [];
    if (note) {
      notes.push({
        note,
        addedBy: user._id,
        addedAt: Date.now(),
      });
    }

    await ctx.db.patch(id, {
      ...updates,
      notes,
      updatedAt: Date.now(),
    });

    return id;
  },
});