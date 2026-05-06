"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Spectacle, Representation } from "@/lib/types";
import { getPrimaryRepresentation } from "@/lib/utils";

interface Props {
  spectacle: Spectacle;
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
  fontSize: "1rem",
  padding: "10px 14px",
  border: "1px solid var(--ink-line)",
  borderRadius: 6,
  background: "var(--paper)",
  color: "var(--ink)",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};

const labelTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--ink)",
};

export default function ModalReservation({ spectacle }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [envoyé, setEnvoyé] = useState(false);
  const [form, setForm] = useState({ nom: "", telephone: "", places: "2" });

  // Gestion multi-représentations
  const representations: Representation[] = spectacle.representations ?? [];
  const primaryRepr = getPrimaryRepresentation(spectacle);
  const [reprChoisie, setReprChoisie] = useState<Representation>(primaryRepr);
  const multipleReprs = representations.length > 1;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => setEnvoyé(true), 600);
  }

  function fermer() {
    setOuvert(false);
    setEnvoyé(false);
  }

  return (
    <>
      <button
        onClick={() => setOuvert(true)}
        className="btn-acap"
        style={{ width: "100%", justifyContent: "center" }}
      >
        Réserver une place →
      </button>

      <AnimatePresence>
        {ouvert && (
          <>
            {/* Fond */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={fermer}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(42,39,34,0.55)",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
            >
              {/* Modale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#FBF7EC",
                  border: "1px solid var(--ink-line)",
                  borderRadius: 8,
                  padding: "32px 28px",
                  maxWidth: 440,
                  width: "100%",
                  boxShadow: "8px 8px 0 var(--paper-deep)",
                  position: "relative",
                }}
              >
                <button
                  onClick={fermer}
                  aria-label="Fermer"
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-worksans)",
                    fontSize: "1.1rem",
                    color: "var(--ink-muted)",
                    lineHeight: 1,
                    padding: 4,
                  }}
                >
                  ✕
                </button>

                {!envoyé ? (
                  <>
                    <h2 style={{
                      fontFamily: "var(--font-fraunces, Fraunces, serif)",
                      fontWeight: 600,
                      fontSize: "1.5rem",
                      lineHeight: 1.1,
                      color: "var(--ink)",
                      margin: "0 0 6px",
                    }}>
                      On vous garde une place ?
                    </h2>
                    <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)", margin: "0 0 2px" }}>
                      <strong>{spectacle.titre}</strong> — {reprChoisie.date} à {reprChoisie.heure}
                    </p>
                    <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", margin: "0 0 24px" }}>
                      Remplissez vite, on vous rappelle dans la journée.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {/* Sélecteur de représentation si plusieurs dates */}
                      {multipleReprs && (
                        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <span style={labelTextStyle}>Choisir une date</span>
                          <select
                            value={representations.indexOf(reprChoisie)}
                            onChange={(e) => setReprChoisie(representations[parseInt(e.target.value)])}
                            style={inputStyle}
                          >
                            {representations.map((r, i) => (
                              <option key={i} value={i}>
                                {r.date} à {r.heure} — {r.lieu}{r.places === 0 ? " (Complet)" : ""}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}

                      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={labelTextStyle}>Votre nom</span>
                        <input
                          required
                          value={form.nom}
                          onChange={(e) => setForm({ ...form, nom: e.target.value })}
                          style={inputStyle}
                          placeholder="Marie Dupont"
                        />
                      </label>

                      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={labelTextStyle}>Votre téléphone</span>
                        <input
                          required
                          type="tel"
                          value={form.telephone}
                          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                          style={inputStyle}
                          placeholder="06 XX XX XX XX"
                        />
                      </label>

                      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={labelTextStyle}>Combien de places ?</span>
                        <select
                          value={form.places}
                          onChange={(e) => setForm({ ...form, places: e.target.value })}
                          style={inputStyle}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} place{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button type="submit" className="btn-acap" style={{ marginTop: 4, justifyContent: "center" }}>
                        Réserver →
                      </button>

                      <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.75rem", color: "var(--ink-muted)", textAlign: "center", margin: 0 }}>
                        Nous vous rappelons pour confirmer la réservation.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", padding: "16px 0" }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎭</div>
                    <h2 style={{
                      fontFamily: "var(--font-fraunces, Fraunces, serif)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: "1.75rem",
                      color: "var(--ink)",
                      margin: "0 0 10px",
                    }}>
                      Merci, {form.nom.split(" ")[0]} !
                    </h2>
                    <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)", margin: "0 0 24px", lineHeight: 1.55 }}>
                      On vous rappelle très vite pour confirmer votre réservation.
                      On a hâte de vous voir !
                    </p>
                    <button onClick={fermer} className="btn-acap" style={{ margin: "0 auto", display: "inline-flex" }}>
                      Parfait !
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}