"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-creme flex items-center justify-center px-4">
      <div className="bg-creme-pale border-[3px] border-encre rounded-xl p-10 w-full max-w-md shadow-encre-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <svg width="64" height="36" viewBox="0 0 200 110" className="mx-auto mb-3" aria-hidden="true">
            <ellipse cx="36" cy="42" rx="28" ry="32" fill="#cfcfcf" stroke="#2a2118" strokeWidth="3"/>
            <path d="M22 38 q4 -4 8 0 M38 38 q4 -4 8 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M22 56 q14 -4 24 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <ellipse cx="62" cy="58" rx="28" ry="32" fill="#d8553e" stroke="#2a2118" strokeWidth="3"/>
            <path d="M50 50 q4 -4 8 0 M66 50 q4 -4 8 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M50 64 q14 8 24 0" fill="none" stroke="#2a2118" strokeWidth="2.6" strokeLinecap="round"/>
          </svg>
          <h1
            className="font-display font-black text-3xl text-encre"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
          >
            L'ACAP
          </h1>
          <p className="text-encre-douce text-base mt-1">Administration du site</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-body font-bold text-base text-encre">
              Mot de passe
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`text-lg px-4 py-3 border-[2.5px] rounded-lg bg-creme font-body focus:outline-none focus:ring-2 focus:ring-soleil-500
                ${erreur ? "border-tomate-500" : "border-encre"}`}
            />
            {erreur && (
              <p className="text-sm text-tomate-600 font-bold">
                Mot de passe incorrect.
              </p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-acap justify-center disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </div>
  );
}
