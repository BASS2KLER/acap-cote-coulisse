import type { Metadata } from "next";
import Section, { SectionTitre } from "@/components/ui/Section";
import { SPECTACLES } from "@/data/spectacles";
import { getToneClasses } from "@/lib/utils";
import VideoSection from "@/components/galerie/VideoSection";

export const metadata: Metadata = {
  title: "Galerie — L'ACAP",
  description:
    "Photos de répétitions et de spectacles de la troupe de théâtre ACAP à Saint-Prix.",
};

const SAISONS = ["2024-2025", "2023-2024", "2022-2023"];

export default function GaleriePage() {
  return (
    <>
      <div className="bg-aubergine-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-aubergine-200 text-aubergine-ink inline-flex mb-4">
            📸 Archives
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Galerie
          </h1>
          <p className="text-lg text-encre-douce">
            Les souvenirs de nos spectacles et de nos répétitions.
          </p>
        </div>
      </div>

      <Section>
        {/* Section vidéos archives YouTube */}
        <VideoSection />

        {/* Saison en cours */}
        <SectionTitre
          titre="Saison 2025–2026"
          sous="Nos spectacles en images"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SPECTACLES.map((spectacle) => {
            const tone = getToneClasses(spectacle.tone);
            return (
              <div
                key={spectacle.id}
                className="border-2 border-encre rounded-xl overflow-hidden shadow-card"
              >
                {/* Image placeholder */}
                <div
                  className={`${tone.bgLight} h-48 flex items-center justify-center border-b-2 border-encre`}
                >
                  <span className="text-6xl opacity-40" aria-hidden="true">
                    {spectacle.emoji}
                  </span>
                </div>
                <div className="bg-creme-pale p-4">
                  <h3
                    className="font-display font-bold text-xl"
                    style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                  >
                    {spectacle.titre}
                  </h3>
                  <p className="text-sm text-encre-douce">{spectacle.date}</p>
                  <p className="text-xs text-gris-poussiere mt-1">
                    Photos de répétitions à venir
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Saisons précédentes */}
        <SectionTitre
          titre="Saisons précédentes"
          sous="Les archives de la troupe"
        />

        <div className="space-y-4">
          {SAISONS.map((saison, i) => (
            <div
              key={saison}
              className="bg-creme-pale border-2 border-encre rounded-xl p-5 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="font-display font-bold text-xl"
                  style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                >
                  Saison {saison}
                </h3>
                <span className="chip-acap text-xs bg-creme-deep">
                  Archives
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="aspect-square rounded-lg border border-filet flex items-center justify-center text-2xl"
                    style={{
                      background: ["#fad9d2","#fdecb6","#d8ecc4","#cfe1f3"][
                        (i + j) % 4
                      ],
                    }}
                  >
                    🎭
                  </div>
                ))}
              </div>
              <p className="text-sm text-gris-poussiere mt-3">
                Photos disponibles sur demande — contactez-nous.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
