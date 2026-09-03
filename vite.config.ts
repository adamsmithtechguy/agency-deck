import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// ISOLATED build for the combined keynote + supplier retail-media deck ONLY.
// Completely separate from the studio app (root vite.config.ts / wrangler.toml).
// Local review only — nothing here is deployed or touches production code.
const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: dir,
  base: './',
  plugins: [react()],
  publicDir: resolve(dir, 'public'),
  build: {
    outDir: resolve(dir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(dir, 'index.html'),
        decks: resolve(dir, 'decks.html'),
        brandSell: resolve(dir, 'brand-sell.html'),
        brandSellSummary: resolve(dir, 'brand-sell-summary.html'),
        eventResellers: resolve(dir, 'event-resellers.html'),
      },
    },
  },
})
