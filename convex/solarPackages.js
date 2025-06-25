// ===== SOLAR PACKAGES FUNCTIONS =====
// convex/solarPackages.js
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create solar package
export const createSolarPackage = mutation({
  args: {
    modelNumber: v.string(),
    name: v.string(),
    powerRating: v.string(),
    systemType: v.union(
      v.literal("grid_tie"),
      v.literal("off_grid"),
      v.literal("hybrid")
    ),
    inverterSpecs: v.object({
      brand: v.optional(v.string()),
      model: v.optional(v.string()),
      power: v.string(),
      voltage: v.optional(v.string()),
      waveform: v.optional(v.union(v.literal("pure_sine"), v.literal("modified_sine"))),
    }),
    batterySpecs: v.object({
      type: v.optional(v.string()),
      capacity: v.string(),
      voltage: v.optional(v.string()),
      quantity: v.number(),
      brand: v.optional(v.string()),
    }),
    chargeController: v.object({
      type: v.union(v.literal("PWM"), v.literal("MPPT")),
      rating: v.string(),
      brand: v.optional(v.string()),
    }),
    backupTime: v.string(),
    supportedDevices: v.array(v.string()),
    price: v.number(),
    currency: v.string(),
    description: v.optional(v.string()),
    idealFor: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    imageIds: v.optional(v.array(v.id("media"))),
    includedComponents: v.optional(v.array(v.object({
      itemId: v.optional(v.id("single_items")),
      name: v.string(),
      quantity: v.number(),
      unitPrice: v.optional(v.number()),
    }))),
    isCustomizable: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    const slug = args.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const packageId = await ctx.db.insert("solar_packages", {
      ...args,
      slug,
      imageIds: args.imageIds || [],
      idealFor: args.idealFor || [],
      features: args.features || [],
      includedComponents: args.includedComponents || [],
      tags: [],
      status: "draft",
      isCustomizable: args.isCustomizable || false,
      isFeatured: args.isFeatured || false,
      viewCount: 0,
      inquiryCount: 0,
      createdBy: user._id,
      updatedBy: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activity_logs", {
      userId: user._id,
      action: "created",
      entityType: "solar_package",
      entityId: packageId,
      createdAt: Date.now(),
    });

    return packageId;
  },
});

// Get solar packages with filters
// Get solar packages with filters
export const getSolarPackages = query({
  args: {
    systemType: v.optional(v.union(
      v.literal("grid_tie"),
      v.literal("off_grid"),
      v.literal("hybrid")
    )),
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("inactive"),
      v.literal("custom_only")
    )),
    powerRating: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    let q = ctx.db.query("solar_packages");

    if (args.systemType) {
      q = q.withIndex("by_system_type", (q2) => q2.eq("systemType", args.systemType));
    } else if (args.status) {
      q = q.withIndex("by_status", (q2) => q2.eq("status", args.status));
    }

    return await q.order("desc").take(args.limit || 100);
  },
});
