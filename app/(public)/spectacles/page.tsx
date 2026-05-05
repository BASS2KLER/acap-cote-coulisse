import type { Metadata } from "next";
import SpectaclesListe from "@/components/spectacles/SpectaclesListe";

export const metadata: Metadata = {
  title: "La saison 2025–2026 — L'ACAP",
  description: "Les spectacles à Saint-Prix cette saison. Dates, horaires, tarifs et réservations.",
};

const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

export default function SpectaclesPage() {
  return (
    <>
      {/* En-tête éditorial */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--moutarde-deep)" }}>
            ★ Saison 2025–2026
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            Les spectacles
          </h1>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "52ch", margin: 0 }}>
            Nos prochains rendez-vous à Saint-Prix. Réservez tôt — ça part vite !
          </p>
        </div>
      </div>

      {/* Liste */}
      <div style={{ ...S, padding: "48px 48px 80px" }}>
        <SpectaclesListe />

        {/* Bloc comment réserver */}
        <div style={{ marginTop: 48, background: "var(--rose-wash)", border: "1px solid var(--rose-deep)", borderRadius: 6, padding: "32px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.75rem", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 8px" }}>
            Comment réserver ?
          </h2>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.9375rem", color: "var(--ink-soft)", margin: "0 0 24px" }}>
            Deux façons de nous réserver une place :
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { emoji: "📞", titre: "Par téléphone", desc: "Hélène Toutain — 06 81 67 04 98 ou Florence Guillot — 06 33 62 20 42" },
              { emoji: "🚶", titre: "Sur place", desc: "La billetterie ouvre 45 minutes avant le début de chaque représentation." },
            ].map(({ emoji, titre, desc }) => (
              <div key={titre} style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--rose-deep)", borderRadius: 4, padding: 20 }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{emoji}</div>
                <div style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)", marginBottom: 6 }}>{titre}</div>
                <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.875rem", color: "var(--ink-soft)", margin: 0, lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
