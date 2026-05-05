import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  spectacles: defineTable({
    slug: v.string(),
    titre: v.string(),
    auteur: v.string(),
    description: v.string(),
    descriptionCourte: v.string(),
    date: v.string(),           // "Sam. 14 mars"
    dateISO: v.string(),        // "2026-03-14"
    heure: v.string(),          // "20h30"
    lieu: v.string(),
    adresse: v.string(),
    duree: v.string(),
    prix: v.string(),
    prixReduit: v.string(),
    genres: v.array(v.string()),
    tone: v.string(),           // "tomate" | "soleil" | ...
    emoji: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    galerieStorageIds: v.optional(v.array(v.id("_storage"))),
    lienVideo: v.optional(v.string()),
    pmr: v.boolean(),
    places: v.number(),
    saison: v.string(),
    ordre: v.optional(v.number()),
  }).index("by_slug", ["slug"])
    .index("by_saison", ["saison"]),

  membres: defineTable({
    nom: v.string(),
    role: v.string(),
    bio: v.string(),
    depuis: v.number(),
    photoStorageId: v.optional(v.id("_storage")),
    ordre: v.optional(v.number()),
  }),

  actualites: defineTable({
    titre: v.string(),
    date: v.string(),
    contenu: v.string(),
    tag: v.string(),
    tone: v.string(),
    publie: v.boolean(),
  }),
});
