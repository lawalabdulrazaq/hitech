import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get inventory movements
export const getInventoryMovements = query({
  args: { productId: v.optional(v.id("products")) },
  handler: async (ctx, args) => {
    if (args.productId) {
      return await ctx.db
        .query("inventoryMovements")
        .withIndex("by_product", (q) => q.eq("productId", args.productId))
        .collect()
    }
    return await ctx.db.query("inventoryMovements").collect()
  },
})

// Record inventory movement
export const recordInventoryMovement = mutation({
  args: {
    productId: v.id("products"),
    type: v.union(v.literal("in"), v.literal("out")),
    quantity: v.number(),
    reason: v.string(),
    reference: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Record the movement
    const movementId = await ctx.db.insert("inventoryMovements", {
      ...args,
      createdAt: Date.now(),
    })

    // Update product stock
    const product = await ctx.db.get(args.productId)
    if (!product) throw new Error("Product not found")

    const newStock = args.type === "in" ? product.stock + args.quantity : product.stock - args.quantity

    if (newStock < 0) {
      throw new Error("Insufficient stock")
    }

    await ctx.db.patch(args.productId, {
      stock: newStock,
      updatedAt: Date.now(),
    })

    return movementId
  },
})

// Adjust stock (for corrections)
export const adjustStock = mutation({
  args: {
    productId: v.id("products"),
    newStock: v.number(),
    reason: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId)
    if (!product) throw new Error("Product not found")

    const difference = args.newStock - product.stock
    const type = difference > 0 ? "in" : "out"
    const quantity = Math.abs(difference)

    if (quantity > 0) {
      // Record the adjustment as an inventory movement
      await ctx.db.insert("inventoryMovements", {
        productId: args.productId,
        type,
        quantity,
        reason: args.reason,
        notes: args.notes,
        createdAt: Date.now(),
      })
    }

    // Update product stock
    return await ctx.db.patch(args.productId, {
      stock: args.newStock,
      updatedAt: Date.now(),
    })
  },
})

// Get low stock report
export const getLowStockReport = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect()
    return products
      .filter((product) => product.stock <= product.minimumStock)
      .map((product) => ({
        ...product,
        stockStatus: product.stock === 0 ? "out" : "low",
      }))
  },
})
