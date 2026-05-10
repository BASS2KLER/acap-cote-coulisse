"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Spectacle } from "@/lib/types";
import { getToneVars, isComplet, getPrimaryRepresentation } from "@/lib/utils";

interface SpectacleCardProps {
  spectacle: Spectacle;
  compact?: boolean;
}

export default function SpectacleCard({ spectacle, compact }: SpectacleCardProps) {
  const { accentDeep, accentWash, accentClass } = getToneVars(spectacle.tone);
  const primaryRepr = getPrimaryRepresentation(spectacle);
  const complet = isComplet(primaryRepr.places);
  const nbDatesSupp = (spectacle.representations?.length ?? 0) - 1;

  return (
    <motion.article
      whileHover={{ y: -3, rotate: -0.6 }}
      style={{ cursor: "pointer" }}
      transition={{ duration: 0.24, ease: [0.34, 1.36, 0.64, 1] }}
      className={accentClass}
    >
      <Link
        href={`/spectacles/${spectacle.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div style={{
          background: "#FBF7EC",
          border: "1px solid var(--ink-line)",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 2px 0 rgba(42,39,34,0.05), 0 8px 18px -10px rgba(42,39,34,0.18)",
          transition: "box-shadow 240ms",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 10px 0 var(--accent-wash)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 0 rgba(42,39,34,0.05), 0 8px 18px -10px rgba(42,39,34,0.18)";
        }}
        >
          {/* Zone image */}
          <div style={{
            height: 200,
            background: accentWash,
            borderBottom: "1px solid var(--ink-line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 12,
            overflow: "hidden",
          }}>
            {spectacle.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={spectacle.image}
                alt={spectacle.titre}
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            ) : (
              <span style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontStyle: "italic",
                fontSize: "0.875rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.04em",
              }}>
                {spectacle.emoji} illustration · à venir
              </span>
            )}
            {/* Tampon */}
            <span className="stamp" style={{
              position: "absolute",
              top: 12,
              right: 12,
              transform: "rotate(6deg)",
              color: accentDeep,
              borderColor: accentDeep,
            }}>
              {complet ? "complet" : spectacle.saison}
            </span>
          </div>

          {/* Corps */}
          <div style={{ padding: compact ? "14px 16px 16px" : "16px 18px 20px" }}>
            <span className="kicker" style={{ marginBottom: 6, color: accentDeep }}>
              {spectacle.genres[0] ?? "Théâtre"}
            </span>
            <h3 className="show-name" style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: compact ? "1.25rem" : "1.5rem",
              lineHeight: 1.1,
              color: "var(--ink)",
              margin: "4px 0 6px",
            }}>
              {spectacle.titre}
            </h3>
            <p style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--ink-soft)",
              margin: "0 0 2px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              {primaryRepr.date} · {primaryRepr.heure}
              {nbDatesSupp > 0 && (
                <span style={{
                  display: "inline-block",
                  fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  background: accentDeep,
                  color: "#fff",
                  padding: "1px 7px",
                  borderRadius: 999,
                  letterSpacing: "0.02em",
                }}>
                  +{nbDatesSupp}
                </span>
              )}
            </p>
            <p style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.75rem",
              color: "var(--ink-muted)",
              margin: 0,
            }}>
              {spectacle.auteur}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}