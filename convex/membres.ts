import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const membres = await ctx.db.query("membres").collect();
    return Promise.all(
      membres
        .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
        .map(async (m) => ({
          ...m,
          photoUrl: m.photoStorageId
            ? await ctx.storage.getUrl(m.photoStorageId)
            : null,
        }))
    );
  },
});

export const create = mutation({
  args: {
    nom: v.string(),
    role: v.string(),
    bio: v.string(),
    depuis: v.number(),
    photoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("membres", { ...args, ordre: Date.now() });
  },
});

export const update = mutation({
  args: {
    id: v.id("membres"),
    nom: v.optional(v.string()),
    role: v.optional(v.string()),
    bio: v.optional(v.string()),
    depuis: v.optional(v.number()),
    photoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { id, ...fields }) => {
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, clean);
  },
});

export const remove = mutation({
  args: { id: v.id("membres") },
  handler: async (ctx, { id }) => {
    const m = await ctx.db.get(id);
    if (m?.photoStorageId) await ctx.storage.delete(m.photoStorageId);
    await ctx.db.delete(id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => ctx.storage.generateUploadUrl(),
});
