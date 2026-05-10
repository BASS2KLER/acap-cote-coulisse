"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Spectacle, Representation } from "@/lib/types";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  spectacle: Spectacle;
}

// ─── Sous-composant : formulaire pour une représentation donnée ────────────────

interface FormProps {
  spectacleId: Id<"spectacles">;
  representations: Representation[];
  reprIndex: number;
  onChangeRepr: (i: number) => void;
}

function FormulairePourRepr({ spectacleId, representations, reprIndex, onChangeRepr }: FormProps) {
  const multipleReprs = representations.length > 1;
  const reprAffichee = representations[reprIndex];

  // Récupération des réservations existantes pour la représentation sélectionnée
  const reservationsExistantes = useQuery(api.reservations.list, {
    spectacleId,
    representationIndex: reprIndex,
  });

  const createReservation = useMutation(api.reservations.create);

  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    nbPlaces: "1",
    notes: "",
  });
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "succes" | "erreur">("idle");
  const [erreurMsg, setErreurMsg] = useState("");

  // Calcul des places restantes (places initiales - réservations non annulées)
  const placesReservees = reservationsExistantes
    ? reservationsExistantes.reduce((sum: number, r: { nbPlaces: number }) => sum + r.nbPlaces, 0)
    : 0;
  const placesRestantes = reprAffichee
    ? Math.max(0, reprAffichee.places - placesReservees)
    : 0;
  const complet = placesRestantes === 0 && reservationsExistantes !== undefined;

  const nbPlacesMax = Math.min(10, placesRestantes);
  const nbPlacesChoisi = parseInt(form.nbPlaces, 10);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reprAffichee) return;
    setEnvoi("loading");
    setErreurMsg("");
    try {
      await createReservation({
        spectacleId,
        representationIndex: reprIndex,
        nom: form.nom,
        email: form.email,
        telephone: form.telephone || undefined,
        nbPlaces: nbPlacesChoisi,
        notes: form.notes || undefined,
      });
      setEnvoi("succes");
    } catch {
      setErreurMsg("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      setEnvoi("erreur");
    }
  }

  // ─── Confirmation post-envoi ───────────────────────────────────────────────
  if (envoi === "succes") {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎭</div>
        <h3 style={{
          fontFamily: "var(--font-fraunces, Fraunces, serif)",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "1.25rem",
          color: "var(--ink)",
          margin: "0 0 10px",
        }}>
          Réservation reçue !
        </h3>
        <p style={{
          fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
          fontSize: "0.9375rem",
          color: "var(--ink-soft)",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}>
          Nous vous confirmons par email sous peu.
          On a hâte de vous accueillir !
        </p>
        <button
          onClick={() => {
            setEnvoi("idle");
            setForm({ nom: "", email: "", telephone: "", nbPlaces: "1", notes: "" });
          }}
          style={{
            fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--lavande-deep, #5b52a0)",
            background: "transparent",
            border: "1px solid var(--lavande-deep, #5b52a0)",
            borderRadius: 6,
            padding: "8px 20px",
            cursor: "pointer",
          }}
        >
          Faire une autre réservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Sélecteur de représentation si plusieurs */}
      {multipleReprs && (
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelStyle}>Choisir une représentation *</span>
          <select
            value={reprIndex}
            onChange={(e) => onChangeRepr(parseInt(e.target.value, 10))}
            style={inputStyle}
          >
            {representations.map((r, i) => (
              <option key={i} value={i}>
                {r.date} à {r.heure} — {r.lieu}{r.places === 0 ? " (Complet)" : ""}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Indicateur places restantes */}
      {reservationsExistantes !== undefined && (
        <div style={{
          fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: complet ? "var(--ink)" : placesRestantes <= 5 ? "var(--rose-deep, #c0392b)" : "var(--ink-soft)",
          background: complet ? "rgba(0,0,0,0.05)" : placesRestantes <= 5 ? "rgba(192,57,43,0.08)" : "rgba(0,0,0,0.03)",
          border: `1px solid ${complet ? "var(--ink-line)" : placesRestantes <= 5 ? "rgba(192,57,43,0.2)" : "var(--ink-line)"}`,
          borderRadius: 4,
          padding: "7px 12px",
        }}>
          {complet
            ? "Cette représentation est complète."
            : placesRestantes <= 5
              ? `⚠️ Plus que ${placesRestantes} place${placesRestantes > 1 ? "s" : ""} disponible${placesRestantes > 1 ? "s" : ""} !`
              : `${placesRestantes} place${placesRestantes > 1 ? "s" : ""} disponible${placesRestantes > 1 ? "s" : ""}`
          }
        </div>
      )}

      {/* Formulaire désactivé si complet */}
      {!complet && (
        <>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Nom complet *</span>
            <input
              required
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              style={inputStyle}
              placeholder="Marie Dupont"
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Email *</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              placeholder="marie@exemple.fr"
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Téléphone</span>
            <input
              type="tel"
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              style={inputStyle}
              placeholder="06 XX XX XX XX"
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Nombre de places *</span>
            <select
              value={form.nbPlaces}
              onChange={(e) => setForm({ ...form, nbPlaces: e.target.value })}
              style={inputStyle}
            >
              {Array.from({ length: nbPlacesMax }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} place{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Message (optionnel)</span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              style={{ ...inputStyle, resize: "vertical", minHeight: 72 }}
              placeholder="Besoins particuliers, accessibilité PMR…"
            />
          </label>

          {erreurMsg && (
            <p style={{
              fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--rose-deep, #c0392b)",
              margin: 0,
            }}>
              {erreurMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={envoi === "loading" || nbPlacesChoisi > placesRestantes}
            style={{
              fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "0.04em",
              color: "var(--paper, #FBF7EC)",
              background: envoi === "loading" ? "var(--ink-muted)" : "var(--lavande-deep, #5b52a0)",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              cursor: envoi === "loading" ? "not-allowed" : "pointer",
              textAlign: "center",
              transition: "opacity 0.15s",
            }}
          >
            {envoi === "loading" ? "Envoi en cours…" : "Réserver →"}
          </button>

          <p style={{
            fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
            fontSize: "0.75rem",
            color: "var(--ink-muted)",
            textAlign: "center",
            margin: 0,
          }}>
            Nous vous confirmons par email.
          </p>
        </>
      )}

      {/* Message d'attente si complet : liste d'attente par téléphone */}
      {complet && (
        <p style={{
          fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
          fontSize: "0.8125rem",
          color: "var(--ink-muted)",
          margin: 0,
          fontStyle: "italic",
        }}>
          Contactez-nous pour être sur liste d&apos;attente.
        </p>
      )}
    </form>
  );
}

// ─── Styles partagés ────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
  fontSize: "0.9375rem",
  padding: "9px 12px",
  border: "1px solid var(--ink-line)",
  borderRadius: 6,
  background: "var(--paper)",
  color: "var(--ink)",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--ink)",
};

// ─── Composant principal ─────────────────────────────────────────────────────

/**
 * Formulaire de réservation en ligne.
 * Affiche les places restantes en temps réel (via Convex reactivity)
 * et crée une réservation en statut "en_attente".
 */
export default function ReservationForm({ spectacle }: Props) {
  const representations: Representation[] = spectacle.representations ?? [];
  const [reprIndex, setReprIndex] = useState(0);

  // Le spectacle doit avoir un _id Convex valide
  const spectacleId = spectacle.id as Id<"spectacles">;

  if (representations.length === 0) return null;

  return (
    <section
      aria-labelledby="resa-titre"
      style={{
        borderTop: "1px solid var(--ink-line)",
        marginTop: 48,
        paddingTop: 40,
      }}
    >
      {/* En-tête de section */}
      <div style={{ marginBottom: 24 }}>
        <h2
          id="resa-titre"
          style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "1.75rem",
            lineHeight: 1.1,
            color: "var(--ink)",
            margin: "0 0 6px",
          }}
        >
          Réserver
        </h2>
        <p style={{
          fontFamily: "var(--font-worksans, Work Sans, sans-serif)",
          fontSize: "0.9375rem",
          color: "var(--ink-soft)",
          margin: 0,
        }}>
          Remplissez le formulaire ci-dessous — nous vous confirmons par email.
        </p>
      </div>

      {/* Carte formulaire */}
      <div
        style={{
          background: "#FBF7EC",
          border: "1px solid var(--ink-line)",
          borderRadius: 6,
          padding: 28,
          maxWidth: 520,
        }}
      >
        <FormulairePourRepr
          spectacleId={spectacleId}
          representations={representations}
          reprIndex={reprIndex}
          onChangeRepr={setReprIndex}
        />
      </div>
    </section>
  );
}
