#!/usr/bin/env bash
# Rotation du mot de passe de l'utilisateur MongoDB Atlas de Hero App.
# - génère un mot de passe aléatoire (jamais affiché)
# - l'applique sur Atlas (atlas CLI)
# - met à jour MONGODB_URI dans le .env racine et sur Vercel (hero-app-api), puis redéploie
# Usage : bash scripts/rotate-mongo-password.sh
set -euo pipefail

ATLAS_PROJECT_ID="65b8c4ff24d35b06b838f0bc" # projet Atlas "Workout-Journal"
DB_USER="admin-test"
VERCEL_PROJECT="hero-app-api"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

command -v atlas >/dev/null || { echo "atlas CLI manquant : brew install mongodb-atlas-cli"; exit 1; }
command -v vercel >/dev/null || { echo "vercel CLI manquant"; exit 1; }
[ -f "$ENV_FILE" ] || { echo "$ENV_FILE introuvable"; exit 1; }

if ! atlas auth whoami >/dev/null 2>&1; then
  echo "→ Connexion à Atlas (navigateur)…"
  atlas auth login
fi

PW="$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 32)"

echo "→ Mise à jour du mot de passe de $DB_USER sur Atlas…"
atlas dbusers update "$DB_USER" --projectId "$ATLAS_PROJECT_ID" --password "$PW" >/dev/null

# Lecture directe du fichier : process.loadEnvFile ignorerait le .env si MONGODB_URI est déjà exportée
NEW_URI="$(node -e '
  const s = require("fs").readFileSync(process.argv[1], "utf8");
  const u = new URL(s.match(/^MONGODB_URI=(.*)$/m)[1]);
  u.password = process.argv[2];
  process.stdout.write(u.toString());
' "$ENV_FILE" "$PW")"
unset PW

echo "→ Mise à jour du .env…"
NEW_URI="$NEW_URI" node -e '
  const fs = require("fs");
  const f = process.argv[1];
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/^# ⚠️ Mot de passe exposé.*\n/m, "");
  s = s.replace(/^MONGODB_URI=.*$/m, "MONGODB_URI=" + process.env.NEW_URI);
  fs.writeFileSync(f, s);
' "$ENV_FILE"

echo "→ Mise à jour de MONGODB_URI sur Vercel ($VERCEL_PROJECT)…"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
(cd "$TMP" && vercel link --yes --project "$VERCEL_PROJECT" >/dev/null 2>&1)
vercel env rm MONGODB_URI preview --yes --cwd "$TMP" >/dev/null 2>&1 || true
for target in production development; do
  vercel env rm MONGODB_URI "$target" --yes --cwd "$TMP" >/dev/null 2>&1 || true
  vercel env add MONGODB_URI "$target" --value "$NEW_URI" --sensitive --yes --cwd "$TMP" >/dev/null
done
unset NEW_URI

echo "→ Redéploiement de l'API pour prendre en compte la nouvelle variable…"
vercel redeploy "https://$VERCEL_PROJECT.vercel.app" --target production --cwd "$TMP" >/dev/null 2>&1 \
  || echo "  (redéploiement automatique impossible : relance un déploiement depuis le dashboard Vercel)"

echo "✅ Rotation terminée. L'ancien mot de passe ne fonctionne plus."
