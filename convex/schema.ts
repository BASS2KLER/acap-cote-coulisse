import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Validator partagé pour une représentation (utilisé dans le schéma et les mutations)
export const representationValidator = v.object({
  date: v.string(),      // "Sam. 14 mars"
  dateISO: v.string(),   // "2026-03-14"
  heure: v.string(),     // "20h30"
  lieu: v.string(),
  adresse: v.string(),
  places: v.number(),
});

export default defineSchema({
  spectacles: defineTable({
    slug: v.string(),
    titre: v.string(),
    auteur: v.string(),
    description: v.string(),
    descriptionCourte: v.string(),
    // Anciens champs conservés en optional pour rétrocompatibilité migration
    date: v.optional(v.string()),           // "Sam. 14 mars"
    dateISO: v.optional(v.string()),        // "2026-03-14"
    heure: v.optional(v.string()),          // "20h30"
    lieu: v.optional(v.string()),
    adresse: v.optional(v.string()),
    places: v.optional(v.number()),
    // Nouveau tableau de représentations
    representations: v.optional(v.array(representationValidator)),
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

  galerie: defineTable({
    titre: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("photo"), v.literal("video")),
    storageId: v.optional(v.id("_storage")),
    urlVideo: v.optional(v.string()),
    videosExtras: v.optional(v.array(v.object({ label: v.string(), id: v.string() }))),
    date: v.string(),
    categorie: v.union(
      v.literal("Auditions"),
      v.literal("Répétitions"),
      v.literal("Vie de la troupe"),
      v.literal("Divers")
    ),
    ordre: v.optional(v.number()),
  }).index("by_categorie", ["categorie"]),
});