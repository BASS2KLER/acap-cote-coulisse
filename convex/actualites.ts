import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("actualites")
      .filter((q) => q.eq(q.field("publie"), true))
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("actualites").collect();
  },
});

export const create = mutation({
  args: {
    titre: v.string(),
    date: v.string(),
    contenu: v.string(),
    tag: v.string(),
    tone: v.string(),
    publie: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("actualites", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("actualites"),
    titre: v.optional(v.string()),
    date: v.optional(v.string()),
    contenu: v.optional(v.string()),
    tag: v.optional(v.string()),
    tone: v.optional(v.string()),
    publie: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, clean);
  },
});

export const remove = mutation({
  args: { id: v.id("actualites") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
