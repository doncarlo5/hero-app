#!/usr/bin/env bash
# Runs scripts/audit-movement-library.js against prod (read-only). The database password is read from
# the macOS Keychain (service "hero-app-supabase-db"), as for sync-mongo-delta-prod.sh.
# Usage: scripts/audit-movement-library-prod.sh [--sample=N]
set -euo pipefail
cd "$(dirname "$0")/.."
PW=$(security find-generic-password -a postgres -s hero-app-supabase-db -w 2>/dev/null) || {
  echo "No password in the Keychain. Store it with:" >&2
  echo "  security add-generic-password -U -a postgres -s hero-app-supabase-db -w" >&2
  exit 1
}
ENC=$(PW="$PW" node -e 'process.stdout.write(encodeURIComponent(process.env.PW))')
unset PW
SUPABASE_DB_URL="postgresql://postgres.qmhziwpyeqpwllseache:${ENC}@aws-0-eu-west-2.pooler.supabase.com:5432/postgres" \
  exec node scripts/audit-movement-library.js --url=https://qmhziwpyeqpwllseache.supabase.co "$@"
