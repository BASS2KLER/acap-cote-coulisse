"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Spectacle } from "@/lib/types";

interface Props {
  spectacle: Spectacle;
}

export default function ModalReservation({ spectacle }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [envoyé, setEnvoyé] = useState(false);
  const [form, setForm] = useState({ nom: "", telephone: "", places: "2" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulation envoi
    setTimeout(() => setEnvoyé(true), 600);
  }

  return (
    <>
      <button
        onClick={() => setOuvert(true)}
        className="btn-acap w-full justify-center"
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
              className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4"
              onClick={() => { setOuvert(false); setEnvoyé(false); }}
            >
              {/* Modale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="bg-creme-pale border-[3px] border-encre rounded-xl p-7 max-w-md w-full shadow-encre-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { setOuvert(false); setEnvoyé(false); }}
                  className="absolute top-4 right-4 text-encre-douce hover:text-encre font-bold text-lg"
                  aria-label="Fermer"
                >
                  ✕
                </button>

                {!envoyé ? (
                  <>
                    <h2
                      className="font-display font-black text-3xl text-encre mb-1"
                      style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                    >
                      On vous garde une place ?
                    </h2>
                    <p className="text-base text-encre-douce mb-1">
                      <strong>{spectacle.titre}</strong> — {spectacle.date} à {spectacle.heure}
                    </p>
                    <p className="text-sm text-encre-douce mb-6">
                      Remplissez vite, on vous rappelle dans la journée.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="font-body font-bold text-base text-encre">
                          Votre nom
                        </span>
                        <input
                          required
                          value={form.nom}
                          onChange={(e) => setForm({ ...form, nom: e.target.value })}
                          className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                          placeholder="Marie Dupont"
                        />
                      </label>

                      <label className="flex flex-col gap-1.5">
                        <span className="font-body font-bold text-base text-encre">
                          Votre téléphone
                        </span>
                        <input
                          required
                          type="tel"
                          value={form.telephone}
                          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                          className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                          placeholder="06 XX XX XX XX"
                        />
                      </label>

                      <label className="flex flex-col gap-1.5">
                        <span className="font-body font-bold text-base text-encre">
                          Combien de places ?
                        </span>
                        <select
                          value={form.places}
                          onChange={(e) => setForm({ ...form, places: e.target.value })}
                          className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} place{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </label>

                      <motion.button
                        type="submit"
                        whileHover={{ x: -2, y: -2 }}
                        whileTap={{ x: 2, y: 2 }}
                        className="btn-acap mt-2 justify-center"
                      >
                        Réserver →
                      </motion.button>

                      <p className="text-xs text-gris-poussiere text-center">
                        Nous vous rappelons pour confirmer la réservation.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="text-5xl mb-4">🎭</div>
                    <h2
                      className="font-display font-black text-2xl text-encre mb-2"
                      style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                    >
                      Merci, {form.nom.split(" ")[0]} !
                    </h2>
                    <p className="text-base text-encre-douce mb-6">
                      On vous rappelle très vite pour confirmer votre réservation.
                      On a hâte de vous voir !
                    </p>
                    <button
                      onClick={() => { setOuvert(false); setEnvoyé(false); }}
                      className="btn-acap bg-pomme-500 text-creme-pale mx-auto"
                    >
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
