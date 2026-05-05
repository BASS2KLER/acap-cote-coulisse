export type ToneCouleur =
  | "tomate"
  | "soleil"
  | "pomme"
  | "ciel"
  | "rose"
  | "aubergine";

export type GenreSpectacle =
  | "Comédie"
  | "Drame"
  | "Famille"
  | "Création"
  | "Classique"
  | "Tout-public";

export interface Spectacle {
  id: string;
  titre: string;
  auteur: string;
  description: string;
  descriptionCourte: string;
  date: string;             // ex: "Sam. 14 mars"
  dateISO: string;          // ex: "2026-03-14"
  heure: string;            // ex: "20h30"
  lieu: string;
  adresse: string;
  duree: string;            // ex: "1h45"
  prix: string;             // ex: "10 € / 6 €"
  prixReduit: string;
  genres: GenreSpectacle[];
  tone: ToneCouleur;
  emoji: string;
  image: string;            // chemin ou placeholder
  galerie: string[];
  lienVideo?: string;
  pmr: boolean;
  places: number;           // places restantes (simulé)
  saison: string;           // ex: "2025-2026"
  slug: string;
}

export interface Membre {
  id: string;
  nom: string;
  role: string;
  bio: string;
  photo?: string;
  depuis: number;
}

export interface Actualite {
  id: string;
  titre: string;
  date: string;
  contenu: string;
  tag: string;
  tone: ToneCouleur;
}

export interface InfoPratique {
  horaires: string[];
  adresse: string;
  parking: string;
  pmr: string;
  contact: string;
  email: string;
}
