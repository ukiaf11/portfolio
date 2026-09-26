# MEMORY — project context and decisions

This is the project's working memory: what we decided and why, the conventions to follow, and a
dated log of progress. Read it before changing the design. Update it whenever a decision is made
or a milestone lands.

## What this project is

The personal portfolio of **Upendra Kumar**, a Full Stack Developer (Django/DRF and React) at
BOL7 Technologies in Noida. It is a static site built with React 18, Vite 6 and Tailwind CSS v4,
and deployed on Vercel.

- `/` is the portfolio.
- `/services/` is a client-facing services page.

## Current initiative

A full **Liquid Glass** redesign plus a **Live Websites** showcase. See [`PRD.md`](PRD.md) for the
requirements and [`TODO.md`](TODO.md) for the checklist.

## Conventions (keep these)

- **All copy lives in `src/data/profile.js`.** Components read from it. New content such as
  `liveSites` goes there too.
- **Two real HTML entries, not a router.** `index.html` mounts `App.jsx` and `services/index.html`
  mounts `ServicesApp.jsx`, both configured in `vite.config.js`. Each keeps its own `<title>`,
  meta, canonical and OG tags.
- **Design contract.** [`DESIGN.md`](DESIGN.md) is the contract for the Liquid Glass system: tokens, material
  tiers and budgets, components, a11y rules, file ownership and the verification commands. Follow it.
- **Pre-paint state.** The theme (`.dark` on `<html>`), the glass mode (`data-glass`) and
  `<meta name="theme-color">` are set before paint by ONE script, generated from `src/lib/prepaint.js` and
  injected into both HTML entries at the `<!-- prepaint -->` marker by the `prepaint` plugin in
  `vite.config.js`. Never hand-write it into the HTML. Components read the theme through
  `useIsDark()` / `setTheme()` from `src/lib/theme.js`, and the glass mode through `src/lib/glass/glassMode.js`.
- **CSS layers.** `@layer theme, base, tokens, glass, ui, components, sections, utilities;` is declared at
  the top of `src/index.css`. A later layer beats an earlier one whatever the specificity, so a Tailwind
  utility always wins. `!important` is reserved for the reduced-motion and solid-glass kill switches.
- **One CSS file per section** in `src/styles/sections/`, owned by that section. `index.css` and the shared
  styles (`tokens`, `glass`, `ui`, `legacy`) are edited only by the design-system lead.
- **Glass.** `backdrop-filter` is written only in `glass.css` (and the deprecated `legacy.css`), with
  literal values. Components use `<LiquidGlass tier>`; CSS owns every radius, and `radius` is a prop only
  for `tier="refract"`.
- **`navLinks` is the single source of truth** for the nav, scroll-spy and the section ordinals
  (`sectionNo`). To reorder sections, change `navLinks` and the JSX order in `App.jsx`.
- **Icons are lucide-react names stored as strings in the data**, mapped in each component's
  `ICONS` object. An unmapped name silently falls back to that component's default icon.
- **Never invent claims.** Project copy comes from the CV. Live-site copy comes from what the site
  actually shows.
- **Reduced motion** zeroes animation and transition *delays* as well as durations. Stagger is
  expressed as delay.

## Decisions log

| Date | Decision | Why |
| --- | --- | --- |
| 2026-09-25 | Keep React + Vite + Tailwind v4. Do not migrate to Next.js. | Liquid Glass is a CSS and SVG material, so a framework change buys nothing visible. The site is static, and Vite already produces two SEO-complete entries. Migrating would add risk and weight. |
| 2026-09-25 | Tiered glass: `hero` (SVG refraction), `standard` (blur + rim), `thin` (chips) | `backdrop-filter` is expensive, and the page has 30–60 surfaces. Refraction is kept for a few hero surfaces. |
| 2026-09-25 | Refraction is progressive enhancement: Chromium gets `backdrop-filter: url(#svg)`, everything else gets frosted glass | Only Chromium supports SVG filters inside `backdrop-filter`. |
| 2026-09-25 | Live-site screenshots are captured locally with headless Chrome and committed as WebP | Real images of real work. The section survives if a site changes or goes down. |
| 2026-09-25 | Apply the SVG `url()` refraction only as a JS inline style, gated on the Chromium engine (`navigator.userAgentData`) | `CSS.supports('backdrop-filter','url(#x)')` wrongly returns true in Firefox. Safari and Firefox drop the WHOLE `backdrop-filter` declaration when it contains `url()`, which loses the frosted fallback too. |
| 2026-09-25 | Write `backdrop-filter` with literal values, never `var()`, and avoid Tailwind's `backdrop-blur-*` utilities on glass | WebKit bugs 297620 and 289800 break `var()` inside `-webkit-backdrop-filter`. |
| 2026-09-25 | Put no opacity, `will-change: opacity`, filter or mask on ANY ancestor of a glass surface | Each of these makes the ancestor a "backdrop root", which kills the child's blur. The old `.reveal` did exactly this. Fade the glass element itself instead. |
| 2026-09-25 | Keep the page background static, or animate only a single transform layer | A moving backdrop forces every visible glass surface to re-filter on every frame. |
| 2026-09-25 | Live Work goes right after About, and `navLinks` gains `work` | Proof of shipped work should come early for both recruiters and clients. |
| 2026-09-25 | Do not quote the AI Content Optimizer's "+340%" and similar figures | They are hard-coded marketing copy on that site, not measured results. |
| 2026-09-26 | The design direction is **Tahoe Clear**: Apple-faithful Liquid Glass on a Tahoe-style wallpaper, Inter type and capsule controls | A design panel scored three prototypes. Tahoe Clear won on aesthetics (8.2 vs 7.0 / 6.8) and engineering (8.0 vs 5.0 / 7.4). Studio Glass won UX (8.5 vs 7.7), so its UX ideas were grafted in: two-column section headers, the site index row, the bento pattern that cuts frost count, the mobile name+Menu capsule and the legible frost. From Aurora Depth came the hero live-screenshot stage, window chrome on screenshots and the hostname next to each Visit button. |
| 2026-09-26 | Rejected Aurora Depth | Its infinite aurora animation redrew the page 65 times in 3 s of idle time, its typing role re-rendered the hero every 40–85 ms, and it looked more like 2021 glassmorphism than Liquid Glass. |
| 2026-09-26 | **Foundation port:** Tahoe Clear's code is the design system in the repo, with these grafts implemented: C's optional `radius` API, C's `.glass-legible` (literal `contrast(.7)`) and two-column section head, B's `useIsDark` theme store and B's `GlassPreference` switch. The tiers are now named `refract` / `frost` / `faux` (plus `clear`), superseding `hero` / `standard` / `thin`. | The grafts fix the engineering judge's must-fix list without changing the look. Before/after screenshots differ only where intended. |
| 2026-09-26 | Generate the pre-paint script from `src/lib/prepaint.js` with a Vite `transformIndexHtml` plugin. The glass and theme stores react only to their own `localStorage` keys. | The logic had been copied into two HTML files and `glassMode.js`, and C's copy had already drifted into a bug that locked pages into solid mode on any `storage` event. |
| 2026-09-26 | Put all design-system CSS in explicit cascade layers between Tailwind's `base` and `utilities`, and give each section its own CSS file | A's rules were unlayered, so no utility could override a component. One file per section lets 8 agents work in parallel without touching shared files. |
| 2026-09-26 | Remove the `!important` "no nesting" safety net, and fix nesting in the markup instead | The net hid violations from the audit. With it gone, `audit.mjs` reports any nested backdrop-filter. |
| 2026-09-26 | Frost budget: at most 8 backdrop-filter surfaces per viewport, including the header (target: header 2, each section 3). The refract budget of 3 is full. | The judges measured 11 on A. Fewer, larger panels (the bento pattern) are both cheaper and more Apple-like. |
| 2026-09-26 | Inter only: drop JetBrains Mono, and make `--font-mono` the platform monospace stack | This cuts the Latin webfont payload from 167 KB to 73 KB. The mono look fought the Inter-and-capsule language. The Inter `opsz` axis stays for display type (it costs about 25 KB). |
| 2026-09-26 | Work cards use the `legible` variant | Over dark screenshots in light theme it removes most of the grey smear. It measured AA in both themes (body copy 7.36:1 or better, chips 5.47:1 or better). |

## Useful local tooling

- Headless Chrome: `google-chrome --headless=new --no-sandbox --window-size=1440,900
  --virtual-time-budget=10000 --screenshot=out.png <url>`. The live sites are client-rendered, so
  use `--dump-dom` rather than curl to read their content.
- Python 3 with PIL can convert and crop screenshots, including to WebP.
- The QA scripts (screenshots, glass audit, frost budget, contrast, touch targets, mode tests) are listed in
  DESIGN.md §13.

## Progress log

- **2026-09-25.** Audited the codebase and wrote the PRD, TODO and MEMORY files.
- **2026-09-25.** Research done. All 5 sites are reachable.
  - Omni Panel (next.bol7.com) is behind a sign-in screen.
  - Hotel Express runs in demo mode with data kept in the browser.
  - The AI Content Optimizer backend (hosted on Render) was not responding.

  Screenshots were converted to `public/work/*.webp`, and `liveSites` was added to `profile.js`.
  Started a design panel of three prototype directions with three judges.
- **2026-09-26.** Design panel done, and Tahoe Clear chosen (see the decisions log). Started the
  build workflow: first the foundation port and audit gate, then 8 section agents in parallel.
- **2026-09-26.** Foundation ported (the audit passed in round 1), and all 8 areas rebuilt:
  - Nav and Footer
  - Hero and About
  - Work
  - Skills and Experience
  - Projects and Education
  - Contact
  - the Services page
  - the Website Types gallery

  Measured at integration: the build passes, there is no horizontal overflow at 360–1440 px, and
  there are 0 console errors. The frost count peaks at 6 per viewport on the home page, down from
  11. CSS is 118 KB raw (23 KB gzipped) and the main JS is 65 KB gzipped. Starting the final QA
  workflow next.
- **2026-09-26.** Foundation landed. Tahoe Clear was ported into the repo, with every foundation-level
  engineering must-fix applied:
  - `@source not inline("backdrop-filter")`, so the built CSS has 0 `tw-backdrop` references
  - the optional `radius` API
  - a single-source pre-paint script, and the theme store with `theme-color` sync
  - cascade layers and per-section CSS files
  - `.glass-legible`, the `GlassPreference` switch, forced-colors button edges, 44px touch targets and the
    `prefers-contrast` muted-text change
  - the unmount guards, `Reveal` forwarding its props, and dead CSS removed
  - the Inter-only font set, and the two-column section head

  DESIGN.md was written as the contract for the section agents.

  Verification:
  - The build passes.
  - `sections.mjs` shows no overflow and no console errors on `/` and `/services/` at 1440, 390 and 360,
    in both themes.
  - `audit.mjs`: 3 refract surfaces (2 on `/services/`), 0 nested, 0 backdrop-root problems.
  - `modes.mjs`: 18 of 18 checks pass.

  Open for the section agents: the frost budget still peaks at 11 at 1440 (DESIGN.md §4.1 names the
  owners).

## Findings about the live sites (for Upendra, not for the portfolio page)

- **Hotel Express:** the layout overflows horizontally on a 390 px phone (the document is about
  506 px wide), which cuts off the Sign up button. Prices show in `$` while phone numbers are
  Indian.
- **Mobile Accessories Shop:** `index.html` still has placeholder SEO values: canonical and
  `og:url` are `yourshop.in`, and there is a TODO comment.
- **Upendra Salon:** `/promotion-rules` says "not published yet", and the contact details are
  missing. It is set to `noindex`.
- **AI Content Optimizer:**
  - The `<title>` is just "web".
  - The API on Render did not respond, so the dashboard hangs on "Loading history…".
  - The profile modal hard-codes "Upendra Kushwaha".
- **Omni Panel:** the `/billing` route redirects signed-out visitors to `/login`. The real billing
  route is `/bills`.
