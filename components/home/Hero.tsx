"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function MoliereSilhouette() {
  return (
    <svg
      viewBox="0 0 340 720"
      fill="var(--brick)"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "100%", width: "auto", filter: "drop-shadow(0 8px 24px rgba(196,89,58,0.2))" }}
      aria-label="Molière — personnage de théâtre"
    >
      {/* Canne */}
      <rect x="95" y="380" width="12" height="340" rx="6" fill="var(--brick-dark)"/>
      <circle cx="101" cy="374" r="14" fill="var(--brick-dark)"/>
      {/* Chapeau */}
      <ellipse cx="180" cy="125" rx="110" ry="22"/>
      <rect x="148" y="68" width="64" height="62" rx="8"/>
      {/* Plume */}
      <path d="M212 68 C240 20 300 10 310 40 C290 38 260 48 230 75 Z" fill="var(--brick-dark)"/>
      {/* Tête */}
      <ellipse cx="180" cy="170" rx="42" ry="50"/>
      <ellipse cx="180" cy="170" rx="34" ry="42" fill="white" opacity="0.12"/>
      {/* Yeux */}
      <ellipse cx="165" cy="162" rx="5" ry="6" fill="white"/>
      <ellipse cx="195" cy="162" rx="5" ry="6" fill="white"/>
      {/* Sourire */}
      <path d="M168 188 Q180 200 192 188" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Fraise (col en zigzag) */}
      <path d="M130 215 L150 190 L170 220 L180 185 L190 220 L210 190 L230 215 Z" fill="var(--sand)"/>
      <path d="M140 240 L158 212 L176 242 L180 205 L184 242 L202 212 L220 240 Z"/>
      {/* Cape */}
      <path d="M180 255 C240 270 290 350 300 460 C310 560 290 660 260 720 L180 720 C210 620 230 510 210 410 Z"/>
      <path d="M180 255 C130 275 110 360 115 460 C120 555 130 640 120 720 L180 720 C165 620 155 510 170 410 Z"/>
      {/* Jambes */}
      <rect x="142" y="580" width="30" height="140" rx="10"/>
      <rect x="195" y="580" width="30" height="140" rx="10"/>
      {/* Souliers */}
      <ellipse cx="157" cy="718" rx="24" ry="10" fill="var(--brick-dark)"/>
      <ellipse cx="210" cy="718" rx="24" ry="10" fill="var(--brick-dark)"/>
      {/* Perruque bouclée */}
      <circle cx="138" cy="148" r="20"/>
      <circle cx="125" cy="178" r="22"/>
      <circle cx="130" cy="212" r="18"/>
      <circle cx="222" cy="148" r="20"/>
      <circle cx="235" cy="178" r="22"/>
      <circle cx="230" cy="212" r="18"/>
      <circle cx="165" cy="118" r="18"/>
      <circle cx="195" cy="118" r="18"/>
      <circle cx="180" cy="108" r="20"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "48px 48px 80px",
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 64,
      alignItems: "center",
      minHeight: "calc(100dvh - 72px)",
    }}>

      {/* Colonne gauche : texte */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: 0 }}
      >
        {/* Kicker */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="kicker"
          style={{ marginBottom: 20 }}
        >
          Saison 2025 — 2026
        </motion.span>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          style={{
            fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
            fontWeight: 400,
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 24px",
          }}
        >
          Jouer,{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ position: "relative", zIndex: 1 }}>ressentir,</span>
            <span style={{
              position: "absolute",
              bottom: 4,
              left: 0,
              right: 0,
              height: "32%",
              background: "var(--sand)",
              opacity: 0.7,
              borderRadius: 4,
              transform: "rotate(-0.8deg)",
              zIndex: 0,
            }}/>
          </span>
          {" "}partager.
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          style={{
            fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
            fontSize: "1.125rem",
            fontWeight: 500,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            maxWidth: "44ch",
            margin: "0 0 32px",
          }}
        >
          L'ACAP propose des ateliers de théâtre pour adultes et enfants
          à Saint-Prix depuis 2003. Tous niveaux bienvenus —
          la première séance est offerte.
        </motion.p>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 40 }}
        >
          <Link href="/ateliers" className="btn-acap">
            Voir les ateliers →
          </Link>
          <Link href="/contact" className="btn-acap btn-acap--ghost">
            Séance d'essai gratuite
          </Link>
        </motion.div>

        {/* Infos rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 24px",
            paddingTop: 24,
            borderTop: "1px solid var(--ink-line)",
          }}
        >
          {[
            { icon: "📍", label: "Le Jardin d'Hélène, Saint-Prix" },
            { icon: "📅", label: "Octobre → Juin" },
            { icon: "🎭", label: "1re séance offerte" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", flexShrink: 0,
              }}>{icon}</span>
              <span style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--ink-soft)",
              }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Colonne droite : illustration Molière */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.22, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end", height: 560 }}
      >
        {/* Arche crème */}
        <div style={{
          position: "absolute",
          bottom: 0,
          width: "82%",
          maxWidth: 400,
          height: "90%",
          background: "var(--cream)",
          borderRadius: "200px 200px 0 0",
          border: "1px solid var(--sand)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}/>
        </div>

        {/* Étoile décorative */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "20%", right: 12,
            width: 52, height: 52, borderRadius: "50%",
            background: "white",
            border: "1px solid var(--sand)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.4rem",
          }}
        >
          ✦
        </motion.div>

        {/* Molière */}
        <div style={{ position: "relative", zIndex: 1, height: "92%", display: "flex", alignItems: "flex-end" }}>
          <MoliereSilhouette />
        </div>

        {/* Badge */}
        <div style={{
          position: "absolute", bottom: 16, right: 8, zIndex: 2,
          background: "white", borderRadius: 16,
          padding: "6px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid var(--sand)",
          fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
          color: "var(--brick)",
          fontSize: "0.9rem",
        }}>
          Saison 2026 ✦
        </div>
      </motion.div>
    </section>
  );
}
