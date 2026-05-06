import type { ToneCouleur, GenreSpectacle, Representation } from "./types";

// Mapping des tones Convex → 4 accents "Carte & Compagnie"
const TONE_ACCENT: Record<ToneCouleur, string> = {
  tomate:    "rose",
  soleil:    "moutarde",
  pomme:     "mousse",
  ciel:      "lavande",
  rose:      "rose",
  aubergine: "lavande",
};

export function getToneAccent(tone: ToneCouleur): string {
  return TONE_ACCENT[tone] ?? "rose";
}

export function getToneVars(tone: ToneCouleur) {
  const accent = getToneAccent(tone);
  return {
    accent:      `var(--${accent})`,
    accentDeep:  `var(--${accent}-deep)`,
    accentWash:  `var(--${accent}-wash)`,
    accentClass: `accent-${accent}`,
  };
}

// Conservé pour compatibilité avec le code existant
export function getToneClasses(tone: ToneCouleur) {
  const accent = getToneAccent(tone);
  return {
    bg:       `bg-${accent}`,
    bgLight:  `bg-${accent}-wash`,
    bgDeep:   `bg-${accent}-deep`,
    text:     `text-${accent}`,
    textDeep: `text-${accent}-deep`,
    border:   `border-${accent}`,
    shadow:   `shadow-print-${accent}`,
    chip:     `bg-${accent}-wash text-${accent}-deep`,
  };
}

export function getGenreChipClass(genre: GenreSpectacle): string {
  const map: Record<GenreSpectacle, string> = {
    "Comédie":    "accent-moutarde",
    "Drame":      "accent-lavande",
    "Famille":    "accent-mousse",
    "Création":   "accent-rose",
    "Classique":  "accent-lavande",
    "Tout-public":"accent-mousse",
  };
  return map[genre] || "";
}

export function formatDate(dateISO: string): string {
  const d = new Date(dateISO);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isComplet(places: number): boolean {
  return places === 0;
}

export function getPlacesLabel(places: number): string {
  if (places === 0) return "Complet";
  if (places <= 5) return `Plus que ${places} place${places > 1 ? "s" : ""} !`;
  return `${places} places disponibles`;
}

/**
 * Retourne la représentation principale à afficher :
 * - la prochaine à venir (dateISO >= aujourd'hui)
 * - ou la dernière si toutes passées
 * - avec fallback vers les anciens champs individuels pour les données migrées
 */
export function getPrimaryRepresentation(spectacle: {
  representations?: Representation[];
  date?: string;
  dateISO?: string;
  heure?: string;
  lieu?: string;
  adresse?: string;
  places?: number;
}): Representation {
  if (spectacle.representations?.length) {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = spectacle.representations
      .filter((r) => r.dateISO >= today)
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
    return upcoming[0] ?? spectacle.representations[spectacle.representations.length - 1];
  }
  // Fallback vers anciens champs (spectacles non encore migrés)
  return {
    date: spectacle.date ?? "",
    dateISO: spectacle.dateISO ?? "",
    heure: spectacle.heure ?? "",
    lieu: spectacle.lieu ?? "",
    adresse: spectacle.adresse ?? "",
    places: spectacle.places ?? 0,
  };
}