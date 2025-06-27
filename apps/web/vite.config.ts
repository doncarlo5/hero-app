import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Hero App",
        short_name: "WJ App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Secure environment variable handling
  define: {
    // Only expose specific environment variables you need
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.ENV_KEY": JSON.stringify(process.env.ENV_KEY),
    // Add other specific env vars you need here:
    // 'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  // Automatically expose VITE_ prefixed environment variables
  envPrefix: "VITE_",
})
