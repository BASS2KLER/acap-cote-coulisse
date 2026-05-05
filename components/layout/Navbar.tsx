"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const LIENS = [
  { href: "/acap",       label: "L'ACAP" },
  { href: "/ateliers",   label: "Ateliers" },
  { href: "/spectacles", label: "Spectacles" },
  { href: "/galerie",    label: "Galerie" },
  { href: "/pratique",   label: "Infos pratiques" },
  { href: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(245,239,227,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--ink-line)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, height: 64 }}>

          {/* Marque */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 4, overflow: "hidden", border: "1px solid var(--ink-line)", flexShrink: 0 }}>
              <Image
                src="/logo-acap.jpg"
                alt=""
                width={34}
                height={34}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "var(--ink)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>
                L'ACAP
              </div>
              <div style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontStyle: "italic",
                fontSize: "0.6875rem",
                color: "var(--ink-muted)",
                lineHeight: 1.2,
              }}>
                théâtre à Saint-Prix
              </div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex" style={{ display: "flex", gap: 24, flex: 1, marginLeft: 8 }} aria-label="Navigation principale">
            {LIENS.map((lien) => {
              const actif = pathname === lien.href || (lien.href !== "/" && pathname.startsWith(lien.href));
              return (
                <Link
                  key={lien.href}
                  href={lien.href}
                  style={{
                    fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: actif ? "var(--ink)" : "var(--ink-soft)",
                    textDecoration: "none",
                    padding: "6px 0",
                    position: "relative",
                    transition: "color 140ms",
                  }}
                >
                  {lien.label}
                  {actif && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        left: -2,
                        right: -2,
                        bottom: 0,
                        height: 5,
                        background: "var(--rose)",
                        borderRadius: 2,
                        opacity: 0.7,
                        zIndex: -1,
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
                borderRadius: 4,
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
              background: "var(--paper)",
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
                      fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                      fontSize: "1rem",
                      fontWeight: actif ? 600 : 400,
                      color: actif ? "var(--ink)" : "var(--ink-soft)",
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
