"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Spectacle } from "@/lib/types";
import { isComplet, getPrimaryRepresentation } from "@/lib/utils";

interface SpectacleCardProps {
  spectacle: Spectacle;
  compact?: boolean;
}

export default function SpectacleCard({ spectacle, compact }: SpectacleCardProps) {
  const primaryRepr = getPrimaryRepresentation(spectacle);
  const complet = isComplet(primaryRepr.places);
  const nbDatesSupp = (spectacle.representations?.length ?? 0) - 1;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      style={{ cursor: "pointer", height: "100%" }}
      transition={{ duration: 0.24, ease: [0.34, 1.36, 0.64, 1] }}
    >
      <Link
        href={`/spectacles/${spectacle.slug}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        <div className="card-spectacle" style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
          {/* Zone image */}
          <div style={{
            aspectRatio: "4/3",
            background: "var(--brick-wash)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 16,
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
                fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                fontStyle: "italic",
                fontSize: "0.875rem",
                color: "var(--brick)",
                letterSpacing: "0.04em",
              }}>
                {spectacle.emoji} illustration · à venir
              </span>
            )}
            {/* Badge statut */}
            <span style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 999,
              background: complet ? "var(--ink)" : "var(--brick)",
              color: "var(--white)",
            }}>
              {complet ? "Complet" : spectacle.saison}
            </span>
          </div>

          {/* Corps */}
          <div style={{
            padding: compact ? "16px 18px 20px" : "20px 22px 24px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}>
            <span className="chip-acap" style={{ alignSelf: "flex-start", marginBottom: 10 }}>
              {spectacle.genres[0] ?? "Théâtre"}
            </span>
            <h3 style={{
              fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
              fontWeight: 400,
              fontSize: compact ? "1.25rem" : "1.5rem",
              lineHeight: 1.1,
              color: "var(--ink)",
              margin: "0 0 8px",
            }}>
              {spectacle.titre}
            </h3>
            <p style={{
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--ink-soft)",
              margin: "0 0 4px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              {primaryRepr.date} · {primaryRepr.heure}
              {nbDatesSupp > 0 && (
                <span style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  background: "var(--brick)",
                  color: "var(--white)",
                  padding: "1px 7px",
                  borderRadius: 999,
                  letterSpacing: "0.02em",
                }}>
                  +{nbDatesSupp}
                </span>
              )}
            </p>
            <p style={{
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
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
