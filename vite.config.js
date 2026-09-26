import { fileURLToPath } from 'node:url'
import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { prepaintScript } from './src/lib/prepaint.js'

// package.json is "type": "module", so there is no __dirname here.
const from = (p) => fileURLToPath(new URL(p, import.meta.url))

/**
 * Injects the pre-paint script (theme + glass mode + theme-color) into every HTML entry.
 *
 * The script is generated from src/lib/prepaint.js, the same module the app imports at
 * runtime, so the two HTML entries and the React code can never drift apart. Each entry
 * marks where it goes with `<!-- prepaint -->`, after its <meta name="theme-color">; a
 * missing marker fails the build rather than shipping a page that flashes the wrong theme.
 */
function prepaint() {
  const MARKER = '<!-- prepaint -->'
  let script
  return {
    name: 'portfolio:prepaint',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        if (!html.includes(MARKER)) {
          throw new Error(`[prepaint] ${ctx.filename} has no ${MARKER} marker in its <head>.`)
        }
        script ??= (await transformWithEsbuild(prepaintScript(), 'prepaint.js', { minify: true, target: 'es2015' })).code.trim()
        return html.replace(MARKER, `<script>${script}</script>`)
      },
    },
  }
}

// Two real HTML entries rather than a client-side router: /services/ is a genuinely
// separate document with its own <title>, meta and OG tags, it costs no routing
// dependency, and neither page ships the other's JavaScript.
export default defineConfig({
  plugins: [prepaint(), react(), tailwindcss()],
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
