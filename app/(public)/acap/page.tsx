"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const VALEURS = [
  { emoji: "🎭", titre: "Le jeu avant tout", desc: "On apprend en jouant. Pas de jugement, juste l'envie de s'amuser et de progresser ensemble." },
  { emoji: "🌱", titre: "Tous niveaux", desc: "Débutants complets ou comédiens aguerris — il y a un atelier pour vous." },
  { emoji: "🤝", titre: "Bienveillance", desc: "Un cadre sécurisé où chacun peut prendre des risques, se tromper et grandir." },
  { emoji: "🏆", titre: "Un vrai spectacle", desc: "Chaque saison, la troupe monte sur scène pour présenter son travail au public." },
];

const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

export default function AcapPage() {
  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--lavande-deep)" }}>
            🎭 L'association
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            L'ACAP
          </h1>
          <p style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontSize: "1.25rem", lineHeight: 1.4, color: "var(--ink-soft)", margin: 0 }}>
            Une école de théâtre à Saint-Prix depuis 2003
          </p>
        </div>
      </div>

      {/* Qui sommes-nous */}
      <section style={{ ...S, padding: "64px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Qui sommes-nous ?</span>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 24px" }}>
              Une troupe de <em className="show-name">passionnés</em>
            </h2>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: "0 0 16px" }}>
              L'ACAP est une association loi 1901 fondée en 2003 à Saint-Prix, dans le Val-d'Oise.
              Elle propose des ateliers de théâtre pour tous les âges, du mercredi après-midi pour
              les enfants jusqu'aux cours du soir pour adultes.
            </p>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 16px" }}>
              Les ateliers se déroulent au <strong style={{ color: "var(--ink-soft)" }}>Jardin d'Hélène</strong>, une
              petite salle de spectacle de 50 places entièrement équipée.
            </p>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
              Chaque saison se clôture par un ou plusieurs spectacles joués devant le public.
              Les anciens élèves reviennent souvent — c'est toujours une belle fête.
            </p>
          </div>

          {/* Carte identité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "#FBF7EC",
              border: "1px solid var(--ink-line)",
              borderRadius: 6,
              padding: 28,
              boxShadow: "8px 8px 0 var(--paper-deep)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 20px" }}>
              En bref
            </h2>
            {[
              { label: "Fondée en", valeur: "2003" },
              { label: "Statut", valeur: "Association loi 1901" },
              { label: "Lieu", valeur: "Le Jardin d'Hélène\n6 rue Auguste Rey, Saint-Prix (95)" },
              { label: "Public", valeur: "Enfants dès 8 ans, adultes tous niveaux" },
              { label: "Saison", valeur: "Fin septembre → fin juin" },
              { label: "Contact", valeur: "lacap95@free.fr" },
            ].map(({ label, valeur }) => (
              <div key={label} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: "1px solid var(--ink-line)" }}>
                <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", width: 96, flexShrink: 0 }}>{label}</span>
                <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--ink)", whiteSpace: "pre-line" }}>{valeur}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section style={{ background: "var(--paper-warm)", padding: "64px 0" }}>
        <div style={S}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Notre approche</span>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
              Le théâtre comme outil de développement
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {VALEURS.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 24, boxShadow: "0 2px 0 rgba(42,39,34,0.04)" }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: 12 }}>{v.emoji}</div>
                <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.125rem", color: "var(--ink)", margin: "0 0 8px" }}>{v.titre}</h3>
                <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Le Jardin d'Hélène */}
      <section style={{ ...S, padding: "64px 48px" }}>
        <div style={{ background: "var(--moutarde-wash)", border: "1px solid var(--moutarde-deep)", borderRadius: 6, padding: "40px 48px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 8, border: "1px dashed var(--moutarde-deep)", borderRadius: 4, opacity: 0.3, pointerEvents: "none" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "2rem", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 16px" }}>
                Le Jardin d'Hélène
              </h2>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: "0 0 16px" }}>
                Une petite salle de spectacle de <strong>50 places</strong> entièrement
                équipée — régie son et lumière, décors, vestiaire.
              </p>
              <address style={{ fontStyle: "normal", fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                6 rue Auguste Rey<br />95390 Saint-Prix (Val-d'Oise)
              </address>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { emoji: "🎚", label: "Régie son & lumière" },
                { emoji: "🎬", label: "Salle de 50 places" },
                { emoji: "👗", label: "Espace costumes" },
                { emoji: "🚗", label: "Parking à proximité" },
              ].map(({ emoji, label }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--moutarde-deep)", borderRadius: 6, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{emoji}</div>
                  <div style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...S, padding: "32px 48px 64px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "2rem", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 12px" }}>
          Envie de nous rejoindre ?
        </h2>
        <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1rem", color: "var(--ink-soft)", margin: "0 0 28px" }}>
          La première séance est offerte. Venez voir par vous-même.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/ateliers" className="btn-acap">Voir les ateliers →</Link>
          <Link href="/contact" className="btn-acap btn-acap--secondary">Séance d'essai gratuite</Link>
        </div>
      </section>
    </>
  );
}
