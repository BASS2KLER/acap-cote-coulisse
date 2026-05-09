import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Mentions légales — L'ACAP",
};

export default function MentionsLegalesPage() {
  return (
    <Section>
      <h1
        className="font-display font-black text-3xl text-encre mb-8"
        style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)" }}
      >
        Mentions légales
      </h1>

      <div className="prose max-w-prose space-y-6 text-base text-encre leading-relaxed">
        <div>
          <h2
            className="font-display font-bold text-xl mb-2"
            style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)" }}
          >
            Éditeur du site
          </h2>
          <p>
            L'ACAP — Association loi 1901<br />
            Siège social : Place de la Mairie, 95390 Saint-Prix<br />
            Courriel : contact@acap-theatre.fr
          </p>
        </div>

        <div>
          <h2
            className="font-display font-bold text-xl mb-2"
            style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)" }}
          >
            Hébergement
          </h2>
          <p>
            Ce site est hébergé par Netlify, Inc.<br />
            44 Montgomery Street Suite 300, San Francisco, California 94104, USA
          </p>
        </div>

        <div>
          <h2
            className="font-display font-bold text-xl mb-2"
            style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)" }}
          >
            Propriété intellectuelle
          </h2>
          <p>
            L'ensemble des contenus (textes, images, visuels) présents sur ce site
            appartiennent à L'ACAP. Toute reproduction sans autorisation est interdite.
          </p>
        </div>

        <div>
          <h2
            className="font-display font-bold text-xl mb-2"
            style={{ fontFamily: "var(--font-abril, 'Abril Fatface', serif)" }}
          >
            Données personnelles
          </h2>
          <p>
            Ce site ne collecte aucune donnée personnelle sans votre consentement.
            Les formulaires de contact et de réservation sont traités uniquement
            pour répondre à votre demande.
          </p>
          <p>
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978
            modifiée, vous disposez d'un droit d'accès, de rectification et de
            suppression des données vous concernant.
          </p>
        </div>
      </div>
    </Section>
  );
}
