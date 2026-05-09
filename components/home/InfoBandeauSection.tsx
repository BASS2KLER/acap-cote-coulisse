"use client";

import { motion } from "framer-motion";

const INFOS = [
  { icon: "🎭", titre: "Ateliers", texte: "Adultes & enfants\nTous niveaux bienvenus" },
  { icon: "📍", titre: "Le Jardin d'Hélène", texte: "6 rue Auguste Rey\nSaint-Prix (95)" },
  { icon: "📅", titre: "Saison", texte: "Octobre → juin\nLun, Mar, Mercredi" },
  { icon: "✨", titre: "1re séance offerte", texte: "Venez essayer\nsans engagement" },
];

export default function InfoBandeauSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{
        background: "var(--brick)",
        boxShadow: "0 4px 24px rgba(196,89,58,0.2)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          {INFOS.map((info, i) => (
            <div
              key={info.titre}
              style={{
                padding: "28px 20px",
                textAlign: "center",
                borderRight: i < INFOS.length - 1 ? "1px solid rgba(255,255,255,0.2)" : undefined,
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }} aria-hidden="true">
                {info.icon}
              </div>
              <div style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "var(--white)",
                marginBottom: 4,
                lineHeight: 1.2,
              }}>
                {info.titre}
              </div>
              <p style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(250,247,242,0.8)",
                lineHeight: 1.55,
                whiteSpace: "pre-line",
                margin: 0,
              }}>
                {info.texte}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
