import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all customers
export const getCustomers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").collect()
  },
})

// Get customer by ID
export const getCustomer = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Get customer by email
export const getCustomerByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()
  },
})

// Create new customer
export const createCustomer = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert("customers", {
      ...args,
      totalOrders: 0,
      totalSpent: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Update customer
export const updateCustomer = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

// Update customer stats (called when order is placed)
export const updateCustomerStats = mutation({
  args: {
    customerId: v.id("customers"),
    orderAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId)
    if (!customer) throw new Error("Customer not found")

    return await ctx.db.patch(args.customerId, {
      totalOrders: customer.totalOrders + 1,
      totalSpent: customer.totalSpent + args.orderAmount,
      lastOrderDate: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

// Delete customer
export const deleteCustomer = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id)
  },
})
