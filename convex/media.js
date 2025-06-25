// ===== MEDIA UPLOAD FUNCTIONS =====
// convex/media.js
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate upload URL for file storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if user is authenticated and has upload permissions
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    
    return await ctx.storage.generateUploadUrl();
  },
});

// Save media metadata after file upload
export const saveMedia = mutation({
  args: {
    fileName: v.string(),
    fileUrl: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    category: v.union(
      v.literal("product_image"),
      v.literal("package_image"),
      v.literal("video"),
      v.literal("document"),
      v.literal("other")
    ),
    altText: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("media", {
      ...args,
      uploadedBy: user._id,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get media by category
export const getMediaByCategory = query({
  args: {
    category: v.optional(v.union(
      v.literal("product_image"),
      v.literal("package_image"),
      v.literal("video"),
      v.literal("document"),
      v.literal("other")
    )),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    let query = ctx.db.query("media");
    
    if (args.category) {
      query = query.withIndex("by_category", (q) => q.eq("category", args.category));
    }
    
    return await query
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit || 50);
  },
});

// Delete media
export const deleteMedia = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const media = await ctx.db.get(args.id);
    if (!media) throw new Error("Media not found");

    // Soft delete - mark as inactive
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});
