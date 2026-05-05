"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getToneClasses, isComplet, getPlacesLabel } from "@/lib/utils";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";
import Chip from "@/components/ui/Chip";
import ModalReservation from "@/components/spectacles/ModalReservation";

export default function SpectacleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const raw = useQuery(api.spectacles.getBySlug, { slug });

  if (raw === undefined) {
    return (
      <div className="max-w-page mx-auto px-6 py-20 text-center text-encre-douce">
        Chargement…
      </div>
    );
  }

  if (raw === null) notFound();

  const spectacle = {
    ...raw,
    id: raw._id,
    image: raw.imageUrl ?? "",
    galerie: (raw.galerieUrls ?? []).filter((u): u is string => u !== null),
    genres: raw.genres as GenreSpectacle[],
    tone: raw.tone as ToneCouleur,
  };

  const tone = getToneClasses(spectacle.tone);
  const complet = isComplet(spectacle.places);

  return (
    <>
      {/* En-tête colorée */}
      <div className={`${tone.bgLight} border-b-2 border-encre py-12 md:py-16`}>
        <div className="max-w-page mx-auto px-6">
          <Link
            href="/spectacles"
            className="inline-flex items-center gap-2 text-sm font-body font-bold text-encre-douce hover:text-encre mb-6 no-underline"
          >
            ← Tous les spectacles
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {spectacle.genres.map((g) => (
              <Chip key={g} label={g} genre={g} />
            ))}
            {complet && (
              <span className="chip-acap bg-encre text-creme-pale">Complet</span>
            )}
          </div>

          <h1
            className="font-display font-black mb-2 text-encre"
            style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1,
              color: `var(--${spectacle.tone}-700)`,
            }}
          >
            {spectacle.titre}
          </h1>
          <p
            className="text-xl md:text-2xl italic text-encre-douce mb-6"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            {spectacle.auteur}
          </p>

          <div className="flex flex-wrap gap-6 font-body text-base text-encre">
            <span>
              📅 <strong>{spectacle.date} à {spectacle.heure}</strong>
            </span>
            <span>📍 {spectacle.lieu}</span>
            <span>⏱ {spectacle.duree}</span>
            <span>
              🎟 <strong>{spectacle.prix}{spectacle.prixReduit && ` / ${spectacle.prixReduit}`}</strong>
            </span>
            {spectacle.pmr && <span>♿ Accès PMR</span>}
          </div>
        </div>
      </div>

      {/* Corps de la page */}
      <div className="max-w-page mx-auto px-6 py-12 md:py-16 grid md:grid-cols-[1fr_360px] gap-12 items-start">
        {/* Description */}
        <div>
          <h2
            className="font-display font-bold text-2xl md:text-3xl text-encre mb-5"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Le spectacle
          </h2>
          <p className="text-base md:text-lg text-encre leading-relaxed max-w-prose whitespace-pre-line">
            {spectacle.description}
          </p>

          {spectacle.lienVideo && (
            <div className="mt-8">
              <h3
                className="font-display font-bold text-xl text-encre mb-3"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Avant-goût
              </h3>
              <div className="rounded-xl border-2 border-encre overflow-hidden bg-encre aspect-video flex items-center justify-center">
                <div className="text-creme-pale text-center px-8">
                  <div className="text-5xl mb-3">🎭</div>
                  <p className="text-base opacity-70">Bande-annonce à venir</p>
                </div>
              </div>
            </div>
          )}

          {/* Galerie */}
          <div className="mt-8">
            <h3
              className="font-display font-bold text-xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              Galerie
            </h3>
            {spectacle.galerie.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {spectacle.galerie.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="rounded-lg border-2 border-encre aspect-square object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {[tone.bgLight, tone.bg, tone.bgLight].map((bg, i) => (
                  <div
                    key={i}
                    className={`${bg} border-2 border-encre rounded-lg aspect-square flex items-center justify-center`}
                  >
                    <span className="text-3xl opacity-40">{spectacle.emoji}</span>
                  </div>
                ))}
              </div>
            )}
            {spectacle.galerie.length === 0 && (
              <p className="text-sm text-gris-poussiere mt-2">Photos de répétitions à venir.</p>
            )}
          </div>
        </div>

        {/* Panneau réservation sticky */}
        <aside className="sticky top-24">
          <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-6 shadow-encre-xl">
            <h2
              className="font-display font-bold text-2xl text-encre mb-5"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              On vous garde une place ?
            </h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-filet">
                <span className="text-encre-douce">Date</span>
                <span className="font-bold">{spectacle.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-filet">
                <span className="text-encre-douce">Heure</span>
                <span className="font-bold">{spectacle.heure}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-filet">
                <span className="text-encre-douce">Lieu</span>
                <span className="font-bold">{spectacle.lieu}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-filet">
                <span className="text-encre-douce">Tarif adulte</span>
                <span className="font-bold">{spectacle.prix}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-encre-douce">Tarif réduit</span>
                <span className="font-bold">{spectacle.prixReduit}</span>
              </div>
            </div>

            {!complet ? (
              <>
                {spectacle.places <= 15 && (
                  <p className="text-sm font-bold text-tomate-600 mb-4">
                    ⚠️ {getPlacesLabel(spectacle.places)}
                  </p>
                )}
                <ModalReservation spectacle={spectacle} />
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">😢</div>
                <p className="font-bold text-base text-encre">Ce spectacle est complet.</p>
                <p className="text-sm text-encre-douce mt-1">
                  Contactez-nous pour être sur liste d'attente.
                </p>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-filet text-sm text-encre-douce">
              <p>📞 01 39 91 XX XX</p>
              <p className="text-xs mt-1 text-gris-poussiere">Le mardi soir uniquement</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
