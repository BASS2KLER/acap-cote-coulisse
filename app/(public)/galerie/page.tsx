import type { Metadata } from "next";
import Link from "next/link";
import { SPECTACLES } from "@/data/spectacles";
import VideoSection from "@/components/galerie/VideoSection";

export const metadata: Metadata = {
  title: "Galerie — L'ACAP",
  description: "Photos de répétitions et de spectacles de la troupe de théâtre ACAP à Saint-Prix.",
};

const SAISONS = ["2024-2025", "2023-2024", "2022-2023"];
const ACCENT_WASHES = ["var(--rose-wash)", "var(--moutarde-wash)", "var(--mousse-wash)", "var(--lavande-wash)"];
const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

export default function GaleriePage() {
  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block", color: "var(--lavande-deep)" }}>
            📸 Archives
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 16px" }}>
            Galerie
          </h1>
          <p style={{ fontFamily: "var(--font-worksans)", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
            Les souvenirs de nos spectacles et de nos répétitions.
          </p>
        </div>
      </div>

      <section style={{ ...S, padding: "64px 48px" }}>
        {/* Section vidéos archives YouTube */}
        <VideoSection />

        {/* Saison en cours */}
        <div style={{ marginBottom: 40 }}>
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Saison 2025–2026</span>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
            Nos spectacles en images
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 64 }}>
          {SPECTACLES.map((spectacle, i) => (
            <Link key={spectacle.id} href={`/spectacles/${spectacle.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 8px 18px -10px rgba(42,39,34,0.12)" }}>
                <div style={{ background: ACCENT_WASHES[i % 4], height: 180, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--ink-line)" }}>
                  <span style={{ fontSize: "4rem", opacity: 0.35 }}>{spectacle.emoji}</span>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontStyle: "italic", fontWeight: 500, fontSize: "1.1875rem", color: "var(--ink)", margin: "0 0 4px" }}>{spectacle.titre}</h3>
                  <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-soft)", margin: "0 0 4px" }}>{spectacle.date}</p>
                  <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.75rem", color: "var(--ink-muted)", fontStyle: "italic", margin: 0 }}>Photos de répétitions à venir</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Saisons précédentes */}
        <div style={{ marginBottom: 32 }}>
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Archives</span>
          <h2 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.875rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
            Saisons précédentes
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SAISONS.map((saison, i) => (
            <div key={saison} style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)", borderRadius: 6, padding: 24, boxShadow: "0 2px 0 rgba(42,39,34,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", fontWeight: 500, fontSize: "1.125rem", color: "var(--ink)", margin: 0 }}>
                  Saison {saison}
                </h3>
                <span style={{ fontFamily: "var(--font-worksans)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "var(--ink-muted)", background: "var(--paper-warm)", border: "1px solid var(--ink-line)", padding: "3px 10px", borderRadius: 999 }}>
                  Archives
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} style={{ aspectRatio: "1", borderRadius: 4, border: "1px solid var(--ink-line)", background: ACCENT_WASHES[(i + j) % 4], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", opacity: 0.7 }}>
                    🎭
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-worksans)", fontSize: "0.8125rem", color: "var(--ink-muted)", marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>
                Photos disponibles sur demande —{" "}
                <Link href="/contact" style={{ color: "var(--rose-deep)" }}>contactez-nous</Link>.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
