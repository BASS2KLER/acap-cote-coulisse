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
      background: "var(--cream)",
      padding: "80px 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* En-tête */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: 600, marginBottom: 48 }}
        >
          <span className="kicker" style={{ marginBottom: 12, display: "block" }}>Programme</span>
          <h2 style={{
            fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 14px",
          }}>
            La saison, mois par mois
          </h2>
          <p style={{
            fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
            fontSize: "1.0625rem",
            fontWeight: 500,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            margin: 0,
          }}>
            Des spectacles pour rire, frémir, et se retrouver à Saint-Prix.
          </p>
        </motion.header>

        {/* Grille */}
        {raw === undefined ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 340,
                borderRadius: 16,
                background: "var(--cream-deep)",
                border: "1px solid var(--sand)",
              }} />
            ))}
          </div>
        ) : prochains.length === 0 ? (
          <p style={{
            fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
            color: "var(--ink-muted)",
            fontStyle: "italic",
          }}>
            La saison se prépare — revenez bientôt.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {prochains.map((spectacle, i) => (
              <motion.div
                key={spectacle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <SpectacleCard spectacle={spectacle} compact />
              </motion.div>
            ))}
          </div>
        )}

        {/* Lien voir tout */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/spectacles" className="btn-acap btn-acap--ghost">
            Voir tous les spectacles →
          </Link>
        </div>
      </div>
    </section>
  );
}
