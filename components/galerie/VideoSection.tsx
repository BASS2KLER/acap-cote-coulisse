"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Video = { label: string; id: string };

type ArchiveVideo = {
  id: string;
  saison: string;
  titre: string;
  description: string;
  thumbnail: string;
  videos: Video[];
};

const VIDEOS_ARCHIVES: ArchiveVideo[] = [
  {
    id: "auditions-2010",
    saison: "2010–2011",
    titre: "Auditions de décembre 2010",
    description: "Extraits de Racine et Hugo — groupe adultes du lundi 20h",
    thumbnail: "Ayn8svQbbeU",
    videos: [
      { label: "Diaporama lundi (1)", id: "Ayn8svQbbeU" },
      { label: "Diaporama lundi (2)", id: "rN4V2gjkiIo" },
      { label: "Diaporama mardi & mercredi", id: "GIx4oI9AOCY" },
      { label: "Phèdre — J. Sabourault", id: "AzPZay3-duM" },
      { label: "Andromaque — B. Gervais", id: "qQWxmUXI5J8" },
      { label: "Andromaque — J. Le Roy", id: "jdNGN7_6MYA" },
      { label: "Andromaque — F. Murphy", id: "-qblxzz6HtE" },
      { label: "Andromaque — E. Delacour", id: "BpL6LxBJi6I" },
      { label: "Andromaque — A. Prouvost", id: "pQjJUNaLFME" },
      { label: "Iphigénie — S. Bernier", id: "nvKn8nmldJQ" },
      { label: "Iphigénie — C. Chassaigne-Rouzet", id: "bILm_VcqfD4" },
      { label: "Iphigénie — C. Péchiney", id: "piSA7h4gdiM" },
      { label: "Mithridate — E. Hirsch-Sene", id: "3axv4KpxjYQ" },
      { label: "Hernani — M. Berra", id: "L9iRIY6SWhI" },
      { label: "Mot final — H. Toutain", id: "dPEFjimyMEk" },
    ],
  },
  {
    id: "barbe-bleue-oct-2010",
    saison: "Octobre 2010",
    titre: "Au Doux Pays de Barbe Bleue",
    description: "Texte et mise en scène d'Hélène Toutain",
    thumbnail: "CkdhOum7mpU",
    videos: [
      { label: "Diaporama", id: "CkdhOum7mpU" },
    ],
  },
  {
    id: "entre-hier-demain",
    saison: "Janvier 2010",
    titre: "Entre hier et demain",
    description: "Texte et mise en scène d'Hélène Toutain — groupe adultes",
    thumbnail: "80nsaTxL8AA",
    videos: [
      { label: "Extrait", id: "80nsaTxL8AA" },
    ],
  },
  {
    id: "arlequin",
    saison: "2009–2010",
    titre: "Une aventure d'Arlequin",
    description: "Représentations de fin d'année",
    thumbnail: "9X1mZiwk6oI",
    videos: [
      { label: "Partie 1", id: "9X1mZiwk6oI" },
      { label: "Partie 2", id: "JrRDw3Gb4F8" },
      { label: "Partie 3", id: "BsEM5axJxTU" },
      { label: "Partie 4", id: "659UNFtPsck" },
      { label: "Diaporama", id: "CxvtD12BoeE" },
    ],
  },
  {
    id: "precieuses-ridicules",
    saison: "2009–2010",
    titre: "Les Précieuses Ridicules",
    description: "Représentations de fin d'année",
    thumbnail: "7Uh4EJyPSEw",
    videos: [
      { label: "Partie 1", id: "7Uh4EJyPSEw" },
      { label: "Partie 2", id: "P8c1JLBB01A" },
      { label: "Partie 3", id: "3g5nA8Dtxfs" },
      { label: "Diaporama", id: "-1L3R-V0ZsQ" },
    ],
  },
  {
    id: "marmite",
    saison: "2009–2010",
    titre: "La Marmite",
    description: "Représentations de fin d'année",
    thumbnail: "cGGi8ha8AdE",
    videos: [
      { label: "Partie 1", id: "cGGi8ha8AdE" },
      { label: "Partie 2", id: "wBk7Pz3Oo20" },
      { label: "Partie 3", id: "0r26_pZGiwU" },
      { label: "Partie 4", id: "XmEn96jQZxA" },
    ],
  },
  {
    id: "barbe-bleue",
    saison: "2009–2010",
    titre: "Barbe Bleue",
    description: "Représentations de fin d'année",
    thumbnail: "Gb915lbgWB8",
    videos: [
      { label: "Partie 1", id: "Gb915lbgWB8" },
      { label: "Partie 2", id: "p2WneHQGR6k" },
      { label: "Partie 3", id: "qh2oB4emhjM" },
      { label: "Partie 4", id: "Hyiqa6ZcyDM" },
      { label: "Partie 5", id: "hm246x7LDLY" },
      { label: "Partie 6", id: "WKd9cdxklLU" },
    ],
  },
  {
    id: "truands",
    saison: "2009–2010",
    titre: "Les Truands",
    description: "Représentations de fin d'année",
    thumbnail: "onzFfol_avw",
    videos: [
      { label: "Partie 1", id: "onzFfol_avw" },
      { label: "Partie 2", id: "3979xq4k-c4" },
      { label: "Partie 3", id: "hPhyLJmVMv8" },
      { label: "Partie 4", id: "9BenqOGbgyE" },
      { label: "Partie 5", id: "lB0nPqNP4kQ" },
      { label: "Partie 6", id: "fCAJnkdDk8E" },
      { label: "Partie 7", id: "FxiR3iQiNfU" },
      { label: "Partie 8", id: "1tiO3F0TUOo" },
    ],
  },
  {
    id: "doux-pays",
    saison: "2009–2010",
    titre: "Au Doux Pays de Barbe Bleue",
    description: "Représentations de fin d'année",
    thumbnail: "ZmVpirq1QcE",
    videos: [
      { label: "Partie 1", id: "ZmVpirq1QcE" },
      { label: "Partie 2", id: "RNDP5_Wwirw" },
      { label: "Partie 3", id: "D_YUMIn3F6A" },
      { label: "Partie 4", id: "bsCdIXwuBqA" },
      { label: "Partie 5", id: "3wRc45dPy3k" },
      { label: "Partie 6", id: "hcEVfqO6SxM" },
      { label: "Partie 7", id: "BUqSvr0lO4c" },
      { label: "Partie 8", id: "2_qc65oEA4Q" },
      { label: "Partie 9", id: "GjMg4R5_nyY" },
      { label: "Diaporama", id: "HZ7-rzoOHe4" },
    ],
  },
];

const ACCENT_WASHES = [
  "var(--brick-wash)",
  "var(--cream-deep)",
  "var(--cream)",
  "var(--cream-deep)",
];

interface ModalState {
  spec: ArchiveVideo;
  videoId: string;
}

export default function VideoSection() {
  const [modal, setModal] = useState<ModalState | null>(null);

  function ouvrir(spec: ArchiveVideo) {
    setModal({ spec, videoId: spec.videos[0].id });
  }

  function fermer() {
    setModal(null);
  }

  return (
    <>
      {/* En-tête de section */}
      <div style={{ marginBottom: 32 }}>
        <span className="kicker" style={{ marginBottom: 8, display: "block", color: "var(--sand-deep)" }}>
          ▶ Vidéos
        </span>
        <h2 style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
          Nos spectacles en vidéo
        </h2>
        <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.9375rem", color: "var(--ink-muted)", marginTop: 8, marginBottom: 0 }}>
          Archives YouTube de la compagnie — cliquez sur un spectacle pour le visionner.
        </p>
      </div>

      {/* Grille des spectacles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 64 }}>
        {VIDEOS_ARCHIVES.map((spec, i) => (
          <button
            key={spec.id}
            onClick={() => ouvrir(spec)}
            style={{
              all: "unset",
              display: "block",
              cursor: "pointer",
              background: "var(--white)",
              border: "1px solid var(--ink-line)",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 2px 0 rgba(42,39,34,0.04)",
              transition: "transform 140ms, box-shadow 140ms",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px -4px rgba(42,39,34,0.16)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 0 rgba(42,39,34,0.04)";
            }}
          >
            {/* Miniature YouTube */}
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", borderBottom: "1px solid var(--ink-line)", background: ACCENT_WASHES[i % 4] }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${spec.thumbnail}/hqdefault.jpg`}
                alt={spec.titre}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
              />
              {/* Bouton play */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(42,39,34,0.18)",
                transition: "background 140ms",
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(245,239,227,0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.125rem",
                  paddingLeft: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}>
                  ▶
                </div>
              </div>
              {/* Nombre de vidéos */}
              {spec.videos.length > 1 && (
                <div style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(42,39,34,0.75)",
                  color: "#F5EFE3",
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 4,
                }}>
                  {spec.videos.length} vidéos
                </div>
              )}
            </div>

            {/* Infos */}
            <div style={{ padding: "12px 16px 14px" }}>
              <span className="kicker" style={{ fontSize: "0.625rem", color: "var(--ink-muted)", display: "block", marginBottom: 4 }}>
                {spec.saison}
              </span>
              <p style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontStyle: "italic", fontWeight: 500, fontSize: "1rem", color: "var(--ink)", margin: "0 0 4px", lineHeight: 1.2 }}>
                {spec.titre}
              </p>
              <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.75rem", color: "var(--ink-muted)", margin: 0, lineHeight: 1.4 }}>
                {spec.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal vidéo */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fermer}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(42,39,34,0.7)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--white)",
                border: "1px solid var(--ink-line)",
                borderRadius: 8,
                width: "100%",
                maxWidth: 860,
                boxShadow: "8px 8px 0 rgba(42,39,34,0.12)",
                overflow: "hidden",
              }}
            >
              {/* En-tête modal */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: "1px solid var(--ink-line)",
              }}>
                <div>
                  <span className="kicker" style={{ fontSize: "0.625rem", color: "var(--ink-muted)", display: "block" }}>
                    {modal.spec.saison}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontStyle: "italic", fontWeight: 500, fontSize: "1.125rem", color: "var(--ink)", margin: 0 }}>
                    {modal.spec.titre}
                  </h3>
                </div>
                <button
                  onClick={fermer}
                  aria-label="Fermer"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--ink-line)",
                    borderRadius: 4,
                    padding: 6,
                    cursor: "pointer",
                    color: "var(--ink-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Lecteur */}
              <div style={{ aspectRatio: "16/9", background: "#000" }}>
                <iframe
                  key={modal.videoId}
                  src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=1`}
                  title={modal.spec.titre}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>

              {/* Sélecteur de parties (si plusieurs vidéos) */}
              {modal.spec.videos.length > 1 && (
                <div style={{
                  padding: "12px 20px 16px",
                  borderTop: "1px solid var(--ink-line)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}>
                  {modal.spec.videos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setModal({ ...modal, videoId: v.id })}
                      style={{
                        fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                        fontSize: "0.75rem",
                        fontWeight: v.id === modal.videoId ? 700 : 400,
                        padding: "4px 12px",
                        borderRadius: 999,
                        border: v.id === modal.videoId ? "1px solid var(--ink)" : "1px solid var(--ink-line)",
                        background: v.id === modal.videoId ? "var(--ink)" : "transparent",
                        color: v.id === modal.videoId ? "var(--paper)" : "var(--ink-soft)",
                        cursor: "pointer",
                        transition: "all 120ms",
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
