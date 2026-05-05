# Guide — Créer une variante de design pour le site ACAP

Ce document explique comment construire une nouvelle version du site L'ACAP avec un design system différent,
en réutilisant exactement les mêmes données (Convex), la même structure de routes, et la même logique métier.

---

## Variantes existantes

| Variant | Concept | Branche | URL | Statut |
|---------|---------|---------|-----|--------|
| v1 — Côté coulisses | Néo-brutaliste chaleureux, palette 6 tons, Fraunces+Nunito, classes Tailwind | `main` | https://acap-cote-coulisse.netlify.app | ✅ En prod |
| v2 — Carte & Compagnie | Éditorial, carton imprimé, 4 accents, inline styles + CSS vars | `v2-carte-compagnie` | https://acap-v2-carte-compagnie.netlify.app | ✅ En prod |

Les deux sites partagent le même backend Convex : `https://insightful-frog-410.convex.cloud`

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
- `components/galerie/VideoSection.tsx` — section vidéos YouTube (identique sur tous les variants)

### Ce qui CHANGE pour chaque variant
- `tailwind.config.ts` — couleurs, polices, rayons, ombres
- `app/globals.css` — variables CSS, classes utilitaires (`btn-acap`, `.kicker`, etc.)
- `app/layout.tsx` — import des nouvelles polices Google Fonts
- `components/layout/Navbar.tsx` — style de la barre de navigation
- `components/layout/Footer.tsx` — style du pied de page
- `components/home/*.tsx` — Hero, InfoBandeau, sections homepage
- `components/ui/*.tsx` — Section, Button… (si le variant redéfinit ces composants)
- `components/spectacles/SpectacleCard.tsx`, `ModalReservation.tsx`
- Les pages `app/(public)/*.tsx` — classes CSS ou inline styles

---

## Variant v1 "Côté coulisses" (branche `main`)

### Approche style
Classes Tailwind nommées par sémantique (`bg-tomate-100`, `text-encre`, `border-encre`…).

### Palette de couleurs

```ts
// tailwind.config.ts — 6 tons + neutres chauds
tomate:    { 100: "#fad9d2", 400: "#e57863", 600: "#b9402c", ink: "#4a1810" }
soleil:    { 100: "#fdecb6", 400: "#f3c13a", 600: "#c08a0b", ink: "#4a3408" }
pomme:     { 100: "#d8ecc4", 400: "#7eb952", 600: "#4a7e26", ink: "#1f3611" }
ciel:      { 100: "#cfe1f3", 400: "#5b96d1", 600: "#2c6299", ink: "#102a44" }
rose:      { 100: "#f6d7dc", 400: "#db7d8c", 600: "#a44354", ink: "#441620" }
aubergine: { 100: "#ddd0e3", 400: "#8a6a9b", 600: "#563d66", ink: "#20162a" }
creme: "#fbf6ec"  creme-pale: "#fefaf2"  encre: "#2a2118"  filet: "#e6dcc7"
```

### Typographie

```ts
fontFamily: {
  display: ["var(--font-fraunces)", "Georgia", "serif"],
  body:    ["var(--font-nunito)", "system-ui", "sans-serif"],
}
```

### Classes utilitaires clés (`globals.css`)

| Classe | Usage |
|--------|-------|
| `btn-acap` | Bouton principal (fond encre, texte crème, ombre colorée) |
| `chip-acap` | Badge/étiquette arrondie |
| `admin-input` | Champ de formulaire |
| `max-w-page` | Conteneur centré max 1180px |

### Mapping tone Convex → style v1

```ts
// lib/utils.ts — getToneClasses(tone)
// Retourne { bgLight, border, text } pour les classes Tailwind
tomate→bg-tomate-100  soleil→bg-soleil-100  pomme→bg-pomme-100
ciel→bg-ciel-100  rose→bg-rose-100  aubergine→bg-aubergine-100
```

---

## Variant v2 "Carte & Compagnie" (branche `v2-carte-compagnie`)

### Approche style
**Inline styles + CSS custom properties** — pas de classes Tailwind de couleur dans les pages publiques.
Toutes les couleurs passent par des CSS vars définies dans `globals.css`.

### CSS vars et palette

```css
/* globals.css */
:root {
  --paper: #F5EFE3;
  --ink: #2A2722;
  --ink-soft: #5A5550;
  --ink-muted: #8A8480;
  --ink-line: #E8E0D0;
  --paper-deep: #EDE5D5;

  /* 4 accents — chacun avec DEFAULT, -deep, -wash */
  --rose: #C4735A;       --rose-deep: #8A3D2A;      --rose-wash: #F5E8E4;
  --mousse: #6B8F5E;     --mousse-deep: #3D5C32;    --mousse-wash: #E8F0E4;
  --moutarde: #B8922A;   --moutarde-deep: #7A5C10;  --moutarde-wash: #F5EDD8;
  --lavande: #7B6FA0;    --lavande-deep: #4A3D70;   --lavande-wash: #EDE8F5;
}
```

### Classes utilitaires v2 (`globals.css`)

| Classe | Rôle |
|--------|------|
| `.kicker` | Label uppercase letter-spaced (type "★ Saison 2025–2026") |
| `.show-name` | Italic Fraunces (noms de spectacles) |
| `.stamp` | Badge italic Fraunces, border 1.5px, rotatable |
| `.btn-acap` | Bouton principal — border-radius 6px, fond `--ink` |
| `.btn-acap--secondary` | Variante fond transparent, bordure `--ink` |
| `.accent-rose/mousse/moutarde/lavande` | Cascade `--accent`, `--accent-deep`, `--accent-wash` |
| `.admin-input` | Champ de formulaire — 1px border, focus ring rose |

### Typographie v2

```tsx
// app/layout.tsx
import { Fraunces, Work_Sans, Bricolage_Grotesque } from "next/font/google";
// IMPORTANT : ne pas mettre axes= (erreur next/font sur polices non-variable)
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces",
  weight: ["400","500","600","700"], style: ["normal","italic"], display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-worksans",
  weight: ["300","400","500","600","700"], style: ["normal","italic"], display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage",
  weight: ["300","400","500","600","700"], display: "swap" });
```

### Mapping tone Convex → accent v2

```ts
// lib/utils.ts — getToneVars(tone)
const TONE_ACCENT: Record<ToneCouleur, string> = {
  tomate: "rose", soleil: "moutarde", pomme: "mousse",
  ciel: "lavande", rose: "rose", aubergine: "lavande",
};
// Retourne { accent, accentDeep, accentWash, accentClass }
// accentClass = "accent-rose" | "accent-mousse" | …
// → s'applique sur un wrapper pour cascader --accent, --accent-deep, --accent-wash
```

### Pattern de mise en page v2

En-tête éditorial (toutes les pages publiques) :
```tsx
<div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
    <span className="kicker" style={{ color: "var(--rose-deep)" }}>★ Saison 2025–2026</span>
    <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem,5vw,4rem)", ... }}>
      Titre de la page
    </h1>
  </div>
</div>
```

Cartes :
```tsx
<div style={{ background: "#FBF7EC", border: "1px solid var(--ink-line)",
  borderRadius: 6, boxShadow: "8px 8px 0 var(--paper-deep)" }}>
```

---

## Ce que chaque page publique attend des données

| Page | Données Convex | Données statiques |
|------|----------------|-------------------|
| Accueil | spectacles.list · membres.list · actualites.list | — |
| /acap | — | Texte association, valeurs, Le Jardin d'Hélène |
| /ateliers | — | 7 ateliers, tarifs, bienfaits |
| /spectacles | spectacles.list | — |
| /spectacles/[slug] | spectacles.getBySlug | — |
| /galerie | — | VideoSection (9 spectacles YouTube) + archives saisons |
| /pratique | — | Adresse, horaires, tenue, contacts |
| /contact | — | Formulaire 3 onglets, coordonnées |
| /troupe | membres.list | — |

---

## Créer un nouveau variant (v3, v4…)

### Étape 1 : Créer la branche
```bash
git checkout main
git checkout -b v3-nom-du-variant
```

### Étape 2 : Choisir l'approche style
- **Option A — Tailwind** (comme v1) : modifier `tailwind.config.ts`, utiliser des classes
- **Option B — Inline styles + CSS vars** (comme v2) : définir les vars dans `globals.css`,
  utiliser des inline styles dans les pages et composants

### Étape 3 : Configurer les fonts
Dans `app/layout.tsx`, importer les fonts Google et les passer en variables CSS.
**Ne jamais mettre `axes=` sur les fonts** sauf si Next.js le supporte explicitement pour cette police.

### Étape 4 : Redéfinir les classes utilitaires
Dans `globals.css` : `.btn-acap`, `.admin-input`, `.kicker` (ou équivalent).

### Étape 5 : Retravailler dans cet ordre
1. `components/layout/Navbar.tsx`
2. `components/layout/Footer.tsx`
3. `components/home/Hero.tsx` + sections homepage
4. `components/spectacles/SpectacleCard.tsx` + `ModalReservation.tsx`
5. Pages `app/(public)/*.tsx` — en-têtes éditoriaux + layout interne

### Étape 6 : Adapter le mapping tone
Créer ou adapter `getToneVars()` / `getToneClasses()` dans `lib/utils.ts`.

### Étape 7 : Déployer sur un nouveau site Netlify
```bash
# Variables d'env à configurer dans le dashboard Netlify :
NEXT_PUBLIC_CONVEX_URL=https://insightful-frog-410.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://insightful-frog-410.convex.site
NEXT_TELEMETRY_DISABLED=1
```
Build command : `npm run build` · Publish dir : `.next` · Node : 20

### Étape 8 : Garder VideoSection.tsx en commun
`components/galerie/VideoSection.tsx` contient les 9 spectacles archivés YouTube.
Ne pas le modifier par variant — c'est du contenu commun.

---

## Points d'attention

### Ne jamais modifier le schéma Convex entre variants
Les deux sites partagent le même backend. Si un variant a besoin de champs supplémentaires
→ ajouter des champs optionnels (`v.optional()`).

### L'admin est partagé
Ne pas dupliquer `/app/admin/` entre variants. Un seul admin suffit pour gérer les données.

### Les formulaires de contact n'envoient pas encore d'emails
La page `/contact` simule l'envoi (timeout + state `envoyé`).
Pour un vrai envoi → brancher une route API vers Resend ou Brevo.

### InfoBandeau doit avoir `relative z-10`
Le Hero crée un stacking context. Sans `z-10`, InfoBandeau passe derrière.
