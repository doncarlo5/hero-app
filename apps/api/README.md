# Hero App — legacy API

Express + MongoDB (Mongoose) API used by the store build of the mobile app released before the Supabase migration. Deployed on Vercel.

Do not add features: the current mobile app talks to Supabase directly. This API is removed once the Supabase build has been adopted. Until then, `scripts/sync-mongo-delta.js` copies what it writes to Supabase (see the root README).

It reads the root `.env` through `config/load-env.js`.

```bash
npm run dev    # nodemon
npm test       # Jest, apps/api/test/
npm run lint
```
