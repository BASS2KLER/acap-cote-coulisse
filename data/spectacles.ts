import type { Spectacle, Membre, Actualite, InfoPratique } from "@/lib/types";

// ============================================================
// SPECTACLES — données simulées (prêtes pour Convex CRUD)
// ============================================================
export const SPECTACLES: Spectacle[] = [
  {
    id: "1",
    slug: "lavare",
    titre: "L'Avare",
    auteur: "de Molière",
    description:
      "Harpagon, vieillard avare, veut marier sa fille Élise à un vieillard riche, et son fils Cléante à une veuve fortunée, alors que lui-même veut épouser Marianne dont son fils est épris. Mise en scène joyeuse et enlevée, dans la tradition de la commedia dell'arte, avec costumes et décors colorés. La troupe a travaillé pendant huit mois sur ce texte, et c'est avec une vraie fierté qu'on vous l'offre ce soir.",
    descriptionCourte:
      "La grande comédie de Molière, jouée avec entrain et quelques libertés assumées. Pour toute la famille !",
    date: "Sam. 14 mars",
    dateISO: "2026-03-14",
    heure: "20h30",
    lieu: "Salle des fêtes",
    adresse: "Place de la Mairie, 95390 Saint-Prix",
    duree: "1h45 (entracte inclus)",
    prix: "10 €",
    prixReduit: "6 € (- 12 ans)",
    genres: ["Comédie", "Classique", "Tout-public"],
    tone: "tomate",
    emoji: "💰",
    image: "/spectacles/avare.jpg",
    galerie: [],
    lienVideo: "https://youtube.com",
    pmr: true,
    places: 12,
    saison: "2025-2026",
  },
  {
    id: "2",
    slug: "petit-prince",
    titre: "Le Petit Prince",
    auteur: "d'après Antoine de Saint-Exupéry",
    description:
      "Un aviateur en panne dans le désert rencontre un petit garçon venu d'une autre planète. Ensemble, ils parlent de la vie, de l'amitié, et des grandes personnes. Adaptation douce et poétique du conte de Saint-Exupéry, avec marionnettes et lumières de scène. À voir en famille, dès 5 ans.",
    descriptionCourte:
      "Le conte de Saint-Exupéry adapté avec marionnettes et magie. Idéal pour toute la famille, dès 5 ans.",
    date: "Dim. 12 avril",
    dateISO: "2026-04-12",
    heure: "15h00",
    lieu: "Salle des fêtes",
    adresse: "Place de la Mairie, 95390 Saint-Prix",
    duree: "1h15 (sans entracte)",
    prix: "8 €",
    prixReduit: "5 € (- 12 ans)",
    genres: ["Famille", "Tout-public"],
    tone: "soleil",
    emoji: "🌟",
    image: "/spectacles/petit-prince.jpg",
    galerie: [],
    pmr: true,
    places: 28,
    saison: "2025-2026",
  },
  {
    id: "3",
    slug: "antigone",
    titre: "Antigone",
    auteur: "de Jean Anouilh",
    description:
      "Antigone refuse d'obéir au décret du roi Créon qui interdit d'enterrer son frère Polynice. Elle choisit la loi du cœur contre la raison d'État. Un texte fort, écrit pendant l'Occupation, qui parle de résistance, de conscience, et de ce que l'on est prêt à risquer pour ce en quoi l'on croit. Mise en scène sobre, en costumes contemporains.",
    descriptionCourte:
      "Le grand texte d'Anouilh sur la résistance et la conscience. Mise en scène sobre et puissante.",
    date: "Sam. 16 mai",
    dateISO: "2026-05-16",
    heure: "20h30",
    lieu: "Salle des fêtes",
    adresse: "Place de la Mairie, 95390 Saint-Prix",
    duree: "1h30 (sans entracte)",
    prix: "10 €",
    prixReduit: "6 € (- 12 ans)",
    genres: ["Drame", "Classique"],
    tone: "aubergine",
    emoji: "🌙",
    image: "/spectacles/antigone.jpg",
    galerie: [],
    pmr: true,
    places: 0,
    saison: "2025-2026",
  },
  {
    id: "4",
    slug: "voisins-de-palier",
    titre: "Les Voisins de palier",
    auteur: "création originale de la troupe",
    description:
      "Cinq appartements, cinq histoires, une cage d'escalier. Une création collective de la troupe, écrite et mise en scène par les membres de l'ACAP au fil des répétitions. On rit, on s'émeut, et on reconnaît sans doute un voisin ou deux. Représentation en plein air dans le parc de la Tour du Lay — prévoir une veste si le soir est frais !",
    descriptionCourte:
      "La création de la troupe : cinq histoires de voisins, une cage d'escalier, beaucoup de vérité.",
    date: "Sam. 13 juin",
    dateISO: "2026-06-13",
    heure: "20h30",
    lieu: "Parc de la Tour du Lay",
    adresse: "Rue de la Tour du Lay, 95390 Saint-Prix",
    duree: "1h20 (sans entracte)",
    prix: "Libre participation",
    prixReduit: "Gratuit pour les enfants",
    genres: ["Création", "Comédie"],
    tone: "pomme",
    emoji: "🌳",
    image: "/spectacles/voisins.jpg",
    galerie: [],
    pmr: false,
    places: 45,
    saison: "2025-2026",
  },
];

export function getSpectacleBySlug(slug: string): Spectacle | undefined {
  return SPECTACLES.find((s) => s.slug === slug);
}

export function getSpectaclesProchains(): Spectacle[] {
  const today = new Date().toISOString().split("T")[0];
  return SPECTACLES.filter((s) => s.dateISO >= today);
}

export function getAllSlugs(): string[] {
  return SPECTACLES.map((s) => s.slug);
}

// ============================================================
// MEMBRES DE LA TROUPE
// ============================================================
export const MEMBRES: Membre[] = [
  {
    id: "1",
    nom: "Marie-Claire Fontaine",
    role: "Metteure en scène & présidente",
    bio: "Marie-Claire dirige la troupe depuis 2012 et a mis en scène plus de 15 spectacles. Professeure de français à la retraite, elle apporte rigueur et chaleur à chaque répétition.",
    depuis: 2008,
  },
  {
    id: "2",
    nom: "Bernard Leclerc",
    role: "Comédien",
    bio: "Bernard joue à l'ACAP depuis 25 ans. Infirmier de profession, il incarne les personnages comiques avec une générosité qui fait rire toute la salle.",
    depuis: 2000,
  },
  {
    id: "3",
    nom: "Sophie Arnaud",
    role: "Comédienne & costumière",
    bio: "Sophie gère à la fois les rôles et les costumes. C'est elle qui coud les tenues à la main, souvent jusqu'à minuit la semaine avant la générale.",
    depuis: 2015,
  },
  {
    id: "4",
    nom: "Jacques Moreau",
    role: "Régisseur lumières & son",
    bio: "Jacques est ingénieur à la retraite. Sa précision technique garantit que les lumières tombent toujours au bon moment, sur le bon acteur.",
    depuis: 2011,
  },
  {
    id: "5",
    nom: "Pauline Dufresne",
    role: "Comédienne",
    bio: "Pauline a rejoint la troupe il y a trois ans, après un atelier découverte. Elle joue les rôles dramatiques avec une intensité qui surprend toujours le public.",
    depuis: 2022,
  },
  {
    id: "6",
    nom: "René Tissier",
    role: "Comédien & décorateur",
    bio: "René construit les décors dans son garage les week-ends. Menuisier de métier, il transforme des planches en salons, jardins ou prisons selon les besoins.",
    depuis: 2005,
  },
];

// ============================================================
// ACTUALITÉS
// ============================================================
export const ACTUALITES: Actualite[] = [
  {
    id: "1",
    titre: "Répétitions de L'Avare : ça prend forme !",
    date: "12 janvier 2026",
    contenu:
      "On est en pleine dernière ligne droite avant la générale. Les costumes sont presque finis, le décor est en place. Venez nous voir le 14 mars !",
    tag: "En coulisses",
    tone: "tomate",
  },
  {
    id: "2",
    titre: "Bienvenue à nos quatre nouveaux membres",
    date: "3 octobre 2025",
    contenu:
      "La rentrée de septembre a amené quatre nouvelles têtes dans la troupe. Un instituteur, deux étudiantes et un retraité. Bienvenue à eux !",
    tag: "Troupe",
    tone: "pomme",
  },
  {
    id: "3",
    titre: "Bilan de la saison 2024-2025",
    date: "15 juin 2025",
    contenu:
      "Quatre spectacles, 680 spectateurs, une salle comble pour la dernière représentation. Merci à vous ! On se retrouve en septembre.",
    tag: "Saison",
    tone: "soleil",
  },
];

// ============================================================
// INFOS PRATIQUES
// ============================================================
export const INFO_PRATIQUE: InfoPratique = {
  horaires: [
    "Répétitions le mardi soir, 20h–22h30",
    "Salle des fêtes de Saint-Prix",
    "Ouvert à tous, venez voir une répétition avant de vous engager",
  ],
  adresse: "Place de la Mairie, 95390 Saint-Prix",
  parking: "Parking gratuit devant la salle des fêtes",
  pmr: "Salle accessible de plain-pied, places PMR disponibles",
  contact: "01 39 91 XX XX (le mardi soir uniquement)",
  email: "contact@acap-theatre.fr",
};
