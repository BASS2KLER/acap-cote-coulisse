"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Theater, Users, Newspaper, LogOut } from "lucide-react";

const LIENS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/spectacles", label: "Spectacles", icon: Theater },
  { href: "/admin/membres", label: "La troupe", icon: Users },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="bg-encre text-creme-pale sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display font-black text-xl no-underline text-creme-pale"
            style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}>
            🎭 Admin ACAP
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {LIENS.map(({ href, label, icon: Icon, exact }) => {
              const actif = exact ? pathname === href : pathname.startsWith(href) && href !== "/admin";
              const isAdmin = pathname === "/admin" && href === "/admin";
              const isActif = actif || isAdmin;
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold no-underline transition-colors
                    ${isActif ? "bg-tomate-500 text-creme-pale" : "text-creme-pale/70 hover:text-creme-pale hover:bg-white/10"}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" target="_blank"
            className="text-xs text-creme-pale/60 hover:text-creme-pale no-underline transition-colors">
            Voir le site →
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-creme-pale/70 hover:text-creme-pale transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      <nav className="md:hidden flex border-t border-white/10">
        {LIENS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-bold no-underline transition-colors
              ${pathname.startsWith(href) ? "text-soleil-400" : "text-creme-pale/60"}`}>
            <Icon size={18} />
            {label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
