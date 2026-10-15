# hero-app

Workout tracking app: Expo mobile app (`apps/mobile`), web app (`apps/web`) and a legacy Express API (`apps/api`), backed by Supabase.

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

### Final Mongo → Supabase sync (before the Supabase build ships)

Until the Supabase build of the mobile app is live in the stores, the store app keeps writing to MongoDB Atlas. `scripts/sync-mongo-delta.js` copies what was written there since the original copy (2026-04-06): profiles of users who signed up since, exercise types, sessions, exercise users and their sets, programs and feedbacks. Trophies are not copied: the database triggers evaluate them from the copied sets.

- Mongo documents are matched to existing rows by owner + `created_at` (the first copy kept Mongo's timestamps), exercise types also by name, programs by session type. A matched row is only updated when its content differs and Mongo has the newer version, so the script can be re-run safely.
- Users without a profile go through `private.setup_user`, like a sign-up. Mongo users without a Supabase auth user, and documents whose owner no longer exists, are skipped and listed.
- Everything runs in one transaction; `--dry-run` uses a read-only transaction and prints the same per-table counts.
- `MONGODB_URI` comes from the root `.env`. The Supabase connection string (Dashboard → Connect → session pooler, `postgres` user) is passed in the environment only, never stored. Writing to a non-local database requires `--yes`.

```bash
SUPABASE_DB_URL='postgresql://...' node scripts/sync-mongo-delta.js --dry-run
SUPABASE_DB_URL='postgresql://...' node scripts/sync-mongo-delta.js --yes
```

`--since=YYYY-MM-DD` changes the window (default 2026-03-01, before the copy: overlap is harmless). Run it once more after the last store app writes, i.e. once the old build is retired or the API is switched off.

Test against local databases only (needs `supabase start` and a throwaway Mongo):

```bash
docker run -d --rm --name hero-delta-mongo -p 127.0.0.1:27099:27017 mongo:7
node --test scripts/sync-mongo-delta.test.js
```
