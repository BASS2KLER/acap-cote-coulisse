"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErreur(false);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setErreur(true);
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100svh",
      background: "var(--paper)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "var(--paper-warm)",
        border: "1px solid var(--ink-line)",
        borderRadius: 12,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 24px rgba(42,39,34,0.08)",
      }}>
        {/* Logo + titre */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Image
              src="/logo-acap-v2.png"
              alt=""
              width={64}
              height={64}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontWeight: 600,
            fontSize: "1.75rem",
            color: "var(--ink)",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}>
            L'ACAP
          </h1>
          <p style={{
            fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
            fontSize: "0.875rem",
            color: "var(--ink-muted)",
            margin: 0,
          }}>
            Administration du site
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{
              fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "var(--ink)",
            }}>
              Mot de passe
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                fontSize: "1rem",
                padding: "12px 16px",
                border: `1.5px solid ${erreur ? "var(--rose-deep)" : "var(--ink-line)"}`,
                borderRadius: 8,
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
                outline: "none",
                transition: "border-color 140ms",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            {erreur && (
              <p style={{
                fontSize: "0.8125rem",
                color: "var(--rose-deep)",
                fontWeight: 600,
                margin: 0,
                fontFamily: "var(--font-worksans, Work Sans, system-ui, sans-serif)",
              }}>
                Mot de passe incorrect.
              </p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-acap"
            style={{ justifyContent: "center", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </div>
  );
}