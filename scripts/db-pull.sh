#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

echo "==> Exporting remote D1..."
npx wrangler d1 export hackapp-db --remote --output .wrangler/dump.sql

echo "==> Dropping local tables (FK-safe order)..."
for table in scrape_results news companies sources; do
  npx wrangler d1 execute hackapp-db --local --command "DROP TABLE IF EXISTS \`$table\`;" 2>/dev/null || true
done

echo "==> Importing remote data to local..."
npx wrangler d1 execute hackapp-db --local --file .wrangler/dump.sql

rm -f .wrangler/dump.sql
echo "==> Remote → Local: done"
