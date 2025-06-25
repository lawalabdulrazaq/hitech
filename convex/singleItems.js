// ===== SINGLE ITEMS FUNCTIONS =====
// convex/singleItems.js
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create single item
export const createSingleItem = mutation({
  args: {
    name: v.string(),
    categoryId: v.id("categories"),
    unitPrice: v.number(),
    currency: v.string(),
    stockUnits: v.number(),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    sku: v.optional(v.string()),
    brand: v.optional(v.string()),
    model: v.optional(v.string()),
    imageIds: v.optional(v.array(v.id("media"))),
    specifications: v.optional(v.object({
      voltage: v.optional(v.string()),
      capacity: v.optional(v.string()),
      power: v.optional(v.string()),
      dimensions: v.optional(v.string()),
      weight: v.optional(v.string()),
      warranty: v.optional(v.string()),
      certification: v.optional(v.array(v.string())),
    })),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    lowStockThreshold: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Generate slug from name
    const slug = args.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const itemId = await ctx.db.insert("single_items", {
      ...args,
      slug,
      imageIds: args.imageIds || [],
      tags: args.tags || [],
      status: "draft",
      isFeatured: args.isFeatured || false,
      viewCount: 0,
      salesCount: 0,
      createdBy: user._id,
      updatedBy: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activity_logs", {
      userId: user._id,
      action: "created",
      entityType: "single_item",
      entityId: itemId,
      createdAt: Date.now(),
    });

    return itemId;
  },
});

// Get all single items with filters
export const getSingleItems = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("inactive"),
      v.literal("discontinued")
    )),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    let q = ctx.db.query("single_items");

    if (args.categoryId) {
      q = q.withIndex("by_category", (q2) => q2.eq("categoryId", args.categoryId));
    } else if (args.status) {
      q = q.withIndex("by_status", (q2) => q2.eq("status", args.status));
    }

    const items = await q.order("desc").take(args.limit || 100);

    if (args.search) {
      const searchTerm = args.search.toLowerCase();
      return items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }

    return items;
  },
});


// Update single item
export const updateSingleItem = mutation({
  args: {
    id: v.id("single_items"),
    name: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    unitPrice: v.optional(v.number()),
    stockUnits: v.optional(v.number()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    imageIds: v.optional(v.array(v.id("media"))),
    specifications: v.optional(v.object({
      voltage: v.optional(v.string()),
      capacity: v.optional(v.string()),
      power: v.optional(v.string()),
      dimensions: v.optional(v.string()),
      weight: v.optional(v.string()),
      warranty: v.optional(v.string()),
      certification: v.optional(v.array(v.string())),
    })),
    tags: v.optional(v.array(v.string())),
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("inactive"),
      v.literal("discontinued")
    )),
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

    const { id, ...updates } = args;
    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");

    // Update slug if name changed
    let slug = item.slug;
    if (updates.name && updates.name !== item.name) {
      slug = updates.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    await ctx.db.patch(id, {
      ...updates,
      slug,
      updatedBy: user._id,
      updatedAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activity_logs", {
      userId: user._id,
      action: "updated",
      entityType: "single_item",
      entityId: id,
      changes: updates,
      createdAt: Date.now(),
    });

    return id;
  },
});