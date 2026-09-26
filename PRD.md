# PRD — Liquid Glass Portfolio Redesign

| | |
| --- | --- |
| **Owner** | Upendra Kumar |
| **Status** | Complete (pending commit and real-device check) |
| **Started** | 2026-09-25 |
| **Tracking** | [`TODO.md`](TODO.md) · decisions and progress log in [`MEMORY.md`](MEMORY.md) |

## 1. Summary

Redesign the entire portfolio, both the home page `/` and the services page `/services/`, in a
**Liquid Glass** style. This is the translucent, refractive material Apple introduced at WWDC 2025.
Also add a **Live Websites** showcase of five real sites Upendra has built and shipped, each with a
screenshot, a short description and a link to the live site.

## 2. Background

The current site is React 18, Vite 6 and Tailwind CSS v4, deployed statically on Vercel. It has two
real HTML entries (`index.html` and `services/index.html`). All copy lives in `src/data/profile.js`.
The design is a dark "developer" aesthetic: aurora glows, a fine grid and lightly frosted cards.
It has no live project links: every project is described from the CV and cannot be clicked.

## 3. Goals

1. **Liquid Glass throughout.** Every surface, including nav, hero, cards, chips, buttons, timeline,
   contact and footer, uses one coherent glass material system:
   - translucency
   - refraction and lensing on hero-level surfaces
   - specular rim highlights
   - soft depth
   - fluid, springy motion
2. **Show real, clickable work.** A new Live Websites section links out to the five live sites,
   with accurate descriptions.
3. **Stay fast and accessible.** Glass must not cost readability (WCAG AA) or performance.
4. **Keep content editable in one place.** New data goes into `src/data/profile.js`.

## 4. Non-goals

- A backend, CMS or contact form server. The site stays fully static.
- Rewriting the copy. Existing copy is kept unless the new layout needs it shortened.
- Pixel-copying Apple's UI. The goal is the *material language*, not iOS chrome.

## 5. Audience

| Visitor | Wants | Where they land |
| --- | --- | --- |
| Recruiters and hiring managers | Skills, experience and proof of shipped work, fast | `/` |
| Prospective freelance clients | What he can build, examples, how to start | `/services/` and the Live Websites section |

## 6. Requirements

### R1 — Liquid Glass design system

- **Material tiers.** At least three:
  - **Hero glass:** refraction through an SVG displacement filter, for a few large surfaces such as
    the nav, hero card and featured project.
  - **Standard glass:** blur, saturation, tint, specular rim and inner shadow, for cards.
  - **Thin glass:** chips, pills and small controls.
- **Background.** A colourful, slowly moving background (gradient mesh or blobs) so the glass has
  something to refract. It must be tuned for both light and dark themes.
- **Tokens.** Colours, radii, blur, tint, highlight and shadow are defined once as CSS custom
  properties and swapped per theme.
- **Progressive enhancement.** Refraction only where the browser supports `backdrop-filter: url()`.
  Other browsers get a clean frosted fallback, never a broken surface.
- **Motion.**
  - Spring-like hover and press states.
  - The nav's active indicator slides between items as a fluid glass pill.
  - Scroll reveals.
  - All of it respects `prefers-reduced-motion`.
- **Light and dark themes** are both kept, and the toggle is kept.

### R2 — Redesign every section

- **Home page:** Nav, Hero, About, Skills, Experience, Projects (CV projects), **Live Websites
  (new)**, Education, Contact, Footer.
- **Services page:** header, Website Types gallery, Services, closing call to action.
- **Mobile menu:** a glass sheet.

### R3 — Live Websites showcase (new)

The home page gets a section showing each of these sites:

| # | Site | URL |
| --- | --- | --- |
| 1 | Mobile accessories shop | https://mobile-accessories-shop-fawn.vercel.app/ |
| 2 | Hotel and food ordering | https://hotel-web-mu-ten.vercel.app/ |
| 3 | Salon booking | https://saloon-shop-web.vercel.app/ |
| 4 | BOL7 billing | https://next.bol7.com/billing |
| 5 | AI Content Optimizer | https://ai-content-optimizer-six.vercel.app/ |

Each entry needs:

- **Screenshot:** a real one, stored locally as optimised WebP in `public/`, lazy-loaded with
  explicit width and height.
- **Copy:** name, category, a one-line tagline, a 2–3 sentence summary and 3–5 features, all taken
  from what the live site actually shows.
- **Stack:** only technologies with evidence behind them.
- **Link:** a "Visit live site" link that opens in a new tab with `rel="noopener noreferrer"`.

On `/services/`, the website-type cards link to the matching live example where one exists.

### R4 — Accessibility

- Body text on glass meets **WCAG AA, 4.5:1**, against the worst-case background behind it in both
  themes. This is achieved through tint and opacity floors, not hope.
- `prefers-reduced-transparency` and `prefers-contrast: more` switch glass to near-opaque surfaces.
- `prefers-reduced-motion` stops background motion and springs.
- Keyboard focus is visible on glass, and a skip link is present.
- Semantic landmarks and headings are preserved.

### R5 — Performance

- **Lighthouse targets:** Performance ≥ 90 on mobile, Accessibility ≥ 95, Best Practices ≥ 95,
  SEO ≥ 95.
- **Refraction budget:** few refracting surfaces on screen at once. Cards use the cheaper tier.
- **No layout shift** from images or fonts. CLS < 0.1.
- **JavaScript:** the bundle stays small. Any new dependency must justify its weight.

### R6 — Responsive

The site must be excellent from 360 px to 1920 px wide, with no horizontal scroll at any width.

### R7 — Keep what already works

- Two HTML entries with their own `<title>`, meta, canonical and OG tags.
- The pre-paint theme script, so there is no flash of the wrong theme.
- The résumé download.
- `navLinks`, which stays the single source of truth for nav, scroll-spy and section numbering.

### R8 — Content integrity

- No invented clients, metrics or features.
- Site descriptions come from the live sites.
- CV-derived projects stay as written.

## 7. Technical decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Framework | **Keep React 18 + Vite 6 + Tailwind v4.** Next.js was considered and rejected. | Liquid Glass is a CSS and SVG problem, not a framework problem. The site is static with no server needs. Vite already builds two HTML entries with their own SEO, and a framework migration would add risk and weight for no user-visible gain. Full permission to switch was given; declining it is deliberate. |
| Refraction | Hand-rolled inline SVG `feDisplacementMap` plus `backdrop-filter` | No dependency. Full control over fallbacks. |
| Glass primitives | Shared CSS utilities (`glass`, `glass-thin`, `glass-hero`) plus a small `<Glass>` React component where refraction is needed | One material system, consistent everywhere. |
| Screenshots | Captured with headless Chrome, converted to WebP and committed to `public/work/` | Real images of real work, no third-party image service. |

## 8. Acceptance criteria

Status as of 2026-09-26, measured on the production build.

- [x] Every section on both pages uses the new glass material system. No old `surface` or
      `card-glow` look remains (grep: 0 usages).
- [x] The Live Websites section shows all 5 sites, each with a real screenshot and a working link.
      Every link returns 200, and the sites carry honest caveats where needed.
- [x] `npm run build` passes, and both entries render.
- [x] No horizontal scroll at 360, 390, 768, 1024, 1440 or 1920 px, in either theme.
- [x] Measured text contrast is AA on glass in both themes (floor 4.58:1).
- [x] Reduced motion, reduced transparency and keyboard navigation all work. So do
      `prefers-contrast` and forced colours.
- [x] Lighthouse targets in R5 are met. Mobile `/` scores 98 / 100 / 100 / 100, and CLS is 0.
- [x] README, `PRD.md`, `MEMORY.md` and `TODO.md` are up to date.

Not verified: real Safari on macOS and iOS, and real mid-range Android hardware. WebKit and Firefox
were tested headless only, and headless engines do not paint `backdrop-filter`.

## 9. Risks

| Risk | Mitigation |
| --- | --- |
| SVG refraction in `backdrop-filter` is Chromium-only | Feature-detect it. Safari and Firefox get the frosted tier, which is designed to look intentional on its own. |
| Too many blurred layers make scrolling janky, especially on mobile | Tiered materials, a budget on refracting surfaces, no `backdrop-filter` on huge scrolling containers. |
| Translucency drops text contrast | Tint floors, measured contrast, and an opaque mode for reduced transparency and high contrast. |
| A live site changes or goes down | Screenshots are stored locally, so the section still renders. |
