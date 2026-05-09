"use client";

import { useState } from "react";

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

const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--ink)",
};

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("essai");
  const [envoyé, setEnvoyé] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => setEnvoyé(true), 350);
  }

  const TABS: { id: Tab; label: string; accent: string }[] = [
    { id: "essai",       label: "✨ Séance d'essai",  accent: "moutarde" },
    { id: "inscription", label: "📝 Inscription",      accent: "mousse" },
    { id: "contact",     label: "✉ Question",          accent: "lavande" },
  ];

  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--brick)" }}>
            ✉ Contact
          </span>
          <h1 style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            Nous contacter
          </h1>
          <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
            Séance d'essai, inscription ou simple question — on répond vite.
          </p>
        </div>
      </div>

      <div style={{ ...S, padding: "48px 48px 80px" }}>
        {/* Onglets */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, borderBottom: "1px solid var(--ink-line)", paddingBottom: 0 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setEnvoyé(false); }}
              style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontSize: "0.875rem",
                fontWeight: tab === t.id ? 600 : 400,
                padding: "10px 18px",
                border: "none",
                borderBottom: tab === t.id ? `2px solid var(--${t.accent}-deep)` : "2px solid transparent",
                background: "transparent",
                color: tab === t.id ? "var(--ink)" : "var(--ink-soft)",
                cursor: "pointer",
                transition: "all 140ms",
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "start" }}>

          {/* Formulaire */}
          <div>
            {!envoyé ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Bannière info par onglet */}
                {tab === "essai" && (
                  <div style={{ background: "var(--cream-deep)", border: "1px solid var(--brick)", borderRadius: 4, padding: "12px 16px", fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.9375rem", color: "var(--ink)" }}>
                    ✨ La première séance est <strong>entièrement gratuite</strong>. Choisissez un créneau et on confirme par retour.
                  </div>
                )}
                {tab === "inscription" && (
                  <div style={{ background: "var(--cream)", border: "1px solid var(--sand-deep)", borderRadius: 4, padding: "12px 16px", fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.875rem", color: "var(--ink)" }}>
                    📌 <strong>Rappel tarifs :</strong> Adhésion 70€ + caution costumes 50€ + cours au trimestre (60€ à 165€ selon durée).
                  </div>
                )}

                {/* Champs communs */}
                {(tab === "essai" || tab === "inscription") && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <label style={fieldStyle}>
                      <span style={labelStyle}>Prénom *</span>
                      <input required className="admin-input" placeholder="Marie" />
                    </label>
                    <label style={fieldStyle}>
                      <span style={labelStyle}>Nom *</span>
                      <input required className="admin-input" placeholder="Dupont" />
                    </label>
                  </div>
                )}

                {tab === "inscription" && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>Date de naissance *</span>
                    <input required type="date" className="admin-input" />
                  </label>
                )}

                {(tab === "essai" || tab === "inscription") && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>Téléphone *</span>
                    <input required type="tel" className="admin-input" placeholder="06 XX XX XX XX" />
                  </label>
                )}

                {tab === "inscription" && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>Adresse *</span>
                    <input required className="admin-input" placeholder="12 rue de la Paix, 95390 Saint-Prix" />
                  </label>
                )}

                {(tab === "essai" || tab === "inscription") && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>E-mail *</span>
                    <input required type="email" className="admin-input" placeholder="marie@exemple.fr" />
                  </label>
                )}

                {(tab === "essai" || tab === "inscription") && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>{tab === "essai" ? "Atelier souhaité *" : "Atelier choisi *"}</span>
                    <select required className="admin-input">
                      <option value="">— Choisir un créneau —</option>
                      {ATELIERS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </label>
                )}

                {(tab === "essai" || tab === "inscription") && (
                  <label style={fieldStyle}>
                    <span style={labelStyle}>Expérience théâtre ?</span>
                    <select className="admin-input">
                      <option>Aucune, c'est ma première fois</option>
                      <option>J'ai déjà fait quelques cours</option>
                      <option>J'ai de l'expérience</option>
                    </select>
                  </label>
                )}

                {tab === "inscription" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "J'autorise l'ACAP à utiliser ma photo / image pour les communications de l'association.",
                      "Je souhaite être ajouté·e au groupe WhatsApp de l'atelier.",
                    ].map((text) => (
                      <label key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                        <input type="checkbox" style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--sand-deep)", flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.875rem", color: "var(--ink-soft)" }}>{text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {tab === "contact" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <label style={fieldStyle}>
                        <span style={labelStyle}>Prénom et nom *</span>
                        <input required className="admin-input" placeholder="Marie Dupont" />
                      </label>
                      <label style={fieldStyle}>
                        <span style={labelStyle}>E-mail *</span>
                        <input required type="email" className="admin-input" placeholder="marie@exemple.fr" />
                      </label>
                    </div>
                    <label style={fieldStyle}>
                      <span style={labelStyle}>Sujet *</span>
                      <select required className="admin-input">
                        <option>Renseignements sur les ateliers</option>
                        <option>Réservation spectacle</option>
                        <option>Partenariat / presse</option>
                        <option>Autre</option>
                      </select>
                    </label>
                    <label style={fieldStyle}>
                      <span style={labelStyle}>Message *</span>
                      <textarea required rows={5} className="admin-input" style={{ resize: "none" }} placeholder="Bonjour, je voudrais…" />
                    </label>
                  </>
                )}

                <button type="submit" className="btn-acap" style={{ marginTop: 4 }}>
                  {tab === "essai" && "Réserver ma séance d'essai →"}
                  {tab === "inscription" && "Envoyer ma demande d'inscription →"}
                  {tab === "contact" && "Envoyer le message →"}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎭</div>
                <h2 style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontStyle: "italic", fontWeight: 500, fontSize: "2rem", color: "var(--ink)", margin: "0 0 12px" }}>
                  Message envoyé !
                </h2>
                <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "1rem", color: "var(--ink-soft)", margin: "0 0 24px" }}>
                  On revient vers vous très vite.
                </p>
                <button onClick={() => setEnvoyé(false)} className="btn-acap btn-acap--secondary">
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>

          {/* Coordonnées */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--white)", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 24, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}>
              <h2 style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)", fontWeight: 600, fontSize: "1.125rem", color: "var(--ink)", margin: "0 0 20px" }}>
                Nos coordonnées
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.875rem" }}>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>Le Jardin d'Hélène</p>
                  <p style={{ color: "var(--ink-soft)", margin: 0, lineHeight: 1.6 }}>6 rue Auguste Rey<br />95390 Saint-Prix</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>Hélène Toutain</p>
                  <a href="tel:+33681670498" style={{ color: "var(--brick)" }}>06 81 67 04 98</a>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>Florence Guillot</p>
                  <a href="tel:+33633622042" style={{ color: "var(--brick)" }}>06 33 62 20 42</a>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>E-mail</p>
                  <a href="mailto:lacap95@free.fr" style={{ color: "var(--brick)" }}>lacap95@free.fr</a>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--cream-deep)", border: "1px solid var(--brick)", borderRadius: 6, padding: 20 }}>
              <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 6px" }}>✨ 1re séance offerte</p>
              <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.8125rem", color: "var(--ink-soft)", margin: 0 }}>
                Venez essayer sans engagement. On vous accueille avec plaisir.
              </p>
            </div>

            <div style={{ background: "var(--cream-deep)", border: "1px solid var(--sand-deep)", borderRadius: 6, padding: 20 }}>
              <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 6px" }}>📁 Attestation CE</p>
              <p style={{ fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)", fontSize: "0.8125rem", color: "var(--ink-soft)", margin: 0 }}>
                Disponible sur demande pour financement par votre comité d'entreprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
