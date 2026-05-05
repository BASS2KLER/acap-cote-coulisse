"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getToneVars, isComplet, getPlacesLabel } from "@/lib/utils";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";
import ModalReservation from "@/components/spectacles/ModalReservation";

export default function SpectacleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const raw = useQuery(api.spectacles.getBySlug, { slug });

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
  };

  const { accentDeep, accentWash, accentClass } = getToneVars(spectacle.tone);
  const complet = isComplet(spectacle.places);

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
            {complet && (
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

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)" }}>
            <span>📅 <strong style={{ color: "var(--ink)" }}>{spectacle.date} à {spectacle.heure}</strong></span>
            <span>📍 {spectacle.lieu}</span>
            <span>⏱ {spectacle.duree}</span>
            <span>🎟 <strong style={{ color: "var(--ink)" }}>{spectacle.prix}{spectacle.prixReduit && ` / ${spectacle.prixReduit}`}</strong></span>
            {spectacle.pmr && <span>♿ Accès PMR</span>}
          </div>
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
        </div>

        {/* Panneau réservation */}
        <aside style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 28, boxShadow: "8px 8px 0 var(--paper-deep)" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 20px" }}>
              On vous garde une place ?
            </h2>

            <div style={{ marginBottom: 24 }}>
              {[
                { label: "Date", value: spectacle.date },
                { label: "Heure", value: spectacle.heure },
                { label: "Lieu", value: spectacle.lieu },
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
                {spectacle.places <= 15 && (
                  <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--rose-deep)", margin: "0 0 16px" }}>
                    ⚠️ {getPlacesLabel(spectacle.places)}
                  </p>
                )}
                <ModalReservation spectacle={spectacle} />
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>😢</div>
                <p style={{ fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 6px" }}>Ce spectacle est complet.</p>
                <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", margin: 0 }}>Contactez-nous pour être sur liste d'attente.</p>
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
