import type { ToneCouleur, GenreSpectacle } from "./types";

// Retourne les classes Tailwind selon la couleur du spectacle
export function getToneClasses(tone: ToneCouleur) {
  const map: Record<ToneCouleur, {
    bg: string;
    bgLight: string;
    bgDeep: string;
    text: string;
    textDeep: string;
    border: string;
    shadow: string;
    chip: string;
  }> = {
    tomate: {
      bg:      "bg-tomate-500",
      bgLight: "bg-tomate-100",
      bgDeep:  "bg-tomate-600",
      text:    "text-tomate-500",
      textDeep:"text-tomate-700",
      border:  "border-tomate-500",
      shadow:  "shadow-tomate",
      chip:    "bg-tomate-100 text-tomate-ink",
    },
    soleil: {
      bg:      "bg-soleil-400",
      bgLight: "bg-soleil-100",
      bgDeep:  "bg-soleil-600",
      text:    "text-soleil-500",
      textDeep:"text-soleil-700",
      border:  "border-soleil-400",
      shadow:  "shadow-soleil",
      chip:    "bg-soleil-200 text-soleil-ink",
    },
    pomme: {
      bg:      "bg-pomme-500",
      bgLight: "bg-pomme-100",
      bgDeep:  "bg-pomme-600",
      text:    "text-pomme-500",
      textDeep:"text-pomme-700",
      border:  "border-pomme-500",
      shadow:  "shadow-pomme",
      chip:    "bg-pomme-200 text-pomme-ink",
    },
    ciel: {
      bg:      "bg-ciel-500",
      bgLight: "bg-ciel-100",
      bgDeep:  "bg-ciel-600",
      text:    "text-ciel-500",
      textDeep:"text-ciel-700",
      border:  "border-ciel-500",
      shadow:  "shadow-ciel",
      chip:    "bg-ciel-200 text-ciel-ink",
    },
    rose: {
      bg:      "bg-rose-400",
      bgLight: "bg-rose-100",
      bgDeep:  "bg-rose-600",
      text:    "text-rose-500",
      textDeep:"text-rose-700",
      border:  "border-rose-400",
      shadow:  "shadow-rose",
      chip:    "bg-rose-200 text-rose-ink",
    },
    aubergine: {
      bg:      "bg-aubergine-500",
      bgLight: "bg-aubergine-100",
      bgDeep:  "bg-aubergine-600",
      text:    "text-aubergine-500",
      textDeep:"text-aubergine-700",
      border:  "border-aubergine-500",
      shadow:  "shadow-aubergine",
      chip:    "bg-aubergine-200 text-aubergine-ink",
    },
  };
  return map[tone];
}

export function getGenreChipClass(genre: GenreSpectacle): string {
  const map: Record<GenreSpectacle, string> = {
    "Comédie":    "bg-soleil-200 text-soleil-ink",
    "Drame":      "bg-aubergine-200 text-aubergine-ink",
    "Famille":    "bg-pomme-200 text-pomme-ink",
    "Création":   "bg-ciel-200 text-ciel-ink",
    "Classique":  "bg-rose-200 text-rose-ink",
    "Tout-public":"bg-tomate-100 text-tomate-ink",
  };
  return map[genre] || "bg-creme-deep text-encre";
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
