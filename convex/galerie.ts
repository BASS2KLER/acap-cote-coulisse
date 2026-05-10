import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { VIDEOS_ARCHIVES } from "../lib/videos-archives";

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

export const seedArchives = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("galerie").collect();
    const existingTitres = new Set(existing.map((i) => i.titre));
    let inserted = 0;
    for (const archive of VIDEOS_ARCHIVES) {
      if (existingTitres.has(archive.titre)) continue;
      await ctx.db.insert("galerie", {
        titre: archive.titre,
        description: archive.description,
        type: "video",
        urlVideo: `https://www.youtube.com/watch?v=${archive.thumbnail}`,
        videosExtras: archive.videos,
        date: archive.saison,
        categorie: "Divers",
      });
      inserted++;
    }
    return { inserted };
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
