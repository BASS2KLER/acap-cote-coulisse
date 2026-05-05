import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — L'ACAP" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-creme-deep">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
