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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-page mx-auto px-6 -mt-4 mb-8"
    >
      <div className="bg-soleil-100 border-[3px] border-encre rounded-xl shadow-soleil grid grid-cols-2 md:grid-cols-4 gap-0 divide-x-2 divide-encre overflow-hidden">
        {INFOS.map((info) => (
          <div key={info.titre} className="px-5 py-5 text-center">
            <div className="text-4xl mb-2" aria-hidden="true">{info.emoji}</div>
            <div
              className="font-display font-bold text-lg mb-1"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              {info.titre}
            </div>
            <p className="text-sm text-encre-douce leading-snug whitespace-pre-line">
              {info.texte}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
