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
