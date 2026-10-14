# Hero App — website

Marketing site for the Hero App mobile app (www.hero-app.org): landing page, support page and the privacy policy.

- `/` landing page, `/support` support page, anything else shows a "page not found" that points former web app users to the mobile app.
- `/privacy-policy` is the static page `public/privacy-policy/index.html` (linked from the stores), not a React route.
- Store link and support email live in `src/links.ts`.

```bash
npm run dev
npm run build
```
