"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [tab, setTab] = useState<"contact" | "rejoindre">("contact");
  const [envoyé, setEnvoyé] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "Réservation",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => setEnvoyé(true), 500);
  }

  return (
    <>
      <div className="bg-rose-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-rose-200 text-rose-ink inline-flex mb-4">
            ✉ Contact
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Nous écrire
          </h1>
          <p className="text-lg text-encre-douce">
            Une question ? Une réservation ? Envie de nous rejoindre ? On vous répond vite.
          </p>
        </div>
      </div>

      <div className="max-w-page mx-auto px-6 py-12">
        {/* Onglets */}
        <div className="flex gap-3 mb-10 border-b-2 border-filet pb-4">
          {(["contact", "rejoindre"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setEnvoyé(false); }}
              className={`font-body font-bold text-base px-5 py-2 rounded-pill border-2 transition-all
                ${tab === t
                  ? "bg-encre text-creme-pale border-encre"
                  : "bg-transparent text-encre border-filet hover:border-encre"
                }`}
            >
              {t === "contact" ? "✉ Nous écrire" : "🎭 Rejoindre la troupe"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Formulaire */}
          <div>
            {!envoyé ? (
              <motion.form
                key={tab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {tab === "contact" ? (
                  <>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Votre nom</span>
                      <input
                        required
                        value={form.nom}
                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                        placeholder="Marie Dupont"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Votre e-mail</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                        placeholder="marie@exemple.fr"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Sujet</span>
                      <select
                        value={form.sujet}
                        onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                      >
                        <option>Réservation</option>
                        <option>Informations sur la troupe</option>
                        <option>Partenariat / presse</option>
                        <option>Autre</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Votre message</span>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500 resize-none"
                        placeholder="Bonjour, je voudrais..."
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="bg-pomme-100 border-2 border-pomme-400 rounded-lg p-4 text-base text-encre">
                      Tu peux aussi venir directement voir une répétition le mardi soir, à la salle des fêtes. Pas besoin de nous prévenir !
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Ton prénom et nom</span>
                      <input
                        required
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                        placeholder="Thomas Durand"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Ton e-mail</span>
                      <input
                        required
                        type="email"
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500"
                        placeholder="thomas@exemple.fr"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Pourquoi tu veux nous rejoindre ?</span>
                      <textarea
                        rows={4}
                        className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500 resize-none"
                        placeholder="J'ai toujours voulu faire du théâtre..."
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body font-bold text-base text-encre">Tu as déjà fait du théâtre ?</span>
                      <select className="text-lg px-4 py-3 border-[2.5px] border-encre rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500">
                        <option>Non, c'est la première fois</option>
                        <option>Oui, un peu</option>
                        <option>Oui, j'ai de l'expérience</option>
                      </select>
                    </label>
                  </>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 2, y: 2 }}
                  className="btn-acap justify-center mt-2"
                >
                  {tab === "contact" ? "Envoyer le message →" : "Envoyer ma candidature →"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <div className="text-5xl mb-4">🎭</div>
                <h2
                  className="font-display font-black text-3xl text-encre mb-3"
                  style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
                >
                  Message envoyé !
                </h2>
                <p className="text-lg text-encre-douce">
                  On vous répond très vite. Merci de votre message !
                </p>
                <button
                  onClick={() => setEnvoyé(false)}
                  className="btn-acap bg-transparent text-encre mt-6 mx-auto"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            )}
          </div>

          {/* Coordonnées */}
          <div className="space-y-5">
            <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
              <h2
                className="font-display font-bold text-xl text-encre mb-4"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Nos coordonnées
              </h2>
              <div className="space-y-3 text-base text-encre">
                <div>
                  <span className="font-bold">Adresse :</span><br />
                  Salle des fêtes, Place de la Mairie<br />
                  95390 Saint-Prix
                </div>
                <div>
                  <span className="font-bold">Téléphone :</span><br />
                  01 39 91 XX XX{" "}
                  <span className="text-sm text-encre-douce">(mardi soir)</span>
                </div>
                <div>
                  <span className="font-bold">E-mail :</span><br />
                  <a
                    href="mailto:contact@acap-theatre.fr"
                    className="text-tomate-600 hover:underline"
                  >
                    contact@acap-theatre.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-soleil-100 border-2 border-encre rounded-xl p-6 shadow-soleil">
              <h3
                className="font-display font-bold text-lg text-encre mb-2"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Répétitions ouvertes
              </h3>
              <p className="text-base text-encre-douce">
                Vous pouvez venir voir une répétition sans prévenir. Chaque
                mardi soir à 20h, salle des fêtes de Saint-Prix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
