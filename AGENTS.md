# AGENTS.md

Guidance for coding agents (Claude Code, Cursor, Codex…) working in this repository. `CLAUDE.md` only imports this file.

## Product

Hero App is a strength training logbook that runs a user's program: it proposes each set's target, records what was lifted, and computes the next target. Read before changing the domain:

- [docs/PRODUCT.md](docs/PRODUCT.md): who it is for, principles, scope.
- [docs/FLOWS.md](docs/FLOWS.md): user flows, today and v1 target.
- [GLOSSARY.md](GLOSSARY.md): canonical terms. Use them in code, UI copy and docs; update the glossary when a term is decided.
- [docs/adr/](docs/adr/): architecture decisions. [ADR-0001](docs/adr/0001-programs-as-data.md) is the data model, [ADR-0002](docs/adr/0002-session-in-progress-on-device.md) the guided session.

The app is generic: never commit a third-party program, its texts, technique names, videos or transcripts (seeds, fixtures, docs or tests). A user's program is their private data.

## Project Structure

Monorepo (npm workspaces + Turborepo):

- **apps/mobile**: the product. Expo SDK 57 / React Native app (TypeScript, Expo Router, Uniwind + HeroUI Native, Expo UI, TanStack Query) that talks to Supabase directly: Auth, Postgres through PostgREST with RLS, and RPCs.
- **apps/web**: marketing site only (Vite + React + Tailwind): landing page, support page, static privacy policy (`public/privacy-policy/`). Deployed on Vercel (`hero-app-web`). The old PWA is unregistered by `vite-plugin-pwa` with `selfDestroying`.
- **apps/api**: legacy Express + MongoDB API used by the store build released before the Supabase migration. Do not add features; it is removed once the Supabase build has been adopted.
- **supabase/**: the database. Migrations, local config and seed.
- **scripts/**: maintenance scripts (Mongo → Supabase delta sync, movement library import, Atlas password rotation).

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

Local test account: `test@hero.local` / `hero-local-test`. The movement library is not in the seed: after a reset, import it with `SUPABASE_SERVICE_ROLE_KEY=$(supabase status -o json | jq -r .SERVICE_ROLE_KEY) node scripts/import-movement-library.js` (local by default, see README).

## Database (Supabase Postgres)

- Every schema change is a new file in `supabase/migrations/`; never edit an applied migration. `20261014180000_baseline.sql` is the pre-migration snapshot and is never replayed on prod.
- After a migration, regenerate `apps/mobile/types/database.ts`.
- Model ([ADR-0001](docs/adr/0001-programs-as-data.md)): `movements` (owner null = shared library, from free-exercise-db: `library_key`, muscles, instructions, category, `image_paths` in the public `movement-images` bucket, plus a 160 px WebP list thumbnail at `thumbs/<id>/0.webp`; French names and `aliases` from `scripts/movement-library-overrides.json`; `measure` reps or duration), `programs` → `program_days` → `slots` → `set_prescriptions` / `slot_alternatives`, `profiles.active_program_id`, `sessions` (→ program day, `label` kept) → `logged_exercises` (→ movement, slot) → `logged_sets` (kind, side, `completed_at`, `duration_seconds` for timed sets, and the target the app proposed: `target_weight`, `target_rep_min/max`, `target_reason`), `trophies` (by movement, + `trophy_definitions`), `feedbacks`. `default_exercise_types` is the movement list new users get.
- RLS on every table: a user only sees and writes rows they own; library movements are readable by everyone.
- Sign-up: the `on_auth_user_created` trigger calls `private.setup_user` (profile, default movements, an empty program). `ensure_profile()` repairs accounts created without it.
- Writes that span several tables go through RPCs: `save_exercise` (returns new trophies; idempotent on the id the app passes), `save_program_day` (a day's slots and alternatives) and `save_slot` (a slot's settings, superset partner and set prescriptions).
- Trophies are evaluated in SQL by triggers on logged sets (working sets only); the app never computes them. Set targets are computed in the app by `apps/mobile/lib/progression/engine.ts`.
- `legacy` schema: the Mongo-era tables, not exposed to clients. `scripts/sync-mongo-delta.js` writes there, then `private.migrate_legacy()` converts them (idempotent, newest version wins). Dropped once the Supabase build ships and the final sync ran.
- Security definer helpers live in the `private` schema.

## Mobile Architecture

- `app/`: Expo Router screens; `(protected)/` requires a session.
- `config/supabase.ts`: typed client. The session is stored encrypted: an AES key in SecureStore, the ciphertext in AsyncStorage. Auth requests time out after 10 s; `loadStoredSession()` reads the stored session, even expired, so an offline launch stays signed in.
- `context/supabase-provider.tsx`: auth state, Apple/Google/email sign-in.
- `lib/queries/`: every data access, as TanStack Query hooks (`queryKeys`, `unwrap` in `client.ts`).
- `lib/queries/persist.ts`: the device copy of the queries the guided session needs offline (profile, session detail, programs, last performances), restored by `PersistQueryClientProvider` in `app/_layout.tsx`, cleared on sign-out. A new query the guided session reads offline must be added to `OFFLINE_QUERY_KEYS`.
- `lib/session/`: the guided session ([ADR-0002](docs/adr/0002-session-in-progress-on-device.md)): set queue (supersets, sides), rest timer from stored times, device draft and its storage, end-of-rest notification, and `useGuidedSession`. Screen: `app/(protected)/guided-session.tsx`.
- `lib/color-scheme-preference.ts`, `lib/theme.ts`: light/dark/auto preference (`Uniwind.setTheme`), theme colors for non-className props (`useThemeColors`) and the navigation theme.
- Styling: Uniwind (Tailwind v4) with HeroUI Native's semantic tokens (`background`, `foreground`, `surface`, `default`, `muted`, `accent` = brand teal, `danger`, `border`…), set in `global.css`. Never hardcode a color a token covers.
- Components: HeroUI Native (`heroui-native`) for buttons, fields and labels; Expo UI (`@expo/ui`) for native controls: bottom sheets, pickers, date pickers, switches, pager (drop-ins from `@expo/ui/community/*`). `components/ui/` only keeps the react-hook-form bridge (`form.tsx`), `Text` and typography.

## Code Conventions (mobile and web)

- Files in kebab-case (`component-name.tsx`); `@/` absolute imports; named exports preferred.
- Components take a typed `props` object and read `props.x`; do not destructure props.
- No `useCallback` / `useMemo`: simplicity over micro-optimisation.
- Component order: hooks and stores → `useState` → `useRef` → functions → `useEffect` → JSX. Only list values that change in an effect's dependency array.
- Compose class names with `cn(...)`; dates with `date-fns`; validation with `zod`.
- Call promises directly (`updateLifts(map)`), no `void` prefix.

## Testing

CI (`.github/workflows/ci.yml`) runs on every pull request: mobile typecheck, lint and unit tests (in three time zones), and every migration plus the seed applied to a fresh Postgres. Vercel builds the web app and the legacy API.

- Mongo → Supabase sync: `node --test scripts/sync-mongo-delta.test.js` (local Supabase + throwaway Mongo, see README).
- Legacy API: Jest in `apps/api/test/`.
- Mobile: `npm test` in `apps/mobile` runs the unit tests of the progression engine and the guided session modules (Node test runner; pure modules import each other with `.ts` extensions and no `@/` alias). Screens: verify on the iOS simulator against the local Supabase.

## Release

- `eas build --profile production` builds against the EAS `production` environment. The build number is managed remotely (`appVersionSource: remote`, `autoIncrement`). `eas submit` targets App Store Connect app `6751747764`.
- Bump `version` in `app.config.ts` for each store release.
