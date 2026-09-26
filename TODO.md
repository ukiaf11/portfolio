# TODO — Liquid Glass Redesign

The requirements are in [`PRD.md`](PRD.md). Decisions and the progress log are in
[`MEMORY.md`](MEMORY.md).

Legend: `[x]` done · `[~]` in progress · `[ ]` not started

## Phase 0 — Planning
- [x] Audit the current codebase (React 18 + Vite 6 + Tailwind v4, two HTML entries)
- [x] Write PRD.md, TODO.md and MEMORY.md
- [x] Framework decision: keep React + Vite (see PRD §7)

## Phase 1 — Research
- [x] Render and screenshot the 5 live sites, and extract accurate descriptions, features and stack
- [x] Research the Liquid Glass web technique: SVG refraction, browser support, fallbacks,
      performance, accessibility

## Phase 2 — Design system
- [x] Design panel: 3 competing prototypes (Tahoe Clear, Aurora Depth, Studio Glass) judged on
      aesthetics, UX/a11y and engineering. **Winner: Tahoe Clear**, with grafts from the other two.
- [x] Port Tahoe Clear into the repo, apply the judges' engineering fixes, and write `DESIGN.md`.
      The fixes:
      - `@source not inline("backdrop-filter")`
      - optional `radius`
      - a single-source pre-paint script, with the theme store and `theme-color` sync
      - cascade layers
      - forced colors and 44px touch targets
      - Inter only
- [x] Define design tokens per theme: colour, tint, blur, radii, highlight, shadow, plus the type
      ramp, motion, z-order and target size (`src/styles/tokens.css`)
- [x] Build the colourful background that the glass picks up (the Tahoe wallpaper; static by
      design, see MEMORY.md)
- [x] Build the glass material tiers: `refract`, `frost` and `faux`, plus `clear`, and the `strong`,
      `legible` and `prominent` variants (`src/styles/glass.css`, `<LiquidGlass>`)
- [x] Build the shared SVG refraction filter plus feature detection and fallback
- [x] Add reduced-transparency, high-contrast and reduced-motion modes, plus the in-site
      "Reduce transparency" switch (`<GlassPreference>`)
- [x] Rebuild the shared primitives: Section frame (two-column head), buttons, chips, icon tiles,
      bento, Reveal
- [x] Split the CSS into one file per section (`src/styles/sections/`), each owned by one section
      agent

## Phase 3 — Home page sections
- [x] Nav: glass capsule, liquid active-pill indicator, glass mobile sheet, theme toggle
- [x] Hero
- [x] About
- [x] Skills
- [x] Experience
- [x] Projects (CV projects)
- [x] **Live Websites (new):** 5 sites with screenshots, copy, stack and live links
- [x] Education and certifications
- [x] Contact
- [x] Footer

## Phase 4 — Services page
- [x] Services page header
- [x] Website Types gallery, linking to live examples where they exist
- [x] Services lattice
- [x] Services call to action

## Phase 5 — Content
- [x] Add `liveSites` and `liveSitesIntro` to `src/data/profile.js`, plus a `work` nav entry and
      `examples` on the website types
- [x] Optimise screenshots to WebP in `public/work/` (1280 w, 640 w and mobile; about 400 KB total)
- [x] Update meta and OG: per-page `og:image` (1200×630), Twitter large-image cards, Person JSON-LD,
      favicons, `robots.txt` and `sitemap.xml`
- [x] Move every piece of visitor-facing copy out of the components and into `profile.js`
- [x] Add honest caveats to live sites (order requests only, demo data, sign-in required, analysis
      service offline); say "live" and "deployed", not "in production"

## Phase 6 — Quality
- [x] Lead review of every section at 1440 and 390 in both themes: the design is consistent and
      nothing is broken
- [x] Final QA workflow: 6 review lenses, adversarial verification (39 of 44 findings confirmed),
      triage, 4 parallel fixers, and a regression gate (passed)
- [x] `npm run build` passes, with 0 `tw-backdrop` in the CSS. Each page loads two stylesheets
- [x] Visual QA at 360, 390, 768, 1024, 1440 and 1920 px, in light and dark: 0 overflow, 0 console
      errors, 0 broken images
- [x] Contrast audit on glass in both themes: floor 4.58:1, no failures
- [x] Accessibility review:
      - keyboard order, focus ring and skip link
      - landmarks and heading outline
      - 44px touch targets
      - reduced motion and reduced transparency
      - `prefers-contrast` and forced colours
      - Lighthouse Accessibility 100
- [x] Performance review:
      - Lighthouse mobile 98 / 100 / 100 / 100, CLS 0
      - frost peak 5 per viewport; 3 refract surfaces on `/`, 2 on `/services/`
      - Inter self-hosted
- [x] Cross-browser check:
      - Firefox: layout, logic and frost mode
      - WebKit (the Safari engine): frost mode, no refraction, pre-paint scripts
      - the fallbacks for engines without `lvh` or `:has()`
- [x] Fix every issue the reviews found, plus the WebKit anchor-jump bug found at lead review, where
      sections stayed invisible after a nav click (fixed with `flushSync`)

## Phase 7 — Wrap-up
- [x] README and DESIGN.md updated for the final state. DESIGN.md §13 was rewritten without
      session-specific paths, and §9.1 records the WebKit rule
- [x] MEMORY.md (decisions, progress and open questions) and TODO.md updated
- [ ] Upendra: answer the open questions in MEMORY.md (the AI Content Optimizer API, Postman, the
      degree name, project-to-site links)
- [ ] Commit the QA-pass changes, ideally on a branch, and check the Vercel preview before merging
      to `main`

## Follow-ups (suggested, not started)
- [ ] Move the QA checks into the repo (`scripts/qa/`, with Playwright as a dev dependency)
- [ ] Add a GitHub Actions CI job: build, QA checks and Lighthouse on every push and pull request
- [ ] Verify on real Safari (macOS and iOS) and a real mid-range Android phone
