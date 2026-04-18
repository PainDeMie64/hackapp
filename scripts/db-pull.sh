#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

echo "==> Exporting remote D1..."
npx wrangler d1 export hackapp-db --remote --output .wrangler/dump.sql

echo "==> Dropping local tables..."
TABLES=$(npx wrangler d1 execute hackapp-db --local --command "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_cf_%' AND name NOT LIKE 'sqlite_%';" --json 2>/dev/null | node -e "
  const d = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const tables = d[0]?.results || [];
  tables.forEach(t => console.log(t.name));
")

if [ -n "$TABLES" ]; then
  for table in $TABLES; do
    npx wrangler d1 execute hackapp-db --local --command "DROP TABLE IF EXISTS \`$table\`;" 2>/dev/null || true
  done
fi

echo "==> Pulling remote data to local..."
npx wrangler d1 execute hackapp-db --local --file .wrangler/dump.sql

rm -f .wrangler/dump.sql
echo "==> Remote → Local: done"
