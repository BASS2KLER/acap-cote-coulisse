"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section, { SectionTitre } from "@/components/ui/Section";

const VALEURS = [
  { emoji: "🎭", titre: "Le jeu avant tout", desc: "On apprend en jouant. Pas de jugement, juste l'envie de s'amuser et de progresser ensemble." },
  { emoji: "🌱", titre: "Tous niveaux", desc: "Débutants complets ou comédiens aguerris — il y a un atelier pour vous." },
  { emoji: "🤝", titre: "Bienveillance", desc: "Un cadre sécurisé où chacun peut prendre des risques, se tromper et grandir." },
  { emoji: "🏆", titre: "Un vrai spectacle", desc: "Chaque saison, la troupe monte sur scène pour présenter son travail au public." },
];

export default function AcapPage() {
  return (
    <>
      {/* En-tête */}
      <div className="bg-aubergine-100 border-b-2 border-encre py-12 md:py-16">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-aubergine-200 text-aubergine-700 inline-flex mb-4">🎭 L'association</span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            L'ACAP
          </h1>
          <p className="text-xl text-encre-douce max-w-prose italic"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            Une école de théâtre à Saint-Prix depuis 2003
          </p>
        </div>
      </div>

      {/* Qui sommes-nous */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitre titre="Qui sommes-nous ?" />
            <p className="text-base md:text-lg text-encre leading-relaxed mb-5">
              L'ACAP est une association loi 1901 fondée en 2003 à Saint-Prix,
              dans le Val-d'Oise. Elle propose des ateliers de théâtre pour tous
              les âges, du mercredi après-midi pour les enfants jusqu'aux cours du
              soir pour adultes.
            </p>
            <p className="text-base text-encre-douce leading-relaxed mb-5">
              Les ateliers se déroulent au <strong>Jardin d'Hélène</strong>, une
              petite salle de spectacle de 50 places entièrement équipée (lumière,
              son, régie), au 6 rue Auguste Rey à Saint-Prix.
            </p>
            <p className="text-base text-encre-douce leading-relaxed">
              Chaque saison se clôture par un ou plusieurs spectacles joués devant
              le public. Les anciens élèves reviennent souvent — c'est toujours
              une belle fête.
            </p>
          </div>

          {/* Carte identité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-creme-pale border-[3px] border-encre rounded-xl p-7 shadow-encre-xl"
          >
            <h2
              className="font-display font-bold text-2xl text-encre mb-5"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              En bref
            </h2>
            <div className="space-y-4 text-base">
              {[
                { label: "Fondée en", valeur: "2003" },
                { label: "Statut", valeur: "Association loi 1901" },
                { label: "Lieu", valeur: "Le Jardin d'Hélène\n6 rue Auguste Rey, Saint-Prix (95)" },
                { label: "Public", valeur: "Enfants dès 8 ans, adultes tous niveaux" },
                { label: "Saison", valeur: "Fin septembre → fin juin" },
                { label: "Contact", valeur: "lacap95@free.fr" },
              ].map(({ label, valeur }) => (
                <div key={label} className="flex gap-4 py-2 border-b border-filet last:border-0">
                  <span className="text-encre-douce w-28 flex-shrink-0 text-sm">{label}</span>
                  <span className="font-bold text-encre text-sm whitespace-pre-line">{valeur}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Valeurs */}
      <Section className="bg-creme-pale rounded-2xl">
        <SectionTitre titre="Notre approche" sous="Le théâtre comme outil de développement personnel" centré />
        <div className="grid sm:grid-cols-2 gap-5">
          {VALEURS.map((v, i) => (
            <motion.div
              key={v.titre}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-creme border-2 border-encre rounded-xl p-6"
            >
              <div className="text-3xl mb-3">{v.emoji}</div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                {v.titre}
              </h3>
              <p className="text-sm text-encre-douce leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Le Jardin d'Hélène */}
      <Section>
        <div className="bg-soleil-100 border-2 border-encre rounded-xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="font-display font-black text-3xl text-encre mb-4"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Le Jardin d'Hélène
              </h2>
              <p className="text-base text-encre leading-relaxed mb-4">
                Une petite salle de spectacle de <strong>50 places</strong> entièrement
                équipée — régie son et lumière, décors, vestiaire. Un vrai outil de travail
                pour progresser dans de bonnes conditions.
              </p>
              <address className="not-italic text-base text-encre-douce">
                6 rue Auguste Rey<br />
                95390 Saint-Prix (Val-d'Oise)
              </address>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: "🎚", label: "Régie son & lumière" },
                { emoji: "🎬", label: "Salle de 50 places" },
                { emoji: "👗", label: "Espace costumes" },
                { emoji: "🚗", label: "Parking à proximité" },
              ].map(({ emoji, label }) => (
                <div key={label} className="bg-creme-pale border-2 border-encre rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">{emoji}</div>
                  <div className="text-sm font-bold text-encre">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tight>
        <div className="text-center">
          <h2
            className="font-display font-bold text-2xl md:text-3xl text-encre mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Envie de nous rejoindre ?
          </h2>
          <p className="text-base text-encre-douce mb-6">
            La première séance est offerte. Venez voir par vous-même.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ateliers" className="btn-acap">Voir les ateliers →</Link>
            <Link href="/contact#essai" className="btn-acap bg-transparent text-encre">Séance d'essai gratuite</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
