"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getToneVars, isComplet, getPlacesLabel, getPrimaryRepresentation } from "@/lib/utils";
import type { ToneCouleur, GenreSpectacle, Representation } from "@/lib/types";
import ModalReservation from "@/components/spectacles/ModalReservation";
import ReservationForm from "@/components/spectacles/ReservationForm";

export default function SpectacleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const raw = useQuery(api.spectacles.getBySlug, { slug });

  // Index de la représentation sélectionnée dans le panneau réservation
  const [reprIndex, setReprIndex] = useState(0);

  if (raw === undefined) {
    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px", textAlign: "center", fontFamily: "var(--font-worksans)", color: "var(--ink-muted)", fontStyle: "italic" }}>
        Chargement…
      </div>
    );
  }

  if (raw === null) notFound();

  const spectacle = {
    ...raw,
    id: raw._id,
    image: raw.imageUrl ?? "",
    galerie: (raw.galerieUrls ?? []).filter((u): u is string => u !== null),
    genres: raw.genres as GenreSpectacle[],
    tone: raw.tone as ToneCouleur,
    representations: raw.representations as Representation[] | undefined,
  };

  const { accentDeep, accentWash, accentClass } = getToneVars(spectacle.tone);

  // Représentations disponibles
  const representations: Representation[] = spectacle.representations ?? [];
  const primaryRepr = getPrimaryRepresentation(spectacle);
  const multipleReprs = representations.length > 1;

  // Représentation affichée dans le panneau réservation
  const reprAffichee: Representation = multipleReprs
    ? (representations[reprIndex] ?? primaryRepr)
    : primaryRepr;

  const complet = isComplet(reprAffichee.places);

  return (
    <div className={accentClass}>
      {/* En-tête */}
      <div style={{ background: accentWash, borderBottom: "1px solid var(--ink-line)", padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <Link href="/spectacles" style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-soft)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            ← Tous les spectacles
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {spectacle.genres.map((g) => (
              <span key={g} style={{ display: "inline-block", fontFamily: "var(--font-worksans)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: accentDeep, background: "rgba(255,255,255,0.5)", border: `1px solid ${accentDeep}`, padding: "3px 10px", borderRadius: 999 }}>
                {g}
              </span>
            ))}
            {complet && !multipleReprs && (
              <span style={{ display: "inline-block", fontFamily: "var(--font-worksans)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "var(--paper)", background: "var(--ink)", padding: "3px 10px", borderRadius: 999 }}>
                Complet
              </span>
            )}
          </div>

          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 8px" }}>
            {spectacle.titre}
          </h1>
          <p style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontSize: "1.125rem", color: "var(--ink-soft)", margin: "0 0 24px" }}>
            {spectacle.auteur}
          </p>

          {/* Infos de base (duree, prix, PMR) */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)", marginBottom: multipleReprs ? 16 : 0 }}>
            <span>⏱ {spectacle.duree}</span>
            <span>🎟 <strong style={{ color: "var(--ink)" }}>{spectacle.prix}{spectacle.prixReduit && ` / ${spectacle.prixReduit}`}</strong></span>
            {spectacle.pmr && <span>♿ Accès PMR</span>}
          </div>

          {/* Liste de toutes les représentations si plusieurs */}
          {multipleReprs ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: accentDeep, marginBottom: 4 }}>
                {representations.length} représentations
              </span>
              {representations.map((r, i) => (
                <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)" }}>
                  <span>📅 <strong style={{ color: "var(--ink)" }}>{r.date} à {r.heure}</strong></span>
                  <span>📍 {r.lieu}</span>
                  {r.places === 0 && (
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>— Complet</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)" }}>
              <span>📅 <strong style={{ color: "var(--ink)" }}>{primaryRepr.date} à {primaryRepr.heure}</strong></span>
              <span>📍 {primaryRepr.lieu}</span>
            </div>
          )}
        </div>
      </div>

      {/* Corps */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px 80px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 56, alignItems: "start" }}>

        {/* Description + galerie */}
        <div>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.75rem", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 20px" }}>
            Le spectacle
          </h2>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "56ch", whiteSpace: "pre-line", margin: "0 0 40px" }}>
            {spectacle.description}
          </p>

          {/* Galerie */}
          <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 16px" }}>
            Galerie
          </h3>
          {spectacle.galerie.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {spectacle.galerie.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 4, border: "1px solid var(--ink-line)" }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ background: accentWash, border: `1px solid ${accentDeep}`, borderRadius: 4, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem", opacity: 0.4 }}>{spectacle.emoji}</span>
                </div>
              ))}
            </div>
          )}
          {spectacle.galerie.length === 0 && (
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", marginTop: 8, fontStyle: "italic" }}>Photos de répétitions à venir.</p>
          )}

          {/* Formulaire de réservation en ligne */}
          <ReservationForm spectacle={spectacle} />
        </div>

        {/* Panneau réservation */}
        <aside style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 28, boxShadow: "8px 8px 0 var(--paper-deep)" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 20px" }}>
              On vous garde une place ?
            </h2>

            {/* Sélecteur de représentation si plusieurs */}
            {multipleReprs && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink)" }}>
                    Choisir une date
                  </span>
                  <select
                    value={reprIndex}
                    onChange={(e) => setReprIndex(parseInt(e.target.value))}
                    style={{
                      fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                      fontSize: "0.875rem",
                      padding: "8px 12px",
                      border: "1px solid var(--ink-line)",
                      borderRadius: 6,
                      background: "var(--paper)",
                      color: "var(--ink)",
                      width: "100%",
                      outline: "none",
                    }}
                  >
                    {representations.map((r, i) => (
                      <option key={i} value={i}>
                        {r.date} à {r.heure}{r.places === 0 ? " — Complet" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              {[
                { label: "Date", value: reprAffichee.date },
                { label: "Heure", value: reprAffichee.heure },
                { label: "Lieu", value: reprAffichee.lieu },
                { label: "Tarif adulte", value: spectacle.prix },
                { label: "Tarif réduit", value: spectacle.prixReduit },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--ink-line)", fontFamily: "var(--font-worksans)", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--ink-muted)" }}>{label}</span>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{value}</span>
                </div>
              ))}
            </div>

            {!complet ? (
              <>
                {reprAffichee.places <= 15 && (
                  <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--rose-deep)", margin: "0 0 16px" }}>
                    ⚠️ {getPlacesLabel(reprAffichee.places)}
                  </p>
                )}
                <ModalReservation spectacle={spectacle} />
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>😢</div>
                <p style={{ fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 6px" }}>Cette représentation est complète.</p>
                <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", margin: 0 }}>Contactez-nous pour être sur liste d&apos;attente.</p>
              </div>
            )}

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--ink-line)", fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)" }}>
              <p style={{ margin: "0 0 2px" }}>📞 06 81 67 04 98 (Hélène)</p>
              <p style={{ margin: 0 }}>📞 06 33 62 20 42 (Florence)</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}