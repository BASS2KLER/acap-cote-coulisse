"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
  fullWidth?: boolean;
}

export default function Section({ children, className = "", id, tight, fullWidth }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      style={{
        maxWidth: fullWidth ? undefined : 1280,
        margin: fullWidth ? undefined : "0 auto",
        padding: tight ? "32px 48px" : "64px 48px",
      }}
    >
      {children}
    </motion.section>
  );
}

interface SectionTitreProps {
  titre: string;
  sous?: string;
  centré?: boolean;
  kicker?: string;
  accentColor?: string;
}

export function SectionTitre({ titre, sous, centré, kicker, accentColor }: SectionTitreProps) {
  return (
    <div style={{ marginBottom: 40, textAlign: centré ? "center" : undefined }}>
      {kicker && (
        <span className="kicker" style={{
          marginBottom: 8,
          display: "block",
          color: accentColor ?? "var(--rose-deep)",
        }}>
          {kicker}
        </span>
      )}
      <h2 style={{
        fontFamily: "var(--font-fraunces, Fraunces, serif)",
        fontWeight: 500,
        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        margin: "0 0 10px",
      }}>
        {titre}
      </h2>
      {sous && (
        <p style={{
          fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
          fontSize: "1.0625rem",
          lineHeight: 1.6,
          color: "var(--ink-soft)",
          margin: 0,
        }}>
          {sous}
        </p>
      )}
    </div>
  );
}
