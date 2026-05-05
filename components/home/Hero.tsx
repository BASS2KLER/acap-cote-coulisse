"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Molière SVG intégré (simplifié, inspiré du design system)
function MoliereSVG() {
  return (
    <svg
      viewBox="0 0 200 320"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        .m-ink   { fill: #2a2118; }
        .m-tone  { fill: #d8553e; }
        .m-deep  { fill: #8e2f20; }
        .m-skin  { fill: #f3d6b5; }
        .m-cream { fill: #fbf6ec; }
        .m-stroke { fill: none; stroke: #2a2118; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
      `}</style>
      {/* Cheveux perruque */}
      <g className="m-ink">
        <circle cx="78" cy="92" r="10"/><circle cx="74" cy="104" r="9"/>
        <circle cx="76" cy="118" r="8"/><circle cx="122" cy="92" r="10"/>
        <circle cx="126" cy="104" r="9"/><circle cx="124" cy="118" r="8"/>
        <circle cx="84" cy="80" r="9"/><circle cx="116" cy="80" r="9"/>
      </g>
      {/* Visage */}
      <ellipse cx="100" cy="100" rx="22" ry="24" className="m-skin"/>
      <ellipse cx="100" cy="100" rx="22" ry="24" className="m-stroke"/>
      <ellipse cx="86" cy="106" rx="4" ry="3" fill="#ecadb7" opacity="0.7"/>
      <ellipse cx="114" cy="106" rx="4" ry="3" fill="#ecadb7" opacity="0.7"/>
      <path className="m-stroke" d="M89 96 q3 -3 6 0" strokeWidth="2.6"/>
      <path className="m-stroke" d="M105 96 q3 -3 6 0" strokeWidth="2.6"/>
      <path className="m-stroke" d="M92 110 q8 6 16 0" strokeWidth="2.4"/>
      {/* Chapeau */}
      <ellipse cx="100" cy="74" rx="40" ry="8" className="m-ink"/>
      <path className="m-tone" d="M70 70 q-12 -22 -8 -40 q10 6 18 22 q4 12 0 20 z"/>
      <path className="m-stroke" d="M70 70 q-12 -22 -8 -40 q10 6 18 22 q4 12 0 20 z"/>
      <path className="m-ink" d="M100 64 q-2 -28 6 -46 q12 8 14 28 q2 14 -4 22 z"/>
      <path className="m-tone" d="M130 70 q12 -22 8 -40 q-10 6 -18 22 q-4 12 0 20 z"/>
      <path className="m-stroke" d="M130 70 q12 -22 8 -40 q-10 6 -18 22 q-4 12 0 20 z"/>
      <path className="m-cream" d="M100 60 q-1 -18 4 -32 q8 6 9 22 q1 10 -3 16 z"/>
      <path className="m-stroke" d="M100 60 q-1 -18 4 -32 q8 6 9 22 q1 10 -3 16 z"/>
      <rect x="72" y="72" width="56" height="4" className="m-cream"/>
      {/* Corps / pourpoint */}
      <path className="m-cream" d="M82 130 q18 6 36 0 q-2 16 -8 22 q-10 4 -20 0 q-6 -6 -8 -22 z"/>
      <path className="m-stroke" d="M82 130 q18 6 36 0 q-2 16 -8 22 q-10 4 -20 0 q-6 -6 -8 -22 z"/>
      <path className="m-tone" d="M68 150 q-8 24 -6 56 q34 6 76 0 q2 -32 -6 -56 q-32 -6 -64 0 z"/>
      <path className="m-stroke" d="M68 150 q-8 24 -6 56 q34 6 76 0 q2 -32 -6 -56 q-32 -6 -64 0 z"/>
      <circle cx="100" cy="160" r="2.5" className="m-cream"/>
      <circle cx="100" cy="172" r="2.5" className="m-cream"/>
      <circle cx="100" cy="184" r="2.5" className="m-cream"/>
      {/* Bras gauche */}
      <path className="m-tone" d="M64 156 q-12 24 -10 50 q4 4 12 2 q4 -22 8 -42 z"/>
      <path className="m-stroke" d="M64 156 q-12 24 -10 50 q4 4 12 2 q4 -22 8 -42 z"/>
      <ellipse cx="60" cy="218" rx="6" ry="7" className="m-skin"/>
      <ellipse cx="60" cy="218" rx="6" ry="7" className="m-stroke"/>
      {/* Bras droit avec canne */}
      <path className="m-tone" d="M136 156 q12 24 10 50 q-4 4 -12 2 q-4 -22 -8 -42 z"/>
      <path className="m-stroke" d="M136 156 q12 24 10 50 q-4 4 -12 2 q-4 -22 -8 -42 z"/>
      <ellipse cx="140" cy="218" rx="6" ry="7" className="m-skin"/>
      <ellipse cx="140" cy="218" rx="6" ry="7" className="m-stroke"/>
      <line x1="148" y1="216" x2="158" y2="290" className="m-stroke" strokeWidth="3"/>
      <circle cx="147" cy="214" r="3" className="m-ink"/>
      {/* Jupon */}
      <path className="m-cream" d="M62 200 q-4 30 0 56 q38 8 76 0 q4 -26 0 -56 z"/>
      <path className="m-stroke" d="M62 200 q-4 30 0 56 q38 8 76 0 q4 -26 0 -56 z"/>
      {/* Jambes */}
      <path className="m-cream" d="M82 248 q-3 28 -2 50 l16 1 q1 -25 4 -50 z"/>
      <path className="m-cream" d="M118 248 q3 28 2 50 l-16 1 q-1 -25 -4 -50 z"/>
      <path className="m-stroke" d="M82 248 q-3 28 -2 50 l16 1 q1 -25 4 -50 z"/>
      <path className="m-stroke" d="M118 248 q3 28 2 50 l-16 1 q-1 -25 -4 -50 z"/>
      <path className="m-ink" d="M74 296 q-2 6 1 9 l28 1 q3 -1 3 -5 l-1 -5 z"/>
      <path className="m-ink" d="M126 296 q2 6 -1 9 l-28 1 q-3 -1 -3 -5 l1 -5 z"/>
    </svg>
  );
}

// Étoile décorative SVG
function Etoile({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4 l5 14 l15 1 l-12 9 l4 14 l-12 -8 l-12 8 l4 -14 l-12 -9 l15 -1 z"
        fill="#f3c13a"
        stroke="#2a2118"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-creme overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-page mx-auto px-6 grid md:grid-cols-[1.35fr_1fr] gap-10 items-center">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="chip-acap bg-soleil-200 text-soleil-ink mb-5 inline-flex"
          >
            ★ Saison 2025–2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display font-black text-encre mb-5"
            style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Bienvenue chez nous,{" "}
            <span className="text-tomate-600">au théâtre.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="text-lg md:text-xl text-encre-douce mb-8 max-w-prose leading-relaxed"
          >
            On vous a préparé quatre spectacles cette année&nbsp;: deux comédies,
            un drame et une création originale. On a hâte de vous y voir&nbsp;!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/spectacles" className="btn-acap">
              Voir la saison →
            </Link>
            <Link
              href="/pratique"
              className="btn-acap bg-transparent text-encre"
            >
              Infos pratiques
            </Link>
          </motion.div>

          {/* Infos rapides */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-4 text-sm text-encre-douce font-body"
          >
            <span>📍 Salle des fêtes de Saint-Prix</span>
            <span>🎟 À partir de 6 €</span>
            <span>♿ Accès PMR</span>
          </motion.div>
        </motion.div>

        {/* Molière illustré */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, duration: 0.6, type: "spring", stiffness: 120 }}
          className="flex justify-center items-end"
        >
          <div className="relative w-full max-w-[280px] md:max-w-[320px]">
            {/* Fond coloré sous Molière */}
            <motion.div
              animate={{ rotate: ["-2deg", "-1deg", "-2.5deg", "-1.5deg"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-0 bg-soleil-200 border-[3px] border-encre rounded-xl"
              style={{ boxShadow: "8px 8px 0 #f4afa1" }}
            />
            <div className="relative z-10 pt-4 px-2">
              <MoliereSVG />
            </div>
            {/* Étoiles décoratives */}
            <Etoile
              size={42}
              className="absolute -top-4 -right-4 z-20 drop-shadow-sm"
            />
            <Etoile
              size={28}
              className="absolute bottom-8 -left-5 z-20 drop-shadow-sm opacity-70"
            />
          </div>
        </motion.div>
      </div>

      {/* Vague de séparation */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" height="40">
          <path d="M0 20 Q360 40 720 20 Q1080 0 1440 20 L1440 40 L0 40 Z" fill="#fefaf2"/>
        </svg>
      </div>
    </section>
  );
}
