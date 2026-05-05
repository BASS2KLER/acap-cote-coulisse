import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ marginTop: 80, borderTop: "1px solid var(--ink-line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px 0" }}>

        {/* 4 colonnes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 32,
          marginBottom: 32,
        }}>

          {/* Colonne marque */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 4, overflow: "hidden", border: "1px solid var(--ink-line)" }}>
                <Image src="/logo-acap.jpg" alt="L'ACAP" width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <span style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--ink)",
              }}>
                L'ACAP
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              maxWidth: "30ch",
              margin: 0,
            }}>
              Ateliers de théâtre pour adultes et enfants depuis 2003.
              Au Jardin d'Hélène, Saint-Prix (95).
            </p>
          </div>

          {/* Colonne saison */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink)",
              margin: "0 0 12px",
            }}>
              Les ateliers
            </h4>
            {[
              { href: "/ateliers", label: "Programme" },
              { href: "/ateliers#tarifs", label: "Tarifs" },
              { href: "/contact", label: "Séance d'essai" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{
                display: "block",
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                fontSize: "0.875rem",
                color: "var(--ink-soft)",
                textDecoration: "none",
                padding: "4px 0",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Colonne association */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink)",
              margin: "0 0 12px",
            }}>
              L'association
            </h4>
            {[
              { href: "/acap", label: "Qui sommes-nous" },
              { href: "/troupe", label: "La troupe" },
              { href: "/spectacles", label: "Les spectacles" },
              { href: "/galerie", label: "Galerie" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{
                display: "block",
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                fontSize: "0.875rem",
                color: "var(--ink-soft)",
                textDecoration: "none",
                padding: "4px 0",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Colonne contact */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink)",
              margin: "0 0 12px",
            }}>
              Nous trouver
            </h4>
            <address style={{
              fontStyle: "normal",
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              margin: "0 0 12px",
            }}>
              Le Jardin d'Hélène<br />
              6 rue Auguste Rey<br />
              95390 Saint-Prix
            </address>
            <a href="mailto:lacap95@free.fr" style={{
              display: "block",
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--rose-deep)",
              padding: "2px 0",
            }}>
              lacap95@free.fr
            </a>
            <a href="tel:+33681670498" style={{
              display: "block",
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--ink-soft)",
              textDecoration: "none",
              padding: "2px 0",
            }}>
              06 81 67 04 98
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 48px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px dashed var(--ink-line)",
          paddingTop: 18,
          fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
          fontSize: "0.75rem",
          color: "var(--ink-muted)",
        }}>
          <span>© 2026 L'ACAP · Association loi 1901 · Saint-Prix (Val-d'Oise)</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/mentions-legales" style={{ color: "inherit", textDecoration: "none" }}>
              Mentions légales
            </Link>
            <span>Site fait à la main avec ✶</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
