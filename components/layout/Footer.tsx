import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-encre text-creme-pale mt-24">
      <div className="max-w-page mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        {/* Identité */}
        <div>
          <div
            className="font-display font-black text-3xl mb-1"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            L'ACAP
          </div>
          <div
            className="italic text-lg mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", color: "#fbdc7a" }}
          >
            école de théâtre à Saint-Prix
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#d4c8b3" }}>
            Ateliers de théâtre pour adultes et enfants depuis 2003.
            Au Jardin d'Hélène, 6 rue Auguste Rey, Saint-Prix (95).
          </p>
          <p className="text-sm mt-4 font-bold" style={{ color: "#fbdc7a" }}>
            Association loi 1901 — fondée en 2003
          </p>
        </div>

        {/* Nous trouver */}
        <div>
          <h3
            className="font-display font-bold text-xl mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", color: "#f3c13a" }}
          >
            Nous trouver
          </h3>
          <address className="not-italic text-sm leading-relaxed" style={{ color: "#d4c8b3" }}>
            <strong style={{ color: "#fbf6ec" }}>Le Jardin d'Hélène</strong><br />
            6 rue Auguste Rey<br />
            95390 Saint-Prix<br />
          </address>
          <div className="mt-4 text-sm" style={{ color: "#d4c8b3" }}>
            <div className="font-bold mb-2" style={{ color: "#d4c8b3" }}>Ateliers</div>
            <div>Lun, Mar, Mer — voir le programme</div>
            <div className="mt-1" style={{ color: "#8a7d6a" }}>Saison oct → juin</div>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3
            className="font-display font-bold text-xl mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", color: "#f3c13a" }}
          >
            Nous contacter
          </h3>
          <div className="text-sm leading-relaxed space-y-2" style={{ color: "#d4c8b3" }}>
            <a
              href="mailto:lacap95@free.fr"
              className="block underline hover:text-creme-pale transition-colors"
              style={{ color: "#fbf6ec" }}
            >
              lacap95@free.fr
            </a>
            <div>
              <span style={{ color: "#8a7d6a" }}>Hélène Toutain</span><br />
              <a href="tel:+33681670498" className="hover:text-creme-pale transition-colors">06 81 67 04 98</a>
            </div>
            <div>
              <span style={{ color: "#8a7d6a" }}>Florence Guillot</span><br />
              <a href="tel:+33633622042" className="hover:text-creme-pale transition-colors">06 33 62 20 42</a>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {[
              { href: "/ateliers", label: "Les ateliers" },
              { href: "/spectacles", label: "Les spectacles" },
              { href: "/galerie", label: "Galerie photos" },
              { href: "/contact", label: "Formulaire d'inscription" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm no-underline hover:underline transition-colors"
                style={{ color: "#a89a82" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bas de page */}
      <div
        className="max-w-page mx-auto px-6 py-4 border-t flex flex-wrap justify-between gap-2 text-xs"
        style={{ borderColor: "#4d4031", color: "#8a7d6a" }}
      >
        <span>© L'ACAP — Association loi 1901 — Saint-Prix (Val-d'Oise)</span>
        <div className="flex gap-4">
          <Link href="/mentions-legales" className="hover:text-creme-pale transition-colors" style={{ color: "inherit" }}>
            Mentions légales
          </Link>
          <span>Site fait avec ♥ par la troupe</span>
        </div>
      </div>
    </footer>
  );
}
