import Link from "next/link";

function MasquesFooter() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 40, height: 40, opacity: 0.9 }}>
      <path d="M10 20 C10 5,50 5,50 20 C50 50,30 75,30 75 C30 75,10 50,10 20 Z"
        stroke="var(--cream)" strokeWidth="4" fill="none"/>
      <circle cx="24" cy="26" r="4" fill="var(--cream)"/>
      <circle cx="36" cy="26" r="4" fill="var(--cream)"/>
      <path d="M22 44 C22 54,38 54,38 44"
        stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M55 35 C55 20,95 20,95 35 C95 65,75 90,75 90 C75 90,55 65,55 35 Z"
        stroke="var(--cream)" strokeWidth="4" fill="none"/>
      <path d="M65 44 C65 41,73 41,73 44"
        stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M77 44 C77 41,85 41,85 44"
        stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M67 67 C67 61,83 61,83 67"
        stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const linkStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
  fontSize: "0.875rem",
  color: "rgba(250,247,242,0.7)",
  textDecoration: "none",
  padding: "4px 0",
  transition: "color 140ms",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
  fontSize: "0.6875rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--sand)",
  margin: "0 0 14px",
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--brick-dark)", marginTop: 0 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 48px 0" }}>

        {/* 4 colonnes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 32,
          marginBottom: 40,
        }}>

          {/* Colonne marque */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <MasquesFooter />
              <div>
                <div style={{
                  fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                  fontWeight: 400,
                  fontSize: "1.125rem",
                  color: "var(--white)",
                  lineHeight: 1.1,
                }}>
                  L'ACAP
                </div>
                <div style={{
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "rgba(250,247,242,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  théâtre à Saint-Prix
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "rgba(250,247,242,0.7)",
              maxWidth: "30ch",
              margin: 0,
            }}>
              Ateliers de théâtre pour adultes et enfants depuis 2003.
              Au Jardin d'Hélène, Saint-Prix (95).
            </p>
          </div>

          {/* Colonne ateliers */}
          <div>
            <h4 style={headingStyle}>Les ateliers</h4>
            {[
              { href: "/ateliers", label: "Programme" },
              { href: "/ateliers#tarifs", label: "Tarifs" },
              { href: "/contact", label: "Séance d'essai" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Colonne association */}
          <div>
            <h4 style={headingStyle}>L'association</h4>
            {[
              { href: "/acap", label: "Qui sommes-nous" },
              { href: "/troupe", label: "La troupe" },
              { href: "/spectacles", label: "Les spectacles" },
              { href: "/galerie", label: "Galerie" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Colonne contact */}
          <div>
            <h4 style={headingStyle}>Nous trouver</h4>
            <address style={{
              fontStyle: "normal",
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "0.8125rem",
              lineHeight: 1.7,
              color: "rgba(250,247,242,0.7)",
              margin: "0 0 14px",
            }}>
              Le Jardin d'Hélène<br />
              6 rue Auguste Rey<br />
              95390 Saint-Prix
            </address>
            <a href="mailto:lacap95@free.fr" style={{
              ...linkStyle,
              color: "var(--sand)",
              fontWeight: 600,
            }}>
              lacap95@free.fr
            </a>
            <a href="tel:+33681670498" style={linkStyle}>
              06 81 67 04 98
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 24px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 20,
          fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
          fontSize: "0.75rem",
          color: "rgba(250,247,242,0.45)",
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
