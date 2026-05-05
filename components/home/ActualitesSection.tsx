"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { ToneCouleur } from "@/lib/types";
import { getToneVars } from "@/lib/utils";

export default function ActualitesSection() {
  const raw = useQuery(api.actualites.list);
  const actualites = raw ?? [];

  if (actualites.length === 0) return null;

  return (
    <section style={{
      background: "var(--moutarde-wash)",
      padding: "64px 0",
      position: "relative",
    }}>
      {/* Bordure tiretée interne */}
      <div style={{
        position: "absolute",
        inset: 8,
        border: "1px dashed var(--moutarde-deep)",
        borderRadius: 4,
        pointerEvents: "none",
        opacity: 0.35,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", position: "relative" }}>

        {/* En-tête */}
        <header style={{ marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
          <div>
            <span className="kicker" style={{ color: "var(--moutarde-deep)", marginBottom: 8, display: "block" }}>
              Actualités
            </span>
            <h2 style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: 0,
            }}>
              <em className="show-name">Nouvelles</em> de la troupe
            </h2>
          </div>
        </header>

        {/* Grille */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {actualites.map((actu, i) => {
            const { accentDeep, accentWash } = getToneVars(actu.tone as ToneCouleur);
            return (
              <motion.article
                key={actu._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "#FBF7EC",
                  border: "1px solid var(--ink-line)",
                  borderRadius: 6,
                  padding: "20px",
                  boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 6px 14px -8px rgba(42,39,34,0.12)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: accentDeep,
                    background: accentWash,
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}>
                    {actu.tag}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                    fontSize: "0.75rem",
                    color: "var(--ink-muted)",
                  }}>
                    {actu.date}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-fraunces, Fraunces, serif)",
                  fontWeight: 500,
                  fontSize: "1.1875rem",
                  lineHeight: 1.25,
                  color: "var(--ink)",
                  margin: "0 0 10px",
                }}>
                  {actu.titre}
                </h3>
                <p style={{
                  fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                  margin: 0,
                  flex: 1,
                }}>
                  {actu.contenu}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
