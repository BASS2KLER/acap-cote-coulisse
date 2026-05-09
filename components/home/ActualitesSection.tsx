"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ActualitesSection() {
  const raw = useQuery(api.actualites.list);
  const actualites = raw ?? [];

  if (actualites.length === 0) return null;

  return (
    <section style={{
      background: "var(--cream-deep)",
      padding: "80px 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* En-tête */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}
        >
          <div>
            <span className="kicker" style={{ marginBottom: 10, display: "block" }}>
              Actualités
            </span>
            <h2 style={{
              fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: 0,
            }}>
              Nouvelles de la troupe
            </h2>
          </div>
        </motion.header>

        {/* Grille */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {actualites.map((actu, i) => (
            <motion.article
              key={actu._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--white)",
                border: "1px solid var(--sand)",
                borderRadius: 16,
                padding: "22px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--brick)",
                  background: "var(--brick-wash)",
                  padding: "4px 12px",
                  borderRadius: 999,
                }}>
                  {actu.tag}
                </span>
                <span style={{
                  fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                  fontSize: "0.75rem",
                  color: "var(--ink-muted)",
                }}>
                  {actu.date}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-abril, 'Abril Fatface', serif)",
                fontWeight: 400,
                fontSize: "1.125rem",
                lineHeight: 1.2,
                color: "var(--ink)",
                margin: "0 0 10px",
              }}>
                {actu.titre}
              </h3>
              <p style={{
                fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--ink-soft)",
                margin: 0,
                flex: 1,
              }}>
                {actu.contenu}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
