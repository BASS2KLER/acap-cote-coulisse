import { mutation } from "./_generated/server";

// Lance une seule fois pour importer les données mock dans Convex
export const seedSpectacles = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("spectacles").collect();
    if (existing.length > 0) return "Déjà initialisé";

    const spectacles = [
      {
        slug: "lavare",
        titre: "L'Avare",
        auteur: "de Molière",
        description: "Harpagon, vieillard avare, veut marier sa fille Élise à un vieillard riche, et son fils Cléante à une veuve fortunée, alors que lui-même veut épouser Marianne dont son fils est épris. Mise en scène joyeuse et enlevée, dans la tradition de la commedia dell'arte, avec costumes et décors colorés.",
        descriptionCourte: "La grande comédie de Molière, jouée avec entrain. Pour toute la famille !",
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
        pmr: true,
        places: 12,
        saison: "2025-2026",
        ordre: 1,
      },
      {
        slug: "petit-prince",
        titre: "Le Petit Prince",
        auteur: "d'après Antoine de Saint-Exupéry",
        description: "Un aviateur en panne dans le désert rencontre un petit garçon venu d'une autre planète. Adaptation douce et poétique avec marionnettes et lumières de scène.",
        descriptionCourte: "Le conte de Saint-Exupéry adapté avec marionnettes. Idéal en famille, dès 5 ans.",
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
        pmr: true,
        places: 28,
        saison: "2025-2026",
        ordre: 2,
      },
      {
        slug: "antigone",
        titre: "Antigone",
        auteur: "de Jean Anouilh",
        description: "Antigone refuse d'obéir au décret du roi Créon. Un texte fort sur la résistance et la conscience. Mise en scène sobre, en costumes contemporains.",
        descriptionCourte: "Le grand texte d'Anouilh sur la résistance. Mise en scène sobre et puissante.",
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
        pmr: true,
        places: 0,
        saison: "2025-2026",
        ordre: 3,
      },
      {
        slug: "voisins-de-palier",
        titre: "Les Voisins de palier",
        auteur: "création originale de la troupe",
        description: "Cinq appartements, cinq histoires, une cage d'escalier. Une création collective en plein air dans le parc de la Tour du Lay.",
        descriptionCourte: "La création de la troupe : cinq histoires de voisins, beaucoup de vérité.",
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
        pmr: false,
        places: 45,
        saison: "2025-2026",
        ordre: 4,
      },
    ];

    for (const s of spectacles) {
      await ctx.db.insert("spectacles", s);
    }

    const membres = [
      { nom: "Marie-Claire Fontaine", role: "Metteure en scène & présidente", bio: "Dirige la troupe depuis 2012. Professeure de français à la retraite.", depuis: 2008, ordre: 1 },
      { nom: "Bernard Leclerc", role: "Comédien", bio: "Joue à l'ACAP depuis 25 ans. Infirmier de profession.", depuis: 2000, ordre: 2 },
      { nom: "Sophie Arnaud", role: "Comédienne & costumière", bio: "Gère les rôles et les costumes. Les coud à la main.", depuis: 2015, ordre: 3 },
      { nom: "Jacques Moreau", role: "Régisseur lumières & son", bio: "Ingénieur à la retraite. Sa précision garantit les lumières.", depuis: 2011, ordre: 4 },
      { nom: "Pauline Dufresne", role: "Comédienne", bio: "Joue les rôles dramatiques avec une intensité qui surprend.", depuis: 2022, ordre: 5 },
      { nom: "René Tissier", role: "Comédien & décorateur", bio: "Construit les décors dans son garage. Menuisier de métier.", depuis: 2005, ordre: 6 },
    ];

    for (const m of membres) {
      await ctx.db.insert("membres", m);
    }

    const actualites = [
      { titre: "Répétitions de L'Avare : ça prend forme !", date: "12 janvier 2026", contenu: "On est en pleine dernière ligne droite. Les costumes sont presque finis, le décor est en place.", tag: "En coulisses", tone: "tomate", publie: true },
      { titre: "Bienvenue à nos quatre nouveaux membres", date: "3 octobre 2025", contenu: "La rentrée de septembre a amené quatre nouvelles têtes dans la troupe.", tag: "Troupe", tone: "pomme", publie: true },
      { titre: "Bilan de la saison 2024-2025", date: "15 juin 2025", contenu: "Quatre spectacles, 680 spectateurs, une salle comble. Merci à vous !", tag: "Saison", tone: "soleil", publie: true },
    ];

    for (const a of actualites) {
      await ctx.db.insert("actualites", a);
    }

    return "Données initialisées avec succès";
  },
});
