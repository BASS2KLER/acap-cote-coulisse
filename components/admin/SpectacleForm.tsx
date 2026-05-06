"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Upload, X, ImagePlus } from "lucide-react";

const GENRES_OPTIONS = ["Comédie","Drame","Famille","Création","Classique","Tout-public"];
const TONE_OPTIONS = [
  { value: "tomate",    label: "🍅 Tomate" },
  { value: "soleil",   label: "☀️ Soleil" },
  { value: "pomme",    label: "🍏 Pomme" },
  { value: "ciel",     label: "🌤 Ciel" },
  { value: "rose",     label: "🌸 Rose" },
  { value: "aubergine",label: "🍆 Aubergine" },
];

interface SpectacleFormProps {
  initial?: {
    _id?: Id<"spectacles">;
    slug?: string;
    titre?: string;
    auteur?: string;
    description?: string;
    descriptionCourte?: string;
    date?: string;
    dateISO?: string;
    heure?: string;
    lieu?: string;
    adresse?: string;
    duree?: string;
    prix?: string;
    prixReduit?: string;
    genres?: string[];
    tone?: string;
    emoji?: string;
    lienVideo?: string;
    pmr?: boolean;
    places?: number;
    saison?: string;
    imageUrl?: string | null;
  };
  mode: "create" | "edit";
}

export default function SpectacleForm({ initial, mode }: SpectacleFormProps) {
  const router = useRouter();
  const createMutation = useMutation(api.spectacles.create);
  const updateMutation = useMutation(api.spectacles.update);
  const generateUploadUrl = useMutation(api.spectacles.generateUploadUrl);

  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.imageUrl ?? null);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    slug:              initial?.slug              ?? "",
    titre:             initial?.titre             ?? "",
    auteur:            initial?.auteur            ?? "",
    description:       initial?.description       ?? "",
    descriptionCourte: initial?.descriptionCourte ?? "",
    date:              initial?.date              ?? "",
    dateISO:           initial?.dateISO           ?? "",
    heure:             initial?.heure             ?? "20h30",
    lieu:              initial?.lieu              ?? "Salle des fêtes",
    adresse:           initial?.adresse           ?? "Place de la Mairie, 95390 Saint-Prix",
    duree:             initial?.duree             ?? "",
    prix:              initial?.prix              ?? "",
    prixReduit:        initial?.prixReduit        ?? "",
    genres:            initial?.genres            ?? [] as string[],
    tone:              initial?.tone              ?? "tomate",
    emoji:             initial?.emoji             ?? "🎭",
    lienVideo:         initial?.lienVideo         ?? "",
    pmr:               initial?.pmr               ?? true,
    places:            String(initial?.places     ?? 50),
    saison:            initial?.saison            ?? "2025-2026",
  });

  function set(key: string, value: string | boolean | string[]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleGenre(g: string) {
    set("genres", form.genres.includes(g)
      ? form.genres.filter((x) => x !== g)
      : [...form.genres, g]);
  }

  // Auto-slug depuis le titre
  function handleTitreChange(titre: string) {
    set("titre", titre);
    if (mode === "create") {
      set("slug", titre.toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""));
    }
  }

  // Upload photo affiche
  async function handleImageUpload(file: File) {
    setUploadingImg(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      setImageStorageId(storageId);
      setImagePreview(URL.createObjectURL(file));
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        places: parseInt(form.places) || 0,
        ...(imageStorageId && { imageStorageId }),
      };

      if (mode === "create") {
        await createMutation(data as Parameters<typeof createMutation>[0]);
      } else if (initial?._id) {
        const { slug: _slug, ...updateData } = data as typeof data & { slug: string };
        await updateMutation({ id: initial._id, ...updateData } as Parameters<typeof updateMutation>[0]);
      }
      router.push("/admin/spectacles");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Photo affiche */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
        <h2 className="font-display font-bold text-xl text-encre mb-4"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Photo / Affiche
        </h2>
        <div className="flex items-start gap-5">
          <div
            className="w-32 h-44 border-2 border-dashed border-encre rounded-lg bg-creme flex items-center justify-center cursor-pointer hover:bg-creme-deep transition-colors overflow-hidden flex-shrink-0"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview
              ? <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
              : <div className="text-center p-3">
                  <ImagePlus size={28} className="mx-auto mb-1 text-gris-poussiere" />
                  <span className="text-xs text-gris-poussiere">Cliquer pour ajouter</span>
                </div>
            }
          </div>
          <div>
            <p className="text-sm text-encre-douce mb-3">
              Format recommandé : portrait (3:4), minimum 600×800px. JPG ou PNG.
            </p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
            <button type="button" onClick={() => fileRef.current?.click()}
              disabled={uploadingImg}
              className="flex items-center gap-2 px-4 py-2 border-2 border-encre rounded-lg text-sm font-bold bg-creme hover:bg-creme-deep transition-colors disabled:opacity-60">
              <Upload size={16} />
              {uploadingImg ? "Envoi en cours…" : imagePreview ? "Changer la photo" : "Choisir une photo"}
            </button>
            {imagePreview && (
              <button type="button" onClick={() => { setImagePreview(null); setImageStorageId(null); }}
                className="mt-2 flex items-center gap-1 text-xs text-tomate-600 hover:underline">
                <X size={13} /> Supprimer la photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Informations principales */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
        <h2 className="font-display font-bold text-xl text-encre mb-2"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Informations principales
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Titre *</span>
            <input required value={form.titre}
              onChange={(e) => handleTitreChange(e.target.value)}
              className="admin-input" placeholder="L'Avare" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Auteur *</span>
            <input required value={form.auteur}
              onChange={(e) => set("auteur", e.target.value)}
              className="admin-input" placeholder="de Molière" />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-bold text-sm text-encre">Description courte (carte spectacle)</span>
          <textarea rows={2} value={form.descriptionCourte}
            onChange={(e) => set("descriptionCourte", e.target.value)}
            className="admin-input resize-none"
            placeholder="En 1-2 phrases, ce que verra le public sur la liste des spectacles." />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-bold text-sm text-encre">Description complète</span>
          <textarea rows={5} value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="admin-input resize-none"
            placeholder="L'histoire, l'ambiance, les choix de mise en scène…" />
        </label>
      </div>

      {/* Date & lieu */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
        <h2 className="font-display font-bold text-xl text-encre mb-2"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Date & lieu
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Date affichée *</span>
            <input required value={form.date} onChange={(e) => set("date", e.target.value)}
              className="admin-input" placeholder="Sam. 14 mars" />
            <span className="text-xs text-gris-poussiere">Ex : Sam. 14 mars</span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Date ISO *</span>
            <input required type="date" value={form.dateISO}
              onChange={(e) => set("dateISO", e.target.value)}
              className="admin-input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Heure *</span>
            <input required value={form.heure} onChange={(e) => set("heure", e.target.value)}
              className="admin-input" placeholder="20h30" />
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Lieu *</span>
            <input required value={form.lieu} onChange={(e) => set("lieu", e.target.value)}
              className="admin-input" placeholder="Salle des fêtes" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Adresse complète</span>
            <input value={form.adresse} onChange={(e) => set("adresse", e.target.value)}
              className="admin-input" />
          </label>
        </div>
      </div>

      {/* Tarifs & infos */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
        <h2 className="font-display font-bold text-xl text-encre mb-2"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Tarifs & infos pratiques
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Tarif adulte *</span>
            <input required value={form.prix} onChange={(e) => set("prix", e.target.value)}
              className="admin-input" placeholder="10 €" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Tarif réduit</span>
            <input value={form.prixReduit} onChange={(e) => set("prixReduit", e.target.value)}
              className="admin-input" placeholder="6 € (- 12 ans)" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Durée</span>
            <input value={form.duree} onChange={(e) => set("duree", e.target.value)}
              className="admin-input" placeholder="1h45 (entracte inclus)" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Places disponibles</span>
            <input type="number" min={0} value={form.places}
              onChange={(e) => set("places", e.target.value)}
              className="admin-input" />
            <span className="text-xs text-gris-poussiere">Mettre 0 pour afficher "Complet"</span>
          </label>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.pmr}
            onChange={(e) => set("pmr", e.target.checked)}
            className="w-5 h-5 rounded border-2 border-encre" />
          <span className="font-bold text-sm text-encre">♿ Accès PMR</span>
        </label>
      </div>

      {/* Genres & couleur */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
        <h2 className="font-display font-bold text-xl text-encre mb-2"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Catégorie & couleur
        </h2>

        <div>
          <span className="font-bold text-sm text-encre block mb-2">Genres</span>
          <div className="flex flex-wrap gap-2">
            {GENRES_OPTIONS.map((g) => (
              <button key={g} type="button" onClick={() => toggleGenre(g)}
                className={`px-4 py-2 border-2 border-encre rounded-pill text-sm font-bold transition-colors
                  ${form.genres.includes(g) ? "bg-encre text-creme-pale" : "bg-creme text-encre hover:bg-creme-deep"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="font-bold text-sm text-encre block mb-2">Couleur du spectacle</span>
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map(({ value, label }) => (
              <button key={value} type="button" onClick={() => set("tone", value)}
                className={`px-4 py-2 border-2 border-encre rounded-pill text-sm font-bold transition-all
                  ${form.tone === value ? "bg-encre text-creme-pale scale-105" : "bg-creme text-encre hover:bg-creme-deep"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Emoji décoratif</span>
            <input value={form.emoji} onChange={(e) => set("emoji", e.target.value)}
              className="admin-input text-2xl" maxLength={2} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Saison</span>
            <input value={form.saison} onChange={(e) => set("saison", e.target.value)}
              className="admin-input" placeholder="2025-2026" />
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={saving} className="btn-acap disabled:opacity-60">
          {saving ? "Enregistrement…" : mode === "create" ? "Créer le spectacle →" : "Enregistrer les modifications →"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-4 border-2 border-encre rounded-pill font-bold text-encre bg-creme hover:bg-creme-deep transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
}