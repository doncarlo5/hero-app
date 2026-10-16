# AGENTS.md

Guidance for coding agents (Claude Code, Cursor, Codex…) working in this repository. `CLAUDE.md` only imports this file.

## Product

Hero App is a strength training logbook that runs a user's program: it proposes each set's target, records what was lifted, and computes the next target. Read before changing the domain:

- [docs/PRODUCT.md](docs/PRODUCT.md): who it is for, principles, scope.
- [docs/FLOWS.md](docs/FLOWS.md): user flows, today and v1 target.
- [GLOSSARY.md](GLOSSARY.md): canonical terms. Use them in code, UI copy and docs; update the glossary when a term is decided.
- [docs/adr/](docs/adr/): architecture decisions. [ADR-0001](docs/adr/0001-programs-as-data.md) (proposed) is the target data model.

The app is generic: never commit a third-party program, its texts, technique names, videos or transcripts (seeds, fixtures, docs or tests). A user's program is their private data.

## Project Structure

Monorepo (npm workspaces + Turborepo):

- **apps/mobile**: the product. Expo SDK 57 / React Native app (TypeScript, Expo Router, NativeWind, TanStack Query) that talks to Supabase directly: Auth, Postgres through PostgREST with RLS, and RPCs.
- **apps/web**: marketing site only (Vite + React + Tailwind): landing page, support page, static privacy policy (`public/privacy-policy/`). Deployed on Vercel (`hero-app-web`). The old PWA is unregistered by `vite-plugin-pwa` with `selfDestroying`.
- **apps/api**: legacy Express + MongoDB API used by the store build released before the Supabase migration. Do not add features; it is removed once the Supabase build has been adopted.
- **supabase/**: the database. Migrations, local config and seed.
- **scripts/**: one-off maintenance scripts (Mongo → Supabase delta sync, Atlas password rotation).

## Environment

A single gitignored `.env` at the repo root (see `.env.example`). `apps/mobile/.env` is a symlink to it. `apps/mobile/.env.local` (gitignored) can point the app at the local Supabase. EAS builds read `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` from the EAS environment named in `eas.json`. See README.md for details.

Local shell quirks: run npm with `NODE_ENV=development` (otherwise dev dependencies are skipped), and CocoaPods needs `LANG=en_US.UTF-8`.

## Development Commands

### Mobile (apps/mobile)

```bash
npm run start      # Expo dev server for the dev client
npm run ios        # Build and run on the iOS simulator
npm run lint       # ESLint with auto-fix
npx tsc --noEmit   # Type check
```

Native folders (`ios/`, `android/`) are generated (CNG) and gitignored: native config lives in `app.config.ts`.

### Web (apps/web)

```bash
npm run dev     # Vite dev server
npm run build   # tsc + vite build
npm run lint
```

### Database (repo root, needs Docker)

```bash
supabase start      # local stack, applies migrations + supabase/seed.sql
supabase db reset   # re-apply migrations + seed
```

Local test account: `test@hero.local` / `hero-local-test`.

## Database (Supabase Postgres)

- Every schema change is a new file in `supabase/migrations/`; never edit an applied migration. `20261014180000_baseline.sql` is the pre-migration snapshot and is never replayed on prod.
- After a migration, regenerate `apps/mobile/types/database.ts`.
- Tables: `profiles`, `exercise_types` (per-user copies of `default_exercise_types`), `sessions`, `exercise_users` + `exercise_sets`, `programs` + `program_exercises` + `program_exercise_alternatives` (defaults in `default_program_exercises`), `trophies` (+ `trophy_definitions`), `feedbacks`.
- RLS on every table: a user only sees and writes rows they own.
- Sign-up: the `on_auth_user_created` trigger calls `private.setup_user` (profile, default exercise types, programs, trophies). `ensure_profile()` repairs accounts created without it.
- Writes that span several tables go through RPCs: `save_exercise` (returns new trophies) and `save_program`.
- Trophies are evaluated in SQL by triggers on exercise sets; the app never computes them.
- Security definer helpers live in the `private` schema.

## Mobile Architecture

- `app/`: Expo Router screens; `(protected)/` requires a session.
- `config/supabase.ts`: typed client. The session is stored encrypted: an AES key in SecureStore, the ciphertext in AsyncStorage.
- `context/supabase-provider.tsx`: auth state, Apple/Google/email sign-in.
- `lib/queries/`: every data access, as TanStack Query hooks (`queryKeys`, `unwrap` in `client.ts`).
- `lib/color-scheme-preference.ts`, `lib/theme.ts`: light/dark/auto preference and navigation themes.
- `components/ui/`: shared primitives (rn-primitives + NativeWind).

## Code Conventions (mobile and web)

- Files in kebab-case (`component-name.tsx`); `@/` absolute imports; named exports preferred.
- Components take a typed `props` object and read `props.x`; do not destructure props.
- No `useCallback` / `useMemo`: simplicity over micro-optimisation.
- Component order: hooks and stores → `useState` → `useRef` → functions → `useEffect` → JSX. Only list values that change in an effect's dependency array.
- Compose class names with `cn(...)`; dates with `date-fns`; validation with `zod`.
- Call promises directly (`updateLifts(map)`), no `void` prefix.

## Testing

- Mongo → Supabase sync: `node --test scripts/sync-mongo-delta.test.js` (local Supabase + throwaway Mongo, see README).
- Legacy API: Jest in `apps/api/test/`.
- Mobile: no automated tests. Verify on the iOS simulator against the local Supabase.

## Release

- `eas build --profile production` builds against the EAS `production` environment. The build number is managed remotely (`appVersionSource: remote`, `autoIncrement`). `eas submit` targets App Store Connect app `6751747764`.
- Bump `version` in `app.config.ts` for each store release.
