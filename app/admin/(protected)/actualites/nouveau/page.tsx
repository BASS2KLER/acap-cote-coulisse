"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TONES = ["tomate","soleil","pomme","ciel","rose","aubergine"];

export default function NouvelleActualitePage() {
  const router = useRouter();
  const create = useMutation(api.actualites.create);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titre: "", date: new Date().toLocaleDateString("fr-FR"), contenu: "", tag: "Troupe", tone: "soleil", publie: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await create(form as Parameters<typeof create>[0]);
    router.push("/admin/actualites");
  }

  return (
    <div>
      <Link href="/admin/actualites" className="flex items-center gap-1 text-sm font-bold text-encre-douce hover:text-encre no-underline mb-6">
        <ChevronLeft size={16} /> Retour
      </Link>
      <h1 className="font-display font-black text-3xl text-encre mb-8"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
        Nouvelle actualité
      </h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Titre *</span>
            <input required value={form.titre} onChange={(e) => setForm(f => ({ ...f, titre: e.target.value }))}
              className="admin-input" placeholder="Les répétitions commencent !" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-bold text-sm text-encre">Date</span>
              <input value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                className="admin-input" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-bold text-sm text-encre">Tag</span>
              <select value={form.tag} onChange={(e) => setForm(f => ({ ...f, tag: e.target.value }))}
                className="admin-input">
                {["Troupe","Saison","En coulisses","Événement","Annonce"].map(t => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Contenu</span>
            <textarea rows={4} value={form.contenu}
              onChange={(e) => setForm(f => ({ ...f, contenu: e.target.value }))}
              className="admin-input resize-none" placeholder="Le texte de l'actualité…" />
          </label>
          <div>
            <span className="font-bold text-sm text-encre block mb-2">Couleur</span>
            <div className="flex flex-wrap gap-2">
              {TONES.map(t => (
                <button key={t} type="button" onClick={() => setForm(f => ({ ...f, tone: t }))}
                  className={`px-3 py-1.5 border-2 border-encre rounded-pill text-sm font-bold transition-all
                    ${form.tone === t ? "bg-encre text-creme-pale" : "bg-creme text-encre"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.publie} onChange={(e) => setForm(f => ({ ...f, publie: e.target.checked }))}
              className="w-5 h-5 rounded border-2 border-encre" />
            <span className="font-bold text-sm text-encre">Publier immédiatement</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="btn-acap bg-soleil-400 text-soleil-ink disabled:opacity-60">
            {saving ? "Enregistrement…" : "Publier l'actualité →"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-4 border-2 border-encre rounded-pill font-bold text-encre bg-creme hover:bg-creme-deep">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}