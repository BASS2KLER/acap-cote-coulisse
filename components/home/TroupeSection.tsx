"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Section, { SectionTitre } from "@/components/ui/Section";

export default function TroupeSection() {
  const raw = useQuery(api.membres.list);
  const membres = (raw ?? []).slice(0, 4);

  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Texte gauche */}
        <div>
          <SectionTitre
            titre="La troupe"
            sous="Une trentaine de passionnés"
          />
          <p className="text-base md:text-lg text-encre leading-relaxed mb-5">
            On est profs, infirmières, retraités, fonctionnaires, parents —
            et on fait du théâtre pour le plaisir, comme on irait à un club
            de belote ou de chant choral.
          </p>
          <p className="text-base text-encre-douce leading-relaxed mb-8">
            La troupe se retrouve chaque mardi soir depuis plus de trente ans.
            Les répétitions sont ouvertes aux curieux — venez voir une séance
            avant de vous décider.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/troupe" className="btn-acap">
              Découvrir la troupe →
            </Link>
            <Link
              href="/contact#rejoindre"
              className="btn-acap bg-pomme-500 text-creme-pale"
            >
              Nous rejoindre
            </Link>
          </div>
        </div>

        {/* Cartes membres */}
        <div className="grid grid-cols-2 gap-4">
          {membres.map((membre, i) => (
            <motion.div
              key={membre._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-creme-pale border-2 border-encre rounded-xl p-4 shadow-card"
            >
              {/* Avatar généré */}
              <div
                className="w-14 h-14 rounded-pill border-2 border-encre mb-3 flex items-center justify-center text-2xl font-display font-black"
                style={{
                  background: ["#fad9d2","#fdecb6","#d8ecc4","#cfe1f3"][i % 4],
                  fontFamily: "var(--font-fraunces, Fraunces, serif)",
                }}
              >
                {membre.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div
                className="font-display font-bold text-base leading-tight mb-0.5"
                style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
              >
                {membre.nom.split(" ")[0]}
              </div>
              <div className="text-sm text-encre-douce">{membre.role}</div>
              <div className="text-xs text-gris-poussiere mt-1">
                Depuis {membre.depuis}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
