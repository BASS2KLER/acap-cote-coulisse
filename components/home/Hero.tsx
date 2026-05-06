"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "48px 48px 80px",
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 56,
      alignItems: "center",
    }}>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="kicker"
          style={{ color: "var(--rose-deep)", marginBottom: 16, display: "block" }}
        >
          Saison 2025 — 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 600,
            fontSize: "clamp(3rem, 6vw, 5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: "0 0 24px",
          }}
        >
          Prendre confiance,{" "}
          <em className="show-name" style={{ color: "var(--rose-deep)" }}>
            trouver sa voix.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          style={{
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            maxWidth: "46ch",
            margin: "0 0 28px",
          }}
        >
          L'ACAP propose des ateliers de théâtre pour adultes et enfants
          à Saint-Prix depuis 2003. Tous niveaux bienvenus — la première
          séance est offerte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
        >
          <Link href="/ateliers" className="btn-acap">
            Voir les ateliers →
          </Link>
          <Link href="/contact" className="btn-acap--ghost btn-acap">
            Séance d'essai gratuite
          </Link>
        </motion.div>

        {/* Infos rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 32,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 20px",
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "0.8125rem",
            color: "var(--ink-muted)",
          }}
        >
          <span>📍 Le Jardin d'Hélène, Saint-Prix</span>
          <span>·</span>
          <span>📅 Octobre → juin</span>
          <span>·</span>
          <span>✨ 1re séance offerte</span>
        </motion.div>
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.22, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
          {/* Fond décalé */}
          <motion.div
            animate={{ rotate: ["-1.2deg", "-0.5deg", "-1.8deg", "-0.8deg"] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--rose-wash)",
              borderRadius: 6,
              boxShadow: "8px 8px 0 var(--paper-deep)",
            }}
          />
          {/* Image mascotte */}
          <div style={{ position: "relative", zIndex: 1, padding: "24px 20px 0", display: "flex", alignItems: "flex-end" }}>
            <Image
              src="/moliere-acap.png"
              alt="Personnage de theatre ACAP"
              width={300}
              height={490}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
          {/* Tampon */}
          <span className="stamp" style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 2,
            transform: "rotate(8deg)",
          }}>
            saison 2026
          </span>
        </div>
      </motion.div>
    </section>
  );
}