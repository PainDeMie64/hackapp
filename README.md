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

`npm start` builds the app and launches it on [http://localhost:5173](http://localhost:5173) with Cloudflare D1 and R2. One command, Ctrl+C to stop.

### Cloudflare access for teammates

You do **not** need your own Cloudflare account. Copy `.env.example` to `.env` and paste the shared API token from the team lead. The account ID is already filled in.

```
CLOUDFLARE_ACCOUNT_ID=c4b03b72d6f662c5686f981d2bb8868d
CLOUDFLARE_API_TOKEN=<paste-token-here>
```

This gives every teammate access to deploy, db:push/pull, and all wrangler commands.

## Stack

- **SvelteKit 5** — runes, snippets, TypeScript strict mode
- **Tailwind CSS v4** — OKLCH color tokens, class-based dark mode, `@theme` tokens in `app.css`
- **Drizzle ORM + Cloudflare D1** — type-safe SQL on the edge
- **Cloudflare R2** — object storage (bucket: `hackapp-storage`, binding: `STORAGE`)
- **Cloudflare Pages** — global deployment
- **Zod** — runtime validation
- **Lucide** — icon library (`lucide-svelte`)

## UI Components

All in `src/lib/components/ui/`, import from `$lib/components/ui`:

| Component | Props | Notes |
|-----------|-------|-------|
| `Button` | `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg), `loading` | Supports all native button attrs |
| `Input` | `label`, `error`, `value` (bindable) | `bind:value` ready |
| `Textarea` | `label`, `error`, `value` (bindable) | Resizable, min-height |
| `Select` | `label`, `error`, `value` (bindable), `children` (options) | `bind:value` ready |
| `Card` | `variant` (default/glass/bordered), `padding` (none/sm/md/lg) | |
| `Modal` | `open` (bindable), `onclose`, `size`, `title` | Escape to close, backdrop blur |
| `Badge` | `variant` (default/brand/success/warning/danger), `size` | |
| `Spinner` | `size` (sm/md/lg) | |
| `Nav` | `title`, `links`, `actions` | Responsive, mobile menu |
| `ThemeToggle` | | Dark/light toggle with localStorage |
| `Toaster` | | Auto-renders from `toast` store |

### Stores

Import from `$lib`:

- **`theme`** — `theme.dark` (boolean), `theme.toggle()`, `theme.set(bool)`
- **`toast`** — `toast.info(msg)`, `toast.success(msg)`, `toast.warning(msg)`, `toast.error(msg)`, `toast.remove(id)`

### Utilities

- **`cn(...classes)`** — class merger (`clsx` + `tailwind-merge`), import from `$lib`

## Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | **Build + launch with D1 + R2** (port 5173) |
| `npm run dev` | SvelteKit Vite dev server (no Cloudflare bindings) |
| `npm run build` | Production build |
| `npm run check` | Type check |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run db:push` | Overwrite remote D1 with local data |
| `npm run db:pull` | Overwrite local D1 with remote data |
| `npm run db:generate` | Generate Drizzle migration from schema |
| `npm run db:migrate:local` | Apply migrations to local D1 |
| `npm run cf-typegen` | Regenerate Cloudflare env types after editing `wrangler.jsonc` |

## Database (D1)

Uses Cloudflare D1 via Drizzle ORM. Schema lives in `src/lib/server/db/schema.ts`.

```bash
npm run db:generate          # after editing the schema
npm run db:migrate:local     # apply locally
npm run db:push              # push local → remote
npm run db:pull              # pull remote → local
```

Access in server routes via:

```typescript
import { getDb } from '$lib/server/db';
const db = getDb(platform.env.DB);
```

## Storage (R2)

Cloudflare R2 object storage. Bucket: `hackapp-storage`, binding: `STORAGE`.

Access in server routes via:

```typescript
import { getStorage } from '$lib/server/storage';
const bucket = getStorage(platform);

await bucket.put('key', data);
const obj = await bucket.get('key');
```

## Project Structure

```
src/
  app.css              Tailwind config, color tokens, animations
  app.html             HTML shell with dark mode flash prevention
  app.d.ts             Cloudflare platform types
  lib/
    index.ts           Barrel export (cn, theme, toast)
    components/ui/     UI component library (11 components)
    stores/            theme.svelte.ts, toast.svelte.ts
    server/
      db/              Drizzle schema + getDb() helper
      storage/         getStorage() R2 helper
    utils/             cn() (clsx + tailwind-merge)
  routes/
    +layout.svelte     Root layout (Nav + Toaster)
    +page.svelte       Landing page / component showcase
    api/health/        GET /api/health — status + DB check
scripts/
  db-push.sh           Local → remote D1 sync
  db-pull.sh           Remote → local D1 sync
  load-env.sh          Load .env for wrangler commands
drizzle/
  *.sql                Generated migrations
dev.sh                 npm start entrypoint
wrangler.jsonc         Cloudflare Pages + D1 + R2 config
```

## Deploy

```bash
npm run deploy
```

Requires a Cloudflare API token in `.env` or a `wrangler login` session. Deploys to `hackapp.pages.dev` with the remote D1 database and R2 bucket.
