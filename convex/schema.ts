import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Users table for authentication
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("customer")),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Products table
  products: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_sku", ["sku"])
    .index("by_status", ["status"]),

  // Solar packages table
  packages: defineTable({
    name: v.string(),
    description: v.string(),
    capacity: v.string(),
    price: v.number(),
    components: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      }),
    ),
    status: v.union(v.literal("active"), v.literal("inactive")),
    popular: v.optional(v.boolean()),
    images: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),

  // Customers table
  customers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    totalOrders: v.number(),
    totalSpent: v.number(),
    status: v.union(v.literal("active"), v.literal("inactive")),
    lastOrderDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),

  // Orders table
  orders: defineTable({
    orderNumber: v.string(),
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
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
    shippingAddress: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    deliveryDate: v.optional(v.number()),
  })
    .index("by_customer", ["customerId"])
    .index("by_status", ["status"])
    .index("by_order_number", ["orderNumber"]),

  // Quotes table
  quotes: defineTable({
    quoteNumber: v.string(),
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
    totalAmount: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("expired"),
    ),
    validUntil: v.number(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customer", ["customerId"])
    .index("by_status", ["status"])
    .index("by_quote_number", ["quoteNumber"]),

  // Inventory movements table
  inventoryMovements: defineTable({
    productId: v.id("products"),
    type: v.union(v.literal("in"), v.literal("out")),
    quantity: v.number(),
    reason: v.string(),
    reference: v.optional(v.string()), // Order ID, adjustment ID, etc.
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_type", ["type"]),

  // Media files table
  media: defineTable({
    name: v.string(),
    type: v.union(v.literal("image"), v.literal("video"), v.literal("document")),
    url: v.string(),
    size: v.number(),
    mimeType: v.string(),
    uploadedBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_uploaded_by", ["uploadedBy"]),

  // Settings table
  settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
})
