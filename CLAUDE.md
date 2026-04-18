# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

ALTEN Commercial Intelligence & Prospecting Agent for the AI For Business Hackathon (Centrale Nantes Etudes, April 2026). Scrapes company data sources, builds structured profiles, and enriches them with AI-extracted news intelligence.

## Commands

- `npm start` — **primary dev command**: builds SvelteKit then runs wrangler pages dev with D1 + R2 bindings on port 5173
- `npm run dev` — Vite dev server only, **no Cloudflare bindings** (DB/R2 unavailable)
- `npm run build` — production build
- `npm run check` — svelte-check + TypeScript
- `npm test` — vitest run (tests execute in Cloudflare Workers runtime via `@cloudflare/vitest-pool-workers`)
- `npm run test:watch` — vitest watch mode
- `npm run deploy` — build + deploy to Cloudflare Pages
- `npm run db:generate` — generate Drizzle migration from schema changes
- `npm run db:migrate:local` — apply migrations to local D1
- `npm run db:push` / `npm run db:pull` — sync local ↔ remote D1
- `npm run cf-typegen` — regenerate Cloudflare env types after editing `wrangler.jsonc`

## Architecture

### Two-phase data flow

**Phase A (background scraping):** `sources` table → `POST /api/scrape` → stores raw HTML/text in R2, page metadata in `scrape_results` table → downstream pipeline upserts into `companies` table.

**Phase B (on-demand enrichment):** CEO triggers search → LLM finds news about companies → `news` table + full markdown reports in R2.

### Cloudflare bindings

All server-side code accesses Cloudflare services through `platform.env`:
- `platform.env.DB` — D1 database (SQLite), wrapped via `getDb(platform.env.DB)` → Drizzle instance
- `platform.env.STORAGE` — R2 bucket, wrapped via `getStorage(platform)` → R2Bucket

The `Env` type comes from `wrangler types` → `src/worker-configuration.d.ts`, exposed in `src/app.d.ts` as `App.Platform.env`.

### Scraping pipeline

`scrapeUrl()` in `src/lib/server/scraper/scrape-url.ts` is the core unit: fetch → HTMLRewriter metadata extraction → store HTML + extracted text in R2 → return `NewScrapeResult` row.

R2 key layout: `scrapes/{source_id}/{sha256(normalized_url)}/{epoch}.html|.txt`

`ConcurrencyPool` in `src/lib/server/concurrency/pool.ts` provides per-domain rate limiting (semaphore + inter-request delay) and a global concurrency cap. Designed for Workers constraints (no threads, cooperative async only).

### Testing

Tests use `@cloudflare/vitest-pool-workers` — they run inside the Cloudflare Workers runtime, not Node. This means Workers APIs (HTMLRewriter, R2, D1) are available in tests without mocking. Config in `vitest.config.ts`.

### Database

Four tables in D1 via Drizzle ORM: `sources`, `scrape_results`, `companies`, `news`. Schema in `src/lib/server/db/schema.ts`. All IDs are UUIDs (text primary keys via `crypto.randomUUID()`). Timestamps stored as integers (epoch).

## Conventions

- **Svelte 5 runes**: `$state`, `$derived`, `$effect`, `$props`, `$bindable`. Use `{@render children()}` not slots.
- **Tailwind CSS v4**: color tokens are `brand-*` (primary) and `surface-*` (neutral), defined as OKLCH in `src/app.css` `@theme`. Dark mode via `dark:` prefix + html class toggle.
- **Imports**: UI components from `$lib/components/ui`, stores from `$lib` barrel export, `cn()` for conditional class merging.
- **Server-only code** goes in `src/lib/server/` — enforced by SvelteKit.
- **Lucide icons** via `lucide-svelte`.
- **Zod** for runtime validation.

## Setup

```bash
cp .env.example .env   # fill in CLOUDFLARE_API_TOKEN
npm install
npm start
```
