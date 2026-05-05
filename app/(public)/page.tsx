import Hero from "@/components/home/Hero";
import SpectaclesSection from "@/components/home/SpectaclesSection";
import TroupeSection from "@/components/home/TroupeSection";
import ActualitesSection from "@/components/home/ActualitesSection";
import InfoBandeauSection from "@/components/home/InfoBandeauSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoBandeauSection />
      <SpectaclesSection />
      <TroupeSection />
      <ActualitesSection />
    </>
  );
}
