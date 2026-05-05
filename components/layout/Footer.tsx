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
            style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              color: "#fbdc7a",
            }}
          >
            théâtre à Saint-Prix
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#d4c8b3" }}>
            Une troupe d'amateurs passionnés qui font du théâtre pour le plaisir,
            à Saint-Prix (95). On joue depuis 1992.
          </p>
          <p className="text-sm mt-4 font-bold" style={{ color: "#fbdc7a" }}>
            Association loi 1901
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
            Salle des fêtes<br />
            Place de la Mairie<br />
            95390 Saint-Prix<br />
            <span style={{ color: "#8a7d6a" }}>
              🚗 Parking gratuit · ♿ Accès PMR
            </span>
          </address>
          <div className="mt-4 text-sm" style={{ color: "#d4c8b3" }}>
            <div className="font-bold mb-1" style={{ color: "#d4c8b3" }}>Répétitions</div>
            Mardi soir, 20h–22h30
          </div>
        </div>

        {/* Nous contacter */}
        <div>
          <h3
            className="font-display font-bold text-xl mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)", color: "#f3c13a" }}
          >
            Nous écrire
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: "#d4c8b3" }}>
            <a
              href="mailto:contact@acap-theatre.fr"
              className="underline hover:text-creme-pale transition-colors"
              style={{ color: "#fbf6ec" }}
            >
              contact@acap-theatre.fr
            </a>
            <div className="mt-2">01 39 91 XX XX</div>
            <div className="text-xs mt-1" style={{ color: "#8a7d6a" }}>
              Le mardi soir, en répétition
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {[
              { href: "/pratique", label: "Infos pratiques" },
              { href: "/galerie", label: "Galerie photos" },
              { href: "/contact", label: "Formulaire de contact" },
              { href: "/contact#rejoindre", label: "Rejoindre la troupe" },
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
