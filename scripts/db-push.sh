#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

echo "==> Exporting local D1..."
npx wrangler d1 export hackapp-db --local --output .wrangler/dump.sql

echo "==> Dropping remote tables..."
TABLES=$(npx wrangler d1 execute hackapp-db --remote --command "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_cf_%' AND name NOT LIKE 'sqlite_%';" --json 2>/dev/null | node -e "
  const d = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const tables = d[0]?.results || [];
  tables.forEach(t => console.log('DROP TABLE IF EXISTS \`' + t.name + '\`;'));
")

if [ -n "$TABLES" ]; then
  echo "$TABLES" | npx wrangler d1 execute hackapp-db --remote --command "$(echo "$TABLES" | tr '\n' ' ')" 2>/dev/null || true
fi

echo "==> Pushing local data to remote..."
npx wrangler d1 execute hackapp-db --remote --file .wrangler/dump.sql

rm -f .wrangler/dump.sql
echo "==> Local → Remote: done"
