# hero-app

Strength training logbook that runs your program: Expo mobile app (`apps/mobile`), marketing site (`apps/web`) and a legacy Express API (`apps/api`), backed by Supabase.

Product and domain docs: [PRODUCT](docs/PRODUCT.md), [FLOWS](docs/FLOWS.md), [GLOSSARY](GLOSSARY.md), [ADRs](docs/adr/). Agent guidance: [AGENTS.md](AGENTS.md).

## Environment variables

All apps read a single `.env` at the repo root (gitignored):

```bash
cp .env.example .env
```

- **apps/api** loads it through `apps/api/config/load-env.js`.
- **apps/web** reads it through Vite's `envDir` (only `VITE_*` variables are exposed).
- **apps/mobile**: Expo only reads `.env` from its own folder, so link it once after cloning (the link is gitignored):

  ```bash
  ln -s ../../.env apps/mobile/.env
  ```

In production there is no `.env` file:

- **Vercel** (api, web): set the variables in each project's settings.
- **EAS** (mobile builds): `eas.json` only sets `EXPO_ROUTER_APP_ROOT`. The `EXPO_PUBLIC_*` variables must exist as EAS environment variables for the build's environment, e.g.:

  ```bash
  eas env:create --environment production --name EXPO_PUBLIC_SUPABASE_URL --value <url> --visibility plaintext
  ```

## Database (Supabase)

The schema lives in `supabase/migrations/`; every change goes through a new migration, never an edit of an applied one.

- `20261014180000_baseline.sql` is a snapshot of the schema that existed before migrations; it is registered as applied and must not be replayed on prod.
- Regenerate the mobile types after a migration: `apps/mobile/types/database.ts`.

### Local Supabase

Needs Docker running. `supabase start` applies every migration, then `supabase/seed.sql` creates a test account (`test@hero.local` / `hero-local-test`) with a few sessions and trophies.

```bash
supabase start
supabase db reset   # re-apply migrations + seed
```

To point the mobile app at it, create `apps/mobile/.env.local` (gitignored) with `EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321` and the local anon key from `supabase status`.

### Movement library

The shared, read-only movement library (`movements` with `owner_id` null) comes from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (Unlicense), pinned to one commit in `scripts/import-movement-library.js`. The seed does not include it: run the import after `supabase db reset`.

```bash
SUPABASE_SERVICE_ROLE_KEY=$(supabase status -o json | jq -r .SERVICE_ROLE_KEY) node scripts/import-movement-library.js
```

- Stretching and cardio entries are skipped (739 of 876 movements are kept). Names stay in English; the source id is `library_key`, the key the import upserts on, so the script can be re-run safely. Movements removed upstream are not deleted, since programs and logs may point to them.
- Images are copied to the public `movement-images` Storage bucket (about 1,500 JPEGs, 84 MB) rather than hot-linked from GitHub; `image_paths` holds their object paths and the app shows the first one as a thumbnail. A movement's images are only uploaded when its `image_paths` change (`--refresh-images` forces it).
- `--dry-run` prints the counts without writing. The target is the local stack unless `--url=https://…` is given, which also needs `--yes`; the root `.env` and `SUPABASE_URL` are never read.

### Final Mongo → Supabase sync (before the Supabase build ships)

Until the Supabase build of the mobile app is live in the stores, the store app keeps writing to MongoDB Atlas. `scripts/sync-mongo-delta.js` copies what was written there since the original copy (2026-04-06): profiles of users who signed up since, exercise types, sessions, exercise users and their sets, programs and feedbacks. They land in the `legacy` schema (the Mongo-era tables), then `private.migrate_legacy()` converts them into the current model ([ADR-0001](docs/adr/0001-programs-as-data.md)); a converted row is only refreshed when its legacy source is newer, so edits made in the new app survive a re-sync. Trophies are not copied: the database evaluates them from the converted sets.

- Mongo documents are matched to existing rows by owner + `created_at` (the first copy kept Mongo's timestamps) and content, since rows created in bulk share the same timestamp; exercise types also by name, programs by session type. A matched row is only updated when its content differs and Mongo has the newer version, so the script can be re-run safely.
- Users without a profile go through `private.setup_user`, like a sign-up. Mongo users without a Supabase auth user, and documents whose owner no longer exists, are skipped and listed.
- Everything runs in one transaction; `--dry-run` uses a read-only transaction and prints the same per-table counts.
- `MONGODB_URI` comes from the root `.env`. Writing to a non-local database requires `--yes`.

Against prod, `scripts/sync-mongo-delta-prod.sh` reads the database password from the macOS Keychain, so it is never typed on the command line or stored in the repo. Store it once (hidden prompt; reset it in Dashboard → Settings → Database if unknown — nothing else uses it):

```bash
security add-generic-password -U -a postgres -s hero-app-supabase-db -w
scripts/sync-mongo-delta-prod.sh --dry-run
scripts/sync-mongo-delta-prod.sh --yes
```

`SUPABASE_DB_URL='postgresql://...' node scripts/sync-mongo-delta.js` works too for another database. `--since=YYYY-MM-DD` changes the window (default 2026-03-01, before the copy: overlap is harmless). Last run: 2026-10-15 (nothing left to copy). Run it once more right before the Supabase build ships, and after the last store app writes, i.e. once the old build is retired or the API is switched off.

Test against local databases only (needs `supabase start` and a throwaway Mongo):

```bash
docker run -d --rm --name hero-delta-mongo -p 127.0.0.1:27099:27017 mongo:7
node --test scripts/sync-mongo-delta.test.js
```
