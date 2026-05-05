import type { Metadata } from "next";
import SpectaclesListe from "@/components/spectacles/SpectaclesListe";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "La saison 2025–2026 — L'ACAP",
  description:
    "Quatre spectacles à Saint-Prix cette saison. Dates, horaires, tarifs et réservations.",
};

export default function SpectaclesPage() {
  return (
    <>
      {/* En-tête de page */}
      <div className="bg-creme-pale border-b-2 border-filet py-10 md:py-14">
        <div className="max-w-page mx-auto px-6">
          <span
            className="chip-acap bg-soleil-200 text-soleil-ink inline-flex mb-4"
          >
            ★ Saison 2025–2026
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Les spectacles
          </h1>
          <p className="text-lg text-encre-douce max-w-prose">
            Quatre spectacles cette saison. Réservez tôt — ça part vite,
            surtout pour les comédies !
          </p>
        </div>
      </div>

      {/* Liste des spectacles */}
      <Section>
        <SpectaclesListe />

        {/* Bloc réservation */}
        <div className="mt-12 bg-tomate-100 border-2 border-encre rounded-xl p-6 md:p-8 shadow-tomate">
          <h2
            className="font-display font-bold text-2xl md:text-3xl text-encre mb-2"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Comment réserver ?
          </h2>
          <p className="text-base text-encre-douce mb-5">
            Deux façons de nous réserver une place :
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-creme-pale border-2 border-encre rounded-lg p-5">
              <div className="text-2xl mb-2">📞</div>
              <div
                className="font-display font-bold text-xl mb-1"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Par téléphone
              </div>
              <p className="text-sm text-encre-douce">
                01 39 91 XX XX — le mardi soir uniquement, pendant les répétitions.
              </p>
            </div>
            <div className="bg-creme-pale border-2 border-encre rounded-lg p-5">
              <div className="text-2xl mb-2">🚶</div>
              <div
                className="font-display font-bold text-xl mb-1"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Sur place
              </div>
              <p className="text-sm text-encre-douce">
                La billetterie ouvre 45 minutes avant le début de chaque représentation.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
