# kprompt.ai

Production landing page for **[kprompt.ai](https://kprompt.ai)** — an open-source AI platform for controlling Kubernetes with natural language.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Deploy on Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Deploy

Or with the Vercel CLI:

```bash
npx vercel
```

## Project structure

```
src/
  app/                 # App Router pages, SEO, styles
  components/
    layout/            # Navbar, footer
    sections/          # Landing sections
    ui/                # Shared UI primitives
  lib/                 # Constants, demo data, utils
public/                # Static assets (logo, favicon, OG)
```

## Brand

| Token | HEX |
|-------|-----|
| Primary Blue | `#2563EB` |
| Bright Blue | `#3B82F6` |
| Indigo | `#4F46E5` |
| Primary Purple | `#7C3AED` |
| Dark Navy | `#0F172A` |
| Background | `#FFFFFF` |

## Author

**Muhtalip Dede**  
- Email: [muhtalipdede@gmail.com](mailto:muhtalipdede@gmail.com)  
- GitHub: [github.com/muhtalipdede](https://github.com/muhtalipdede)

## License

[Apache-2.0](./LICENSE) © 2026 Muhtalip Dede
