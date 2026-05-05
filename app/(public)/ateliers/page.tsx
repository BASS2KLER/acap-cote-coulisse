"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const BIENFAITS = [
  { emoji: "💪", titre: "Confiance en soi", desc: "Apprendre à s'affirmer, à oser, à occuper l'espace." },
  { emoji: "🎙", titre: "Prise de parole", desc: "Parler en public avec aisance et naturel." },
  { emoji: "🎵", titre: "La voix", desc: "Travailler la respiration, le souffle, la projection et l'articulation." },
  { emoji: "🧠", titre: "Mémoire & créativité", desc: "Exercices de mémorisation, improvisation, imagination." },
  { emoji: "🤝", titre: "Travail en groupe", desc: "Écoute, présence, jeu collectif et complicité." },
  { emoji: "😌", titre: "Bien-être", desc: "Lâcher prise, se déconnecter, jouer — comme quand on était enfant." },
];

const ATELIERS = [
  { jour: "Lundi",    horaire: "20h30 – 22h30", label: "Adultes",            accent: "rose" },
  { jour: "Mardi",   horaire: "18h – 19h30",   label: "Primaires / collège", accent: "moutarde" },
  { jour: "Mardi",   horaire: "20h15 – 22h45", label: "Classique avancés",   accent: "lavande" },
  { jour: "Mercredi",horaire: "16h45 – 17h30", label: "Découverte enfants",  accent: "mousse" },
  { jour: "Mercredi",horaire: "18h – 20h",     label: "Atelier oral",        accent: "lavande" },
  { jour: "Mercredi",horaire: "20h30 – 22h30", label: "Adultes",             accent: "rose" },
  { jour: "Sur demande", horaire: "À convenir", label: "Coaching individuel", accent: "moutarde" },
];

const TARIFS = [
  { duree: "45 minutes", tarif: "60 €" },
  { duree: "1h30",       tarif: "117 €" },
  { duree: "2h",         tarif: "132 €" },
  { duree: "2h30",       tarif: "165 €" },
];

const S: React.CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 48px",
};

export default function AteliersPage() {
  return (
    <>
      {/* En-tête éditorial */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--rose-deep)" }}>
            🎭 Ateliers
          </span>
          <h1 style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 600,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: "0 0 16px",
          }}>
            Les ateliers de théâtre
          </h1>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "52ch", margin: 0 }}>
            Pour adultes et enfants, tous niveaux. Venez essayer — la première séance est offerte.
          </p>
        </div>
      </div>

      {/* Ce que vous allez développer */}
      <section style={{ ...S, padding: "64px 48px" }}>
        <div style={{ marginBottom: 40 }}>
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Ce que vous développez</span>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
            Le théâtre, c'est bien plus que jouer la comédie
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {BIENFAITS.map((b, i) => (
            <motion.div
              key={b.titre}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 24, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: 10 }}>{b.emoji}</div>
              <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.125rem", color: "var(--ink)", margin: "0 0 6px" }}>{b.titre}</h3>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programme */}
      <section style={{ background: "var(--paper-warm)", padding: "64px 0" }}>
        <div style={S}>
          <div style={{ marginBottom: 36 }}>
            <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Programme 2025–2026</span>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
              Choisissez l'atelier qui vous correspond
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ATELIERS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: `var(--${a.accent}-wash)`,
                  border: `1px solid var(--${a.accent}-deep)`,
                  borderRadius: 6,
                  padding: "16px 20px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.125rem", color: `var(--${a.accent}-deep)` }}>
                    {a.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)", marginTop: 2 }}>
                    <strong>{a.jour}</strong> · {a.horaire}
                  </div>
                </div>
                <Link
                  href="/contact"
                  style={{
                    fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", fontWeight: 500,
                    padding: "8px 16px", borderRadius: 4, border: "1px solid var(--ink-line)",
                    background: "rgba(255,255,255,0.6)", color: "var(--ink)", textDecoration: "none",
                  }}
                >
                  Essayer →
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Encart 1re séance offerte */}
          <div style={{
            marginTop: 32,
            background: "var(--moutarde-wash)",
            border: "1px solid var(--moutarde-deep)",
            borderRadius: 6,
            padding: "28px 32px",
            textAlign: "center",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 6, border: "1px dashed var(--moutarde-deep)", borderRadius: 4, opacity: 0.3, pointerEvents: "none" }} />
            <div style={{ fontSize: "1.5rem", marginBottom: 8, position: "relative" }}>✨</div>
            <p style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 8px", position: "relative" }}>Première séance offerte</p>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)", margin: "0 0 20px", position: "relative" }}>
              Venez essayer un atelier sans engagement ni frais.
            </p>
            <Link href="/contact" className="btn-acap" style={{ position: "relative" }}>
              Réserver ma séance d'essai →
            </Link>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" style={{ ...S, padding: "64px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Tarifs 2025–2026</span>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 24px" }}>
              Par trimestre, hors adhésion
            </h2>
            <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 0 rgba(42,39,34,0.04)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--ink)", color: "var(--paper)" }}>
                    <th style={{ textAlign: "left", padding: "12px 20px", fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Durée du cours</th>
                    <th style={{ textAlign: "right", padding: "12px 20px", fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tarif / trimestre</th>
                  </tr>
                </thead>
                <tbody>
                  {TARIFS.map(({ duree, tarif }, i) => (
                    <tr key={duree} style={{ background: i % 2 === 0 ? "#FBF7EC" : "var(--paper-warm)", borderBottom: "1px solid var(--ink-line)" }}>
                      <td style={{ padding: "12px 20px", fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink)" }}>{duree}</td>
                      <td style={{ padding: "12px 20px", textAlign: "right", fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontSize: "1rem", fontWeight: 600, color: "var(--ink)" }}>{tarif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", marginTop: 12 }}>
              Paiement en 1 ou 3 fois par chèque. Financement CE ou aides CAF possible.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--rose-wash)", border: "1px solid var(--rose-deep)", borderRadius: 6, padding: 24, boxShadow: "6px 6px 0 var(--paper-deep)" }}>
              <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.125rem", color: "var(--ink)", margin: "0 0 12px" }}>Adhésion annuelle</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)" }}>Cotisation association</span>
                <span style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontSize: "1.75rem", fontWeight: 600, color: "var(--rose-deep)" }}>70 €</span>
              </div>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", margin: "8px 0 0" }}>Valable pour l'année scolaire complète.</p>
            </div>
            <div style={{ background: "var(--lavande-wash)", border: "1px solid var(--lavande-deep)", borderRadius: 6, padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.125rem", color: "var(--ink)", margin: "0 0 12px" }}>Caution costumes</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)" }}>Remboursée en fin de saison</span>
                <span style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontSize: "1.75rem", fontWeight: 600, color: "var(--lavande-deep)" }}>50 €</span>
              </div>
            </div>
            <div style={{ background: "var(--mousse-wash)", border: "1px solid var(--mousse-deep)", borderRadius: 6, padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)", margin: "0 0 6px" }}>🎁 Attestation CE disponible</h3>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", margin: 0 }}>
                Nous fournissons une attestation pour votre comité d'entreprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA inscription */}
      <div style={{ background: "var(--ink)", padding: "64px 0" }}>
        <div style={{ ...S, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, color: "var(--paper)", margin: "0 0 16px" }}>
            Prêt·e à monter sur scène ?
          </h2>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", color: "var(--ink-line)", margin: "0 0 32px" }}>
            Commencez par une séance d'essai gratuite. Aucun engagement.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-acap" style={{ background: "var(--paper)", color: "var(--ink)" }}>
              Réserver une séance d'essai →
            </Link>
            <Link href="/contact" className="btn-acap btn-acap--secondary" style={{ borderColor: "var(--paper-warm)", color: "var(--paper-warm)" }}>
              Formulaire d'inscription
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
