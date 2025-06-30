import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all products
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect()
  },
})

// Get products by category
export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect()
  },
})

// Get product by ID
export const getProduct = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Create new product
export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    price: v.number(),
    stock: v.number(),
    minimumStock: v.number(),
    sku: v.string(),
    status: v.union(v.literal("active"), v.literal("inactive")),
    images: v.optional(v.array(v.string())),
    specifications: v.optional(v.object({})),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert("products", {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Update product
export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    price: v.optional(v.number()),
    stock: v.optional(v.number()),
    minimumStock: v.optional(v.number()),
    sku: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
    images: v.optional(v.array(v.string())),
    specifications: v.optional(v.object({})),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

// Delete product
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id)
  },
})

// Get low stock products
export const getLowStockProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect()
    return products.filter((product) => product.stock <= product.minimumStock)
  },
})
