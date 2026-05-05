"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SpectacleForm from "@/components/admin/SpectacleForm";

export default function NouveauSpectaclePage() {
  return (
    <div>
      <Link href="/admin/spectacles"
        className="flex items-center gap-1 text-sm font-bold text-encre-douce hover:text-encre no-underline mb-6">
        <ChevronLeft size={16} /> Retour aux spectacles
      </Link>
      <h1 className="font-display font-black text-3xl text-encre mb-8"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
        Nouveau spectacle
      </h1>
      <SpectacleForm mode="create" />
    </div>
  );
}
