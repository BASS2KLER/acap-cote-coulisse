"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Trash2, Plus, Image, Film, Upload, ExternalLink, Lock } from "lucide-react";
import { VIDEOS_ARCHIVES } from "@/lib/videos-archives";

const CATEGORIES = ["Auditions", "Répétitions", "Vie de la troupe", "Divers"] as const;
type Categorie = typeof CATEGORIES[number];

const INPUT = "w-full border-2 border-encre rounded-xl px-4 py-2.5 font-sans text-sm bg-creme focus:outline-none focus:border-tomate-400";
const BTN_SM = "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 rounded-lg transition-colors";

function getYoutubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function AdminGaleriePage() {
  const items = useQuery(api.galerie.list);
  const spectacles = useQuery(api.spectacles.list);
  const createItem = useMutation(api.galerie.create);
  const removeItem = useMutation(api.galerie.remove);
  const generateUploadUrl = useMutation(api.galerie.generateUploadUrl);

  const spectaclesVideos = (spectacles ?? []).filter((s) => s.lienVideo);

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<"photo" | "video">("photo");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categorie, setCategorie] = useState<Categorie>("Vie de la troupe");
  const [urlVideo, setUrlVideo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handlePhotoUpload(file: File) {
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      await createItem({
        titre: titre || file.name.replace(/\.[^.]+$/, ""),
        description: description || undefined,
        type: "photo",
        storageId,
        date: date || new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
        categorie,
      });
      resetForm();
    } finally {
      setUploading(false);
    }
  }

  async function handleVideoSubmit() {
    const ytId = getYoutubeId(urlVideo);
    if (!ytId || !titre || !date) return;
    await createItem({
      titre,
      description: description || undefined,
      type: "video",
      urlVideo: `https://www.youtube.com/watch?v=${ytId}`,
      date,
      categorie,
    });
    resetForm();
  }

  function resetForm() {
    setTitre(""); setDescription(""); setDate("");
    setUrlVideo(""); setType("photo"); setShowForm(false);
  }

  const grouped = CATEGORIES.reduce<Record<string, typeof items>>((acc, cat) => {
    acc[cat] = (items ?? []).filter((i) => i.categorie === cat);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-black text-3xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Galerie
        </h1>
        <button onClick={() => setShowForm(!showForm)}
          className="btn-acap inline-flex text-base py-3 px-5">
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 mb-8 shadow-card">
          <h2 className="font-bold text-xl text-encre mb-5"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            Nouvel élément
          </h2>

          {/* Toggle photo / vidéo */}
          <div className="flex gap-2 mb-5">
            <button onClick={() => setType("photo")}
              className={`${BTN_SM} ${type === "photo" ? "bg-encre text-creme-pale border-encre" : "border-encre text-encre bg-creme"}`}>
              <Image size={14} /> Photo
            </button>
            <button onClick={() => setType("video")}
              className={`${BTN_SM} ${type === "video" ? "bg-encre text-creme-pale border-encre" : "border-encre text-encre bg-creme"}`}>
              <Film size={14} /> Vidéo YouTube
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">Titre</label>
              <input className={INPUT} value={titre} onChange={(e) => setTitre(e.target.value)}
                placeholder={type === "photo" ? "Soirée de fin de saison" : "Auditions décembre 2025"} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">Date</label>
              <input className={INPUT} value={date} onChange={(e) => setDate(e.target.value)}
                placeholder="Juin 2026" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">Catégorie</label>
              <select className={INPUT} value={categorie}
                onChange={(e) => setCategorie(e.target.value as Categorie)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">Description (optionnel)</label>
              <input className={INPUT} value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Quelques mots…" />
            </div>
          </div>

          {type === "photo" ? (
            <div>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  files.forEach((f) => handlePhotoUpload(f));
                  e.target.value = "";
                }} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading}
                className={`flex items-center gap-2 px-5 py-3 border-2 border-dashed rounded-xl font-bold text-sm transition-colors w-full justify-center
                  ${uploading ? "border-encre-douce text-encre-douce" : "border-encre text-encre hover:bg-creme-deep"}`}>
                <Upload size={18} />
                {uploading ? "Upload en cours…" : "Choisir une ou plusieurs photos"}
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <input className={INPUT} value={urlVideo} onChange={(e) => setUrlVideo(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..." />
              <button onClick={handleVideoSubmit}
                disabled={!getYoutubeId(urlVideo) || !titre || !date}
                className="btn-acap px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
                Ajouter
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chargement */}
      {!items && <div className="text-center py-20 text-encre-douce">Chargement…</div>}

      {/* Liste par catégorie */}
      {items && (
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((cat) => {
            const liste = grouped[cat] ?? [];
            if (liste.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-bold text-lg text-encre mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
                  {cat === "Auditions" && "🎤"}
                  {cat === "Répétitions" && "🎭"}
                  {cat === "Vie de la troupe" && "🎉"}
                  {cat === "Divers" && "📷"}
                  {cat}
                  <span className="text-xs font-normal text-encre-douce bg-creme-deep px-2 py-0.5 rounded-full">{liste.length}</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {liste.map((item) => (
                    <div key={item._id} className="group relative bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card">
                      {item.type === "photo" && item.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.photoUrl} alt={item.titre}
                          className="w-full aspect-square object-cover" />
                      ) : item.type === "video" && item.urlVideo ? (
                        <div className="aspect-square bg-encre flex flex-col items-center justify-center gap-2">
                          <Film size={32} className="text-creme-pale" />
                          {getYoutubeId(item.urlVideo) && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://img.youtube.com/vi/${getYoutubeId(item.urlVideo)}/mqdefault.jpg`}
                              alt={item.titre}
                              className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="aspect-square bg-creme-deep flex items-center justify-center">
                          <Image size={32} className="text-encre-douce" />
                        </div>
                      )}
                      <div className="p-3">
                        <div className="font-bold text-sm text-encre truncate">{item.titre}</div>
                        <div className="text-xs text-encre-douce">{item.date}</div>
                      </div>
                      <button onClick={() => setConfirmId(item._id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-tomate-600 opacity-0 group-hover:opacity-100 transition-opacity border border-tomate-400 hover:bg-tomate-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="text-center py-20 text-encre-douce italic">
              Aucun élément pour l'instant — cliquez sur "Ajouter" pour commencer.
            </div>
          )}
        </div>
      )}

      {/* Archives vidéo (données statiques dans le code) */}
      <div className="mt-12 border-t-2 border-encre pt-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-bold text-xl text-encre"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            📼 Archives vidéo (2009–2011)
          </h2>
          <span className="flex items-center gap-1 text-xs font-bold text-encre-douce bg-creme-deep px-2 py-0.5 rounded-full">
            <Lock size={10} /> {VIDEOS_ARCHIVES.length} spectacles · lecture seule
          </span>
        </div>
        <p className="text-xs text-encre-douce mb-6">
          Ces vidéos sont intégrées directement dans le code du site. Pour en ajouter ou retirer, contacter le développeur.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {VIDEOS_ARCHIVES.map((archive) => (
            <a
              key={archive.id}
              href={`https://www.youtube.com/watch?v=${archive.thumbnail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card hover:border-encre transition-colors"
            >
              <div className="aspect-square relative bg-encre">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${archive.thumbnail}/mqdefault.jpg`}
                  alt={archive.titre}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film size={28} className="text-white drop-shadow" />
                </div>
                {archive.videos.length > 1 && (
                  <span className="absolute bottom-2 right-2 text-xs font-bold bg-black/60 text-white px-2 py-0.5 rounded-full">
                    {archive.videos.length} vidéos
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="font-bold text-sm text-encre truncate">{archive.titre}</div>
                <div className="text-xs text-encre-douce">{archive.saison}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Vidéos des spectacles (lecture seule) */}
      {spectaclesVideos.length > 0 && (
        <div className="mt-12 border-t-2 border-encre pt-8">
          <h2 className="font-bold text-xl text-encre mb-2"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            🎬 Vidéos des spectacles
          </h2>
          <p className="text-xs text-encre-douce mb-6">
            Gérées depuis chaque fiche spectacle — lecture seule ici.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {spectaclesVideos.map((s) => {
              const ytId = s.lienVideo ? getYoutubeId(s.lienVideo) : null;
              return (
                <div key={s._id} className="relative bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card">
                  <div className="aspect-square bg-encre relative">
                    {ytId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                        alt={s.titre}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                    ) : (
                      <Film size={32} className="text-creme-pale absolute inset-0 m-auto" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Film size={28} className="text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="p-3 flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-encre truncate">{s.titre}</div>
                      <div className="text-xs text-encre-douce">{s.saison}</div>
                    </div>
                    {s.lienVideo && (
                      <a href={s.lienVideo} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 p-1.5 rounded-lg border border-encre-douce text-encre-douce hover:border-encre hover:text-encre transition-colors">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modale confirmation suppression */}
      {confirmId && (
        <div className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmId(null)}>
          <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-8 max-w-sm w-full shadow-encre-xl"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              Supprimer cet élément ?
            </h2>
            <p className="text-sm text-encre-douce mb-6">
              Pour les photos, le fichier sera définitivement supprimé du stockage.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { removeItem({ id: confirmId as Id<"galerie"> }); setConfirmId(null); }}
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
