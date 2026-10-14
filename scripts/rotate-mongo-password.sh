#!/usr/bin/env bash
# Rotates the password of the Hero App MongoDB Atlas database user.
# - generates a random password (never printed)
# - applies it on Atlas (atlas CLI)
# - updates MONGODB_URI in the root .env and on Vercel (hero-app-api), then redeploys
# Usage: bash scripts/rotate-mongo-password.sh
set -euo pipefail

ATLAS_PROJECT_ID="65b8c4ff24d35b06b838f0bc" # Atlas project "Workout-Journal"
DB_USER="admin-test"
VERCEL_PROJECT="hero-app-api"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

command -v atlas >/dev/null || { echo "atlas CLI missing: brew install mongodb-atlas-cli"; exit 1; }
command -v vercel >/dev/null || { echo "vercel CLI missing"; exit 1; }
[ -f "$ENV_FILE" ] || { echo "$ENV_FILE not found"; exit 1; }

if ! atlas auth whoami >/dev/null 2>&1; then
  echo "→ Logging in to Atlas (browser)…"
  atlas auth login
fi

PW="$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 32)"

echo "→ Updating the password of $DB_USER on Atlas…"
atlas dbusers update "$DB_USER" --projectId "$ATLAS_PROJECT_ID" --password "$PW" >/dev/null

# Read the file directly: process.loadEnvFile would ignore .env if MONGODB_URI is already exported
NEW_URI="$(node -e '
  const s = require("fs").readFileSync(process.argv[1], "utf8");
  const u = new URL(s.match(/^MONGODB_URI=(.*)$/m)[1]);
  u.password = process.argv[2];
  process.stdout.write(u.toString());
' "$ENV_FILE" "$PW")"
unset PW

echo "→ Updating .env…"
NEW_URI="$NEW_URI" node -e '
  const fs = require("fs");
  const f = process.argv[1];
  const s = fs.readFileSync(f, "utf8");
  fs.writeFileSync(f, s.replace(/^MONGODB_URI=.*$/m, () => "MONGODB_URI=" + process.env.NEW_URI));
' "$ENV_FILE"

echo "→ Updating MONGODB_URI on Vercel ($VERCEL_PROJECT)…"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
(cd "$TMP" && vercel link --yes --project "$VERCEL_PROJECT" >/dev/null 2>&1)
vercel env rm MONGODB_URI preview --yes --cwd "$TMP" >/dev/null 2>&1 || true
for target in production development; do
  vercel env rm MONGODB_URI "$target" --yes --cwd "$TMP" >/dev/null 2>&1 || true
  vercel env add MONGODB_URI "$target" --value "$NEW_URI" --sensitive --yes --cwd "$TMP" >/dev/null
done
unset NEW_URI

echo "→ Redeploying the API so it picks up the new variable…"
vercel redeploy "https://$VERCEL_PROJECT.vercel.app" --target production --cwd "$TMP" >/dev/null 2>&1 \
  || echo "  (automatic redeploy failed: trigger a deployment from the Vercel dashboard)"

echo "✅ Rotation done. The previous password no longer works."
