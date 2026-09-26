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
- [ ] Update meta and OG descriptions if the positioning changed

## Phase 6 — Quality
- [x] Lead review of every section at 1440 and 390 in both themes: the design is consistent and
      nothing is broken
- [~] Final QA workflow: multi-lens review, then adversarial verification, then triage, then
      fixes, then a regression check
- [ ] `npm run build` passes
- [ ] Visual QA screenshots at 360, 390, 768, 1024, 1440 and 1920 px, light and dark
- [ ] Contrast audit on glass, both themes
- [ ] Accessibility review: keyboard, focus, landmarks, reduced motion and transparency
- [ ] Performance review: backdrop-filter budget, image sizes, bundle size, Lighthouse
- [ ] Cross-browser fallback check (frosted tier without SVG refraction)
- [ ] Fix every issue the reviews find

## Phase 7 — Wrap-up
- [ ] Update the README design notes
- [ ] Update MEMORY.md and tick off TODO.md
- [ ] Commit (only on request)
