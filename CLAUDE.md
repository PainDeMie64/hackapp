# HackApp

ALTEN Commercial Intelligence & Prospecting Agent for the AI For Business Hackathon.

## Stack
- SvelteKit 5 (runes, Svelte 5 syntax)
- Tailwind CSS v4 (via @tailwindcss/vite, @theme in app.css)
- TypeScript strict mode
- Drizzle ORM + Cloudflare D1 (SQLite on the edge)
- n8n (local workflow engine for AI prospecting agent)
- OpenAI (prospect analysis, market reports)
- Google Sheets (real-time prospect database)
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
- `n8n/` — workflow JSON, setup/import/export/watch scripts

## Commands
- `npm run dev` — start SvelteKit dev server (port 5173)
- `npm run n8n` — start n8n + import workflows + auto-export watcher (port 5679)
- `npm run n8n:export` — export workflows from n8n UI to git
- `npm run n8n:import` — import workflows from git to running n8n
- `npm run build` — production build
- `npm run check` — type check (requires cf-typegen to have run once)
- `npm run deploy` — build + deploy to Cloudflare Pages
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
- n8n webhook is at `http://localhost:5679/webhook-test/prospect-search` (dev) or `/webhook/prospect-search` (when workflow is active)
- n8n credentials (OpenAI, Google Sheets) are configured in the n8n UI, not in .env files

## Setup on Fresh Clone
```bash
npm install          # also runs cf-typegen via prepare script
npm run dev          # SvelteKit frontend
npm run n8n          # n8n workflow engine (separate terminal)
```
