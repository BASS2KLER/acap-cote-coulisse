"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SpectacleForm from "@/components/admin/SpectacleForm";
import GalerieAdmin from "@/components/admin/GalerieAdmin";

export default function ModifierSpectaclePage({
  params,
}: {
  params: { id: string };
}) {
  const spectacle = useQuery(api.spectacles.list);
  const s = spectacle?.find((x: { _id: string }) => x._id === params.id);

  if (spectacle === undefined) {
    return <div className="text-center py-20 text-encre-douce">Chargement…</div>;
  }
  if (!s) {
    return <div className="text-center py-20 text-encre-douce">Spectacle introuvable.</div>;
  }

  return (
    <div>
      <Link href="/admin/spectacles"
        className="flex items-center gap-1 text-sm font-bold text-encre-douce hover:text-encre no-underline mb-6">
        <ChevronLeft size={16} /> Retour aux spectacles
      </Link>
      <h1 className="font-display font-black text-3xl text-encre mb-8"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
        Modifier : {s.titre}
      </h1>

      <SpectacleForm
        mode="edit"
        initial={{
          ...s,
          _id: s._id as Id<"spectacles">,
          imageUrl: s.imageUrl,
        }}
      />

      {/* Galerie photos */}
      <div className="mt-8">
        <GalerieAdmin spectacleId={s._id as Id<"spectacles">} galerieUrls={s.galerieUrls as (string | null)[]} galerieStorageIds={(s as { galerieStorageIds?: Id<"_storage">[] }).galerieStorageIds ?? []} />
      </div>
    </div>
  );
}