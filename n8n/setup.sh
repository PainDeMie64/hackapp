#!/usr/bin/env bash
set -euo pipefail

N8N_PORT=${N8N_PORT:-5679}
N8N_EMAIL=${N8N_EMAIL:-admin@hackapp.dev}
N8N_PASSWORD=${N8N_PASSWORD:-HackApp2026!}
N8N_DIR="$(cd "$(dirname "$0")" && pwd)"

export N8N_PORT=$N8N_PORT
export N8N_SECURE_COOKIE=false
export N8N_RUNNERS_DISABLED=true
export N8N_USER_FOLDER="$N8N_DIR/.n8n-data"

mkdir -p "$N8N_USER_FOLDER"

if command -v lsof &>/dev/null && lsof -i :"$N8N_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "ERROR: Port $N8N_PORT is already in use" >&2
  exit 1
fi

echo "==> Starting n8n on port $N8N_PORT..."
npx n8n start &
N8N_PID=$!
trap "kill $N8N_PID 2>/dev/null" EXIT INT TERM

echo "==> Waiting for n8n to be ready..."
N8N_READY=false
for i in $(seq 1 30); do
  if curl -sf "http://localhost:$N8N_PORT/healthz" > /dev/null 2>&1; then
    echo "==> n8n is ready at http://localhost:$N8N_PORT"
    N8N_READY=true
    break
  fi
  sleep 2
done

if [ "$N8N_READY" = "false" ]; then
  echo "ERROR: n8n did not start within 60 seconds" >&2
  exit 1
fi

# Set up owner account if needed
curl -sf -X POST "http://localhost:$N8N_PORT/rest/owner/setup" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$N8N_EMAIL\",\"firstName\":\"Admin\",\"lastName\":\"HackApp\",\"password\":\"$N8N_PASSWORD\"}" > /dev/null 2>&1 || true

# Import all workflows from git
echo "==> Importing workflows..."
N8N_URL="http://localhost:$N8N_PORT" node "$N8N_DIR/import.mjs" || echo "==> Import failed — check credentials or workflow JSON."

# Start auto-export watcher
echo "==> Starting auto-export watcher..."
N8N_URL="http://localhost:$N8N_PORT" N8N_USER_FOLDER="$N8N_USER_FOLDER" node "$N8N_DIR/watch.mjs" &
WATCH_PID=$!
trap "kill $WATCH_PID 2>/dev/null; kill $N8N_PID 2>/dev/null" EXIT INT TERM

echo ""
echo "  n8n UI:      http://localhost:$N8N_PORT"
echo "  Login:       $N8N_EMAIL / $N8N_PASSWORD"
echo "  Webhook URL: http://localhost:$N8N_PORT/webhook-test/prospect-search"
echo "  Auto-export: ON (saves to n8n/*.workflow.json on every edit)"
echo ""
echo "  Press Ctrl+C to stop."

wait $N8N_PID
