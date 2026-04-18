#!/usr/bin/env bash
set -euo pipefail

# Process pending scrape results through the LLM pipeline in batches.
# This runs locally against the local D1 database, calling Bedrock directly.
# Usage: ./scripts/process-scrapes.sh [batch_size]

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

BATCH=${1:-10}

echo "==> Processing pending scrapes in batches of $BATCH"

# Count pending
PENDING=$(npx wrangler d1 execute hackapp-db --local --command "SELECT COUNT(*) as c FROM scrape_results WHERE llm_status = 'pending' AND status_code = 200;" --json 2>/dev/null | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d[0]?.results?.[0]?.c ?? 0)")

echo "Pending: $PENDING pages"
echo ""

if [ "$PENDING" = "0" ]; then
  echo "Nothing to process."
  exit 0
fi

# Use the running wrangler dev server to process via the pipeline endpoint
# Or call it directly — but since we need the full pipeline,
# let's hit the endpoint repeatedly with small batches

echo "Starting processing via POST /api/pipeline/run?sync=true"
echo "This will process scrapes that are already in the DB."
echo ""

# The pipeline run endpoint will pick up pending scrape_results
# and process them through LLM extraction + scoring.
# We just need to call it repeatedly.

PROCESSED=0
while [ "$PROCESSED" -lt "$PENDING" ]; do
  echo -n "Batch $(( PROCESSED / BATCH + 1 ))... "

  RESULT=$(curl -sf -X POST "http://localhost:5175/api/pipeline/run?sync=true" 2>&1 || echo '{"data":{"phases":{"companiesExtracted":0},"errors":[]}}')

  EXTRACTED=$(echo "$RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('data',{}).get('phases',{}).get('companiesExtracted',0))" 2>/dev/null || echo "0")
  NEWS=$(echo "$RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('data',{}).get('phases',{}).get('newsInserted',0))" 2>/dev/null || echo "0")
  SCORED=$(echo "$RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('data',{}).get('phases',{}).get('companiesScored',0))" 2>/dev/null || echo "0")

  echo "companies: $EXTRACTED | news: $NEWS | scored: $SCORED"

  PROCESSED=$(( PROCESSED + BATCH ))

  # Check remaining
  REMAINING=$(npx wrangler d1 execute hackapp-db --local --command "SELECT COUNT(*) as c FROM scrape_results WHERE llm_status = 'pending' AND status_code = 200;" --json 2>/dev/null | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d[0]?.results?.[0]?.c ?? 0)")

  if [ "$REMAINING" = "0" ]; then
    echo "All done!"
    break
  fi

  echo "  Remaining: $REMAINING"
done

echo ""
echo "=== Final counts ==="
for table in companies news prospect_scores; do
  COUNT=$(npx wrangler d1 execute hackapp-db --local --command "SELECT COUNT(*) as c FROM $table;" --json 2>/dev/null | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d[0]?.results?.[0]?.c ?? '?')")
  echo "  $table: $COUNT"
done
