import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Validator partagé pour le statut
const statutValidator = v.union(
  v.literal("en_attente"),
  v.literal("confirme"),
  v.literal("annule")
);

// Retourne les réservations d'un spectacle, filtrées par representationIndex si fourni
// Triées par _creationTime desc
export const list = query({
  args: {
    spectacleId: v.id("spectacles"),
    representationIndex: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.representationIndex !== undefined) {
      return await ctx.db
        .query("reservations")
        .withIndex("by_spectacleId_and_representationIndex", (q) =>
          q
            .eq("spectacleId", args.spectacleId)
            .eq("representationIndex", args.representationIndex!)
        )
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("reservations")
      .withIndex("by_spectacleId", (q) => q.eq("spectacleId", args.spectacleId))
      .order("desc")
      .collect();
  },
});

// Retourne toutes les réservations avec le titre du spectacle associé
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const reservations = await ctx.db
      .query("reservations")
      .order("desc")
      .collect();
    return Promise.all(
      reservations.map(async (r) => {
        const spectacle = await ctx.db.get(r.spectacleId);
        return {
          ...r,
          spectacleTitre: spectacle?.titre ?? null,
        };
      })
    );
  },
});

// Crée une nouvelle réservation avec statut "en_attente" par défaut
export const create = mutation({
  args: {
    spectacleId: v.id("spectacles"),
    representationIndex: v.number(),
    nom: v.string(),
    email: v.string(),
    telephone: v.optional(v.string()),
    nbPlaces: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reservations", {
      ...args,
      statut: "en_attente",
    });
  },
});

// Met à jour le statut d'une réservation
export const updateStatut = mutation({
  args: {
    id: v.id("reservations"),
    statut: statutValidator,
  },
  handler: async (ctx, { id, statut }) => {
    await ctx.db.patch(id, { statut });
  },
});

// Supprime une réservation
export const remove = mutation({
  args: { id: v.id("reservations") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

// Compte les places réservées pour une représentation donnée
// Retourne : { reservees, confirmees, enAttente }
export const countPlaces = query({
  args: {
    spectacleId: v.id("spectacles"),
    representationIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_spectacleId_and_representationIndex", (q) =>
        q
          .eq("spectacleId", args.spectacleId)
          .eq("representationIndex", args.representationIndex)
      )
      .collect();

    let reservees = 0;
    let confirmees = 0;
    let enAttente = 0;

    for (const r of reservations) {
      if (r.statut === "annule") continue;
      reservees += r.nbPlaces;
      if (r.statut === "confirme") {
        confirmees += r.nbPlaces;
      } else if (r.statut === "en_attente") {
        enAttente += r.nbPlaces;
      }
    }

    return { reservees, confirmees, enAttente };
  },
});
