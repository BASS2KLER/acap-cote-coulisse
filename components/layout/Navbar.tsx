"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LIENS = [
  { href: "/", label: "Accueil" },
  { href: "/acap", label: "L'ACAP" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/spectacles", label: "Spectacles" },
  { href: "/galerie", label: "Galerie" },
  { href: "/pratique", label: "Infos pratiques" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-creme-pale border-b-2 border-filet backdrop-blur-sm">
      <div className="max-w-page mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group"
          aria-label="L'ACAP — accueil"
        >
          {/* Masques SVG */}
          <svg width="52" height="30" viewBox="0 0 200 110" aria-hidden="true">
            <ellipse cx="36" cy="42" rx="28" ry="32" fill="#cfcfcf" stroke="#2a2118" strokeWidth="3"/>
            <path d="M22 38 q4 -4 8 0 M38 38 q4 -4 8 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M22 56 q14 -4 24 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <ellipse cx="62" cy="58" rx="28" ry="32" fill="#d8553e" stroke="#2a2118" strokeWidth="3"/>
            <path d="M50 50 q4 -4 8 0 M66 50 q4 -4 8 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M50 64 q14 8 24 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
          </svg>
          <div>
            <div
              className="font-display font-black text-xl leading-none text-encre group-hover:text-tomate-600 transition-colors"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              L'ACAP
            </div>
            <div
              className="text-xs text-encre-douce italic leading-none mt-0.5"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              théâtre à Saint-Prix
            </div>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          {LIENS.map((lien) => {
            const actif =
              lien.href === "/"
                ? pathname === "/"
                : pathname.startsWith(lien.href);
            return (
              <Link
                key={lien.href}
                href={lien.href}
                className={`
                  font-body font-bold text-sm no-underline transition-colors duration-150
                  hover:text-tomate-600 relative
                  ${actif ? "text-tomate-600" : "text-encre"}
                `}
                style={{ fontFamily: "var(--font-nunito, Nunito, sans-serif)" }}
              >
                {lien.label}
                {actif && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-tomate-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA réservation + burger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact#essai"
            className="hidden md:inline-flex btn-acap text-sm py-2.5 px-5"
          >
            Séance d'essai →
          </Link>
          <button
            className="md:hidden p-2 rounded-lg border-2 border-encre bg-creme text-encre"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-expanded={menuOuvert}
            aria-label="Menu"
          >
            {menuOuvert ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t-2 border-filet bg-creme-pale px-6 pb-6 pt-4"
          >
            <nav className="flex flex-col gap-3">
              {LIENS.map((lien) => {
                const actif =
                  lien.href === "/" ? pathname === "/" : pathname.startsWith(lien.href);
                return (
                  <Link
                    key={lien.href}
                    href={lien.href}
                    className={`font-body font-bold text-base py-2 border-b border-filet last:border-0 no-underline
                      ${actif ? "text-tomate-600" : "text-encre"}`}
                    onClick={() => setMenuOuvert(false)}
                  >
                    {lien.label}
                  </Link>
                );
              })}
              <Link
                href="/contact#essai"
                className="btn-acap mt-2 text-center"
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
