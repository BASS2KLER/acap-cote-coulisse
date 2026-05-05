"use client";

import { motion } from "framer-motion";

const INFOS = [
  { emoji: "🎭", titre: "Ateliers", texte: "Adultes & enfants\nTous niveaux bienvenus" },
  { emoji: "📍", titre: "Le Jardin d'Hélène", texte: "6 rue Auguste Rey\nSaint-Prix (95)" },
  { emoji: "📅", titre: "Saison", texte: "Octobre → juin\nLun, Mar, Mercredi" },
  { emoji: "✨", titre: "1re séance offerte", texte: "Venez essayer\nsans engagement" },
];

export default function InfoBandeauSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{ maxWidth: 1280, margin: "0 auto 64px", padding: "0 48px" }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        background: "var(--paper-warm)",
        border: "1px solid var(--ink-line)",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)",
      }}>
        {INFOS.map((info, i) => (
          <div
            key={info.titre}
            style={{
              padding: "24px 20px",
              textAlign: "center",
              borderRight: i < INFOS.length - 1 ? "1px solid var(--ink-line)" : undefined,
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: 8 }} aria-hidden="true">
              {info.emoji}
            </div>
            <div style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "var(--ink)",
              marginBottom: 4,
              lineHeight: 1.2,
            }}>
              {info.titre}
            </div>
            <p style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--ink-muted)",
              lineHeight: 1.55,
              whiteSpace: "pre-line",
              margin: 0,
            }}>
              {info.texte}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
