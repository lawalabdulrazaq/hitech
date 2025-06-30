import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all quotes
export const getQuotes = query({
  args: {},
  handler: async (ctx) => {
    const quotes = await ctx.db.query("quotes").collect()

    // Get customer details for each quote
    const quotesWithCustomers = await Promise.all(
      quotes.map(async (quote) => {
        const customer = await ctx.db.get(quote.customerId)
        return {
          ...quote,
          customer,
        }
      }),
    )

    return quotesWithCustomers
  },
})

// Get quotes by customer
export const getQuotesByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quotes")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect()
  },
})

// Get quote by ID
export const getQuote = query({
  args: { id: v.id("quotes") },
  handler: async (ctx, args) => {
    const quote = await ctx.db.get(args.id)
    if (!quote) return null

    const customer = await ctx.db.get(quote.customerId)
    return {
      ...quote,
      customer,
    }
  },
})

// Create new quote
export const createQuote = mutation({
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
    validityDays: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const quoteNumber = `QUO-${new Date().getFullYear()}-${String(now).slice(-6)}`
    const validityDays = args.validityDays || 30
    const validUntil = now + validityDays * 24 * 60 * 60 * 1000

    const totalAmount = args.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return await ctx.db.insert("quotes", {
      quoteNumber,
      customerId: args.customerId,
      items: args.items,
      totalAmount,
      status: "draft",
      validUntil,
      notes: args.notes,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Update quote status
export const updateQuoteStatus = mutation({
  args: {
    id: v.id("quotes"),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("expired"),
    ),
  },
  handler: async (ctx, args) => {
    const { id, status } = args
    return await ctx.db.patch(id, {
      status,
      updatedAt: Date.now(),
    })
  },
})

// Convert quote to order
export const convertQuoteToOrder = mutation({
  args: {
    quoteId: v.id("quotes"),
    shippingAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const quote = await ctx.db.get(args.quoteId)
    if (!quote) throw new Error("Quote not found")
    if (quote.status !== "accepted") throw new Error("Quote must be accepted first")

    const now = Date.now()
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(now).slice(-6)}`

    // Create order from quote
    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      customerId: quote.customerId,
      items: quote.items,
      totalAmount: quote.totalAmount,
      status: "pending",
      shippingAddress: args.shippingAddress,
      notes: `Converted from quote ${quote.quoteNumber}`,
      createdAt: now,
      updatedAt: now,
    })

    // Update quote status
    await ctx.db.patch(args.quoteId, {
      status: "accepted",
      updatedAt: now,
    })

    return orderId
  },
})
