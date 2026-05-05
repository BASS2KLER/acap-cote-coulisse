import type { Metadata } from "next";
import Link from "next/link";
import { MEMBRES } from "@/data/spectacles";
import Section, { SectionTitre } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "La troupe — L'ACAP",
  description:
    "Découvrez les membres de la troupe de théâtre amateur L'ACAP à Saint-Prix (95).",
};

const COULEURS_AVATAR = [
  "#fad9d2", "#fdecb6", "#d8ecc4", "#cfe1f3",
  "#f6d7dc", "#ddd0e3", "#fad9d2", "#fdecb6",
];

export default function TroupePage() {
  return (
    <>
      <div className="bg-pomme-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-pomme-200 text-pomme-ink inline-flex mb-4">
            🌱 Depuis 1992
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            La troupe
          </h1>
          <p className="text-lg text-encre-douce max-w-prose">
            Une trentaine de passionnés — profs, infirmières, retraités, fonctionnaires, parents —
            qui font du théâtre pour le plaisir.
          </p>
        </div>
      </div>

      <Section>
        {/* Citation */}
        <div className="bg-soleil-100 border-2 border-encre rounded-xl p-6 md:p-8 mb-12 shadow-soleil">
          <blockquote
            className="font-display text-2xl md:text-3xl text-encre leading-snug"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            "On fait du théâtre comme on irait à un club de belote ou de chant choral.
            Pour le plaisir, pour les amis, pour la joie que ça donne au public."
          </blockquote>
          <footer className="mt-4 text-base text-encre-douce font-bold">
            — Marie-Claire Fontaine, metteure en scène
          </footer>
        </div>

        {/* Grille membres */}
        <SectionTitre titre="Les membres" sous="Quelques visages de la troupe" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MEMBRES.map((membre, i) => (
            <div
              key={membre.id}
              className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card hover:shadow-md transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-pill border-2 border-encre mb-4 flex items-center justify-center text-2xl font-display font-black"
                style={{
                  background: COULEURS_AVATAR[i % COULEURS_AVATAR.length],
                  fontFamily: "var(--font-fraunces, Fraunces, serif)",
                }}
              >
                {membre.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <h3
                className="font-display font-bold text-xl mb-0.5"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                {membre.nom}
              </h3>
              <p className="text-sm text-encre-douce font-bold mb-3">
                {membre.role}
              </p>
              <p className="text-sm text-encre leading-relaxed mb-3">
                {membre.bio}
              </p>
              <span className="chip-acap text-xs bg-creme-deep">
                Depuis {membre.depuis}
              </span>
            </div>
          ))}
        </div>

        {/* Rejoindre */}
        <div
          id="rejoindre"
          className="bg-pomme-100 border-2 border-encre rounded-xl p-6 md:p-10 shadow-pomme"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="font-display font-bold text-2xl md:text-3xl text-encre mb-3"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Tu veux nous rejoindre ?
              </h2>
              <p className="text-base text-encre-douce leading-relaxed mb-2">
                On accueille des nouveaux membres chaque année, en septembre.
                Aucune expérience requise — juste l'envie de jouer !
              </p>
              <p className="text-base text-encre leading-relaxed">
                Viens voir une répétition le mardi soir, sans engagement.
                On t'explique comment ça marche, tu rencontres la troupe,
                et tu décides si ça te plaît.
              </p>
            </div>
            <div>
              <div className="space-y-3 mb-5">
                {[
                  "📅 Répétitions le mardi soir, 20h–22h30",
                  "📍 Salle des fêtes de Saint-Prix",
                  "🎭 Débutants bienvenus",
                  "💶 Cotisation annuelle : ~50 €",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-base text-encre">
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/contact#rejoindre" className="btn-acap bg-pomme-500 text-creme-pale inline-flex">
                Je veux rejoindre la troupe →
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
