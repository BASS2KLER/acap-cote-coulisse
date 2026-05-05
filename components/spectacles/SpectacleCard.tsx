"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Chip from "@/components/ui/Chip";
import type { Spectacle } from "@/lib/types";
import { getToneClasses, isComplet, getPlacesLabel } from "@/lib/utils";

interface SpectacleCardProps {
  spectacle: Spectacle;
  compact?: boolean;
}

// Découpe la date pour l'afficher en gros
function parseDateParts(date: string) {
  const parts = date.split(" ");
  return {
    jour:   parts[0] || "",   // "Sam."
    numero: parts[1] || "",   // "14"
    mois:   parts[2] || "",   // "mars"
  };
}

export default function SpectacleCard({ spectacle, compact }: SpectacleCardProps) {
  const tone = getToneClasses(spectacle.tone);
  const complet = isComplet(spectacle.places);
  const dateParts = parseDateParts(spectacle.date);

  return (
    <motion.article
      whileHover={{ x: -3, y: -3, rotate: -0.4 }}
      whileTap={{ x: 1, y: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`
        relative bg-creme-pale border-[2.5px] border-encre rounded-xl
        ${tone.shadow}
        ${compact ? "p-5" : "p-6 md:p-7"}
        grid gap-5
        ${compact ? "" : "md:grid-cols-[auto_1fr_auto]"}
        items-center cursor-pointer
      `}
    >
      <Link
        href={`/spectacles/${spectacle.slug}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-soleil-500"
        aria-label={`Voir le spectacle : ${spectacle.titre}`}
      />

      {/* Bloc date */}
      {!compact && (
        <div
          className={`hidden md:flex flex-col items-center justify-center rounded-lg border-[2px] border-encre px-6 py-4 min-w-[130px] text-center ${tone.bgLight}`}
        >
          <span
            className="font-body font-bold text-xs uppercase tracking-widest mb-1"
            style={{ color: `var(--${spectacle.tone}-700)` }}
          >
            {dateParts.jour}
          </span>
          <span
            className="font-display font-black leading-none"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              color: `var(--${spectacle.tone}-700)`,
            }}
          >
            {dateParts.numero}
          </span>
          <span
            className="font-display font-bold text-xl"
            style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              color: `var(--${spectacle.tone}-700)`,
            }}
          >
            {dateParts.mois}
          </span>
          <span className="font-body font-bold text-base text-encre mt-1">
            {spectacle.heure}
          </span>
        </div>
      )}

      {/* Contenu principal */}
      <div className="min-w-0">
        {/* Chips genres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {spectacle.genres.map((g) => (
            <Chip key={g} label={g} genre={g} />
          ))}
          {complet && (
            <span className="chip-acap bg-encre text-creme-pale">Complet</span>
          )}
        </div>

        {/* Titre */}
        <h3
          className="font-display font-black leading-tight mb-1"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            color: `var(--${spectacle.tone}-700)`,
          }}
        >
          {spectacle.titre}
        </h3>

        {/* Auteur */}
        <p
          className="text-base md:text-lg italic text-encre-douce mb-3"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
        >
          {spectacle.auteur}
        </p>

        {/* Date mobile */}
        {compact && (
          <p className="font-body font-bold text-base text-encre mb-2">
            {spectacle.date} à {spectacle.heure}
          </p>
        )}

        {/* Infos pratiques */}
        <div className="flex flex-wrap gap-4 font-body text-sm text-encre">
          <span>📍 {spectacle.lieu}</span>
          <span>⏱ {spectacle.duree}</span>
          <span>
            🎟 <strong>{spectacle.prix}</strong>
          </span>
          {spectacle.pmr && <span>♿ PMR</span>}
        </div>

        {/* Places restantes */}
        {!complet && spectacle.places <= 15 && (
          <p className="mt-3 text-sm font-bold text-tomate-600">
            ⚠️ {getPlacesLabel(spectacle.places)}
          </p>
        )}
      </div>

      {/* Emoji décoratif */}
      {!compact && (
        <div
          className="hidden md:block text-7xl opacity-25 select-none"
          aria-hidden="true"
        >
          {spectacle.emoji}
        </div>
      )}
    </motion.article>
  );
}
