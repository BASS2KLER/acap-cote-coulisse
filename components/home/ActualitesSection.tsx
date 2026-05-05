"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { ToneCouleur } from "@/lib/types";
import Section, { SectionTitre } from "@/components/ui/Section";
import { getToneClasses } from "@/lib/utils";

export default function ActualitesSection() {
  const raw = useQuery(api.actualites.list);
  const actualites = raw ?? [];

  return (
    <Section className="bg-creme-deep rounded-2xl">
      <SectionTitre
        titre="Actualités"
        sous="Les nouvelles de la troupe"
        centré
      />

      <div className="grid md:grid-cols-3 gap-6">
        {actualites.map((actu, i) => {
          const tone = getToneClasses(actu.tone as ToneCouleur);
          return (
            <motion.article
              key={actu._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`chip-acap text-xs ${tone.chip}`}
                >
                  {actu.tag}
                </span>
                <span className="text-xs text-gris-poussiere">{actu.date}</span>
              </div>
              <h3
                className="font-display font-bold text-xl mb-3 leading-snug"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                {actu.titre}
              </h3>
              <p className="text-sm text-encre-douce leading-relaxed flex-1">
                {actu.contenu}
              </p>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
