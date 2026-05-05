"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}

export default function Section({ children, className = "", id, tight }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`
        max-w-page mx-auto px-6
        ${tight ? "py-10 md:py-14" : "py-14 md:py-24"}
        ${className}
      `}
    >
      {children}
    </motion.section>
  );
}

interface SectionTitreProps {
  titre: string;
  sous?: string;
  centré?: boolean;
}

export function SectionTitre({ titre, sous, centré }: SectionTitreProps) {
  return (
    <div className={`mb-10 ${centré ? "text-center" : ""}`}>
      <h2
        className="font-display font-bold text-3xl md:text-4xl text-encre mb-2"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
      >
        {titre}
      </h2>
      {sous && (
        <p
          className="text-lg md:text-xl italic text-encre-douce"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
        >
          {sous}
        </p>
      )}
    </div>
  );
}
