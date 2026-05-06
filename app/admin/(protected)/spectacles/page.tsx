"use client";

import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Pencil, Trash2, Plus, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { getToneClasses } from "@/lib/utils";
import type { ToneCouleur } from "@/lib/types";

export default function AdminSpectaclesPage() {
  const spectacles = useQuery(api.spectacles.list);
  const remove = useMutation(api.spectacles.remove);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(id: Id<"spectacles">) {
    await remove({ id });
    setConfirmId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-black text-3xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Spectacles
        </h1>
        <Link href="/admin/spectacles/nouveau" className="btn-acap inline-flex text-base py-3 px-5">
          <Plus size={18} /> Nouveau spectacle
        </Link>
      </div>

      {!spectacles && (
        <div className="text-center py-20 text-encre-douce">Chargement…</div>
      )}

      {spectacles?.length === 0 && (
        <div className="bg-creme-pale border-2 border-encre rounded-xl p-10 text-center">
          <div className="text-5xl mb-3">🎭</div>
          <p className="text-lg font-bold text-encre mb-4">Aucun spectacle pour l'instant.</p>
          <Link href="/admin/spectacles/nouveau" className="btn-acap inline-flex">
            Ajouter le premier spectacle →
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {spectacles?.map((s: { _id: string; titre: string; auteur: string; date: string; heure: string; lieu: string; places: number; tone: string; emoji: string; imageUrl?: string | null }) => {
          const tone = getToneClasses(s.tone as ToneCouleur);
          return (
            <div key={s._id}
              className={`bg-creme-pale border-2 border-encre rounded-xl p-5 shadow-card flex items-center gap-5`}>
              {/* Couleur */}
              <div className={`w-3 self-stretch rounded-full ${tone.bg} flex-shrink-0`} />

              {/* Photo */}
              <div className={`w-16 h-16 rounded-lg border-2 border-encre flex-shrink-0 overflow-hidden ${tone.bgLight} flex items-center justify-center`}>
                {s.imageUrl
                  ? <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                  : <span className="text-2xl opacity-40">{s.emoji}</span>
                }
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-xl text-encre"
                  style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
                  {s.titre}
                </div>
                <div className="text-sm text-encre-douce">{s.auteur}</div>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-encre">
                  <span>📅 {s.date} à {s.heure}</span>
                  <span>📍 {s.lieu}</span>
                  <span className={s.places === 0 ? "text-tomate-600 font-bold" : ""}>
                    🎟 {s.places === 0 ? "Complet" : `${s.places} places`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/admin/spectacles/${s._id}`}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-2 border-encre rounded-lg bg-creme hover:bg-creme-deep transition-colors no-underline text-encre">
                  <Pencil size={15} /> Modifier
                </Link>
                <button onClick={() => setConfirmId(s._id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-2 border-tomate-500 rounded-lg text-tomate-600 hover:bg-tomate-50 transition-colors">
                  <Trash2 size={15} /> Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal confirmation suppression */}
      {confirmId && (
        <div className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmId(null)}>
          <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-8 max-w-sm w-full shadow-encre-xl"
            onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={36} className="text-tomate-500 mb-4" />
            <h2 className="font-display font-bold text-2xl text-encre mb-2"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              Supprimer ce spectacle ?
            </h2>
            <p className="text-base text-encre-douce mb-6">
              Cette action est irréversible. Les photos associées seront aussi supprimées.
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmId as Id<"spectacles">)}
                className="btn-acap flex-1 justify-center">
                Oui, supprimer
              </button>
              <button onClick={() => setConfirmId(null)}
                className="flex-1 py-3 px-4 border-2 border-encre rounded-pill font-bold text-encre bg-creme hover:bg-creme-deep transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}