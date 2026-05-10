"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Theater, Users, Newspaper, Plus } from "lucide-react";

export default function AdminDashboard() {
  const spectacles = useQuery(api.spectacles.list);
  const membres    = useQuery(api.membres.list);
  const actualites = useQuery(api.actualites.listAll);

  const stats = [
    {
      label: "Spectacles",
      count: spectacles?.length ?? "…",
      icon: Theater,
      href: "/admin/spectacles",
      color: "bg-tomate-100 border-tomate-400",
      action: "/admin/spectacles/nouveau",
    },
    {
      label: "Membres",
      count: membres?.length ?? "…",
      icon: Users,
      href: "/admin/membres",
      color: "bg-pomme-100 border-pomme-400",
      action: "/admin/membres/nouveau",
    },
    {
      label: "Actualités",
      count: actualites?.length ?? "…",
      icon: Newspaper,
      href: "/admin/actualites",
      color: "bg-soleil-100 border-soleil-400",
      action: "/admin/actualites/nouveau",
    },
  ];

  return (
    <div>
      <h1 className="font-display font-black text-3xl text-encre mb-2"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
        Tableau de bord
      </h1>
      <p className="text-encre-douce mb-8">Bienvenue dans l'espace d'administration de l'ACAP.</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, count, icon: Icon, href, color, action }) => (
          <div key={label} className={`bg-creme-pale border-2 rounded-xl p-6 shadow-card ${color}`}>
            <div className="flex items-start justify-between mb-4">
              <Icon size={28} className="text-encre-douce" />
              <Link href={action}
                className="flex items-center gap-1 text-xs font-bold text-encre bg-creme border border-encre rounded-pill px-3 py-1 no-underline hover:bg-creme-deep transition-colors">
                <Plus size={13} /> Ajouter
              </Link>
            </div>
            <div className="font-display font-black text-5xl text-encre mb-1"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
              {count}
            </div>
            <Link href={href} className="font-bold text-base text-encre-douce no-underline hover:text-encre transition-colors">
              {label} →
            </Link>
          </div>
        ))}
      </div>

      {/* Raccourcis */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-6 shadow-card">
        <h2 className="font-display font-bold text-xl text-encre mb-4"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/spectacles/nouveau" className="btn-acap text-base py-3 px-5 inline-flex">
            + Nouveau spectacle
          </Link>
          <Link href="/admin/membres/nouveau"
            className="btn-acap bg-pomme-500 text-creme-pale text-base py-3 px-5 inline-flex">
            + Nouveau membre
          </Link>
          <Link href="/admin/actualites/nouveau"
            className="btn-acap bg-soleil-400 text-soleil-ink text-base py-3 px-5 inline-flex">
            + Nouvelle actualité
          </Link>
          <Link href="/admin/galerie"
            className="btn-acap bg-encre-douce text-creme-pale text-base py-3 px-5 inline-flex">
            📷 Galerie
          </Link>
        </div>
      </div>
    </div>
  );
}
