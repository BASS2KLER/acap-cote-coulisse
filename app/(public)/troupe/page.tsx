import type { Metadata } from "next";
import Link from "next/link";
import { MEMBRES } from "@/data/spectacles";

export const metadata: Metadata = {
  title: "La troupe — L'ACAP",
  description: "Découvrez les membres de la troupe de théâtre amateur L'ACAP à Saint-Prix (95).",
};

const AVATAR_WASHES = ["var(--rose-wash)", "var(--moutarde-wash)", "var(--mousse-wash)", "var(--lavande-wash)"];
const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

export default function TroupePage() {
  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--mousse-deep)" }}>
            🌱 Depuis 2003
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            La troupe
          </h1>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "52ch", margin: 0 }}>
            Une trentaine de passionnés qui font du théâtre pour le plaisir.
          </p>
        </div>
      </div>

      <section style={{ ...S, padding: "64px 48px" }}>
        {/* Citation */}
        <blockquote style={{
          fontFamily: "var(--font-fraunces, Fraunces, serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
          lineHeight: 1.5,
          color: "var(--ink)",
          borderLeft: "2px solid var(--mousse)",
          paddingLeft: 28,
          margin: "0 0 56px",
          maxWidth: "56ch",
        }}>
          "On fait du théâtre comme on irait à un club de belote ou de chant choral.
          Pour le plaisir, pour les amis, pour la joie que ça donne au public."
          <footer style={{ fontFamily: "var(--font-worksans)", fontStyle: "normal", fontSize: "0.875rem", color: "var(--ink-muted)", marginTop: 12 }}>
            — Marie-Claire Fontaine, metteure en scène
          </footer>
        </blockquote>

        {/* Membres */}
        <div style={{ marginBottom: 16 }}>
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Les membres</span>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 32px" }}>
            Quelques visages de la troupe
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 56 }}>
          {MEMBRES.map((membre, i) => (
            <div key={membre.id} style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 24, boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.1)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: AVATAR_WASHES[i % 4], border: "1px solid var(--ink-line)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>
                {membre.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1.0625rem", color: "var(--ink)", margin: "0 0 4px" }}>{membre.nom}</h3>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink-soft)", margin: "0 0 10px" }}>{membre.role}</p>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", lineHeight: 1.55, color: "var(--ink-muted)", margin: "0 0 10px" }}>{membre.bio}</p>
              <span style={{ display: "inline-block", fontFamily: "var(--font-worksans)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "var(--ink-muted)", background: "var(--paper-warm)", border: "1px solid var(--ink-line)", padding: "3px 10px", borderRadius: 999 }}>
                Depuis {membre.depuis}
              </span>
            </div>
          ))}
        </div>

        {/* Rejoindre */}
        <div id="rejoindre" style={{ background: "var(--mousse-wash)", border: "1px solid var(--mousse-deep)", borderRadius: 6, padding: "40px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.75rem", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 12px" }}>
                Tu veux nous <em className="show-name">rejoindre ?</em>
              </h2>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 10px" }}>
                On accueille des nouveaux membres chaque année, en septembre. Aucune expérience requise.
              </p>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", lineHeight: 1.55, color: "var(--ink-muted)", margin: 0 }}>
                Viens voir une répétition le mardi soir, sans engagement.
              </p>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {[
                  "📅 Ateliers le lundi, mardi et mercredi soir",
                  "📍 Le Jardin d'Hélène, Saint-Prix",
                  "🎭 Débutants bienvenus",
                  "💶 Adhésion annuelle : 70 €",
                ].map((item) => (
                  <div key={item} style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)" }}>{item}</div>
                ))}
              </div>
              <Link href="/contact" className="btn-acap">
                Je veux rejoindre la troupe →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
