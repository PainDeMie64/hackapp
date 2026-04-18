#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

echo "==> Building SvelteKit..."
npm run build --prefix "$ROOT_DIR" 2>&1 | tail -3

echo "==> Starting on http://localhost:5173 (Cloudflare D1)..."
npx wrangler pages dev "$ROOT_DIR/.svelte-kit/cloudflare" --port 5173
