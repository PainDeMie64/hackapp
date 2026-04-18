# HackApp

ALTEN Commercial Intelligence & Prospecting Agent — built for the AI For Business Hackathon (Centrale Nantes Etudes, April 2026).

AI-powered prospecting tool that automatically finds companies in a target sector, analyzes them, saves structured data to Google Sheets, and generates market + news reports.

## Stack

- **SvelteKit 5** — runes, snippets, TypeScript strict mode
- **Tailwind CSS v4** — OKLCH color tokens, class-based dark mode
- **Drizzle ORM + Cloudflare D1** — type-safe SQL on the edge
- **n8n** — local workflow engine for the AI prospecting agent
- **OpenAI** — prospect analysis, market reports, news digests
- **Google Sheets** — real-time prospect database
- **Cloudflare Pages** — global deployment

## Getting Started

```bash
git clone git@github.com:PainDeMie64/hackapp.git
cd hackapp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## n8n Workflow (Prospect Agent)

The AI prospecting agent runs as a local n8n workflow.

```bash
npm run n8n
```

This starts n8n at [http://localhost:5679](http://localhost:5679), creates an admin account, and imports the workflow.

**Login:** `admin@hackapp.dev` / `HackApp2026!`

### How it works

```
Frontend (POST /webhook/prospect-search)
  → Google Custom Search (find companies by sector + location)
  → AI analysis per company (OpenAI — structured prospect data)
  → Google Sheets (save each prospect in real time)
  → AI Market Report + News API digest
  → JSON response back to frontend
```

### Required credentials (configure in n8n UI)

1. **OpenAI** — API key for prospect analysis + reports
2. **Google Sheets** — OAuth2 for writing prospect data
3. **Google Custom Search** — set as n8n environment variables:
   - `GOOGLE_SEARCH_API_KEY`
   - `GOOGLE_SEARCH_ENGINE_ID`
   - `GOOGLE_SHEET_ID`
4. **News API** (optional) — `NEWS_API_KEY` from newsapi.org

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start SvelteKit dev server |
| `npm run n8n` | Start n8n + import prospect workflow |
| `npm run n8n:export` | Export workflows from n8n UI → git |
| `npm run n8n:import` | Import workflows from git → running n8n |
| `npm run build` | Production build |
| `npm run check` | Type check |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate:local` | Apply migrations locally |
| `npm run cf-typegen` | Regenerate Cloudflare env types |

## Project Structure

```
src/
  lib/
    components/ui/   UI component library
    stores/          Theme + toast stores (Svelte 5 runes)
    server/db/       Drizzle schema + db helper
    utils/           cn() class merge helper
  routes/
    +layout.svelte   Root layout with nav + toaster
    +page.svelte     Landing page
    api/health/      Health check endpoint
n8n/
  *.workflow.json   Workflow definitions (git-tracked)
  setup.sh          Launch + auto-import script
  import.mjs        Push git → n8n
  export.mjs        Pull n8n → git
```

## Deploy

```bash
npm run deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) auth — run `npx wrangler login` first.
