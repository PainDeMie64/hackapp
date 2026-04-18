# HackApp

A hackathon webapp starter built for speed. SvelteKit 5, Tailwind v4, Cloudflare D1, and a ready-to-use component library — just add your idea.

## Stack

- **SvelteKit 5** — runes, snippets, TypeScript strict mode
- **Tailwind CSS v4** — OKLCH color tokens, class-based dark mode
- **Drizzle ORM + Cloudflare D1** — type-safe SQL on the edge
- **Cloudflare Pages** — global deployment in seconds
- **UI Components** — Button, Input, Textarea, Select, Card, Modal, Badge, Spinner, Nav, ThemeToggle, Toaster

## Getting Started

```bash
git clone git@github.com:PainDeMie64/hackapp.git
cd hackapp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Type check |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate:local` | Apply migrations locally |
| `npm run cf-typegen` | Regenerate Cloudflare env types |

## Database

Uses Cloudflare D1 via Drizzle ORM. Schema lives in `src/lib/server/db/schema.ts`.

```bash
# Generate a migration after editing the schema
npm run db:generate

# Apply locally
npm run db:migrate:local

# Apply to production
npx wrangler d1 migrations apply hackapp-db --remote
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
    +page.svelte     Landing page / component showcase
    api/health/      Health check endpoint
```

## Deploy

```bash
npm run deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) auth — run `npx wrangler login` first.
