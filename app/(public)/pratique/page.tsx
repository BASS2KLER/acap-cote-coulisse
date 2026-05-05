import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infos pratiques — L'ACAP",
  description: "Adresse, horaires, tarifs et tenue pour les ateliers de théâtre L'ACAP à Saint-Prix.",
};

const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

export default function PratiquePage() {
  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--lavande-deep)" }}>
            🗺 Pratique
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            Infos pratiques
          </h1>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "52ch", margin: 0 }}>
            Tout ce qu'il faut savoir pour rejoindre les ateliers.
          </p>
        </div>
      </div>

      <section style={{ ...S, padding: "64px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Lieu */}
          <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 28, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--ink)", margin: "0 0 16px" }}>
              📍 Le Jardin d'Hélène
            </h2>
            <address style={{ fontStyle: "normal", fontFamily: "var(--font-worksans)", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 16 }}>
              <strong style={{ color: "var(--ink)" }}>6 rue Auguste Rey</strong><br />
              95390 Saint-Prix<br />
              Val-d'Oise (95)
            </address>
            <div style={{ background: "var(--paper-warm)", border: "1px solid var(--ink-line)", borderRadius: 4, padding: 14 }}>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)", margin: "0 0 4px" }}>🚗 Parking à proximité</p>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)", margin: 0 }}>🎚 Salle équipée son & lumière (50 places)</p>
            </div>
          </div>

          {/* Saison & horaires */}
          <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 28, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--ink)", margin: "0 0 16px" }}>
              📅 Saison & horaires
            </h2>
            <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1rem", color: "var(--ink-soft)", margin: "0 0 16px" }}>
              <strong style={{ color: "var(--ink)" }}>Saison :</strong> fin septembre → fin juin
            </p>
            <div>
              {[
                { jour: "Lundi",    h: "20h30 – 22h30", label: "Adultes" },
                { jour: "Mardi",   h: "18h – 19h30",   label: "Primaires / collège" },
                { jour: "Mardi",   h: "20h15 – 22h45", label: "Classique avancés" },
                { jour: "Mercredi",h: "16h45 – 17h30", label: "Découverte enfants" },
                { jour: "Mercredi",h: "18h – 20h",     label: "Atelier oral" },
                { jour: "Mercredi",h: "20h30 – 22h30", label: "Adultes" },
              ].map(({ jour, h, label }) => (
                <div key={`${jour}-${h}`} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--ink-line)", fontFamily: "var(--font-worksans)", fontSize: "0.875rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--ink)", width: 72, flexShrink: 0 }}>{jour}</span>
                  <span style={{ color: "var(--ink-muted)", width: 100, flexShrink: 0 }}>{h}</span>
                  <span style={{ color: "var(--ink-soft)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tenue */}
          <div style={{ background: "var(--mousse-wash)", border: "1px solid var(--mousse-deep)", borderRadius: 6, padding: 28 }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--ink)", margin: "0 0 16px" }}>
              👕 Tenue
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { ok: true,  text: "Vêtements souples et confortables" },
                { ok: true,  text: "Pieds nus ou chaussons de danse" },
                { ok: false, text: "Pas de bijoux (risque de blessure)" },
              ].map(({ ok, text }) => (
                <li key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)" }}>
                  <span style={{ color: ok ? "var(--mousse-deep)" : "var(--rose-deep)", fontWeight: 700, flexShrink: 0 }}>{ok ? "✓" : "✗"}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 28, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--ink)", margin: "0 0 20px" }}>
              📞 Nous contacter
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { nom: "Hélène Toutain", tel: "+33681670498", affich: "06 81 67 04 98" },
                { nom: "Florence Guillot", tel: "+33633622042", affich: "06 33 62 20 42" },
              ].map((c) => (
                <div key={c.nom}>
                  <p style={{ fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 2px" }}>{c.nom}</p>
                  <a href={`tel:${c.tel}`} style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--rose-deep)" }}>{c.affich}</a>
                </div>
              ))}
              <div>
                <p style={{ fontFamily: "var(--font-worksans)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", margin: "0 0 2px" }}>E-mail</p>
                <a href="mailto:lacap95@free.fr" style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--rose-deep)" }}>lacap95@free.fr</a>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Link href="/contact" className="btn-acap" style={{ display: "inline-flex" }}>
                Formulaire d'inscription →
              </Link>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div style={{ marginTop: 24, background: "var(--lavande-wash)", border: "1px solid var(--lavande-deep)", borderRadius: 6, padding: 28 }}>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", margin: "0 0 16px" }}>
            📁 Documents
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", border: "1px solid var(--ink-line)", borderRadius: 4,
              background: "#FBF7EC", fontFamily: "var(--font-worksans)", fontWeight: 600,
              fontSize: "0.875rem", color: "var(--ink)", textDecoration: "none",
            }}>
              📝 Formulaire d'inscription en ligne
            </Link>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", border: "1px solid var(--ink-line)", borderRadius: 4,
              background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-worksans)",
              fontSize: "0.875rem", color: "var(--ink-muted)",
            }}>
              📄 Attestation CE — sur demande
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
