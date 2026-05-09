"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TroupeSection() {
  const raw = useQuery(api.membres.list);
  const membres = (raw ?? []).slice(0, 4);

  return (
    <section style={{
      background: "var(--white)",
      padding: "80px 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="kicker" style={{ marginBottom: 12, display: "block" }}>
              La troupe
            </span>
            <h2 style={{
              fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}>
              Une trentaine de passionnés
            </h2>
            <p style={{
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "1.0625rem",
              fontWeight: 500,
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              margin: "0 0 16px",
            }}>
              On est profs, infirmières, retraités, fonctionnaires, parents —
              et on fait du théâtre pour le plaisir, comme on irait à un club
              de belote ou de chant choral.
            </p>
            <p style={{
              fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--ink-muted)",
              margin: "0 0 36px",
            }}>
              La troupe se retrouve chaque semaine depuis plus de vingt ans.
              Les répétitions sont ouvertes aux curieux — venez voir une séance
              avant de vous décider.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/troupe" className="btn-acap">
                Découvrir la troupe →
              </Link>
              <Link href="/contact" className="btn-acap btn-acap--ghost">
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
                  background: "var(--cream)",
                  border: "1px solid var(--sand)",
                  borderRadius: 16,
                  padding: "20px 18px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--brick-wash)",
                  border: "2px solid var(--brick)",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "var(--brick)",
                }}>
                  {membre.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{
                  fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}>
                  {membre.nom.split(" ")[0]}
                </div>
                <div style={{
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  color: "var(--ink-soft)",
                }}>
                  {membre.role}
                </div>
                <div style={{
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
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
      </div>
    </section>
  );
}
