import type { ToneCouleur, GenreSpectacle } from "./types";

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
