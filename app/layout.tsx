import type { Metadata } from "next";
import { Abril_Fatface, Nunito_Sans } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril",
  weight: ["400"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "L'ACAP — Théâtre à Saint-Prix",
  description:
    "L'ACAP est une troupe de théâtre amateur à Saint-Prix (95). Venez nous voir jouer cette saison — spectacles, horaires, réservations et infos pratiques.",
  openGraph: {
    title: "L'ACAP — Théâtre à Saint-Prix",
    description: "Une troupe de passionnés qui font du théâtre pour le plaisir.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${abrilFatface.variable} ${nunitoSans.variable}`}>
      <body className="antialiased">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
