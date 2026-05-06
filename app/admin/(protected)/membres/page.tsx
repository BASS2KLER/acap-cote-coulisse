"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminMembresPage() {
  const membres = useQuery(api.membres.list);
  const remove  = useMutation(api.membres.remove);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const COULEURS = ["#fad9d2","#fdecb6","#d8ecc4","#cfe1f3","#f6d7dc","#ddd0e3"];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-black text-3xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          La troupe
        </h1>
        <Link href="/admin/membres/nouveau" className="btn-acap bg-pomme-500 text-creme-pale inline-flex text-base py-3 px-5">
          <Plus size={18} /> Nouveau membre
        </Link>
      </div>

      {!membres && <div className="text-center py-20 text-encre-douce">Chargement…</div>}

      <div className="grid sm:grid-cols-2 gap-4">
        {membres?.map((m: { _id: string; nom: string; role: string; depuis: number; photoUrl?: string | null }, i: number) => (
          <div key={m._id} className="bg-creme-pale border-2 border-encre rounded-xl p-5 shadow-card flex gap-4">
            <div className="w-14 h-14 rounded-pill border-2 border-encre flex-shrink-0 flex items-center justify-center text-xl font-display font-black overflow-hidden"
              style={{ background: COULEURS[i % COULEURS.length], fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              {m.photoUrl
                ? <img src={m.photoUrl} alt="" className="w-full h-full object-cover" />
                : m.nom.split(" ").map((n: string) => n[0]).join("").slice(0, 2)
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-lg text-encre"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
                {m.nom}
              </div>
              <div className="text-sm text-encre-douce mb-1">{m.role}</div>
              <div className="text-xs text-gris-poussiere">Depuis {m.depuis}</div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href={`/admin/membres/${m._id}`}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-encre rounded-lg bg-creme hover:bg-creme-deep no-underline text-encre">
                <Pencil size={12} /> Modifier
              </Link>
              <button onClick={() => setConfirmId(m._id)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-tomate-400 rounded-lg text-tomate-600 hover:bg-tomate-50">
                <Trash2 size={12} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmId && (
        <div className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmId(null)}>
          <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-8 max-w-sm w-full shadow-encre-xl"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-2xl text-encre mb-3"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              Supprimer ce membre ?
            </h2>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { remove({ id: confirmId as Id<"membres"> }); setConfirmId(null); }}
                className="btn-acap flex-1 justify-center text-base py-3">
                Supprimer
              </button>
              <button onClick={() => setConfirmId(null)}
                className="flex-1 py-3 px-4 border-2 border-encre rounded-pill font-bold text-encre bg-creme">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}