import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// package.json is "type": "module", so there is no __dirname here.
const from = (p) => fileURLToPath(new URL(p, import.meta.url))

// Two real HTML entries rather than a client-side router: /services/ is a genuinely
// separate document with its own <title>, meta and OG tags, it costs no routing
// dependency, and neither page ships the other's JavaScript.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: from('./index.html'),
        services: from('./services/index.html'),
      },
    },
  },
})
