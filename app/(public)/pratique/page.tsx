import type { Metadata } from "next";
import Link from "next/link";
import { INFO_PRATIQUE } from "@/data/spectacles";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Infos pratiques — L'ACAP",
  description:
    "Horaires, tarifs, adresse, parking et accès PMR pour venir voir les spectacles de l'ACAP à Saint-Prix.",
};

export default function PratiquePage() {
  return (
    <>
      <div className="bg-ciel-100 border-b-2 border-encre py-12">
        <div className="max-w-page mx-auto px-6">
          <span className="chip-acap bg-ciel-200 text-ciel-ink inline-flex mb-4">
            🗺 Pratique
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            Infos pratiques
          </h1>
          <p className="text-lg text-encre-douce">
            Tout ce qu'il faut savoir pour venir nous voir.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Où nous trouver */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2
              className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              📍 Où nous trouver
            </h2>
            <address className="not-italic text-base text-encre leading-relaxed mb-4">
              <strong>Salle des fêtes de Saint-Prix</strong><br />
              Place de la Mairie<br />
              95390 Saint-Prix<br />
              Val-d'Oise (95)
            </address>
            <div className="bg-creme-deep border border-filet rounded-lg p-4 text-sm">
              <p className="font-bold mb-1">Accès</p>
              <ul className="space-y-1 text-encre-douce">
                <li>🚗 Parking gratuit devant la salle</li>
                <li>🚌 Bus : ligne 95-15 (arrêt Mairie)</li>
                <li>♿ Salle accessible de plain-pied, places PMR</li>
              </ul>
            </div>
          </div>

          {/* Horaires répétitions */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2
              className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              🕗 Horaires & répétitions
            </h2>
            <div className="space-y-3">
              {INFO_PRATIQUE.horaires.map((h) => (
                <p key={h} className="text-base text-encre leading-relaxed">
                  • {h}
                </p>
              ))}
            </div>
            <div className="mt-5 bg-soleil-100 border border-soleil-400 rounded-lg p-4 text-sm text-encre">
              <strong>Bon à savoir :</strong> les répétitions sont ouvertes aux
              curieux. Venez voir une séance avant de vous engager !
            </div>
          </div>

          {/* Tarifs */}
          <div className="bg-tomate-100 border-2 border-encre rounded-xl p-6 shadow-tomate">
            <h2
              className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              🎟 Tarifs
            </h2>
            <div className="space-y-3">
              {[
                { label: "Adulte", prix: "10 €" },
                { label: "Enfant (- 12 ans)", prix: "6 €" },
                { label: "Spectacle famille", prix: "8 € / 5 €" },
                { label: "Spectacle en plein air", prix: "Libre participation" },
              ].map(({ label, prix }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-tomate-200 last:border-0"
                >
                  <span className="text-base text-encre">{label}</span>
                  <span className="font-bold text-base text-encre">{prix}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-encre-douce mt-4">
              Paiement en espèces ou par chèque à l'ordre de « L'ACAP ».
            </p>
          </div>

          {/* Contact */}
          <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
            <h2
              className="font-display font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              📞 Nous contacter
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-base mb-0.5">Téléphone</p>
                <p className="text-encre-douce">
                  {INFO_PRATIQUE.contact}
                </p>
              </div>
              <div>
                <p className="font-bold text-base mb-0.5">E-mail</p>
                <a
                  href={`mailto:${INFO_PRATIQUE.email}`}
                  className="text-tomate-600 hover:underline font-body"
                >
                  {INFO_PRATIQUE.email}
                </a>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="btn-acap inline-flex text-base py-3 px-6"
              >
                Formulaire de contact →
              </Link>
            </div>
          </div>
        </div>

        {/* Accessibilité PMR */}
        <div className="mt-8 bg-ciel-50 border-2 border-encre rounded-xl p-6">
          <h2
            className="font-display font-bold text-xl text-encre mb-3"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            ♿ Accessibilité
          </h2>
          <p className="text-base text-encre leading-relaxed">
            {INFO_PRATIQUE.pmr}. Des places réservées en première rangée sont
            disponibles sur demande. N'hésitez pas à nous appeler en avance si
            vous avez besoin d'un accompagnement particulier.
          </p>
        </div>
      </Section>
    </>
  );
}
