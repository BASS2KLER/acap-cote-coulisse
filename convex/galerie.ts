import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const categorieValidator = v.union(
  v.literal("Auditions"),
  v.literal("Répétitions"),
  v.literal("Vie de la troupe"),
  v.literal("Divers")
);

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("galerie").order("desc").collect();
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        photoUrl: item.storageId
          ? await ctx.storage.getUrl(item.storageId)
          : null,
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    titre: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("photo"), v.literal("video")),
    storageId: v.optional(v.id("_storage")),
    urlVideo: v.optional(v.string()),
    videosExtras: v.optional(v.array(v.object({ label: v.string(), id: v.string() }))),
    date: v.string(),
    categorie: categorieValidator,
    ordre: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("galerie", args);
  },
});


export const remove = mutation({
  args: { id: v.id("galerie") },
  handler: async (ctx, { id }) => {
    const item = await ctx.db.get(id);
    if (item?.storageId) {
      await ctx.storage.delete(item.storageId);
    }
    await ctx.db.delete(id);
  },
});
