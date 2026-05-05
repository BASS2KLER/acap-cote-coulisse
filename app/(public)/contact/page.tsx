"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ATELIERS = [
  "Lundi 20h30 – Adultes",
  "Mardi 18h – Primaires / collège",
  "Mardi 20h15 – Classique avancés",
  "Mercredi 16h45 – Découverte enfants",
  "Mercredi 18h – Atelier oral",
  "Mercredi 20h30 – Adultes",
  "Coaching individuel",
  "Je ne sais pas encore",
];

type Tab = "essai" | "inscription" | "contact";

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("essai");
  const [envoyé, setEnvoyé] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => setEnvoyé(true), 400);
  }

  return (
    <>
      <div className="bg-rose-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-rose-200 text-rose-ink inline-flex mb-4">✉ Contact</span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Nous contacter
          </h1>
          <p className="text-lg text-encre-douce">Séance d'essai, inscription ou simple question — on répond vite.</p>
        </div>
      </div>

      <div className="max-w-page mx-auto px-6 py-12">
        {/* Onglets */}
        <div className="flex flex-wrap gap-3 mb-10 border-b-2 border-filet pb-4">
          {([
            { id: "essai", label: "✨ Séance d'essai" },
            { id: "inscription", label: "📝 Inscription" },
            { id: "contact", label: "✉ Question" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              id={t.id}
              onClick={() => { setTab(t.id); setEnvoyé(false); }}
              className={`font-body font-bold text-base px-5 py-2 rounded-pill border-2 transition-all
                ${tab === t.id
                  ? "bg-encre text-creme-pale border-encre"
                  : "bg-transparent text-encre border-filet hover:border-encre"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_340px] gap-12 items-start">
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
                {/* Séance d'essai */}
                {tab === "essai" && (
                  <>
                    <div className="bg-soleil-100 border-2 border-soleil-400 rounded-lg p-4 text-base text-encre">
                      ✨ La première séance est <strong>entièrement gratuite</strong>. Choisissez un créneau et on confirme par retour.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">Prénom *</span>
                        <input required className="admin-input" placeholder="Marie" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">Nom *</span>
                        <input required className="admin-input" placeholder="Dupont" />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Téléphone *</span>
                      <input required type="tel" className="admin-input" placeholder="06 XX XX XX XX" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">E-mail *</span>
                      <input required type="email" className="admin-input" placeholder="marie@exemple.fr" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Atelier souhaité *</span>
                      <select required className="admin-input">
                        <option value="">— Choisir un créneau —</option>
                        {ATELIERS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Expérience théâtre ?</span>
                      <select className="admin-input">
                        <option>Aucune, c'est ma première fois</option>
                        <option>J'ai déjà fait quelques cours</option>
                        <option>J'ai de l'expérience</option>
                      </select>
                    </label>
                  </>
                )}

                {/* Inscription */}
                {tab === "inscription" && (
                  <>
                    <div className="bg-pomme-100 border-2 border-pomme-400 rounded-lg p-4 text-sm text-encre">
                      📌 <strong>Rappel tarifs :</strong> Adhésion 70€ + caution costumes 50€ + cours au trimestre (60€ à 165€ selon durée).
                      Attestation CE fournie sur demande.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">Prénom *</span>
                        <input required className="admin-input" placeholder="Marie" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">Nom *</span>
                        <input required className="admin-input" placeholder="Dupont" />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Date de naissance *</span>
                      <input required type="date" className="admin-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Téléphone *</span>
                      <input required type="tel" className="admin-input" placeholder="06 XX XX XX XX" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Adresse *</span>
                      <input required className="admin-input" placeholder="12 rue de la Paix, 95390 Saint-Prix" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">E-mail *</span>
                      <input required type="email" className="admin-input" placeholder="marie@exemple.fr" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Atelier choisi *</span>
                      <select required className="admin-input">
                        <option value="">— Choisir —</option>
                        {ATELIERS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Expérience théâtre</span>
                      <select className="admin-input">
                        <option>Aucune, c'est ma première fois</option>
                        <option>J'ai déjà suivi des cours</option>
                        <option>J'ai de l'expérience scénique</option>
                      </select>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-encre rounded" />
                        <span className="text-sm text-encre">
                          J'autorise l'ACAP à utiliser ma photo / image pour les communications de l'association (site, réseaux, affiches).
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-encre rounded" />
                        <span className="text-sm text-encre">
                          Je souhaite être ajouté·e au groupe WhatsApp de l'atelier.
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {/* Question */}
                {tab === "contact" && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">Prénom et nom *</span>
                        <input required className="admin-input" placeholder="Marie Dupont" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="font-bold text-sm text-encre">E-mail *</span>
                        <input required type="email" className="admin-input" placeholder="marie@exemple.fr" />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Sujet *</span>
                      <select required className="admin-input">
                        <option>Renseignements sur les ateliers</option>
                        <option>Réservation spectacle</option>
                        <option>Partenariat / presse</option>
                        <option>Autre</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-bold text-sm text-encre">Message *</span>
                      <textarea required rows={5} className="admin-input resize-none" placeholder="Bonjour, je voudrais…" />
                    </label>
                  </>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 2, y: 2 }}
                  className="btn-acap justify-center mt-2"
                >
                  {tab === "essai" && "Réserver ma séance d'essai →"}
                  {tab === "inscription" && "Envoyer ma demande d'inscription →"}
                  {tab === "contact" && "Envoyer le message →"}
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
                <p className="text-lg text-encre-douce">On revient vers vous très vite.</p>
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
          <div className="space-y-4">
            <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
              <h2
                className="font-display font-bold text-xl text-encre mb-4"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                Nos coordonnées
              </h2>
              <div className="space-y-4 text-sm text-encre">
                <div>
                  <p className="font-bold mb-1">Le Jardin d'Hélène</p>
                  <p className="text-encre-douce">6 rue Auguste Rey<br />95390 Saint-Prix</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hélène Toutain</p>
                  <a href="tel:+33681670498" className="text-tomate-600 hover:underline">06 81 67 04 98</a>
                </div>
                <div>
                  <p className="font-bold mb-1">Florence Guillot</p>
                  <a href="tel:+33633622042" className="text-tomate-600 hover:underline">06 33 62 20 42</a>
                </div>
                <div>
                  <p className="font-bold mb-1">E-mail</p>
                  <a href="mailto:lacap95@free.fr" className="text-tomate-600 hover:underline">lacap95@free.fr</a>
                </div>
              </div>
            </div>

            <div className="bg-soleil-100 border-2 border-encre rounded-xl p-5">
              <p className="font-bold text-base text-encre mb-1">✨ 1re séance offerte</p>
              <p className="text-sm text-encre-douce">
                Venez essayer sans engagement. On vous accueille avec plaisir.
              </p>
            </div>

            <div className="bg-ciel-100 border-2 border-encre rounded-xl p-5">
              <p className="font-bold text-base text-encre mb-1">📁 Attestation CE</p>
              <p className="text-sm text-encre-douce">
                Disponible sur demande pour financement par votre comité d'entreprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
