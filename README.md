# Upendra Kumar — Portfolio

A single-page developer portfolio built from my CV. React + Vite + Tailwind CSS v4, no backend.

**Two pages.** `/` is the single-page portfolio — Hero · About · Skills · Experience · Projects ·
Education · Contact. `/services/` is a standalone client-facing services page — website types ·
what I take on.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

## Editing the content

**All copy lives in one file: [`src/data/profile.js`](src/data/profile.js).** Change your details,
skills, jobs, projects, education and certifications there — the components read from it, so you
never have to touch JSX to update the site.

```js
export const profile = { name, role, email, phone, github, ... }
// one flat list of groups — add, remove or reorder freely
export const skills = [
  { id, name, note, icon, primary?, items: [{ name, daily? }] },
]
export const projects = [ { name, tagline, featured, icon, points: [...], stack: [...] } ]
export const services = [
  { id, icon, title, tagline, flag?, pitch, bestFor,
    deliverables: [...], stack: [...], proof },
]
export const servicesCta = { headline, sub, buttonLabel, mailSubject, mailBody }
// the /services/ gallery
export const websiteTypes = [
  { id, name, icon, preview, blurb, bestFor, highlights: [...] },
]
export const websiteTypesIntro = { title, lead }
export const servicesPage = { h1, intro }
```

## The two pages

`vite.config.js` declares **two HTML entries**, not a client-side router:

| Entry | Source | Mounts | Output |
| --- | --- | --- | --- |
| `main` | `index.html` | `src/App.jsx` | `dist/index.html` |
| `services` | `services/index.html` | `src/ServicesApp.jsx` | `dist/services/index.html` |

So `/services/` is a genuinely separate document with its own `<title>`, meta description,
canonical and OG tags, it needs no routing dependency, and neither page ships the other's
JavaScript — Rollup splits a shared vendor chunk plus one small per-page chunk. Both entries load
the same `src/index.css` and reuse `Background`, `Nav` and `Footer`.

`<Nav standalone current="services" />` is what makes the shared nav work off the home page: the
section entries become `/#about` instead of `#about`, the scroll-spy does not run (there are no
sections to spy on), and the active item is the current page rather than an observed section.

### Page order and section numbers

`navLinks` is the single source of truth for the nav. It drives the nav, the scroll-spy **and**
the numbered eyebrow on every section, via `sectionNo(id)` — so there are no hand-written `01 —`
strings left to go stale. To move a section, reorder `navLinks` and match it in `App.jsx`; every
ordinal renumbers itself.

An entry with `page: true` is a separate HTML page rather than a home-page section, so it carries
a real `href` and is excluded from both the scroll-spy and the numbering. `pageSections` is the
filtered list the ordinals actually count, and `sectionNo` returns `null` for anything absent from
it, so the eyebrow drops its prefix instead of rendering `00 —`.

### Website types

`websiteTypes` feeds the gallery at the top of `/services/`. `preview` names a composition in
`SiteMockup.jsx` — compositions live in the component because a layout is markup, not content, and
encoding one as coordinate arrays in the data file would make the data unreadable without buying
anything. Adding a type means adding a composition there and mapping its `icon` in
`WebsiteTypes.jsx`.

### Services

Each service is a cell in the Services lattice. `pitch` addresses the client in second
person and leads with the outcome rather than the technology; `deliverables` render as a
ruled ledger; `proof` must name a **real** project from the `projects` array above, and
links through to that section. Exactly one service carries `featured: true`, which earns
it a "Most requested" marker — a label, not a size change, so the lattice stays even.

The Skills section renders as a set of capability cards. `name` is the plain-English group
title and `note` is the one line under it saying what the group is for. The single group
marked `primary: true` renders as the wide featured band at the top; everything else falls
into the grid below, in array order.

Marking an item `daily: true` gives it a filled dot, heavier weight and a tinted plate — the
section lead tells the reader what that means, so there is no separate legend to keep in sync.

Icons are [lucide-react](https://lucide.dev) names, referenced as strings in the data and mapped
in the component (`ICONS` object in `Skills.jsx` / `Projects.jsx` / `Services.jsx`). If you add a new
icon name to the data, add it to that map too — an unmapped name silently falls back to the
component's default icon rather than failing the build.

### Replacing the résumé PDF

Drop the new file at `public/Upendra_Kumar_Mahto_CV.pdf` (or change `profile.resume` to match a
different filename). The nav and contact download buttons both point at it.

## Design notes

- **Theming** — light/dark is a `.dark` class on `<html>`, set before first paint by an inline
  script in `index.html` so there is no flash. It follows the OS setting until the user picks a
  theme, which is then stored in `localStorage`.
- **Colours** — semantic tokens (`--bg`, `--fg`, `--card`, `--line`, `--grad-*`) are defined per
  theme in `src/index.css`. Accent tokens (`--color-brand-400`, `--color-teal-400`) are overridden
  per theme too, so every Tailwind accent utility darkens automatically in light mode.
- **Motion** — scroll reveals use a shared `IntersectionObserver` (`components/Reveal.jsx`), and
  everything is disabled under `prefers-reduced-motion`. That block zeroes transition and
  animation **delays** as well as durations: a stagger is expressed as a delay, so without
  that the content would sit invisible for the full delay and then snap in.
- **Services lattice** — Skills and Projects already own "grid of bordered cards with a
  gutter", so Services is deliberately a different object: one plate subdivided by 1px
  seams. A single light tracks the pointer *underneath* the cell faces — soft across each
  face, near-full strength through the seams, where there is never any text to lose
  contrast against. It is a fixed-size blob moved with `translate3d` (compositor only, no
  repaint), `--mx/--my` are written on the childless glow node to keep style invalidation
  to one element, and the one layout read happens inside the rAF, at most once a frame.
  Per-service accents step along a `color-mix(in oklab, brand → teal)` ramp; because both
  endpoints are theme-swapped tokens, every step clears WCAG AA in light and dark
  (measured 5.25–12.29:1). Worst case under the light — cursor parked on a hovered cell's body
  copy — measures 5.69:1 dark and 5.89:1 light.
- **Blueprint table** (`/services/`) — six miniature wireframes, one per kind of site. Three
  things keep it from restating the light table below it: each preview is an **opaque** sheet
  where the light table is translucent glass; the caption sits **outside** the frame as a
  `<figcaption>` on bare ground rather than inside a bordered face; and the wireframe is grey with
  the accent reserved for the things you would actually **click** — buttons, prices, the active
  nav item, chart data. That last rule is what stops an abstract sketch reading as a grey loading
  skeleton, which is otherwise exactly what it becomes in dark mode. Each preview is sized with
  `aspect-ratio` + `container-type: inline-size` + `max(px, cqw)`, so it scales as a single unit
  with no internal breakpoints. The entrance uses **from-only** keyframes with
  `animation-fill-mode: backwards`: the implicit `to` is the element's own computed style, so the
  assembled state is the resting state structurally — a card cannot strand half-built, and the
  reduced-motion rule above lands everything finished with no separate fallback.

## Deploying

The build is fully static — `npm run build`, then serve `dist/`.

- **Netlify / Vercel** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first, then publish `dist/`.

## Stack

React 18 · Vite 6 · Tailwind CSS v4 · lucide-react
