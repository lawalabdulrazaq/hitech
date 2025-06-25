// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ===== AUTHENTICATION & USERS =====
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("super_admin"), v.literal("admin"), v.literal("editor")),
    isActive: v.boolean(),
    lastLogin: v.optional(v.number()),
    permissions: v.optional(v.array(v.string())), // ["products", "packages", "orders", "analytics"]
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // ===== MEDIA MANAGEMENT =====
  media: defineTable({
    fileName: v.string(),
    fileUrl: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    uploadedBy: v.id("users"),
    tags: v.optional(v.array(v.string())),
    altText: v.optional(v.string()),
    category: v.union(
      v.literal("product_image"),
      v.literal("package_image"),
      v.literal("video"),
      v.literal("document"),
      v.literal("other")
    ),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_uploader", ["uploadedBy"])
    .index("by_created", ["createdAt"]),

  // ===== CATEGORIES FOR ORGANIZATION =====
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("single_item"), v.literal("package")),
    parentId: v.optional(v.id("categories")), // For nested categories
    sortOrder: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_slug", ["slug"])
    .index("by_parent", ["parentId"]),

  // ===== SINGLE ITEMS (Batteries, Fans, etc.) =====
  single_items: defineTable({
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("categories"),
    sku: v.optional(v.string()), // Stock Keeping Unit
    brand: v.optional(v.string()),
    model: v.optional(v.string()),
    
    // Pricing & Inventory
    unitPrice: v.number(),
    currency: v.string(), // "NGN", "USD", etc.
    costPrice: v.optional(v.number()), // For profit calculations
    stockUnits: v.number(),
    lowStockThreshold: v.optional(v.number()),
    
    // Media
    primaryImageId: v.optional(v.id("media")),
    imageIds: v.array(v.id("media")),
    videoIds: v.optional(v.array(v.id("media"))),
    documentIds: v.optional(v.array(v.id("media"))), // Datasheets, manuals
    
    // Product Details
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    specifications: v.optional(v.object({
      voltage: v.optional(v.string()),
      capacity: v.optional(v.string()),
      power: v.optional(v.string()),
      dimensions: v.optional(v.string()),
      weight: v.optional(v.string()),
      warranty: v.optional(v.string()),
      certification: v.optional(v.array(v.string())),
      custom: v.optional(v.object({})), // For flexible specs
    })),
    
    // SEO & Marketing
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    tags: v.array(v.string()),
    
    // Status & Tracking
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("inactive"),
      v.literal("discontinued")
    ),
    isFeatured: v.boolean(),
    viewCount: v.number(),
    salesCount: v.number(),
    
    // Audit Trail
    createdBy: v.id("users"),
    updatedBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["categoryId"])
    .index("by_status", ["status"])
    .index("by_sku", ["sku"])
    .index("by_slug", ["slug"])
    .index("by_stock", ["stockUnits"])
    .index("by_featured", ["isFeatured"])
    .searchIndex("search_products", {
      searchField: "name",
      filterFields: ["categoryId", "status", "tags"]
    }),

  // ===== SOLAR PACKAGES (Complete Systems) =====
  solar_packages: defineTable({
    modelNumber: v.string(),
    name: v.string(),
    slug: v.string(),
    categoryId: v.optional(v.id("categories")),
    
    // System Specifications
    powerRating: v.string(), // "3000VA", "5000W"
    systemType: v.union(
      v.literal("grid_tie"),
      v.literal("off_grid"),
      v.literal("hybrid")
    ),
    
    // Components Configuration
    inverterSpecs: v.object({
      brand: v.optional(v.string()),
      model: v.optional(v.string()),
      power: v.string(),
      voltage: v.optional(v.string()),
      waveform: v.optional(v.union(v.literal("pure_sine"), v.literal("modified_sine"))),
    }),
    
    batterySpecs: v.object({
      type: v.optional(v.string()), // "Lithium", "AGM", "Gel"
      capacity: v.string(), // "200AH"
      voltage: v.optional(v.string()),
      quantity: v.number(),
      brand: v.optional(v.string()),
    }),
    
    solarPanelSpecs: v.optional(v.object({
      wattage: v.optional(v.string()),
      quantity: v.optional(v.number()),
      type: v.optional(v.string()), // "Monocrystalline", "Polycrystalline"
      brand: v.optional(v.string()),
    })),
    
    chargeController: v.object({
      type: v.union(v.literal("PWM"), v.literal("MPPT")),
      rating: v.string(), // "40A", "60A"
      brand: v.optional(v.string()),
    }),
    
    // Performance Metrics
    backupTime: v.string(), // "10 HRS", "8-12 HRS"
    supportedDevices: v.array(v.string()), // ["TV", "FAN x3", "Lighting x5"]
    maxLoad: v.optional(v.string()),
    dailyEnergyGeneration: v.optional(v.string()),
    
    // Pricing
    price: v.number(),
    currency: v.string(),
    installationCost: v.optional(v.number()),
    maintenanceCost: v.optional(v.number()),
    
    // Media
    primaryImageId: v.optional(v.id("media")),
    imageIds: v.array(v.id("media")),
    systemDiagramId: v.optional(v.id("media")),
    videoIds: v.optional(v.array(v.id("media"))),
    documentIds: v.optional(v.array(v.id("media"))), // Installation guides, warranties
    
    // Marketing & Details
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    idealFor: v.array(v.string()), // ["2-bedroom apartment", "Small office", "Clinic"]
    features: v.array(v.string()),
    
    // Components List (for detailed breakdown)
    includedComponents: v.array(v.object({
      itemId: v.optional(v.id("single_items")),
      name: v.string(),
      quantity: v.number(),
      unitPrice: v.optional(v.number()),
    })),
    
    // Installation & Support
    installationTime: v.optional(v.string()),
    warrantyPeriod: v.optional(v.string()),
    supportLevel: v.optional(v.union(
      v.literal("basic"),
      v.literal("premium"),
      v.literal("enterprise")
    )),
    
    // Status & Tracking
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("inactive"),
      v.literal("custom_only") // Only available for custom quotes
    ),
    isFeatured: v.boolean(),
    isCustomizable: v.boolean(),
    viewCount: v.number(),
    inquiryCount: v.number(),
    
    // SEO
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    tags: v.array(v.string()),
    
    // Audit Trail
    createdBy: v.id("users"),
    updatedBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["categoryId"])
    .index("by_system_type", ["systemType"])
    .index("by_power_rating", ["powerRating"])
    .index("by_featured", ["isFeatured"])
    .searchIndex("search_packages", {
      searchField: "name",
      filterFields: ["systemType", "status", "tags", "idealFor"]
    }),

  // ===== CUSTOMER INQUIRIES =====
  inquiries: defineTable({
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
    
    // Related Items
    itemIds: v.optional(v.array(v.id("single_items"))),
    packageIds: v.optional(v.array(v.id("solar_packages"))),
    
    message: v.string(),
    requirements: v.optional(v.object({
      powerNeeds: v.optional(v.string()),
      location: v.optional(v.string()),
      budget: v.optional(v.string()),
      timeline: v.optional(v.string()),
    })),
    
    // Status & Assignment
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("quoted"),
      v.literal("closed"),
      v.literal("lost")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    assignedTo: v.optional(v.id("users")),
    
    // Follow-up
    lastContactDate: v.optional(v.number()),
    nextFollowUp: v.optional(v.number()),
    notes: v.optional(v.array(v.object({
      note: v.string(),
      addedBy: v.id("users"),
      addedAt: v.number(),
    }))),
    
    // Tracking
    source: v.optional(v.string()), // "website", "phone", "referral"
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .index("by_assigned", ["assignedTo"])
    .index("by_priority", ["priority"])
    .index("by_created", ["createdAt"]),

  // ===== ANALYTICS & REPORTING =====
  analytics_events: defineTable({
    eventType: v.union(
      v.literal("page_view"),
      v.literal("product_view"),
      v.literal("package_view"),
      v.literal("inquiry_submitted"),
      v.literal("download"),
      v.literal("video_play")
    ),
    
    entityType: v.optional(v.union(
      v.literal("single_item"),
      v.literal("solar_package")
    )),
    entityId: v.optional(v.string()),
    
    metadata: v.optional(v.object({
      userAgent: v.optional(v.string()),
      ipAddress: v.optional(v.string()),
      referrer: v.optional(v.string()),
      sessionId: v.optional(v.string()),
    })),
    
    createdAt: v.number(),
  })
    .index("by_event_type", ["eventType"])
    .index("by_entity", ["entityType", "entityId"])
    .index("by_date", ["createdAt"]),

  // ===== SYSTEM SETTINGS =====
  settings: defineTable({
    key: v.string(),
    value: v.union(v.string(), v.number(), v.boolean(), v.object({})),
    category: v.string(), // "general", "pricing", "media", "notifications"
    description: v.optional(v.string()),
    updatedBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_category", ["category"]),

  // ===== ACTIVITY LOGS =====
  activity_logs: defineTable({
    userId: v.id("users"),
    action: v.string(), // "created", "updated", "deleted", "viewed"
    entityType: v.string(), // "single_item", "solar_package", "inquiry"
    entityId: v.string(),
    changes: v.optional(v.object({})), // JSON of what changed
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_entity", ["entityType", "entityId"])
    .index("by_action", ["action"])
    .index("by_date", ["createdAt"]),
});