"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const AVATAR_WASHES = ["var(--rose-wash)", "var(--moutarde-wash)", "var(--mousse-wash)", "var(--lavande-wash)"];

export default function TroupeSection() {
  const raw = useQuery(api.membres.list);
  const membres = (raw ?? []).slice(0, 4);

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="kicker" style={{ marginBottom: 8, display: "block" }}>
            La troupe
          </span>
          <h2 style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 500,
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Une trentaine de{" "}
            <em className="show-name">passionnés</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "1.0625rem",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            margin: "0 0 16px",
          }}>
            On est profs, infirmières, retraités, fonctionnaires, parents —
            et on fait du théâtre pour le plaisir, comme on irait à un club
            de belote ou de chant choral.
          </p>
          <p style={{
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
            margin: "0 0 32px",
          }}>
            La troupe se retrouve chaque semaine depuis plus de vingt ans.
            Les répétitions sont ouvertes aux curieux — venez voir une séance
            avant de vous décider.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/troupe" className="btn-acap">
              Découvrir la troupe →
            </Link>
            <Link href="/contact" className="btn-acap btn-acap--secondary">
              Nous rejoindre
            </Link>
          </div>
        </motion.div>

        {/* Cartes membres */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {membres.map((membre, i) => (
            <motion.div
              key={membre._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.4 }}
              style={{
                background: "#FBF7EC",
                border: "1px solid var(--ink-line)",
                borderRadius: 6,
                padding: "18px 16px",
                boxShadow: "0 2px 0 rgba(42,39,34,0.04), 0 6px 14px -8px rgba(42,39,34,0.12)",
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: AVATAR_WASHES[i % 4],
                border: "1px solid var(--ink-line)",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--ink)",
              }}>
                {membre.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "var(--ink)",
                lineHeight: 1.2,
                marginBottom: 3,
              }}>
                {membre.nom.split(" ")[0]}
              </div>
              <div style={{
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                fontSize: "0.8125rem",
                color: "var(--ink-soft)",
              }}>
                {membre.role}
              </div>
              <div style={{
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                marginTop: 4,
              }}>
                Depuis {membre.depuis}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
