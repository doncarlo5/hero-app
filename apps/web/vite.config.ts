import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    // The site used to be an installable PWA: ship a self-destroying service worker so
    // devices that installed it stop serving the old cached app
    VitePWA({ selfDestroying: true, manifest: false }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
