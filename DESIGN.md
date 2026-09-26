# DESIGN — Tahoe Clear, the Liquid Glass system

This is the contract for everyone who builds a section of this site. It explains the design principles,
lists every token, material, component and class, and sets the rules and budgets that each section must meet. It
also says which files you own and how to verify your work before you report back.

- The **requirements** are in [`PRD.md`](PRD.md). The **decisions and progress log** is in [`MEMORY.md`](MEMORY.md).
  The **checklist** is in [`TODO.md`](TODO.md).
- The foundation is prototype A, "Tahoe Clear". It won the design panel, and it carries grafts from B and C.
- **When this document and the code disagree, the code in `src/styles/` and `src/components/glass/` is the truth.**
  Report the mismatch.

---

## 1. Principles

These follow Apple's Human Interface Guidelines for Liquid Glass (iOS 26 / macOS Tahoe), adapted for the web.

1. **Liquid Glass is for the functional layer.** Refraction and lensing belong to the few floating
   controls that sit *above* the content: the nav capsule, the theme toggle and the one hero call to action.
   Content itself never refracts.
2. **Content uses standard frosted material.** Panels and cards use the frost tier: blur, saturation, tint
   and a specular rim. Small things and anything inside a panel use **faux** glass, which has the tint and rim
   but no backdrop blur.
3. **Clear glass appears only over media.** The highly translucent "clear" variant, with the HIG 35% dimming
   layer, is used only where it sits on a screenshot.
4. **Wallpaper first, and it is static.** A fixed gradient mesh sits behind everything. Glass picks up
   whatever colour field it passes over, so the page changes as you scroll while the wallpaper never
   moves. A moving backdrop would re-filter every glass surface on every frame.
5. **Use one restrained accent.** Apple system blue appears only on the primary action, the active item and
   small inline marks. The multicoloured icon tiles are decorative and never carry text.
6. **Shapes are concentric.** Controls are capsules. A nested corner equals its parent's corner minus the gap
   between them.
7. **Legibility is measured, not hoped for.** Every text run on glass is measured against the real
   pixels behind it. Tint alphas are floors that were tuned against the worst backdrop.
8. **Fewer, larger panels.** Prefer one frosted panel divided by hairlines (a *bento*) over N frosted cards.

---

## 2. Architecture

```
index.html, services/index.html   two real entries; the <!-- prepaint -->, <!-- jsonld --> and <!-- noscript -->
                                  markers say where the generated parts go
vite.config.js                    two plugins: prepaint (src/lib/prepaint.js into both entries) and head
                                  (schema.org JSON-LD and the <noscript> fallback, both from profile.js)
public/                           fonts/ (self-hosted Inter + its OFL), og/ (share cards), the favicons,
                                  robots.txt, sitemap.xml, the résumé PDF, work/ (the screenshots)
src/index.css                     the SHARED base stylesheet: layer order, Tailwind, @font-face, @theme, base,
                                  and the imports below except the page entries (design-system lead only)
src/styles/entry-home.css         the home page's section files              layer: sections
src/styles/entry-services.css     the /services/ page's section files        layer: sections
src/styles/tokens.css             tokens, both themes                        layer: tokens
src/styles/glass.css              the material + accessibility modes         layer: glass
src/styles/ui.css                 primitives (see section 6)                 layer: ui
src/styles/nav.css                the site header and mobile sheet           layer: components
src/styles/sections/*.css         one file per section                       layer: sections
src/lib/prepaint.js               theme + glass-mode logic (the ONE copy; also inlined into the HTML)
src/lib/theme.js                  useIsDark() / setTheme(): the ONE theme source for components
src/lib/dates.js                  parseDay() / formatDay() / isoDay(): "Sep 15, 2025" is the one display format
src/lib/glass/glassMode.js        useGlassMode() / useGlassState() / setGlassPreference()
src/lib/glass/displacementMap.js  the refraction lens map (Snell's law, squircle bezel)
src/components/glass/LiquidGlass.jsx      every glass surface that needs a tier or refraction
src/components/glass/GlassPreference.jsx  the "Reduce transparency" switch
src/components/Section.jsx, Reveal.jsx, Background.jsx   the frame, the scroll reveal, the wallpaper
```

**Two stylesheets per page.** Each page links the shared `src/index.css` (cached across both pages) and then its
own entry file, in that order: `src/main.jsx` imports `./index.css` and then `./styles/entry-home.css`, and
`src/services-main.jsx` imports `./index.css` and then `./styles/entry-services.css`. A section file goes in the
entry of the page that renders it; one that both pages render goes in `index.css` (today only `footer.css`).
Each entry file repeats the layer statement, so the order holds whichever file loads first, and starts with
`@reference "../index.css"`. Without a Tailwind feature the Tailwind plugin skips a CSS file, and the sections
would lose the `color-mix()` fallbacks and vendor prefixes its compiler adds. `@reference` keeps them in that
pipeline without emitting any of `index.css` a second time.

### 2.1 Cascade layers

The order is declared at the top of `src/index.css`, and repeated at the top of each page's entry file. Tailwind v4
owns `theme`, `base`, `components` and `utilities`, and the design system slots its own layers in between them:

```css
@layer theme, base, tokens, glass, ui, components, sections, utilities;
```

**The rule:** a declaration in a later layer beats one in an earlier layer, *whatever the selector
specificity*.

- A **Tailwind utility** on an element overrides any component or section rule. Use one when you must, and add
  it to the `inline()` list (below).
- A **section rule** overrides a primitive. For example, `.work-card .chip` beats `.chip`. You never need
  specificity games or `!important` for this.
- Inside a single layer, specificity and source order apply as usual.
- `!important` **inverts** the layer order, so an earlier layer's `!important` wins. The only `!important`
  rules are the kill switches for reduced motion (in `base`) and solid glass (in `glass`), and nothing later can undo them.
  **Do not add `!important` anywhere else.**
- A Tailwind `@utility` cannot live inside a layered file, so there are no custom utilities in your
  files. Write plain classes.
- **Tailwind scans no files.** `index.css` imports it with `source(none)`, because scanning turned words in the
  Markdown docs and code comments into utilities that nothing used. The markup uses exactly one utility,
  `sr-only`, listed with `@source inline("sr-only")`. **If you start using another utility, add it to that
  `inline()` list, or it is not generated.** `@source not inline("backdrop-filter")` stays as a guard. The built
  CSS contains `.sr-only` and no other utility.

---

## 3. Tokens (`src/styles/tokens.css`)

Every value is defined per theme. Light ("Tahoe Day") is authored first and is not derived from dark
("Tahoe Night"). Use the token, never the literal.

### 3.1 Wallpaper

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--wp-base` | `#e6edf7` | `#050814` | Page and body background. Mirrored in `prepaint.js` as `<meta name="theme-color">` |
| `--wp-sky` / `--wp-sky-a` | `92 165 255` / .85 | `30 84 230` / .70 | The colour field at the top left (an RGB triplet plus its alpha) |
| `--wp-lilac` / `-a` | `162 140 255` / .70 | `112 56 230` / .62 | The colour field at the top right |
| `--wp-peach` / `-a` | `255 164 120` / .62 | `232 92 60` / .40 | The colour field at the bottom right |
| `--wp-aqua` / `-a` | `84 214 204` / .60 | `12 150 170` / .55 | The colour field at the bottom left |
| `--wp-rose` / `-a` | `255 138 190` / .42 | `200 36 120` / .42 | The haze in the centre |
| `--wp-crest` / `-a` | `255 255 255` / .90 | `150 196 255` / .24 | The crisp crests of the waves |
| `--wp-deep` / `-a` | `52 108 255` / .24 | `36 70 200` / .40 | The deeper bodies of the waves |
| `--wp-grain-a` | .07 | .09 | Anti-banding noise (overlay blend) |

### 3.2 Text and accent

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--fg` | `#0a0c12` | `#f4f6fb` | Primary text and headings |
| `--fg-muted` | `#363c4b` | `#c9d0dc` | Body copy. This is the **floor** on glass and on the wallpaper: never go lighter |
| `--fg-subtle` | `#596074` | `#9aa3b6` | Only for secondary text of 16px or more, and for decoration (such as chevrons) |
| `--accent-rgb` | `0 88 200` | `10 102 230` | The accent as a triplet, for alpha mixes |
| `--accent-fill` | `#0058c8` | `#0a66e6` | The fill of the one primary action (white label) and the eyebrow ordinal |
| `--accent-ink` | `#004ea6` | `#85c1ff` | Accent **text** and icons |
| `--on-accent` | `#fff` | `#fff` | Text on `--accent-fill` |
| `--accent-soft` | blue at 9% | blue at 16% | The tinted plate behind accent chips |
| `--sys-blue/-indigo/-teal/-green/-orange/-pink/-purple` | iOS light | iOS dark | App-icon tiles only. These are decorative and never sit behind text |
| `--live` | `#12a150` | `#30d158` | The "live" status dot and the checked switch |
| `--focus-ring` / `--focus-halo` | `#004ea6` / `#fff` | `#8cc6ff` / `#050814` | The two-tone focus ring, which reads on any backdrop |
| `--hairline` | ink at 10% | white at 9% | Dividers inside panels (the bento) |

### 3.3 Material

Consumed by `glass.css`. You rarely set these directly: pick a tier and variant instead (section 4).

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--glass-tint` | `255 255 255` | `26 31 48` | The material's tint (an RGB triplet) |
| `--glass-a` | .56 | .50 | Tint alpha of **faux** glass |
| `--glass-a-frost` | .52 | .50 | Tint alpha of **frost** panels over the wallpaper |
| `--glass-a-strong` | .84 | .82 | The `strong` variant: sheets, and cards that float over busy content |
| `--glass-a-legible` | .78 | .80 | The `legible` variant: text panels that overlap screenshots |
| `--glass-a-refract` | .56 | .66 | The label band of floating chrome. Content scrolls under it |
| `--glass-a-rimzone` | .30 | .34 | The rims of refracting capsules, where there is no text |
| `--glass-a-clear` | .14 | .20 | The clear variant (only over media) |
| `--glass-a-solid` | .95 | .95 | Every alpha in solid mode (see section 9) |
| `--glass-fg` | `var(--fg)` | | Text on glass. The prominent variant swaps it to `--on-accent` |
| `--glass-rim` / `-rim-soft` / `-rim-base` | white 1 / .6 / .5 | white .62 / .22 / .10 | The specular ring: the hot spot, the counter-highlight and the base |
| `--glass-edge` | ink at 12% | black at 55% | The darkened outer edge |
| `--glass-sheen` | white at 70% | white at 10% | The pooled top sheen, which follows the pointer |
| `--glass-shadow` | soft blue | deep black | Drop shadow of glass surfaces |
| `--glass-refract-tone` | `saturate(170%) brightness(1.06)` | `saturate(150%) brightness(.86)` | Read **only** by the Chromium refraction path |
| `--inset` / `--inset-ring` | white .5 / .75 | white .06 / .10 | Nested faux plates inside a card. They also paint the chips, the Menu plate, the sheet groups and the switch track |
| `--inset-edge` | ink at 10% | `transparent` | The outer 1px hairline of `.inset`: it separates a nested plate from near-white frost in light theme. Dark needs none |

### 3.4 Shape, type, motion, layout

Sections 7 and 8 have the full tables. In short:

- **Shape:** `--r-panel`, `--r-card`, `--r-nested`, `--r-inset`, `--r-tile`, `--r-pill`.
- **Type:** `--text-display` down to `--text-caption`, plus the `--track-*` letter-spacing tokens.
- **Motion:** `--ease-out`, `--ease-gel`, `--ease-lead`, `--ease-trail`, `--dur-press`, `--dur-gel`,
  `--dur-morph`, `--dur-reveal` and `--reveal-lift`.
- **Layout:**
  - `--page-max: 1280px` is the content width.
  - `--target-min: 44px` is the smallest touch target.
  - The z-order tokens are `--z-wallpaper: -10`, `--z-sheet: 45`, `--z-header: 50` and `--z-skip: 70`.
    Content lives at z-index 0–2.

### 3.5 Legacy aliases (removed)

The legacy aliases (`--bg`, `--bg-soft`, `--line`, `--card`, `--card-hover`, `--glow-a`, `--grad-a/b/c`, `--color-brand-400`,
`--color-teal-400`) and `legacy.css` were removed on 2026-09-26.

### 3.6 Section tokens

A section may define its own tokens, but **scope them to the section's root class, never `:root`**. For example,
`.work-list { --shot-ring: … }` and `.dark .work-list { … }`. Section tokens live in your section file.

---

## 4. Materials: tiers, variants and where each is allowed

| Tier | What it is | Allowed on | Budget |
| --- | --- | --- | --- |
| **refract** | Frost everywhere. On Chromium desktop (fine pointer, not low-end), JavaScript adds `backdrop-filter: url(#svg) blur() tone` inline, plus `.is-refracting` | **Only:** the nav link capsule, the theme toggle and the hero "View my work" CTA. On `/services/`: the capsule and the toggle | **FULL.** Add no refract surfaces. Ever. |
| **frost** | A real backdrop blur in every engine: `blur(22px) saturate(180%) brightness(1.06)` (dark: `saturate(160%) brightness(.82)`), and 16px on phones | Content panels and cards that sit directly on the wallpaper. The mobile sheet | See section 4.1 |
| **faux** | Tint, specular rim, sheen and shadow, but **no** backdrop-filter | Chips, eyebrows, small controls, list plates, anything **inside** another glass surface, buttons inside panels | Unlimited |
| **clear** (+ `dim`) | `blur(6px)` with a very low tint; `glass-dim` adds the HIG 35% dimming and white text. It has **no `<LiquidGlass>` tier**: write it by hand as `className="glass-clear glass-dim"` | **Only over screenshots or media** (today, only the Work hostname capsule). It never sits over body copy or the wallpaper | Counts as frost |

| Variant | Class | Use for |
| --- | --- | --- |
| `regular` | (none) | The default |
| `strong` | `.glass-strong` | Sheets and cards that float over busy, unknown content (the mobile sheet) |
| `legible` | `.glass-legible` | **Text panels that overlap screenshots.** Adds a literal `contrast(.7)` to the backdrop, so a black or white screenshot cannot drag the panel into a grey smear. Used by the Work cards, where it measured AA ≥ 7.36:1 on body text in both themes |
| `prominent` | `.glass-prominent` | The **one** primary action in a view: accent tint with a white label |
| capsule | `.glass-capsule` | Pill shape (`--r-pill`), with the rim lit from straight above. Every control |

### 4.1 Budgets

These are **measured** with the glass audit (section 13), both mid-reveal and settled.

- **Refract:** at most 3 on `/` and 2 on `/services/`. The budget is full.
- **Frost:** at most **8** backdrop-filter surfaces visible in any viewport, **including the header's**,
  at 1440 and at 390, in both themes. Clear glass counts.
  - **The header** costs exactly **2**: the nav capsule and the theme toggle, its refract controls. The brand, Résumé
    and the Menu plate are faux, tinted with the header's `--nav-chrome-a`. Every frosted pill in the header would be
    visible in *every* viewport, so add none.
  - **The scroll-edge band** (`.scroll-edge` in `nav.css`) is a second, masked copy of the wallpaper under the header.
    It has no backdrop-filter, so it costs nothing in the frost budget.
  - **Each section:** at most **3** backdrop-filter surfaces visible at once. That keeps any seam between two
    sections within 8.
  - Anything beyond that is faux, or becomes a cell inside a bento panel (section 5).
- **Never nest backdrop-filter.** A frost, refract or clear surface never sits inside another one. A nested
  surface only sees its parent's tint, costs a full filter pass and looks flat. There is **no** safety net
  that hides this: the glass audit's DOM walk must find no backdrop-filter element inside another one.
- **Never create a backdrop root above glass.** See section 9.

Measured on the foundation handoff (1440, dark), worst viewports. This is history: every fix in the table has
landed, and the header now costs 2.

| Where | Count | What is visible | Owner and fix |
| --- | --- | --- | --- |
| Every viewport | 4 | header: brand (frost), capsule (R), toggle (R), résumé (frost) | **Nav:** make brand, résumé and menu faux with the chrome alpha (`--glass-a-refract`) |
| Hero → About | 11 | + hero CTA (R), Get in touch, GitHub, 2 widgets; + story, pillars | **Hero:** make the secondary buttons faux. **About:** put the 4 pillars in one bento panel |
| Skills | 11–12 | + 7 × `.skill-card` | **Skills:** one bento, or faux cards |
| Projects | 9 | + 5 × `.surface` | **Projects:** bento |
| Education → Contact | 11–13 | + 6 × `.surface` rows, Contact card | **Education:** faux rows in one frost panel |

Measured on 2026-09-26, after the QA fixes (`glassaudit.mjs`, both pages, 1440 and 390, both themes): at most **5**
backdrop-filter surfaces in any viewport, refract 3 on `/` and 2 on `/services/`, `nested=0`, `rootProblems=0`.

---

## 5. The bento pattern

Use **one** frosted panel divided by hairlines instead of N frosted cards. It is cheaper (one filter pass), calmer and
more Apple-like. The primitive is in `ui.css`:

```jsx
<LiquidGlass tier="frost" className="bento">
  <ul className="bento__grid about__pillars">
    {items.map((it) => (
      <li key={it.id} className="bento__cell">…</li>
    ))}
  </ul>
</LiquidGlass>
```

```css
/* sections/about.css: the section owns the columns */
@media (min-width: 640px) { .about__pillars { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .about__pillars { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
```

- Each cell draws only its **top and left** hairline (`--hairline`). The grid clips the lines on the
  outer edge, so any column count and any ragged last row work **without `nth-child` rules**.
- The clip is on the inner grid, not on the glass, so the specular rim survives.
- Cells are plain boxes. They never get their own glass. Nested plates inside a cell use `.inset` (faux).
- The default cell padding is `clamp(20px, 2.4vw, 28px)`. Override it in your section file.
- In forced colours the dividers become outlines.

---

## 6. Component and class catalogue

### 6.1 `<LiquidGlass>` (`src/components/glass/LiquidGlass.jsx`)

| Prop | Default | Notes |
| --- | --- | --- |
| `as` | `'div'` | Any element or tag: `'a'`, `'button'`, `'article'` and so on |
| `tier` | `'frost'` | `'faux' \| 'frost' \| 'refract'` |
| `variant` | `'regular'` | `'regular' \| 'strong' \| 'legible' \| 'prominent'` |
| `radius` | `null` | **Refract only, and required there.** The lens map is built from it, and it is also applied inline so the lens matches the shape. On faux and frost it is ignored, with a dev warning. **Shape belongs to CSS**: use a `--r-*` token in your file or `.glass-capsule` |
| `bezel`, `thickness`, `blur`, `tone` | 18, 12, 3, token | Refract lens tuning |
| `interactive` | `false` | The gel press (`scale(1.03)` on hover, `.96` on press) plus a sheen that follows the pointer |
| `className`, `style`, `ref`, `...rest` | | Forwarded. `ref` is merged |

```jsx
// A content panel: frost, with the radius from CSS
<LiquidGlass as="article" tier="frost" className="skills-panel">…</LiquidGlass>
/* sections/skills.css */ .skills-panel { border-radius: var(--r-panel); padding: 28px; }

// A text panel that overlaps a screenshot
<LiquidGlass as="article" tier="frost" variant="legible" className="work-card">…</LiquidGlass>

// A small control: faux capsule
<LiquidGlass as="a" href="…" tier="faux" interactive className="btn btn-sm glass-capsule">Résumé</LiquidGlass>

// Refract: nav, toggle and hero CTA only. radius is required
<LiquidGlass as="a" href="#work" tier="refract" variant="prominent" radius={999} interactive className="btn btn-lg glass-capsule">…</LiquidGlass>
```

You can write faux glass without the component, as plain classes, for example `className="glass glass-capsule"`.
Do **not** hand-write `glass-frost` or `glass-refract` on an element. Use the component, so the tier stays
auditable.

Clear glass is the exception: it has **no** `<LiquidGlass>` tier. Write it by hand as `className="glass-clear glass-dim"`,
where `.glass-dim` adds the HIG 35% dimming and white text. It is allowed only over media (today, only the Work
hostname capsule over its screenshot), and it counts as frost in the budget.

### 6.2 Buttons: `.btn`

Buttons are always capsules. Each one pairs with a glass tier, and each has a 1px transparent border that forced colours paint as
`ButtonText`, with a `ButtonFace` fill.

| Class | Height | Use |
| --- | --- | --- |
| `.btn` | 48px | The default |
| `.btn-lg` | 52px (50px ≤ 480px) | Hero actions |
| `.btn-sm` | 40px (**44px** on touch or ≤ 640px) | Compact chrome |
| `.btn-icon` | square | Icon-only. Needs an `aria-label` |

```jsx
<a className="btn glass glass-prominent glass-capsule glass-interactive" href="mailto:…">Email me</a>   {/* primary, faux */}
<a className="btn glass glass-capsule glass-interactive" href="/cv.pdf" download>Download résumé</a>     {/* secondary, faux */}
```

Only **one** `glass-prominent` action per view. Inside a frosted panel, buttons are always faux.

### 6.3 Chips: `.chip`

These are faux pills, 28px tall at 12.5px/500. Chips are not controls. If a chip is a link, give it `.tap-target`
or make it at least 44px tall on touch.

```jsx
<span className="chip">Django</span>
<span className="chip chip--accent">Online shop</span>   {/* filled and tinted in dark, 7:1+ */}
<span className="chip chip--live">Available for opportunities</span>
```

Stack and technology lists use `.chip` in **Inter**. The legacy mono chips (`.skill-chip`, `font-mono`) are gone.

### 6.4 Icon tiles: `.tile`

These are app-icon squircles. They are decorative, `aria-hidden`, and never carry text.

```jsx
<span className="tile tile--sm" style={{ '--tile': 'var(--sys-teal)' }} aria-hidden="true"><Server size={15} /></span>
```

The sizes are `.tile--sm` 28px, `.tile` 40px and `.tile--lg` 48px. The radius is 30% of the size.

### 6.5 Inset plate: `.inset`

This is a nested faux plate inside a card (`--r-inset`). Use it for grouped lists, stat tiles and notes. Its outer
`--inset-edge` hairline keeps it visible on near-white frost in light theme.

### 6.6 Eyebrow and section frame: `<Section>`

```jsx
<Section id="skills" eyebrow="Skills" title="What I build with" lead="Grouped by what each thing does…">
  …your content…
</Section>
```

- It renders `.section > .section__head` (containing `.eyebrow.glass.glass-capsule` with its `.eyebrow__no` ordinal,
  `.section__title` and `.section__lead`) followed by `.section__body`.
- The **ordinal comes from `sectionNo(id)`**, which reads the `navLinks` order in `profile.js`. Never hand-write
  a number. `/services/` sections pass `numbered={false}`.
- **From 1024px the head has two columns.** The title is on the left (7fr) and the lead on the right (5fr), and they are
  bottom-aligned, so wide viewports never leave the right half empty. With no lead, the head stays one column.
- The width is `--page-max`, with padding of 104/20px on phones and 136/32px from 640px. A negative
  `scroll-margin-top` (−104px, then −136px) cancels that top padding for anchor jumps: `html` `scroll-padding-top`
  already clears the header, so a jump lands on the eyebrow rather than 100px+ below it.
- The eyebrow capsule has symmetric padding; the ordinal pulls itself back to 0.3rem from the edge with a negative
  margin. That keeps unnumbered eyebrows symmetric in engines without `:has()`.
- `title` can be a node. `className` is added to the `<section>`.

### 6.7 `<Reveal>`

```jsx
<Reveal as="li" delay={i * 80} className="…" id="…" aria-label="…">…</Reveal>
```

It lifts its content by `--reveal-lift` (26px) and fades it over `--dur-reveal` (0.9s) the first time it
enters the viewport. Extra props such as `id`, `aria-*` and handlers are forwarded, and `style` is merged. The stagger is `delay` in ms.
See section 9 for the rules.

### 6.8 `<GlassPreference>`

```jsx
<GlassPreference />                         {/* footer (placed) */}
<GlassPreference className="sheet__pref" /> {/* mobile sheet (Nav agent) */}
```

This is the "Reduce transparency" switch, with `role="switch"` and `aria-checked`, and a target of at least 44px. Off, its
track has a 1.5px `--fg-subtle` ring that holds at least 3:1 against the panel in both themes (WCAG 1.4.11; measured
5.6–6.5:1). It calls `setGlassPreference('solid' | null)`, the choice persists, and other tabs follow it. If storage
refuses the write (a full quota, blocked storage), the choice still applies to the current page view. When the OS
already forces solid (reduced transparency, increased contrast or forced colours), it shows as on and disabled, with
the note "Set by your system".

### 6.9 Other primitives

| Class | What it does |
| --- | --- |
| `.display` | The hero name: `--text-display`, weight 700, line-height .94, `--track-display`, optical sizing |
| `.bento`, `.bento__grid`, `.bento__cell` | Section 5 |
| `.tap-target` | Grows a small, **non-glass** control's hit area to 44×44 without changing how it looks |
| `.skip-link` | Already in `Nav`. Do not add another |
| `.reveal-fade` | Marks a leaf that should fade with its `Reveal` (for example a screenshot under clear glass) |
| `.switch` and its parts | Styling for `<GlassPreference>` |
| `.noscript` | The no-JavaScript fallback that `vite.config.js` writes into both entries: name, role and contact links |

### 6.10 Reading the theme and the glass mode in JavaScript

```js
import { useIsDark, setTheme } from '../lib/theme'          // the ONE theme source
import { useGlassMode } from '../lib/glass/glassMode'       // 'refract' | 'frost' | 'solid'
```

Never read `document.documentElement.classList` in render, and never write `localStorage` `theme` or `glass`
yourself. The pre-paint script (`src/lib/prepaint.js`) is injected into both HTML entries by `vite.config.js`.
**Never hand-write a theme or glass script into the HTML.**

---

## 7. Type

The typeface is **Inter**, self-hosted (`public/fonts/inter-var-latin.woff2`, the Google Fonts latin variable file,
`opsz 14..32`, weights 400–800), preloaded by both entries, with a metric-matched `Inter Fallback` face (a local
Arial, Liberation Sans or Helvetica, size-adjusted to Inter) so the swap does not move the layout. New work
uses **400–700**. There is **no webfont monospace**: `--font-mono` is the platform's own stack, for the rare
code-like string. Everything else is Inter, and that includes labels, dates, chips and ledgers.

| Token | Value | Weight / line-height / tracking | Use |
| --- | --- | --- | --- |
| `--text-display` | `clamp(3.4rem, 8.6vw, 7.25rem)` | 700 / .94 / `--track-display` (-0.052em) | The hero name (`.display`) |
| `--text-title` | `clamp(2.15rem, 4.6vw, 3.6rem)` | 700 / 1.02 / `--track-title` (-0.038em) | Section titles (h2) |
| `--text-title-2` | `clamp(1.65rem, 2.5vw, 2.1rem)` | 700 / 1.08 / -0.035em | Feature card names |
| `--text-title-3` | 24px | 700 / 1.12 / -0.032em | Widget and panel titles |
| `--text-lead` | `clamp(1.02rem, 1.25vw, 1.2rem)` | 400 / 1.55 / -0.01em | Section leads, intro copy (`--fg-muted`) |
| `--text-headline` | 17px | 600–650 / 1.25 / `--track-headline` (-0.022em) | Card titles, taglines |
| `--text-body` | 16px | 400 / 1.6 | Running text on the wallpaper |
| `--text-callout` | 15px | 500–600 | Buttons, list labels |
| `--text-subhead` | 14.5px | 400 / 1.55–1.62 | Body copy inside cards |
| `--text-footnote` | 13px | 400–500 | Meta, hostnames, footnotes |
| `--text-caption` | 12px | 600, uppercase, `--track-caps` (+0.07em) | Group labels, badges |

- Numerals in stats and indices use `font-variant-numeric: tabular-nums`.
- Headings get `text-wrap: balance` and paragraphs get `pretty`; this is already in base.
- Emphasis inside running text is **weight or colour, never italic serif**.

---

## 8. Radii and motion

### 8.1 Radii (concentric: inner = outer − gap)

| Token | px | Use |
| --- | --- | --- |
| `--r-panel` | 32 | Frosted panels, bento panels, widgets, the mobile sheet, Work cards |
| `--r-card` | 26 | Standalone cards, screenshot windows |
| `--r-nested` | 22 | Rows and plates inside a panel with 10px padding (32 − 10): stat tiles, sheet rows |
| `--r-inset` | 18 | Inset plates inside a card with generous padding: grouped lists, notes |
| `--r-tile` | 12 | Small tiles and thumbnails |
| `--r-pill` | 999 | Every control: buttons, chips, capsules (`.glass-capsule` sets it) |

### 8.2 Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` | Entrances and reveals |
| `--ease-gel` | `cubic-bezier(.3, 1.45, .5, 1)` | The springy press and morph (it overshoots) |
| `--ease-lead` / `--ease-trail` | overshooting / trailing | The leading and trailing edges of the liquid nav indicator |
| `--dur-press` | 110ms | Press-in |
| `--dur-gel` | 300ms | Hover and press release |
| `--dur-morph` | 550ms | Icon swaps, the sheet opening, width morphs |
| `--dur-reveal` / `--reveal-lift` | 900ms / 26px | Scroll reveal |

Motion rules:

- Animate only `transform` and `opacity`.
- Hover effects go under `@media (hover: hover)`.
- **No looping motion.** Nothing may run indefinitely, and an auto-advancing element stops after one pass. The hero's
  roles are a static list, all on screen at once (WCAG 2.2.2).
- Reduced motion removes transitions outright (a 0s duration **and** a 0s delay, so none starts and a visibility
  change applies at once) and ends animations after 0.01ms, with no delay. This is global, in base. Also turn off
  any transform-based hover in your own `@media (prefers-reduced-motion: reduce)` block.

---

## 9. Reveal rules and backdrop roots

`backdrop-filter` samples what is behind an element **up to its nearest backdrop root**. An ancestor becomes
a backdrop root, and **silently kills the child's blur**, when it has any of the following:

- `opacity < 1`, including during a fade
- `filter`, `mask` or `mask-image`, `clip-path` or `mix-blend-mode`
- `will-change: opacity | filter | …`

So:

- **Never** put any of these on an ancestor of a frost, refract or clear surface. `<Reveal>` only
  transforms, and transforms are safe.
- A reveal wrapper **with no glass inside** fades as a whole. A wrapper **with glass inside** fades each glass surface
  individually. `ui.css` does this with `:has()`, and it lists every backdrop class. **Do not invent new backdrop classes.**
  Use the component tiers.
- To fade a screenshot under clear glass, put `.reveal-fade` on the image, not on its container.
- `overflow: hidden` and `clip` are **not** backdrop roots, and they are fine.
- The glass audit's DOM walk must find **no backdrop root** above a frost, refract or clear surface.

### 9.1 Scroll-driven state commits synchronously

`<Reveal>` and the Nav scroll-spy set React state from an `IntersectionObserver` callback, and both wrap it in
`flushSync`. That is load-bearing. In WebKit (the Safari engine), after a visitor follows an in-page anchor link
such as a nav item, React's queued (default-priority) updates stopped committing while the observers kept firing.
Every section below the jump stayed invisible, and the nav indicator froze. Headless WebKit 26.5 reproduced it
3 out of 3 times; with `flushSync`, 0 sections in view stay hidden. Chrome and Firefox were never affected.

- Any new state that is set from an observer or a scroll event, and that controls whether content is **visible**,
  must commit with `flushSync` (or write to the DOM directly, as the hero parallax does).
- Do not call `flushSync` inside an effect or during render. For the first measurement inside `useEffect`, use a
  plain `setState`.

---

## 10. Accessibility rules

| Rule | How |
| --- | --- |
| **AA 4.5:1 for body text, measured** (3:1 for text of 24px or more, or 18.66px bold) | Run `ccap.mjs` and `contrast.py` (section 13) on your section at 1440 and 390, in both themes, including every position where your text passes over a screenshot. Report the worst run of each group. Body copy uses `--fg-muted` or stronger |
| **44px touch targets** | Every control is at least 44×44 on touch or at ≤ 640px. Use `--target-min`, or `.tap-target` for small non-glass links. Inline links inside running text are exempt. `targets.mjs` lists offenders |
| **Focus ring** | The two-tone ring (`--focus-ring` outline plus `--focus-halo`) is global. Never remove `outline` without replacing it. Focus must never hide under the header (html scroll-padding-top: 6.5rem clears the header for anchors and focus; .section cancels its own top padding with a negative scroll-margin-top, so a jump lands on the eyebrow) |
| **Forced colours** | Every control keeps a visible boundary. Use `.btn`, which gets a `ButtonText` border, and `.glass`, which gets a `CanvasText` border. Custom controls need a transparent 1px border or an explicit system-colour border. Background images and box-shadows disappear, so never carry meaning in them |
| **Reduced transparency and increased contrast** | These are handled by solid mode (`data-glass="solid"` plus the media queries): every alpha goes to .95, `backdrop-filter` is removed, and under more contrast `--fg-muted` and `--fg-subtle` become `--fg`. **Do not override `--fg-muted` in your section**, because it would defeat this. Anything that sets its own background must read the `--glass-a*` tokens so solid mode reaches it |
| **Reduced motion** | Global. See section 8.2 |
| **No looping motion** | See section 8.2. A marquee or auto-rotating carousel needs a visible pause control, so do not build one |
| **Semantics** | One `h1` (the hero). Each section's `h2` comes from `<Section>`; use `h3` and `h4` inside. Landmarks: `header`, `nav`, `main#main` and `footer` already exist. Lists are lists. Decorative icons get `aria-hidden="true"` |
| **Links that open a tab** | `target="_blank" rel="noopener noreferrer"`, plus "(opens in a new tab)" in the accessible name |
| **Colour alone** | Never the only signal. The live dot has the word "Live" or "Present" beside it, and daily-driver skills get a dot plus weight plus a plate |

---

## 11. Image rules

- Images are real screenshots only. They live in `public/work/` as WebP, all referenced from `profile.js`
  (`liveSites[].images`), where `<id>` is the site's `liveSites` id. There are no remote images and no stock images.
  - Desktop files are `<id>-<width>.webp`. The width is 1280, or the capture's native width when it is narrower
    and must not be upscaled. The one such file today is `omni-panel-1152.webp`, whose width `LiveWork.jsx`
    declares in `SITE_UI.desktopWidth` (so the `srcset` descriptor is honest).
  - The other files are `<id>-640.webp` and `<id>-mobile.webp`.
- Always set `width` and `height` (for zero CLS), `loading="lazy"`, `decoding="async"` and a real `alt` that describes the
  site. The only exception is `alt=""` for a purely decorative duplicate.
- For desktop shots, use `srcSet="…-640.webp 640w, …-1280.webp 1280w"` with an honest `sizes`, and use the 640 file as the `src` fallback.
- Screenshots sit in a window with `--r-card` corners, a 1px ring (`--shot-ring`) and a shadow. In dark mode a dark
  screenshot needs a visible rim, so it doesn't dissolve into the wallpaper.
- Text over a screenshot must be on **clear+dim** glass (small labels) or **legible** frost (panels).
- Nothing above the fold loads eagerly except what is in the first viewport.

---

## 12. File ownership

Each section agent owns **only** its files. **Do not edit shared files.** If you need a change to one,
describe it in your report, with the file, the change and the reason, and the design-system lead applies it. That includes
new tokens, new primitives, `profile.js` copy, `navLinks` and the section order.

| Owner | Owns |
| --- | --- |
| Nav | `src/components/Nav.jsx`, `src/styles/nav.css` |
| Hero | `src/components/Hero.jsx`, `src/styles/sections/hero.css` |
| About | `src/components/About.jsx`, `src/styles/sections/about.css` |
| Work (Live Websites) | `src/components/LiveWork.jsx`, `src/styles/sections/work.css` |
| Skills | `src/components/Skills.jsx`, `src/styles/sections/skills.css` |
| Experience | `src/components/Experience.jsx`, `src/styles/sections/experience.css` |
| Projects | `src/components/Projects.jsx`, `src/styles/sections/projects.css` |
| Education | `src/components/Education.jsx`, `src/styles/sections/education.css` |
| Contact | `src/components/Contact.jsx`, `src/styles/sections/contact.css` |
| Footer | `src/components/Footer.jsx`, `src/styles/sections/footer.css` |
| Services page | `src/ServicesApp.jsx` (the page header), `src/components/Services.jsx`, `src/components/WebsiteTypes.jsx`, `src/components/SiteMockup.jsx`, `src/lib/accent.js`, `src/styles/sections/services.css`, `src/styles/sections/website-types.css` |
| **Shared (design-system lead only)** | `index.html`, `services/index.html`, `vite.config.js`, `src/index.css`, `src/styles/{tokens,glass,ui,entry-home,entry-services}.css`, `src/lib/{prepaint,theme,dates}.js`, `src/lib/glass/*`, `src/components/glass/*`, `src/components/{Section,Reveal,Background}.jsx`, `src/App.jsx`, `src/main.jsx`, `src/services-main.jsx`, `src/data/profile.js`, `public/`, `DESIGN.md`, `PRD.md`, `MEMORY.md`, `TODO.md`, `README.md` |

If you own several sections, you own all of their files. Rules inside your files:

- Only your section's classes go in your CSS file, prefixed with your block name (`.skills-…`, `.work-…`).
- Do not restyle a shared primitive globally. Adjust it in context instead: `.work-card .chip { … }` wins by layer.
- **No `backdrop-filter`** in your CSS or JSX. Use `<LiquidGlass>` tiers.
- **No `border-radius` literals.** Use the `--r-*` tokens. **No colour literals** for text or surfaces; use tokens. The only
  exception is a section-scoped token you define at the top of your file.
- **No `.dark` rule** that changes a text colour. Theme differences belong in tokens.
- No new dependency, no new font, no inline `<style>`.
- Copy stays in `profile.js` (it is shared, so request any change). Never invent claims.

### 12.1 What each section inherits from the judges

All §12.1 items were addressed in the 2026-09-26 rebuild.

---

## 13. Verification (run before you report)

The redesign was verified with headless Chrome (Playwright driving the system Chrome), plus Firefox and
WebKit (the Safari engine) for the fallback paths. **Those scripts are not in the repo yet**: they lived in a
temporary working folder and depended on a machine-local Playwright install. Adding them under `scripts/qa/`,
with Playwright as a dev dependency and a CI job, is a recommended follow-up. Until then, run these checks by
hand or with your own Playwright script. The pass criteria are what matters:

| Check | How | Pass |
| --- | --- | --- |
| Build (never into the repo's `dist/` while others work) | `npx vite build --outDir <tmp dir> --emptyOutDir` | Builds; both entries render; each page links two CSS files |
| No Tailwind backdrop utility | `grep -c tw-backdrop <build>/assets/*.css` | `0`; `.sr-only` is the only utility in the built CSS |
| No backdrop-filter outside the material | `grep -rn -e "backdrop-filter *:" -e "backdropFilter" src/components src/styles/sections` | Only `LiquidGlass.jsx` |
| No radius props or inline radii | `grep -rn -e "radius=" -e "borderRadius" src/components --include=*.jsx` | Only the 3 refract surfaces (`Nav.jsx` ×2, `Hero.jsx` ×1) and `LiquidGlass.jsx` |
| Overflow and console | Load `/` and `/services/` at 360, 390, 768, 1024, 1440 and 1920 in both themes, scroll to the bottom | `documentElement.scrollWidth − innerWidth = 0`; no console errors or failed requests; **look at every section** |
| Glass budget | Count elements whose computed `backdrop-filter` is not `none`, per viewport, while scrolling | Refract ≤ 3 (2 on `/services/`); frost visible ≤ 8 per viewport (measured peak: 5); no backdrop-filter element inside another; no opacity/filter/mask/will-change ancestor above one (§9) |
| Reveals | Click every nav link, then check the viewport | No `.reveal:not(.is-visible)` element inside the viewport, in Chrome, Firefox **and WebKit** (see §9.1) |
| Contrast | Hide the text, sample the real backdrop behind each text run, compute WCAG ratios | Body text ≥ 4.5:1 everywhere (measured floor 4.58:1); large text and UI boundaries ≥ 3:1 |
| Touch targets | Emulate touch at 390 and at 1024–1366 with a coarse pointer | No control under 44px |
| Theme and glass modes | Emulate `prefers-reduced-transparency`, `prefers-contrast: more` and `forced-colors`; use the switch | Default `refract` (Chromium, fine pointer); the emulations give `solid` with 0 backdrop filters and the switch on and disabled; the switch persists across reloads |
| Anchor landing | Follow `#about`, `/#work` and so on | The eyebrow lands at about 104px below the top |
| Layout shift | Lighthouse or a `layout-shift` PerformanceObserver at 390 | CLS < 0.01 (PRD R5 allows 0.1) |
| Lighthouse (production build via `vite preview`) | `npx lighthouse <url> --chrome-path=/usr/bin/google-chrome` | Mobile `/`: Performance ≥ 90, Accessibility, Best Practices and SEO ≥ 95 (measured 98 / 100 / 100 / 100) |

Your report must include:

1. The files you changed.
2. The numbers from each check above.
3. The contrast table for your section.
4. The screenshots you looked at.
5. Any change you need in a shared file.
