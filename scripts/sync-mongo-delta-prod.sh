#!/usr/bin/env bash
# Runs scripts/sync-mongo-delta.js against the prod Supabase database. The database password is read
# from the macOS Keychain (service "hero-app-supabase-db"), never printed or stored in the repo.
# Store it once (hidden prompt):
#   security add-generic-password -U -a postgres -s hero-app-supabase-db -w
# Usage: scripts/sync-mongo-delta-prod.sh --dry-run | --yes [--since=YYYY-MM-DD]
set -euo pipefail
cd "$(dirname "$0")/.."
case " $* " in *" --dry-run "*|*" --yes "*) ;; *) echo "Pass --dry-run or --yes" >&2; exit 1 ;; esac
PW=$(security find-generic-password -a postgres -s hero-app-supabase-db -w 2>/dev/null) || {
  echo "No password in the Keychain. Store it with:" >&2
  echo "  security add-generic-password -U -a postgres -s hero-app-supabase-db -w" >&2
  exit 1
}
ENC=$(PW="$PW" node -e 'process.stdout.write(encodeURIComponent(process.env.PW))')
unset PW
SUPABASE_DB_URL="postgresql://postgres.qmhziwpyeqpwllseache:${ENC}@aws-0-eu-west-2.pooler.supabase.com:5432/postgres" \
  exec node scripts/sync-mongo-delta.js "$@"
