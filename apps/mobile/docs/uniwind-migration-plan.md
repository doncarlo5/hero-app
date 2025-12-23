# Migration Plan: Nativewind → Uniwind (Tailwind v4)

This document describes the step-by-step migration of the mobile app from **Nativewind** to **Uniwind**, aligned with **Tailwind CSS v4** and Uniwind’s official migration guide.

The plan is tailored for:
- Expo + Expo Router
- apps/mobile structure
- Existing Nativewind setup

---

## Current State

The project currently has:

- Nativewind installed
- Tailwind CSS v3.x (must be upgraded)
- Metro config wrapped with `withNativeWind`
- Babel config using `nativewind/babel` and `jsxImportSource: "nativewind"`
- `tailwind.config.js` defining theme tokens
- `global.css` mixing Tailwind v3 and v4 syntax
- Components using `cssInterop`
- No Nativewind ThemeProvider (good)

---

## Part 1 — Install Uniwind & switch to Tailwind v4

### Step 1 — Install dependencies

**File:** `apps/mobile/package.json`

- Install `uniwind`
- Upgrade `tailwindcss` to v4
- Keep `nativewind` temporarily (remove later)

Uniwind only supports Tailwind CSS v4.

---

### Step 2 — Fix `global.css` imports (Tailwind v4)

**File:** `apps/mobile/global.css`

Replace the top of the file with:

```css
@import 'tailwindcss';
@import 'uniwind';
```

Remove all Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Step 3 — Import CSS in Expo Router root layout

**File:** `apps/mobile/app/_layout.tsx`

```ts
import "../global.css";
```

Do not import CSS in `index.js` / `index.ts`.

---

## Part 2 — Metro & Babel migration

### Step 4 — Replace Nativewind Metro config with Uniwind

**File:** `apps/mobile/metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
  dtsFile: "./app/uniwind-types.d.ts",
});
```

---

### Step 5 — Remove Nativewind Babel config

**File:** `apps/mobile/babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
```

---

### Step 6 — Remove Nativewind type definitions

Delete any Nativewind `.d.ts` files.

---

## Part 3 — Theme migration

### Step 7 — Theme values

```css
@layer theme {
  :root {
    @variant light {
      --background: 0 0% 100%;
      --foreground: 0 0% 14.5%;
    }

    @variant dark {
      --background: 240 10% 3.9%;
      --foreground: 0 0% 98%;
    }
  }
}
```

---

### Step 8 — Tailwind theme tokens

```css
@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
}
```

---

## Part 4 — Fonts & Tailwind config removal

### Step 9 — Fonts

```css
@theme {
  --font-normal: 'Inter-Regular';
  --font-medium: 'Inter-Medium';
  --font-bold: 'Inter-Bold';
}
```

---

### Step 10 — Remove `tailwind.config.js`

Delete `apps/mobile/tailwind.config.js`.

---

## Part 5 — Replace Nativewind interop

### Step 11 — Replace `cssInterop` with `withUniwind`

```ts
import { withUniwind } from "uniwind";
import { SafeAreaView } from "react-native-safe-area-context";

export const StyledSafeAreaView = withUniwind(SafeAreaView);
```

---

## Part 6 — Optional parity

### Step 12 — Match Nativewind rem size

```js
polyfills: { rem: 14 }
```

---

## Part 7 — Remove Nativewind

Remove `nativewind` from dependencies after validation.

---

## Part 8 — Verification

- Run Metro
- Validate styles
- Check light/dark mode
