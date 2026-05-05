"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SpectacleCard from "@/components/spectacles/SpectacleCard";
import Section, { SectionTitre } from "@/components/ui/Section";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";

export default function SpectaclesSection() {
  const raw = useQuery(api.spectacles.list);
  const prochains = (raw ?? []).slice(0, 3).map((s) => ({
    ...s,
    id: s._id,
    image: s.imageUrl ?? "",
    galerie: (s.galerieUrls ?? []).filter((u): u is string => u !== null),
    genres: s.genres as GenreSpectacle[],
    tone: s.tone as ToneCouleur,
  }));

  return (
    <Section id="saison" className="bg-creme-pale rounded-2xl">
      <SectionTitre
        titre="La saison 2025–2026"
        sous="Quatre spectacles à ne pas manquer"
        centré
      />

      <div className="flex flex-col gap-5 mb-10">
        {prochains.map((spectacle) => (
          <SpectacleCard key={spectacle.id} spectacle={spectacle} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/spectacles"
          className="btn-acap bg-transparent text-encre inline-flex"
        >
          Voir tous les spectacles →
        </Link>
      </div>
    </Section>
  );
}
