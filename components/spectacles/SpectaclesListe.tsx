"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SpectacleCard from "@/components/spectacles/SpectacleCard";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";

export default function SpectaclesListe() {
  const raw = useQuery(api.spectacles.list);

  if (raw === undefined) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-xl bg-creme-deep animate-pulse border-2 border-filet" />
        ))}
      </div>
    );
  }

  const spectacles = raw.map((s) => ({
    ...s,
    id: s._id,
    image: s.imageUrl ?? "",
    galerie: (s.galerieUrls ?? []).filter((u): u is string => u !== null),
    genres: s.genres as GenreSpectacle[],
    tone: s.tone as ToneCouleur,
  }));

  return (
    <div className="flex flex-col gap-6">
      {spectacles.map((spectacle) => (
        <SpectacleCard key={spectacle.id} spectacle={spectacle} />
      ))}
    </div>
  );
}
