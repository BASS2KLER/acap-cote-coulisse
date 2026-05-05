# Guide — Créer une variante de design pour le site ACAP

Ce document explique comment construire une nouvelle version du site L'ACAP avec un design system différent,
en réutilisant exactement les mêmes données (Convex), la même structure de routes, et la même logique métier.

---

## Principe : ce qui change vs ce qui reste fixe

### Ce qui NE CHANGE PAS entre variants
- Le backend Convex (`convex/schema.ts`, `convex/spectacles.ts`, `convex/membres.ts`, `convex/actualites.ts`)
- Les types TypeScript (`lib/types.ts`)
- Les routes/pages (`app/(public)/` et `app/admin/`)
- La logique de données (les `useQuery`, les mappings `_id→id`, `imageUrl→image`, etc.)
- L'administration (tout `app/admin/` reste identique)
- Le middleware auth (`middleware.ts`)
- Les variables d'environnement Convex

### Ce qui CHANGE pour chaque variant
- `tailwind.config.ts` — couleurs, polices, rayons, ombres
- `app/globals.css` — variables CSS, classes utilitaires (`btn-acap`, `chip-acap`, `admin-input`)
- `app/layout.tsx` — import des nouvelles polices Google Fonts
- `components/layout/Navbar.tsx` — style de la barre de navigation
- `components/layout/Footer.tsx` — style du pied de page
- `components/home/*.tsx` — Hero, InfoBandeau, sections homepage
- `components/ui/*.tsx` — Button, Chip, Section (si le variant redéfinit ces composants)
- `components/spectacles/*.tsx` — cartes et liste spectacles
- Les classes CSS inline dans les pages (`bg-tomate-100`, `text-encre`, etc.)

---

## Structure actuelle — variant v1 "Côté coulisses"

### Palette de couleurs

```ts
// tailwind.config.ts — 6 tons + neutres chauds
tomate:    { 100: "#fad9d2", 400: "#e57863", 600: "#b9402c", ink: "#4a1810" }
soleil:    { 100: "#fdecb6", 400: "#f3c13a", 600: "#c08a0b", ink: "#4a3408" }
pomme:     { 100: "#d8ecc4", 400: "#7eb952", 600: "#4a7e26", ink: "#1f3611" }
ciel:      { 100: "#cfe1f3", 400: "#5b96d1", 600: "#2c6299", ink: "#102a44" }
rose:      { 100: "#f6d7dc", 400: "#db7d8c", 600: "#a44354", ink: "#441620" }
aubergine: { 100: "#ddd0e3", 400: "#8a6a9b", 600: "#563d66", ink: "#20162a" }
// Neutres
creme: "#fbf6ec"  creme-pale: "#fefaf2"  encre: "#2a2118"  filet: "#e6dcc7"
```

### Typographie

```ts
fontFamily: {
  display: ["var(--font-fraunces)", "Georgia", "serif"],  // titres expressifs
  body:    ["var(--font-nunito)", "system-ui", "sans-serif"], // texte courant
}
```

### Classes utilitaires clés (définies dans `globals.css`)

| Classe | Usage |
|--------|-------|
| `btn-acap` | Bouton principal (fond encre, texte crème, ombre colorée) |
| `chip-acap` | Badge/étiquette arrondie |
| `admin-input` | Champ de formulaire (admin et contact) |
| `max-w-page` | Conteneur centré max 1180px |
| `rounded-pill` | Border-radius 999px |

### Composants UI réutilisables

```
components/ui/Section.tsx      — wrapper section avec padding standardisé
components/ui/Button.tsx       — bouton typé (primary / secondary / ghost)
components/ui/Chip.tsx         — badge coloré
```

---

## Créer un nouveau variant — étape par étape

### Étape 1 : Forker le projet

```bash
# Option A — travailler dans le même repo (branche)
git checkout -b variant-v2-minimaliste

# Option B — nouveau repo indépendant (recommandé pour variante très différente)
cp -r acap_cote_coulisse acap_variant_v2
cd acap_variant_v2
git init && git add . && git commit -m "init: base depuis variant v1"
```

### Étape 2 : Connecter au même Convex

Le nouveau projet pointe vers le **même déploiement Convex** (mêmes données).

```bash
# Copier le fichier .env.local depuis v1
cp ../acap_cote_coulisse/.env.local .env.local
# Contient : NEXT_PUBLIC_CONVEX_URL=https://xxxx.convex.cloud
```

**Ne pas lancer `npx convex dev`** — le schema et les fonctions sont déjà en production.
Si tu travailles en local, utiliser le déploiement de préproduction Convex existant.

### Étape 3 : Définir la nouvelle palette

Remplacer entièrement `tailwind.config.ts` :

```ts
// Exemple variant "Scène noire" — minimaliste, typographique
theme: {
  extend: {
    colors: {
      // Remplacer tomate/soleil/etc. par de nouvelles couleurs
      or:     { 100: "#fdf3d0", 400: "#e6b800", 600: "#9a7a00" },
      ardoise:{ 100: "#e8eaed", 400: "#8896a4", 600: "#3d5166" },
      // Neutres : passer d'un fond crème à un fond sombre par ex.
      creme:      "#0d0d0d",   // inverser : fond noir
      "creme-pale":"#1a1a1a",
      encre:      "#f5f5f0",   // texte blanc cassé
      filet:      "#2a2a2a",
    },
    fontFamily: {
      // Changer les polices ici
      display: ["var(--font-playfair)", "Georgia", "serif"],
      body:    ["var(--font-inter)", "system-ui", "sans-serif"],
    },
  }
}
```

### Étape 4 : Changer les polices

Dans `app/layout.tsx` :

```tsx
// Avant (v1)
import { Fraunces, Nunito } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const nunito   = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

// Après (nouveau variant)
import { Playfair_Display, Inter } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter    = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Mettre à jour le <body> avec les nouvelles variables
<body className={`${playfair.variable} ${inter.variable} ...`}>
```

### Étape 5 : Redéfinir les classes utilitaires

Dans `app/globals.css`, remplacer les classes `btn-acap`, `chip-acap`, `admin-input` :

```css
/* Exemple pour un variant "flat design moderne" */
.btn-acap {
  @apply inline-flex items-center gap-2 px-6 py-3 
         bg-or-600 text-white font-bold rounded-sm
         border-2 border-or-600
         hover:bg-or-400 transition-colors;
  /* Plus d'ombre sérigraphiée — style flat */
}
```

### Étape 6 : Retravailler les composants visuels

Les fichiers à modifier dans l'ordre de priorité :

1. **`components/layout/Navbar.tsx`** — structure et style (liens restent les mêmes)
2. **`components/layout/Footer.tsx`** — mise en page (données restent les mêmes)
3. **`components/home/Hero.tsx`** — illustration + couleurs de fond
4. **`components/home/InfoBandeauSection.tsx`** — bandeau d'info
5. **`components/spectacles/SpectacleCard.tsx`** — carte spectacle
6. Pages `app/(public)/*.tsx` — remplacer les classes `bg-tomate-100`, `text-encre`, etc.

**Important :** ne pas modifier la logique des `useQuery` ni les mappings de données.

### Étape 7 : Adapter les `tone` dans les pages

Le champ `tone` dans Convex (`"tomate"`, `"soleil"`, etc.) est utilisé pour colorer dynamiquement
les cartes spectacles. Si le nouveau design system n'a pas ces couleurs, créer un mapping :

```ts
// Exemple dans components/spectacles/SpectacleCard.tsx
const TONE_MAP: Record<string, { bg: string; text: string }> = {
  tomate:    { bg: "bg-red-100",    text: "text-red-700" },   // mapper vers les nouvelles couleurs
  soleil:    { bg: "bg-yellow-100", text: "text-yellow-700" },
  pomme:     { bg: "bg-green-100",  text: "text-green-700" },
  ciel:      { bg: "bg-blue-100",   text: "text-blue-700" },
  rose:      { bg: "bg-pink-100",   text: "text-pink-700" },
  aubergine: { bg: "bg-purple-100", text: "text-purple-700" },
};
```

### Étape 8 : Déployer le variant

```bash
# Créer un nouveau site Netlify (site séparé)
netlify init   # ou depuis l'interface Netlify

# Variables d'environnement à définir dans Netlify :
NEXT_PUBLIC_CONVEX_URL=https://xxxx.convex.cloud  # même URL que v1
ADMIN_PASSWORD=xxxx
JWT_SECRET=xxxx
```

---

## Ce que chaque page publique attend des données

| Page | Données Convex utilisées | Données statiques dans la page |
|------|--------------------------|-------------------------------|
| Accueil | spectacles.list · membres.list · actualites.list | — |
| /acap | — | Texte association, valeurs, Le Jardin d'Hélène |
| /ateliers | — | 7 ateliers, tarifs, bienfaits |
| /spectacles | spectacles.list | — |
| /spectacles/[slug] | spectacles.getBySlug | — |
| /galerie | — | Archives saisons (placeholder) |
| /pratique | — | Adresse, horaires, tenue, contacts |
| /contact | — | Formulaire 3 onglets, coordonnées |
| /troupe | membres.list | — |

---

## Points d'attention

### Ne jamais modifier le schéma Convex entre variants
Les deux sites partagent le même backend. Modifier `convex/schema.ts` impacte tous les variants.
Si un variant a besoin de champs supplémentaires → ajouter des champs optionnels (`v.optional()`).

### L'admin reste identique
Tous les variants utilisent le même admin pour gérer les spectacles, membres et actualités.
Ne pas dupliquer l'admin — pointer vers le même `/admin` du variant v1, ou garder l'admin
uniquement dans le variant v1 et mettre l'URL dans un signet.

### Les formulaires de contact n'envoient pas encore d'emails
La page `/contact` simule l'envoi (timeout + state `envoyé`). Pour un vrai envoi, brancher
une route API vers Resend ou Brevo. À faire pour la version finale choisie.

---

## Variantes envisagées

| Variant | Concept | Statut |
|---------|---------|--------|
| v1 — Côté coulisses | Néo-brutaliste chaleureux, palette 6 tons, Fraunces+Nunito | ✅ En prod |
| v2 — (à définir) | À discuter avec l'ACAP | 🔲 À créer |
| v3 — (à définir) | À discuter avec l'ACAP | 🔲 À créer |
