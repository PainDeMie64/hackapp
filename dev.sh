#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"
PIDS=()

cleanup() {
  echo ""
  echo "==> Shutting down..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null
  done
  wait 2>/dev/null
}
trap cleanup EXIT INT TERM

# ── 1. Build SvelteKit ──
echo "==> Building SvelteKit..."
npm run build --prefix "$ROOT_DIR" 2>&1 | tail -3

# ── 2. Start wrangler pages dev (Cloudflare D1 + Pages environment) ──
echo "==> Starting web app on http://localhost:5173 (Cloudflare D1)..."
npx wrangler pages dev "$ROOT_DIR/.svelte-kit/cloudflare" --port 5173 &
PIDS+=($!)

# ── 3. Start n8n ──
echo "==> Starting n8n..."
"$ROOT_DIR/n8n/setup.sh" &
PIDS+=($!)

# ── Wait for services ──
echo "==> Waiting for services..."
for i in $(seq 1 15); do
  WEB=$(curl -sf http://localhost:5173/api/health 2>/dev/null && echo "ok" || echo "")
  if [ -n "$WEB" ]; then break; fi
  sleep 2
done

echo ""
echo "  ┌─────────────────────────────────────────────────────┐"
echo "  │  HackApp is running                                 │"
echo "  │                                                     │"
echo "  │  Web app:   http://localhost:5173                   │"
echo "  │  n8n UI:    http://localhost:5679                   │"
echo "  │  Webhook:   http://localhost:5679/webhook-test/     │"
echo "  │             prospect-search                         │"
echo "  │  Database:  Cloudflare D1 (local)                   │"
echo "  │                                                     │"
echo "  │  Run 'npm run deploy' to push to production         │"
echo "  │  with the remote D1 database.                       │"
echo "  │                                                     │"
echo "  │  Press Ctrl+C to stop everything.                   │"
echo "  └─────────────────────────────────────────────────────┘"
echo ""

wait
