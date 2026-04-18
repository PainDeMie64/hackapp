# HackApp

ALTEN Commercial Intelligence & Prospecting Agent for the AI For Business Hackathon.

## Stack
- SvelteKit 5 (runes, Svelte 5 syntax)
- Tailwind CSS v4 (via @tailwindcss/vite, @theme in app.css)
- TypeScript strict mode
- Drizzle ORM + Cloudflare D1 (SQLite on the edge)
- Cloudflare Pages deployment
- Lucide icons (lucide-svelte)
- Zod for validation

## Project Structure
- `src/lib/components/ui/` — reusable UI components (Button, Input, Card, Modal, Badge, etc.)
- `src/lib/stores/` — Svelte 5 rune-based stores (theme, toast)
- `src/lib/utils/` — utility functions (cn with tailwind-merge)
- `src/lib/server/db/` — Drizzle schema and db helper
- `src/routes/api/` — API endpoints (+server.ts files)
- `drizzle/` — generated migrations
- `scripts/` — db sync scripts

## Commands
- `npm start` — build + launch with Cloudflare D1 (port 5173)
- `npm run dev` — SvelteKit only (Vite dev server, no D1)
- `npm run build` — production build
- `npm run check` — type check
- `npm run deploy` — build + deploy to Cloudflare Pages
- `npm run db:push` — overwrite remote D1 with local data
- `npm run db:pull` — overwrite local D1 with remote data
- `npm run db:generate` — generate Drizzle migrations
- `npm run db:migrate:local` — apply migrations locally
- `npm run cf-typegen` — regenerate Cloudflare env types

## Conventions
- Use Svelte 5 runes ($state, $derived, $effect, $props, $bindable)
- Use `{@render children()}` not slots
- Import UI components from `$lib/components/ui`
- Import stores from `$lib` barrel export
- Use `cn()` for conditional class merging (uses tailwind-merge)
- Server-only code goes in `src/lib/server/`
- Use `platform.env.DB` to access D1 in server routes/load functions
- Color tokens: brand-* (primary), surface-* (neutral) — defined in app.css @theme
- Dark mode via `dark:` prefix, toggled by html class

## Setup on Fresh Clone
```bash
cp .env.example .env   # fill in CLOUDFLARE_API_TOKEN
npm install
npm start
```
