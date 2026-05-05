import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Infos pratiques — L'ACAP",
  description: "Adresse, horaires, tarifs et tenue pour les ateliers de théâtre L'ACAP à Saint-Prix.",
};

export default function PratiquePage() {
  return (
    <>
      <div className="bg-ciel-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-ciel-200 text-ciel-ink inline-flex mb-4">🗺 Pratique</span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Infos pratiques
          </h1>
          <p className="text-lg text-encre-douce">Tout ce qu'il faut savoir pour rejoindre les ateliers.</p>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-8">

          {/* Lieu */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              📍 Le Jardin d'Hélène
            </h2>
            <address className="not-italic text-base text-encre leading-relaxed mb-4">
              <strong>6 rue Auguste Rey</strong><br />
              95390 Saint-Prix<br />
              Val-d'Oise (95)
            </address>
            <div className="bg-creme-deep border border-filet rounded-lg p-4 text-sm space-y-1">
              <p>🚗 Parking à proximité</p>
              <p>🎚 Salle équipée son & lumière (50 places)</p>
            </div>
          </div>

          {/* Saison & horaires */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              📅 Saison & horaires
            </h2>
            <p className="text-base text-encre mb-4">
              <strong>Saison :</strong> fin septembre → fin juin
            </p>
            <div className="space-y-2 text-sm text-encre">
              {[
                { jour: "Lundi", h: "20h30 – 22h30", label: "Adultes" },
                { jour: "Mardi", h: "18h – 19h30", label: "Primaires / collège" },
                { jour: "Mardi", h: "20h15 – 22h45", label: "Classique avancés" },
                { jour: "Mercredi", h: "16h45 – 17h30", label: "Découverte enfants" },
                { jour: "Mercredi", h: "18h – 20h", label: "Atelier oral" },
                { jour: "Mercredi", h: "20h30 – 22h30", label: "Adultes" },
              ].map(({ jour, h, label }) => (
                <div key={`${jour}-${h}`} className="flex gap-3 py-1.5 border-b border-filet last:border-0">
                  <span className="font-bold w-20 flex-shrink-0">{jour}</span>
                  <span className="text-encre-douce w-32 flex-shrink-0">{h}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tenue */}
          <div className="bg-pomme-100 border-2 border-encre rounded-xl p-6">
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              👕 Tenue
            </h2>
            <ul className="space-y-2 text-base text-encre">
              <li className="flex items-start gap-2"><span>✓</span><span>Vêtements souples et confortables</span></li>
              <li className="flex items-start gap-2"><span>✓</span><span>Pieds nus ou chaussons de danse</span></li>
              <li className="flex items-start gap-2"><span>✗</span><span>Pas de bijoux (risque de blessure)</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2 className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              📞 Nous contacter
            </h2>
            <div className="space-y-4 text-base">
              <div>
                <p className="font-bold mb-1">Hélène Toutain</p>
                <a href="tel:+33681670498" className="text-tomate-600 hover:underline">06 81 67 04 98</a>
              </div>
              <div>
                <p className="font-bold mb-1">Florence Guillot</p>
                <a href="tel:+33633622042" className="text-tomate-600 hover:underline">06 33 62 20 42</a>
              </div>
              <div>
                <p className="font-bold mb-1">E-mail</p>
                <a href="mailto:lacap95@free.fr" className="text-tomate-600 hover:underline">lacap95@free.fr</a>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/contact" className="btn-acap inline-flex text-base py-3 px-6">
                Formulaire d'inscription →
              </Link>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-8 bg-ciel-50 border-2 border-encre rounded-xl p-6">
          <h2 className="font-display font-bold text-xl text-encre mb-4"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            📁 Documents
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact#inscription"
              className="flex items-center gap-2 px-5 py-3 border-2 border-encre rounded-lg bg-creme font-bold text-base text-encre hover:bg-creme-deep transition-colors no-underline">
              📝 Formulaire d'inscription en ligne
            </Link>
            <div className="flex items-center gap-2 px-5 py-3 border-2 border-filet rounded-lg bg-creme-pale text-base text-encre-douce">
              📄 Attestation CE — sur demande
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
