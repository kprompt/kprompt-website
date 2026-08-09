# AGENTS.md — kprompt-website

Public marketing site for [kprompt](https://kprompt.ai) — **The AI Runtime for Kubernetes**. Next.js 15 (App Router, Turbopack) + TypeScript + Tailwind + shadcn/radix. Also hosts product docs under `/docs`.

Product direction and positioning live in the private `kprompt-architecture` repo ([VISION.md], [WEBSITE-SYSTEM-PROMPT.md]) — do not invent conflicting product claims here.

## Product DNA (do not contradict)

- Category: **The AI Runtime for Kubernetes** — never position as a generic AI chatbot or compare against ChatGPT.
- Lead with the loop (Observe -> Reason -> Plan -> Validate -> Approve -> Execute -> Learn) and trust/safety as the product.
- Honesty: only claim shipped surfaces as shipped; label MVP; roadmap uses "Building next" not fake dates; never "AI auto-fixes everything."

## Layout

| Path | Role |
|------|------|
| `src/app` | App Router routes (marketing + `/docs` + `/blog` + OG image routes) |
| `src/components` | UI (layout, seo, shadcn primitives) |
| `src/lib` | `constants.ts`, `docs-content.ts`, OG brand helpers |
| `public` | Static assets, `llms.txt` |
| `docs` | Repo docs |

## Build / test

```bash
npm run dev      # next dev --turbopack
npm run build    # next build --turbopack
npm run lint     # eslint
npm run test     # vitest run
```

## Working rules

1. Keep copy aligned with the locked category positioning; when in doubt, mirror `src/lib/constants.ts` and existing pages.
2. Providers table / feature lists must match the product (`kprompt/internal/llm/presets.go`) — no vendors we do not ship.
3. Accessibility + SEO: preserve JSON-LD (`src/components/seo`), OG routes, and sitemap when editing pages.
4. Run `npm run lint` and `npm run test` before handing off; keep the build green.
5. No secrets or analytics keys in the tree.
6. Commit / open PRs only when asked.

## Cursor rules / skills

- Always-on: `.cursor/rules/project.mdc`.
- Skill: `web-page` — add/edit a marketing or docs page consistently (routing, SEO, honesty).
