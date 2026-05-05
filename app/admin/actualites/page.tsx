"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { getToneClasses } from "@/lib/utils";
import type { ToneCouleur } from "@/lib/types";

export default function AdminActualitesPage() {
  const actualites = useQuery(api.actualites.listAll);
  const remove = useMutation(api.actualites.remove);
  const update = useMutation(api.actualites.update);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-black text-3xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Actualités
        </h1>
        <Link href="/admin/actualites/nouveau"
          className="btn-acap bg-soleil-400 text-soleil-ink inline-flex text-base py-3 px-5">
          <Plus size={18} /> Nouvelle actualité
        </Link>
      </div>

      {!actualites && <div className="text-center py-20 text-encre-douce">Chargement…</div>}

      <div className="flex flex-col gap-4">
        {actualites?.map((a: { _id: string; titre: string; date: string; tag: string; tone: string; publie: boolean }) => {
          const tone = getToneClasses(a.tone as ToneCouleur);
          return (
            <div key={a._id} className="bg-creme-pale border-2 border-encre rounded-xl p-5 shadow-card flex items-center gap-4">
              <div className={`w-2 self-stretch rounded-full ${tone.bg}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`chip-acap text-xs ${tone.chip}`}>{a.tag}</span>
                  {!a.publie && <span className="chip-acap text-xs bg-creme-deep text-gris-poussiere">Brouillon</span>}
                </div>
                <div className="font-bold text-base text-encre">{a.titre}</div>
                <div className="text-xs text-gris-poussiere mt-0.5">{a.date}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => update({ id: a._id as Id<"actualites">, publie: !a.publie })}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-encre rounded-lg bg-creme hover:bg-creme-deep transition-colors text-encre"
                  title={a.publie ? "Masquer" : "Publier"}>
                  {a.publie ? <EyeOff size={13} /> : <Eye size={13} />}
                  {a.publie ? "Masquer" : "Publier"}
                </button>
                <Link href={`/admin/actualites/${a._id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-encre rounded-lg bg-creme hover:bg-creme-deep no-underline text-encre">
                  <Pencil size={13} /> Modifier
                </Link>
                <button onClick={() => setConfirmId(a._id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-tomate-400 rounded-lg text-tomate-600 hover:bg-tomate-50">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {confirmId && (
        <div className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4" onClick={() => setConfirmId(null)}>
          <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-8 max-w-sm w-full shadow-encre-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              Supprimer cette actualité ?
            </h2>
            <div className="flex gap-3">
              <button onClick={() => { remove({ id: confirmId as Id<"actualites"> }); setConfirmId(null); }}
                className="btn-acap flex-1 justify-center text-base py-3">Supprimer</button>
              <button onClick={() => setConfirmId(null)}
                className="flex-1 py-3 px-4 border-2 border-encre rounded-pill font-bold text-encre bg-creme">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
