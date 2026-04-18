#!/usr/bin/env bash
# Sources .env into the current shell if it exists.
# Wrangler reads CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN from env automatically.

if [ -f "$ROOT_DIR/.env" ]; then
  set -a
  source "$ROOT_DIR/.env"
  set +a
elif [ -f "$(dirname "$0")/../.env" ]; then
  set -a
  source "$(dirname "$0")/../.env"
  set +a
fi
