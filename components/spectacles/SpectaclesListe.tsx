"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SpectacleCard from "@/components/spectacles/SpectacleCard";
import type { ToneCouleur, GenreSpectacle } from "@/lib/types";

export default function SpectaclesListe() {
  const raw = useQuery(api.spectacles.list);

  if (raw === undefined) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 320, borderRadius: 6, background: "var(--paper-deep)", border: "1px solid var(--ink-line)", opacity: 0.6 }} />
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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
      {spectacles.map((spectacle) => (
        <SpectacleCard key={spectacle.id} spectacle={spectacle} compact />
      ))}
    </div>
  );
}
