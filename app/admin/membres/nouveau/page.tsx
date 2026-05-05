"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NouveauMembrePage() {
  const router = useRouter();
  const create = useMutation(api.membres.create);
  const generateUploadUrl = useMutation(api.membres.generateUploadUrl);
  const [saving, setSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoStorageId, setPhotoStorageId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ nom: "", role: "", bio: "", depuis: new Date().getFullYear().toString() });

  async function handlePhotoUpload(file: File) {
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    setPhotoStorageId(storageId);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await create({
      nom: form.nom, role: form.role, bio: form.bio,
      depuis: parseInt(form.depuis),
      ...(photoStorageId && { photoStorageId: photoStorageId as `${string}` }),
    } as Parameters<typeof create>[0]);
    router.push("/admin/membres");
  }

  return (
    <div>
      <Link href="/admin/membres" className="flex items-center gap-1 text-sm font-bold text-encre-douce hover:text-encre no-underline mb-6">
        <ChevronLeft size={16} /> Retour
      </Link>
      <h1 className="font-display font-black text-3xl text-encre mb-8"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
        Nouveau membre
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card space-y-4">
          {/* Photo */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-pill border-2 border-encre bg-creme flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              {photoPreview ? <img src={photoPreview} alt="" className="w-full h-full object-cover" /> : <Upload size={22} className="text-gris-poussiere" />}
            </div>
            <div>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border-2 border-encre rounded-lg text-sm font-bold bg-creme hover:bg-creme-deep transition-colors">
                <Upload size={14} /> {photoPreview ? "Changer la photo" : "Ajouter une photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])} />
            </div>
          </div>

          {[
            { key: "nom", label: "Nom complet *", placeholder: "Marie-Claire Fontaine", required: true },
            { key: "role", label: "Rôle *", placeholder: "Metteure en scène & présidente", required: true },
            { key: "depuis", label: "Membre depuis (année) *", placeholder: "2012", required: true },
          ].map(({ key, label, placeholder, required }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="font-bold text-sm text-encre">{label}</span>
              <input required={required} value={(form as Record<string, string>)[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="admin-input" placeholder={placeholder} />
            </label>
          ))}

          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-encre">Biographie courte</span>
            <textarea rows={3} value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="admin-input resize-none" placeholder="En quelques mots..." />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-acap bg-pomme-500 text-creme-pale disabled:opacity-60">
            {saving ? "Enregistrement…" : "Créer le membre →"}
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
