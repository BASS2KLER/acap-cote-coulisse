"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { ImagePlus, Trash2, Upload } from "lucide-react";

interface Props {
  spectacleId: Id<"spectacles">;
  galerieUrls: (string | null)[];
  galerieStorageIds: Id<"_storage">[];
}

export default function GalerieAdmin({ spectacleId, galerieUrls, galerieStorageIds }: Props) {
  const generateUploadUrl = useMutation(api.spectacles.generateUploadUrl);
  const addPhoto          = useMutation(api.spectacles.addGaleriePhoto);
  const removePhoto       = useMutation(api.spectacles.removeGaleriePhoto);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await res.json();
        await addPhoto({ id: spectacleId, storageId });
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Galerie photos
        </h2>
        <button type="button" onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 border-2 border-encre rounded-lg text-sm font-bold bg-creme hover:bg-creme-deep transition-colors disabled:opacity-60">
          <Upload size={16} />
          {uploading ? "Envoi…" : "Ajouter des photos"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)} />
      </div>

      {galerieUrls.length === 0 && (
        <div
          className="border-2 border-dashed border-encre rounded-xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-creme-deep transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus size={28} className="text-gris-poussiere" />
          <span className="text-sm text-gris-poussiere">Cliquer pour ajouter des photos de la galerie</span>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {galerieUrls.map((url, i) => (
          <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-encre bg-creme">
            {url && <img src={url} alt="" className="w-full h-full object-cover" />}
            <button
              type="button"
              onClick={() => removePhoto({ id: spectacleId, storageId: galerieStorageIds[i] })}
              className="absolute top-1.5 right-1.5 bg-encre/80 text-creme-pale rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Supprimer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
