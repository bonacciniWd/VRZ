import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VRZ Studio',
        short_name: 'VRZ',
        description: 'Software house premium: sistemas sob medida, automação, apps, delivery, CRM, e-commerce, gateways e soluções digitais.',
        start_url: '.',
        display: 'standalone',
        background_color: '#181A20',
        theme_color: '#181A20',
        orientation: 'portrait',
        icons: [
          {
            src: '/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/src/assets/logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 6291456, // 6 MB
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.svg', 'logo-192.png', 'logo-512.png', 'splash.png'],
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black-translucent',
    }),
  ],
});
