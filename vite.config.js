import { fileURLToPath, pathToFileURL } from 'node:url'
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

const SITE = 'https://portfolio.upendra.site'

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const unescapeHtml = (value) =>
  value.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e])

/** schema.org JSON-LD for an entry: the Person on both pages, plus the WebPage on /services/. */
function structuredData({ profile, experience, education, skills }, html, isServices) {
  const personId = `${SITE}/#person`
  const [addressLocality, addressRegion, addressCountry] = profile.location.split(', ')
  const job = experience.find((j) => j.current) ?? experience[0]
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: `${SITE}/`,
    jobTitle: profile.role,
    worksFor: { '@type': 'Organization', name: job.company },
    address: { '@type': 'PostalAddress', addressLocality, addressRegion, addressCountry },
    sameAs: [profile.github],
    alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].school.replace(' (IGNOU)', '') },
    knowsAbout: skills.filter((g) => g.id !== 'tools').flatMap((g) => g.items.filter((i) => i.daily).map((i) => i.name)),
  }
  const graph = [person]
  if (isServices) {
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]
    if (!title) throw new Error('[head] /services/index.html has no <title>.')
    graph.push({
      '@type': 'WebPage',
      '@id': `${SITE}/services/#webpage`,
      url: `${SITE}/services/`,
      name: unescapeHtml(title.trim()),
      about: { '@id': personId },
      author: { '@id': personId },
    })
  }
  // "<" is escaped so no string in the data can ever close the <script> early.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/** The <noscript> fallback: who this is and how to reach them, for visitors without JavaScript. */
function noscriptFallback({ profile }) {
  const e = escapeHtml
  return (
    `<noscript><div class="noscript">` +
    `<h1>${e(profile.name)}</h1>` +
    `<p>${e(profile.role)} · ${e(profile.location)}</p>` +
    `<p>This site needs JavaScript. You can still reach me:</p>` +
    `<ul>` +
    `<li><a href="mailto:${e(profile.email)}">${e(profile.email)}</a></li>` +
    `<li><a href="${e(profile.github)}">GitHub</a></li>` +
    `<li><a href="${e(profile.resume)}">Résumé (PDF)</a></li>` +
    `</ul>` +
    `</div></noscript>`
  )
}

/**
 * Fills two markers in every HTML entry from src/data/profile.js, so the served HTML
 * carries real content before any JavaScript runs:
 *
 *   <!-- jsonld -->    in <head>: schema.org JSON-LD (the Person; on /services/ also the WebPage)
 *   <!-- noscript -->  in <body>, before #root: name, role and contact links for visitors
 *                      and crawlers that do not run JavaScript
 *
 * A missing marker fails the build, as with prepaint(). The data is loaded inside the
 * handler with a cache-busting query, so dev always sees the current profile.js without
 * it becoming a config dependency (which would restart the dev server on every edit).
 * profile.js is plain ESM, and its one import.meta.env read is guarded with `?.`.
 */
function head() {
  const JSONLD = '<!-- jsonld -->'
  const NOSCRIPT = '<!-- noscript -->'
  return {
    name: 'portfolio:head',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        for (const marker of [JSONLD, NOSCRIPT]) {
          if (!html.includes(marker)) throw new Error(`[head] ${ctx.filename} has no ${marker} marker.`)
        }
        const data = await import(pathToFileURL(from('./src/data/profile.js')).href + '?t=' + Date.now())
        return html
          .replace(JSONLD, structuredData(data, html, ctx.path === '/services/index.html'))
          .replace(NOSCRIPT, noscriptFallback(data))
      },
    },
  }
}

// Two real HTML entries rather than a client-side router: /services/ is a genuinely
// separate document with its own <title>, meta and OG tags, it costs no routing
// dependency, and neither page ships the other's JavaScript.
export default defineConfig({
  plugins: [prepaint(), head(), react(), tailwindcss()],
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
