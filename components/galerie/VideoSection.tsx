"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { VIDEOS_ARCHIVES, type VideoArchive } from "@/lib/videos-archives";

const ACCENT_WASHES = [
  "var(--rose-wash)",
  "var(--moutarde-wash)",
  "var(--mousse-wash)",
  "var(--lavande-wash)",
];

interface ModalState {
  spec: VideoArchive;
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
        <span className="kicker" style={{ marginBottom: 8, display: "block", color: "var(--lavande-deep)" }}>
          ▶ Vidéos
        </span>
        <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
          Nos spectacles en vidéo
        </h2>
        <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-muted)", marginTop: 8, marginBottom: 0 }}>
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
              background: "#FBF7EC",
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
                  fontFamily: "var(--font-worksans)",
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
              <p style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontWeight: 500, fontSize: "1rem", color: "var(--ink)", margin: "0 0 4px", lineHeight: 1.2 }}>
                {spec.titre}
              </p>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.75rem", color: "var(--ink-muted)", margin: 0, lineHeight: 1.4 }}>
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
                background: "#FBF7EC",
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
                  <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontWeight: 500, fontSize: "1.125rem", color: "var(--ink)", margin: 0 }}>
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
                        fontFamily: "var(--font-worksans)",
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
