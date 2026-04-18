# HackApp

ALTEN Commercial Intelligence & Prospecting Agent — built for the AI For Business Hackathon (Centrale Nantes Etudes, April 2026).

## Prerequisites

- **Node.js 18+**
- **npm**

## Getting Started

```bash
git clone git@github.com:PainDeMie64/hackapp.git
cd hackapp
cp .env.example .env       # fill in CLOUDFLARE_API_TOKEN (ask the team lead)
npm install
npm start
```

`npm start` builds the app and launches it on [http://localhost:5173](http://localhost:5173) with Cloudflare D1. One command, Ctrl+C to stop.

### Cloudflare access for teammates

You do **not** need your own Cloudflare account. Copy `.env.example` to `.env` and paste the shared API token from the team lead. The account ID is already filled in.

```
CLOUDFLARE_ACCOUNT_ID=c4b03b72d6f662c5686f981d2bb8868d
CLOUDFLARE_API_TOKEN=<paste-token-here>
```

## Stack

- **SvelteKit 5** — runes, snippets, TypeScript strict mode
- **Tailwind CSS v4** — OKLCH color tokens, class-based dark mode
- **Drizzle ORM + Cloudflare D1** — type-safe SQL on the edge
- **Cloudflare Pages** — global deployment
- **UI Components** — Button, Input, Textarea, Select, Card, Modal, Badge, Spinner, Nav, ThemeToggle, Toaster

## Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | **Build + launch with D1** (port 5173) |
| `npm run dev` | SvelteKit only (Vite, no D1) |
| `npm run build` | Production build |
| `npm run check` | Type check |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:push` | Overwrite remote D1 with local data |
| `npm run db:pull` | Overwrite local D1 with remote data |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate:local` | Apply migrations locally |
| `npm run cf-typegen` | Regenerate Cloudflare env types |

## Database

Uses Cloudflare D1 via Drizzle ORM. Schema lives in `src/lib/server/db/schema.ts`.

```bash
npm run db:generate          # after editing the schema
npm run db:migrate:local     # apply locally
npm run db:push              # push local → remote
npm run db:pull              # pull remote → local
```

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
scripts/
  db-push.sh         Local → remote D1
  db-pull.sh         Remote → local D1
  load-env.sh        Load .env for wrangler commands
```

## Deploy

```bash
npm run deploy
```

Requires a Cloudflare API token in `.env` or a `wrangler login` session.
