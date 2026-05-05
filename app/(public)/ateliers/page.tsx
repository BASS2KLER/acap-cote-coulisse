"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section, { SectionTitre } from "@/components/ui/Section";

const BIENFAITS = [
  { emoji: "💪", titre: "Confiance en soi", desc: "Apprendre à s'affirmer, à oser, à occuper l'espace." },
  { emoji: "🎙", titre: "Prise de parole", desc: "Parler en public avec aisance et naturel." },
  { emoji: "🎵", titre: "La voix", desc: "Travailler la respiration, le souffle, la projection et l'articulation." },
  { emoji: "🧠", titre: "Mémoire & créativité", desc: "Exercices de mémorisation, improvisation, imagination." },
  { emoji: "🤝", titre: "Travail en groupe", desc: "Écoute, présence, jeu collectif et complicité." },
  { emoji: "😌", titre: "Bien-être", desc: "Lâcher prise, se déconnecter, jouer — comme quand on était enfant." },
];

const ATELIERS = [
  { jour: "Lundi", horaire: "20h30 – 22h30", label: "Adultes", tone: "tomate", emoji: "🎭" },
  { jour: "Mardi", horaire: "18h – 19h30", label: "Primaires / collège", tone: "soleil", emoji: "🌟" },
  { jour: "Mardi", horaire: "20h15 – 22h45", label: "Classique avancés", tone: "aubergine", emoji: "📜" },
  { jour: "Mercredi", horaire: "16h45 – 17h30", label: "Découverte enfants", tone: "pomme", emoji: "🌱" },
  { jour: "Mercredi", horaire: "18h – 20h", label: "Atelier oral", tone: "ciel", emoji: "🗣" },
  { jour: "Mercredi", horaire: "20h30 – 22h30", label: "Adultes", tone: "rose", emoji: "🎭" },
  { jour: "Sur demande", horaire: "À convenir", label: "Coaching individuel", tone: "tomate", emoji: "🎯" },
];

const TONE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  tomate:   { bg: "bg-tomate-100",   border: "border-tomate-400",   text: "text-tomate-700" },
  soleil:   { bg: "bg-soleil-100",   border: "border-soleil-400",   text: "text-soleil-700" },
  aubergine:{ bg: "bg-aubergine-100",border: "border-aubergine-400",text: "text-aubergine-700" },
  pomme:    { bg: "bg-pomme-100",    border: "border-pomme-400",    text: "text-pomme-700" },
  ciel:     { bg: "bg-ciel-100",     border: "border-ciel-400",     text: "text-ciel-700" },
  rose:     { bg: "bg-rose-100",     border: "border-rose-400",     text: "text-rose-700" },
};

export default function AteliersPage() {
  return (
    <>
      {/* En-tête */}
      <div className="bg-tomate-100 border-b-2 border-encre py-12 md:py-16">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-tomate-200 text-tomate-700 inline-flex mb-4">🎭 Ateliers</span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Les ateliers de théâtre
          </h1>
          <p className="text-lg text-encre-douce max-w-prose">
            Pour adultes et enfants, tous niveaux. Venez essayer — la première séance est offerte.
          </p>
        </div>
      </div>

      {/* Ce que vous allez travailler */}
      <Section>
        <SectionTitre
          titre="Ce que vous allez développer"
          sous="Le théâtre, c'est bien plus que jouer la comédie"
          centré
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {BIENFAITS.map((b, i) => (
            <motion.div
              key={b.titre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card"
            >
              <div className="text-3xl mb-3">{b.emoji}</div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                {b.titre}
              </h3>
              <p className="text-sm text-encre-douce leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Programme */}
      <Section className="bg-creme-pale rounded-2xl">
        <SectionTitre
          titre="Le programme 2025–2026"
          sous="Choisissez l'atelier qui vous correspond"
          centré
        />
        <div className="flex flex-col gap-4">
          {ATELIERS.map((a, i) => {
            const c = TONE_COLORS[a.tone];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-5 ${c.bg} border-2 ${c.border} rounded-xl p-5`}
              >
                <div className="text-3xl w-10 text-center flex-shrink-0">{a.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-display font-black text-xl ${c.text}`}
                    style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                  >
                    {a.label}
                  </div>
                  <div className="text-sm text-encre-douce mt-0.5">
                    <strong>{a.jour}</strong> · {a.horaire}
                  </div>
                </div>
                <Link
                  href="/contact#essai"
                  className={`hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-encre rounded-lg bg-creme hover:bg-creme-deep transition-colors no-underline text-encre flex-shrink-0`}
                >
                  Essayer →
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-soleil-100 border-2 border-encre rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">✨</div>
          <p className="font-bold text-lg text-encre mb-1">Première séance offerte</p>
          <p className="text-base text-encre-douce mb-4">
            Venez essayer un atelier sans engagement ni frais. Contactez-nous pour choisir votre créneau.
          </p>
          <Link href="/contact#essai" className="btn-acap inline-flex">
            Réserver ma séance d'essai →
          </Link>
        </div>
      </Section>

      {/* Tarifs */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitre titre="Tarifs 2025–2026" sous="Par trimestre, hors adhésion" />
            <div className="bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-encre text-creme-pale">
                    <th className="text-left px-5 py-3 font-body font-bold">Durée du cours</th>
                    <th className="text-right px-5 py-3 font-body font-bold">Tarif / trimestre</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { duree: "45 minutes", tarif: "60 €" },
                    { duree: "1h30", tarif: "117 €" },
                    { duree: "2h", tarif: "132 €" },
                    { duree: "2h30", tarif: "165 €" },
                  ].map(({ duree, tarif }, i) => (
                    <tr key={duree} className={i % 2 === 0 ? "bg-creme" : "bg-creme-pale"}>
                      <td className="px-5 py-3 text-encre">{duree}</td>
                      <td className="px-5 py-3 text-right font-bold text-encre">{tarif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-encre-douce mt-3">
              Paiement en 1 ou 3 fois par chèque. Possibilité de financement par le CE ou les aides CAF.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-tomate-100 border-2 border-encre rounded-xl p-6 shadow-tomate">
              <h3
                className="font-display font-bold text-xl text-encre mb-3"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Adhésion annuelle
              </h3>
              <div className="flex justify-between items-center text-base">
                <span className="text-encre">Cotisation association</span>
                <span className="font-black text-2xl text-tomate-700">70 €</span>
              </div>
              <p className="text-sm text-encre-douce mt-2">
                Valable pour l'année scolaire complète (octobre → juin).
              </p>
            </div>

            <div className="bg-ciel-100 border-2 border-encre rounded-xl p-6">
              <h3
                className="font-display font-bold text-xl text-encre mb-3"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Caution costumes
              </h3>
              <div className="flex justify-between items-center text-base">
                <span className="text-encre">Remboursée en fin de saison</span>
                <span className="font-black text-2xl text-ciel-700">50 €</span>
              </div>
            </div>

            <div className="bg-pomme-100 border-2 border-encre rounded-xl p-6">
              <h3
                className="font-display font-bold text-lg text-encre mb-2"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                🎁 Attestation CE disponible
              </h3>
              <p className="text-sm text-encre-douce">
                Nous fournissons une attestation pour votre comité d'entreprise.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA inscription */}
      <div className="bg-encre py-16">
        <div className="max-w-page mx-auto px-6 text-center">
          <h2
            className="font-display font-black text-3xl md:text-4xl text-creme-pale mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Prêt·e à monter sur scène ?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#d4c8b3" }}>
            Commencez par une séance d'essai gratuite. Aucun engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#essai" className="btn-acap text-lg py-4 px-8">
              Réserver une séance d'essai →
            </Link>
            <Link href="/contact#inscription" className="btn-acap bg-creme-pale text-encre text-lg py-4 px-8">
              Formulaire d'inscription
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
