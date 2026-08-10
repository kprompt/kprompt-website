---
name: web-page
description: >-
  Add or edit a kprompt-website marketing or docs page with consistent routing, SEO,
  components, and honest product claims. Use when creating a new route under src/app,
  editing docs content, or updating the providers/features/roadmap surfaces.
---

# Web page workflow

## 1. Place the page

| Kind | Location |
|------|----------|
| Marketing route | `src/app/<route>/page.tsx` |
| Docs page | `src/app/docs/<slug>/page.tsx` + content in `src/lib/docs-content.ts` |
| Blog post | `src/content/blog/<slug>.ts` + register in `src/content/blog/index.ts`; helpers in `src/lib/blog-posts.ts` |
| OG image | `src/app/og/**` / `opengraph-image.tsx` |

Reuse layout + primitives from `src/components`; pull shared copy/links from `src/lib/constants.ts`.

## 2. SEO + metadata

- Export `metadata` (title/description) per route; keep it aligned with positioning.
- Preserve JSON-LD (`src/components/seo`), add the route to `sitemap.ts` if public.
- Update `llms.txt` when adding a significant public surface.

## 3. Honesty gate

- Only list shipped providers/features; match `kprompt/internal/llm/presets.go` and product docs.
- Roadmap items go under "Building next" — no fake ship dates; never claim auto-heal.

## 4. Finish

```bash
npm run lint && npm run test && npm run build
```

Commit / PR only when the user asks.
