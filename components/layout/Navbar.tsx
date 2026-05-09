"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LIENS = [
  { href: "/acap",       label: "L'association" },
  { href: "/ateliers",   label: "Ateliers" },
  { href: "/spectacles", label: "Spectacles" },
  { href: "/galerie",    label: "Galerie" },
  { href: "/pratique",   label: "Infos pratiques" },
  { href: "/contact",    label: "Contact" },
];

function MasquesLogo() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 44, height: 44 }}>
      {/* Masque Comique */}
      <path d="M10 20 C10 5,50 5,50 20 C50 50,30 75,30 75 C30 75,10 50,10 20 Z"
        stroke="var(--brick)" strokeWidth="4" fill="white"/>
      <circle cx="24" cy="26" r="4" fill="var(--brick)"/>
      <circle cx="36" cy="26" r="4" fill="var(--brick)"/>
      <path d="M22 44 C22 54,38 54,38 44"
        stroke="var(--brick)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Masque Tragique */}
      <path d="M55 35 C55 20,95 20,95 35 C95 65,75 90,75 90 C75 90,55 65,55 35 Z"
        stroke="var(--brick)" strokeWidth="4" fill="white"/>
      <path d="M65 44 C65 41,73 41,73 44"
        stroke="var(--brick)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M77 44 C77 41,85 41,85 44"
        stroke="var(--brick)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M67 67 C67 61,83 61,83 67"
        stroke="var(--brick)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--ink-line)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, height: 72 }}>

          {/* Marque */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
          >
            <MasquesLogo />
            <div>
              <div style={{
                fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                fontWeight: 400,
                fontSize: "1.125rem",
                color: "var(--ink)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>
                L'ACAP
              </div>
              <div style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontSize: "0.625rem",
                fontWeight: 600,
                color: "var(--ink-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                lineHeight: 1.2,
              }}>
                théâtre à Saint-Prix
              </div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav
            style={{ display: "flex", gap: 28, flex: 1, marginLeft: 8 }}
            aria-label="Navigation principale"
          >
            {LIENS.map((lien) => {
              const actif = pathname === lien.href || (lien.href !== "/" && pathname.startsWith(lien.href));
              return (
                <Link
                  key={lien.href}
                  href={lien.href}
                  style={{
                    fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: actif ? "var(--brick)" : "var(--ink-soft)",
                    textDecoration: "none",
                    padding: "6px 0",
                    position: "relative",
                    transition: "color 140ms",
                    whiteSpace: "nowrap",
                  }}
                  className="hidden md:block"
                >
                  {lien.label}
                  {actif && (
                    <motion.span
                      layoutId="nav-underline-v3"
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        background: "var(--brick)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + burger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link href="/contact" className="btn-acap hidden md:inline-flex">
              Séance d'essai →
            </Link>
            <button
              className="md:hidden"
              style={{
                padding: "8px",
                borderRadius: 8,
                border: "1px solid var(--ink-line)",
                background: "transparent",
                color: "var(--ink)",
                cursor: "pointer",
              }}
              onClick={() => setMenuOuvert(!menuOuvert)}
              aria-expanded={menuOuvert}
              aria-label="Menu"
            >
              {menuOuvert ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              borderTop: "1px solid var(--ink-line)",
              background: "var(--white)",
              padding: "16px 48px 24px",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {LIENS.map((lien) => {
                const actif = pathname === lien.href || (lien.href !== "/" && pathname.startsWith(lien.href));
                return (
                  <Link
                    key={lien.href}
                    href={lien.href}
                    style={{
                      fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                      fontSize: "1rem",
                      fontWeight: actif ? 700 : 400,
                      color: actif ? "var(--brick)" : "var(--ink-soft)",
                      textDecoration: "none",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--ink-line)",
                    }}
                    onClick={() => setMenuOuvert(false)}
                  >
                    {lien.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="btn-acap"
                style={{ marginTop: 12, justifyContent: "center" }}
                onClick={() => setMenuOuvert(false)}
              >
                Séance d'essai →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
