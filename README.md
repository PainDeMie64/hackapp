# HackApp

Commercial intelligence tool for ALTEN — built for the AI For Business Hackathon (Centrale Nantes Etudes, April 2026).

Scrapes company data sources, builds structured company profiles in a database, and enriches them with AI-extracted news intelligence when the CEO triggers a search. Everything runs on Cloudflare (Pages, D1, R2).

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  Phase A — Background ingestion (infrequent)                    │
│                                                                 │
│  sources table ──► POST /api/scrape ──► scrape_results (D1)     │
│  (URLs to scrape)    │                  + raw HTML/text (R2)    │
│                      │                                          │
│                      └──► companies table (structured profiles) │
└─────────────────────────────────────────────────────────────────┘
                              │
                    CEO clicks "Enrich"
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│  Phase B — On-demand enrichment (user-triggered)                │
│                                                                 │
│  company ──► search for news ──► LLM extraction ──► news table  │
│                                                     + reports   │
│                                                       (R2)     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     Web UI reads from
                   companies + news tables
```

### Phase A: Scraping

1. Teammates populate the `sources` table with URLs to scrape (company directories, government registries, news sites, etc.)
2. `POST /api/scrape` reads all active sources, fetches each URL, and stores:
   - **Raw HTML + extracted text** → R2 (`scrapes/{source_id}/{url_hash}/{epoch}.html/.txt`)
   - **Page metadata** → D1 `scrape_results` table (title, OG tags, JSON-LD, word count, link count, HTTP status, encoding, etc.)
3. From the scraped data, companies are upserted into the `companies` table with objective fields only (name, domain, sector, employee count, revenue, tech stack, etc.)

### Phase B: Enrichment

4. When the CEO searches, the system finds news about relevant companies using LLMs, storing results in the `news` table with links to full markdown reports in R2.
5. The frontend (built by other teammates) reads from `companies` and `news` to render dashboards.

---

## Getting Started

```bash
git clone git@github.com:PainDeMie64/hackapp.git
cd hackapp
cp .env.example .env       # paste the shared CLOUDFLARE_API_TOKEN
npm install
npm start                  # builds + launches on http://localhost:5173 with D1 + R2
```

Ctrl+C to stop. That's it.

### Cloudflare access for teammates

You don't need your own Cloudflare account. Copy `.env.example` to `.env` and paste the shared API token from the team lead:

```
CLOUDFLARE_ACCOUNT_ID=c4b03b72d6f662c5686f981d2bb8868d
CLOUDFLARE_API_TOKEN=<paste-token-here>
```

This gives you access to deploy, sync the database, and run all wrangler commands.

---

## Database

Four tables in Cloudflare D1 (SQLite on the edge), managed via Drizzle ORM.

### `sources` — URLs to scrape
Where to get data. Populated by the team, consumed by the scraper.

| Key columns | |
|-------------|---|
| `url` | The source URL (unique) |
| `type` | `newsletter`, `government`, `directory`, `news`, `company_website`, `other` |
| `is_active` | Whether the source is reachable (auto-updated by scraper) |
| `last_crawled_at` | When we last scraped this source |

### `scrape_results` — Raw scraped page data
Pre-LLM staging table. Everything extractable from HTTP + HTML without intelligence.

| Key columns | |
|-------------|---|
| `url`, `normalized_url`, `base_domain`, `path` | URL info for dedup and filtering |
| `status_code`, `content_type`, `encoding`, `etag` | HTTP response metadata |
| `title`, `meta_description`, `og_title`, `og_description`, `og_image`, `language` | Page metadata |
| `word_count`, `link_count`, `image_count` | Content metrics |
| `raw_html_r2_key`, `extracted_text_r2_key` | Pointers to full content in R2 |
| `json_ld` | Raw JSON-LD structured data (Schema.org) |
| `source_id` | FK → which source this page came from |

### `companies` — Structured company profiles
Objective, factual data only. No opinions, no news.

| Key columns | |
|-------------|---|
| `name`, `domain` (unique), `description` | Identity |
| `sector`, `subsector`, `location_city`, `location_country` | Classification |
| `employee_count`, `revenue_eur`, `revenue_year` | Metrics |
| `tech_stack` | JSON array string, e.g. `["SAP","AWS"]` |
| `siren`, `linkedin_url`, `logo_url` | External references |
| `enrichment_status` | `pending` / `in_progress` / `completed` / `failed` |

### `news` — AI-extracted news entries
Created when the CEO triggers enrichment. Each links to a company and a source.

| Key columns | |
|-------------|---|
| `company_id`, `source_id` | Foreign keys |
| `title`, `summary`, `category` | What happened (`hiring`, `funding`, `partnership`, etc.) |
| `source_url` | Direct link to the original article |
| `report_key` | R2 key for the full ~1 page markdown report |
| `sentiment`, `relevance_score` | AI-assessed (positive/negative/neutral, 1–10) |

Unique on `(company_id, source_url)` — same article won't be extracted twice.

Schema: `src/lib/server/db/schema.ts`

---

## R2 Storage

Bucket: `hackapp-storage`, binding: `STORAGE`.

| Path pattern | Content |
|-------------|---------|
| `scrapes/{source_id}/{url_hash}/{epoch}.html` | Raw HTML from scraper |
| `scrapes/{source_id}/{url_hash}/{epoch}.txt` | Extracted plain text from scraper |
| `reports/{news_id}.md` | Full LLM-generated news report (~1 page markdown) |

---

## API Endpoints

| Method | Path | What it does |
|--------|------|-------------|
| `POST` | `/api/scrape` | Scrape all active sources (or specific ones via `{ source_ids: [...] }`) |
| `GET` | `/api/health` | System status (DB + R2 connectivity) |

More endpoints defined in SPEC.md but not yet implemented: company CRUD, enrichment triggers, news retrieval, report fetching.

---

## Server-Side Modules

| Module | Path | What it does |
|--------|------|-------------|
| **DB** | `src/lib/server/db/` | Drizzle schema + `getDb(d1)` helper |
| **Storage** | `src/lib/server/storage/` | `getStorage(platform)` → R2 bucket |
| **Scraper** | `src/lib/server/scraper/` | `scrapeUrl()` — fetches URL, extracts metadata via HTMLRewriter, stores in R2 |
| **URL Normalizer** | `src/lib/server/scraper/normalize-url.ts` | Strips tracking params, normalizes protocol/domain/path for dedup |
| **Metadata Extractor** | `src/lib/server/metadata/` | HTMLRewriter-based extraction of OG tags, JSON-LD, meta tags, favicons |
| **Concurrency Pool** | `src/lib/server/concurrency/` | Per-domain rate limiting, semaphore, KV lease coordination for distributed scraping |

---

## UI Components

All in `src/lib/components/ui/`, import from `$lib/components/ui`:

| Component | Key props | Notes |
|-----------|-----------|-------|
| `Button` | `variant`, `size`, `loading` | primary/secondary/ghost/danger |
| `Input` | `label`, `error`, `value` (bindable) | `bind:value` ready |
| `Textarea` | `label`, `error`, `value` (bindable) | Resizable |
| `Select` | `label`, `error`, `value` (bindable) | With children for options |
| `Card` | `variant`, `padding` | default/glass/bordered |
| `Modal` | `open` (bindable), `title`, `size` | Escape to close, backdrop blur |
| `Badge` | `variant`, `size` | 5 color variants |
| `Spinner` | `size` | sm/md/lg |
| `Nav` | `title`, `links`, `actions` | Responsive with mobile menu |
| `ThemeToggle` | | Dark/light with localStorage persistence |
| `Toaster` | | Renders from `toast` store automatically |

**Stores** (import from `$lib`): `theme.toggle()`, `theme.dark`, `toast.success(msg)`, `toast.error(msg)`, etc.

**Utility**: `cn(...classes)` — class merger with `tailwind-merge`.

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | **Build + launch everything** (D1 + R2, port 5173) |
| `npm run dev` | SvelteKit Vite dev server only (no Cloudflare bindings) |
| `npm run build` | Production build |
| `npm run check` | Type check (0 errors required) |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:push` | Overwrite remote D1 with local data |
| `npm run db:pull` | Overwrite local D1 with remote data |
| `npm run db:generate` | Generate Drizzle migration from schema changes |
| `npm run db:migrate:local` | Apply migrations to local D1 |
| `npm run cf-typegen` | Regenerate Cloudflare env types (after editing `wrangler.jsonc`) |

---

## Project Structure

```
src/
  app.css                    Tailwind v4 config, OKLCH color tokens, animations
  app.html                   HTML shell with dark mode flash prevention
  app.d.ts                   Cloudflare platform types (Env with DB + STORAGE)
  lib/
    index.ts                 Barrel export (cn, theme, toast)
    components/ui/           11 UI components
    stores/                  theme.svelte.ts, toast.svelte.ts
    utils/                   cn() (clsx + tailwind-merge)
    server/
      db/                    Drizzle schema (sources, companies, news, scrape_results) + helper
      storage/               R2 helper
      scraper/               URL normalizer + HTMLRewriter scraper
      metadata/              Standalone metadata extractor with tests
      concurrency/           Pool, semaphore, per-domain rate limiter, KV leases
  routes/
    +layout.svelte           Root layout (Nav + Toaster + footer)
    +page.svelte             Landing page / component showcase
    api/
      health/                GET — DB + R2 status check
      scrape/                POST — scrape all active sources
scripts/
  db-push.sh                 Local → remote D1 sync
  db-pull.sh                 Remote → local D1 sync
  load-env.sh                Load .env for wrangler commands
drizzle/
  0000_*.sql                 Initial schema (dropped users table)
  0001_*.sql                 Production tables (sources, companies, news)
  0002_*.sql                 Scrape results table
dev.sh                       npm start entrypoint
wrangler.jsonc               Cloudflare Pages + D1 + R2 bindings
SPEC.md                      Full system specification
CLAUDE.md                    AI assistant context file
```

---

## Deploy

```bash
npm run deploy
```

Deploys to `hackapp.pages.dev` with the remote D1 database and R2 bucket. Requires a Cloudflare API token in `.env` or a `wrangler login` session.

---

## Stack

- **SvelteKit 5** — runes, snippets, TypeScript strict mode
- **Tailwind CSS v4** — OKLCH colors, class-based dark mode, `@theme` tokens
- **Drizzle ORM + Cloudflare D1** — type-safe SQL on the edge (SQLite)
- **Cloudflare R2** — object storage for raw HTML, extracted text, and reports
- **Cloudflare Pages** — edge deployment
- **Zod** — runtime validation
- **Lucide** — icons (`lucide-svelte`)
