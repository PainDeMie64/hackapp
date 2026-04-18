#!/usr/bin/env bash
set -euo pipefail

N8N_PORT=${N8N_PORT:-5679}
N8N_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKFLOW_FILE="$N8N_DIR/prospect-agent.workflow.json"

echo "==> Starting n8n on port $N8N_PORT..."
export N8N_PORT=$N8N_PORT
export N8N_SECURE_COOKIE=false
export N8N_RUNNERS_DISABLED=true
export N8N_USER_FOLDER="$N8N_DIR/.n8n-data"

mkdir -p "$N8N_USER_FOLDER"

# Start n8n in the background
npx n8n start &
N8N_PID=$!

echo "==> Waiting for n8n to be ready..."
for i in $(seq 1 30); do
  if curl -sf "http://localhost:$N8N_PORT/healthz" > /dev/null 2>&1; then
    echo "==> n8n is ready at http://localhost:$N8N_PORT"
    break
  fi
  sleep 2
done

# Check if owner setup is needed
NEEDS_SETUP=$(curl -sf "http://localhost:$N8N_PORT/rest/settings" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print('yes' if d.get('data',{}).get('userManagement',{}).get('showSetupOnFirstLoad') else 'no')" 2>/dev/null || echo "yes")

if [ "$NEEDS_SETUP" = "yes" ]; then
  echo "==> Setting up owner account..."
  curl -sf -X POST "http://localhost:$N8N_PORT/rest/owner/setup" \
    -H 'Content-Type: application/json' \
    -d '{"email":"admin@hackapp.dev","firstName":"Admin","lastName":"HackApp","password":"HackApp2026!"}' > /dev/null 2>&1 || true
fi

# Login and get cookie
echo "==> Logging in..."
COOKIE_FILE=$(mktemp)
curl -sf -c "$COOKIE_FILE" -X POST "http://localhost:$N8N_PORT/rest/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@hackapp.dev","password":"HackApp2026!"}' > /dev/null

COOKIE=$(grep n8n-auth "$COOKIE_FILE" | awk '{print $NF}')
rm -f "$COOKIE_FILE"

if [ -n "$COOKIE" ] && [ -f "$WORKFLOW_FILE" ]; then
  echo "==> Importing workflow..."
  curl -sf -X POST "http://localhost:$N8N_PORT/rest/workflows" \
    -H "Cookie: n8n-auth=$COOKIE" \
    -H 'Content-Type: application/json' \
    -d @"$WORKFLOW_FILE" > /dev/null 2>&1 && echo "==> Workflow imported!" || echo "==> Workflow may already exist, check the UI."
fi

echo ""
echo "  n8n UI:      http://localhost:$N8N_PORT"
echo "  Login:       admin@hackapp.dev / HackApp2026!"
echo "  Webhook URL: http://localhost:$N8N_PORT/webhook/prospect-search"
echo ""
echo "  Press Ctrl+C to stop n8n."

wait $N8N_PID
