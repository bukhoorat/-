import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Preview-only host override: allow all hosts when running under Base44 preview.
// When BASE44_PREVIEW_MODE is unset (production build), this is undefined and
// Vite uses its default behavior.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: previewMode ? true : undefined,
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000'
    },
    watch: {
      usePolling: true,
      interval: 500
    }
  }
})
