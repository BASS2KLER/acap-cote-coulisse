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

Pour gérer les déploiements Netlify (env vars, builds, logs), utiliser le skill `deploy-netlify` :
- CLI authentifié en tant que `b.declercq@keolease.fr`
- Cibler un site via `/tmp/netlify-<nom>/.netlify/state.json` avec le bon ID

### Git push

`git push` échoue avec HTTP 400 sur ce repo. Utiliser l'API GitHub via `gh` :
```bash
gh api --method POST repos/BASS2KLER/acap-cote-coulisse/git/refs \
  -f ref="refs/heads/<branche>" -f sha="$(git rev-parse HEAD)"
# ou PATCH pour mettre à jour une branche existante
gh api --method PATCH repos/BASS2KLER/acap-cote-coulisse/git/refs/heads/<branche> \
  -f sha="$(git rev-parse HEAD)"
```
> Note : `git push` direct fonctionne parfois (testé OK en mai 2026). Essayer d'abord, fallback vers gh API si HTTP 400.

### Variables d'env Netlify (toutes variantes)

```
NEXT_PUBLIC_CONVEX_URL=https://insightful-frog-410.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://insightful-frog-410.convex.site
ADMIN_PASSWORD=<voir .env.local>
```
