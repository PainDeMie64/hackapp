#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

echo "==> Exporting local D1..."
npx wrangler d1 export hackapp-db --local --output .wrangler/dump.sql

echo "==> Dropping remote tables (FK-safe order)..."
for table in scrape_results news companies sources; do
  npx wrangler d1 execute hackapp-db --remote --command "DROP TABLE IF EXISTS \`$table\`;" 2>/dev/null || true
done

echo "==> Pushing local data to remote..."
npx wrangler d1 execute hackapp-db --remote --file .wrangler/dump.sql

rm -f .wrangler/dump.sql
echo "==> Local → Remote: done"
