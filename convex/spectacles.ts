import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { representationValidator } from "./schema";

// ── Queries publiques ──────────────────────────────────────────

export const list = query({
  args: {},
  handler: async (ctx) => {
    const spectacles = await ctx.db
      .query("spectacles")
      .order("asc")
      .collect();

    return Promise.all(
      spectacles
        .sort((a, b) => ((a.dateISO ?? "") > (b.dateISO ?? "") ? 1 : -1))
        .map(async (s) => ({
          ...s,
          imageUrl: s.imageStorageId
            ? await ctx.storage.getUrl(s.imageStorageId)
            : null,
          galerieUrls: s.galerieStorageIds
            ? await Promise.all(
                s.galerieStorageIds.map((id) => ctx.storage.getUrl(id))
              )
            : [],
        }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const spectacle = await ctx.db
      .query("spectacles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!spectacle) return null;

    return {
      ...spectacle,
      imageUrl: spectacle.imageStorageId
        ? await ctx.storage.getUrl(spectacle.imageStorageId)
        : null,
      galerieUrls: spectacle.galerieStorageIds
        ? await Promise.all(
            spectacle.galerieStorageIds.map((id) => ctx.storage.getUrl(id))
          )
        : [],
    };
  },
});

// ── Mutations admin ────────────────────────────────────────────

export const create = mutation({
  args: {
    slug: v.string(),
    titre: v.string(),
    auteur: v.string(),
    description: v.string(),
    descriptionCourte: v.string(),
    representations: v.array(representationValidator),
    duree: v.string(),
    prix: v.string(),
    prixReduit: v.string(),
    genres: v.array(v.string()),
    tone: v.string(),
    emoji: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    lienVideo: v.optional(v.string()),
    pmr: v.boolean(),
    saison: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("spectacles", {
      ...args,
      galerieStorageIds: [],
      ordre: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("spectacles"),
    titre: v.optional(v.string()),
    auteur: v.optional(v.string()),
    description: v.optional(v.string()),
    descriptionCourte: v.optional(v.string()),
    representations: v.optional(v.array(representationValidator)),
    duree: v.optional(v.string()),
    prix: v.optional(v.string()),
    prixReduit: v.optional(v.string()),
    genres: v.optional(v.array(v.string())),
    tone: v.optional(v.string()),
    emoji: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    lienVideo: v.optional(v.string()),
    pmr: v.optional(v.boolean()),
    saison: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, clean);
  },
});

export const addGaleriePhoto = mutation({
  args: {
    id: v.id("spectacles"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { id, storageId }) => {
    const s = await ctx.db.get(id);
    if (!s) return;
    const galerie = s.galerieStorageIds ?? [];
    await ctx.db.patch(id, { galerieStorageIds: [...galerie, storageId] });
  },
});

export const removeGaleriePhoto = mutation({
  args: {
    id: v.id("spectacles"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { id, storageId }) => {
    const s = await ctx.db.get(id);
    if (!s) return;
    const galerie = (s.galerieStorageIds ?? []).filter(
      (sid) => sid !== storageId
    );
    await ctx.db.patch(id, { galerieStorageIds: galerie });
    await ctx.storage.delete(storageId);
  },
});

export const remove = mutation({
  args: { id: v.id("spectacles") },
  handler: async (ctx, { id }) => {
    const s = await ctx.db.get(id);
    if (s?.imageStorageId) await ctx.storage.delete(s.imageStorageId);
    if (s?.galerieStorageIds) {
      for (const sid of s.galerieStorageIds) await ctx.storage.delete(sid);
    }
    await ctx.db.delete(id);
  },
});

// Migration : convertit les 4 spectacles existants vers le nouveau format representations
export const migrateToRepresentations = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("spectacles").collect();
    let count = 0;
    for (const s of all) {
      if (!s.representations && s.date) {
        await ctx.db.patch(s._id, {
          representations: [{
            date: s.date,
            dateISO: s.dateISO ?? "",
            heure: s.heure ?? "",
            lieu: s.lieu ?? "",
            adresse: s.adresse ?? "",
            places: s.places ?? 0,
          }],
        });
        count++;
      }
    }
    return { migrated: count };
  },
});

// URL d'upload Convex Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => ctx.storage.generateUploadUrl(),
});