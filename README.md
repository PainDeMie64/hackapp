# HackApp

ALTEN Commercial Intelligence & Prospecting Agent — built for the AI For Business Hackathon (Centrale Nantes Etudes, April 2026).

AI-powered prospecting tool that automatically finds companies in a target sector, analyzes them, saves structured data to Google Sheets, and generates market + news reports.

## Prerequisites

- **Node.js 18+** (uses native `fetch`)
- **npm**
- **n8n** — installed globally (`npm install -g n8n`) or auto-downloaded via npx on first run

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
npm start
```

`npm start` builds the app, launches the web server (port 5173) with Cloudflare D1, starts n8n (port 5679) with the prospect workflow, and wires everything together. One command, one Ctrl+C to stop.

You can also run services individually:

```bash
npm run dev          # SvelteKit only (Vite dev server, no D1)
npm run n8n          # n8n only
```

## n8n Workflow (Prospect Agent)

```bash
npm run n8n
```

Starts n8n at [http://localhost:5679](http://localhost:5679), creates an admin account, imports workflows, and starts an auto-export watcher.

**Login:** `admin@hackapp.dev` / `HackApp2026!`

### How it works

```
Frontend (POST /webhook-test/prospect-search)
  → Google Custom Search (find companies by sector + location)
  → AI analysis per company (OpenAI — structured prospect data)
  → Google Sheets (save each prospect in real time)
  → AI Market Report + News API digest
  → JSON response back to frontend
```

Use `/webhook-test/...` during development. Use `/webhook/...` when the workflow is activated in n8n.

### Required credentials (configure in n8n UI)

Each team member must configure these in their local n8n after first run — credentials are not shared via git.

1. **OpenAI** — API key for prospect analysis + reports
2. **Google Sheets** — OAuth2 for writing prospect data
3. **Google Custom Search** — set as n8n environment variables:
   - `GOOGLE_SEARCH_API_KEY`
   - `GOOGLE_SEARCH_ENGINE_ID`
   - `GOOGLE_SHEET_ID` (the sheet ID, not the full URL)
4. **News API** (optional) — `NEWS_API_KEY` from newsapi.org

### Collaborating on workflows

Workflows auto-export to `n8n/*.workflow.json` when you save in the n8n UI.

```bash
git add n8n/ && git commit -m "Update workflow" && git push    # share your changes
git pull && npm run n8n:import                                  # get teammate's changes
```

**Important:** Only one person should edit a given workflow at a time. Concurrent edits will cause JSON merge conflicts that are hard to resolve by hand.

## Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | **Launch everything** (web app + n8n + D1) |
| `npm run dev` | SvelteKit only (Vite dev server, no D1) |
| `npm run n8n` | Start n8n + import + auto-export watcher (port 5679) |
| `npm run n8n:export` | Export workflows from n8n UI → git |
| `npm run n8n:import` | Import workflows from git → running n8n |
| `npm run build` | Production build |
| `npm run check` | Type check |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:push` | Overwrite remote D1 with local data |
| `npm run db:pull` | Overwrite local D1 with remote data |
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
  setup.sh          Launch + auto-import + watcher
  import.mjs        Push git → n8n
  export.mjs        Pull n8n → git
  watch.mjs         Auto-export on workflow save
```

## Deploy

```bash
npm run deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) auth — run `npx wrangler login` first.
