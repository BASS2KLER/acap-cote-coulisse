<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

## Projet ACAP — Site web troupe de théâtre

**Stack :** Next.js 14 App Router + Convex (backend temps réel) + Netlify (hébergement)

### Trois variantes de design déployées

| Variante | Branche | URL | Design system |
|----------|---------|-----|---------------|
| v1 Côté Coulisses | `main` | acap-cote-coulisse.netlify.app | Tailwind, earthy neo-brutalist |
| v2 Carte & Compagnie | `v2-carte-compagnie` | acap-v2-carte-compagnie.netlify.app | Inline styles + CSS vars, paper/ink |
| v3 Brique & Blanc | `v3-brique-et-blanc` | acap-v3-brique-et-blan.netlify.app | Inline styles + CSS vars, brick/cream |

### Convex

- **Prod** (toutes les variantes Netlify) : `insightful-frog-410.convex.cloud`
- **Dev local** : `fast-narwhal-9.eu-west-1.convex.cloud` (dans `.env.local`)
- ⚠️ Ne jamais mettre `fast-narwhal-9` dans les variables Netlify — c'est le dev uniquement.

### Netlify — IDs des sites ACAP

| Site | Netlify ID |
|------|-----------|
| v1 | `55eb7362-b838-403f-b825-16d9a55f498f` |
| v2 | `f51a1b0e-cce0-4d60-b55c-f4a38736c3d8` |
| v3 | `475ae4ed-8f57-41fa-89c7-fbd8f3a108e8` |

Pour déployer, utiliser `--site <id>` (le projet est lié à v1 par défaut) :
```bash
netlify deploy --build --prod                                               # v1
netlify deploy --build --prod --site f51a1b0e-cce0-4d60-b55c-f4a38736c3d8  # v2
netlify deploy --build --prod --site 475ae4ed-8f57-41fa-89c7-fbd8f3a108e8  # v3
```

### Git push

`git push` fonctionne en général directement. Si HTTP 400, fallback :
```bash
gh api --method PATCH repos/BASS2KLER/acap-cote-coulisse/git/refs/heads/<branche> \
  -f sha="$(git rev-parse <branche>)"
```

### Variables d'env Netlify (toutes variantes)

```
NEXT_PUBLIC_CONVEX_URL=https://insightful-frog-410.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://insightful-frog-410.convex.site
ADMIN_PASSWORD=<voir .env.local>
GMAIL_USER=keolease@keolease.fr
GMAIL_APP_PASSWORD=qfmu sucq wtxt nyng
CONTACT_TO=lacap95@free.fr
```

### Tables Convex (mai 2026)

`spectacles` · `membres` · `actualites` · `galerie` · `reservations`

**Déployer le schéma Convex en prod :**
```bash
CONVEX_DEPLOYMENT="prod:insightful-frog-410" npx convex deploy --yes
```

### Fonctionnalités admin

| Section | Route | Description |
|---------|-------|-------------|
| Tableau de bord | `/admin` | Actions rapides |
| Spectacles | `/admin/spectacles` | CRUD + upload affiche + galerie photos |
| Réservations | `/admin/reservations` | Gestion places par représentation, export/impression |
| La troupe | `/admin/membres` | CRUD membres |
| Actualités | `/admin/actualites` | CRUD articles |
| Galerie | `/admin/galerie` | Upload photos + vidéos YouTube + archives 2009-2011 |
