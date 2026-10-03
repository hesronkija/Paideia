import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Offline-first: the whole app (JS, CSS, HTML, icons) is precached by the
// service worker, so after the first load Paideia works with no network at all.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'Paideia',
        short_name: 'Paideia',
        description:
          'Bilingual visual mathematics lessons for Tanzanian secondary students. Masomo ya hisabati kwa Kiswahili na Kiingereza.',
        theme_color: '#0e7c5b',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        // Precache every build asset so lessons work fully offline.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json,webmanifest}'],
        // Tiny app: keep the whole thing in one precache, no runtime caching needed.
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
