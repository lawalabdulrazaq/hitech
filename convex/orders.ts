import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all orders
export const getOrders = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect()

    // Get customer details for each order
    const ordersWithCustomers = await Promise.all(
      orders.map(async (order) => {
        const customer = await ctx.db.get(order.customerId)
        return {
          ...order,
          customer,
        }
      }),
    )

    return ordersWithCustomers
  },
})

// Get orders by customer
export const getOrdersByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect()
  },
})

// Get order by ID
export const getOrder = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id)
    if (!order) return null

    const customer = await ctx.db.get(order.customerId)
    return {
      ...order,
      customer,
    }
  },
})

// Create new order
export const createOrder = mutation({
  args: {
    customerId: v.id("customers"),
    items: v.array(
      v.object({
        type: v.union(v.literal("product"), v.literal("package")),
        itemId: v.union(v.id("products"), v.id("packages")),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      }),
    ),
    shippingAddress: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(now).slice(-6)}`

    const totalAmount = args.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      customerId: args.customerId,
      items: args.items,
      totalAmount,
      status: "pending",
      shippingAddress: args.shippingAddress,
      notes: args.notes,
      createdAt: now,
      updatedAt: now,
    })

    // Update customer stats
    await ctx.db.patch(args.customerId, {
      updatedAt: now,
    })

    return orderId
  },
})

// Update order status
export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
    deliveryDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

// Get recent orders (for dashboard)
export const getRecentOrders = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5
    const orders = await ctx.db.query("orders").order("desc").take(limit)

    const ordersWithCustomers = await Promise.all(
      orders.map(async (order) => {
        const customer = await ctx.db.get(order.customerId)
        return {
          ...order,
          customer,
        }
      }),
    )

    return ordersWithCustomers
  },
})
