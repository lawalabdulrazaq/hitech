// ===== CATEGORY FUNCTIONS =====
// convex/categories.ts

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create category
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("single_item"), v.literal("package")),
    parentId: v.optional(v.id("categories")),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const slug = args.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return await ctx.db.insert("categories", {
      ...args,
      slug,
      sortOrder: args.sortOrder || 0,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get categories with optional type and parent filtering
export const getCategories = query({
  args: {
    type: v.optional(v.union(
      v.literal("single_item"),
      v.literal("package")
    )),
    parentId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("categories");

    if (args.type) {
      q = q.withIndex("by_type", (q2) => q2.eq("type", args.type));
    }

    const categories = await q
      .filter((q2) => q2.eq(q2.field("isActive"), true))
      .collect();

    if (args.parentId !== undefined) {
      return categories.filter(cat => cat.parentId === args.parentId);
    }

    return categories.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
