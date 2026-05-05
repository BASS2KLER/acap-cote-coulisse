"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SpectacleCard from "@/components/spectacles/SpectacleCard";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";

export default function SpectaclesSection() {
  const raw = useQuery(api.spectacles.list);
  const prochains = (raw ?? []).slice(0, 3).map((s) => ({
    ...s,
    id: s._id,
    image: s.imageUrl ?? "",
    galerie: (s.galerieUrls ?? []).filter((u): u is string => u !== null),
    genres: s.genres as GenreSpectacle[],
    tone: s.tone as ToneCouleur,
  }));

  return (
    <section id="saison" style={{
      background: "var(--paper-warm)",
      padding: "64px 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* En-tête */}
        <header style={{ maxWidth: 600, marginBottom: 40 }}>
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Programme</span>
          <h2 style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 500,
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: "0 0 12px",
          }}>
            La saison, mois par mois
          </h2>
          <p style={{
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            margin: 0,
          }}>
            Des spectacles pour rire, frémir, et se retrouver à Saint-Prix.
          </p>
        </header>

        {/* Grille 3 colonnes */}
        {raw === undefined ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 340,
                borderRadius: 6,
                background: "var(--paper-deep)",
                animation: "pulse 2s infinite",
                border: "1px solid var(--ink-line)",
              }} />
            ))}
          </div>
        ) : prochains.length === 0 ? (
          <p style={{ fontFamily: "var(--font-worksans)", color: "var(--ink-muted)", fontStyle: "italic" }}>
            La saison se prépare — revenez bientôt.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {prochains.map((spectacle, i) => (
              <motion.div
                key={spectacle.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <SpectacleCard spectacle={spectacle} compact />
              </motion.div>
            ))}
          </div>
        )}

        {/* Lien voir tout */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link
            href="/spectacles"
            className="btn-acap btn-acap--secondary"
            style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "transparent" }}
          >
            Voir tous les spectacles →
          </Link>
        </div>
      </div>
    </section>
  );
}
