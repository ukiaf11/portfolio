# Upendra Kumar — Portfolio

A two-page developer portfolio built from my CV, with five live websites I built. React + Vite +
Tailwind CSS v4, no backend.

**Two pages.**

- `/` is the portfolio: Hero · About · Work (live websites) · Skills · Experience · Projects · Education ·
  Contact.
- `/services/` is a standalone, client-facing services page: the header with the live-sites widget ·
  Website types · Services.

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

**Visitor-facing copy lives in one file: [`src/data/profile.js`](src/data/profile.js).** Change your
details, the section headings and leads, skills, jobs, projects, live sites, services, education and
certifications there. The components read from it, so you never have to touch JSX to update what the site
says.

The boundary: generic control and field labels stay in the components. These are Menu, Close, Skip to
content, Back to top, Résumé, Download résumé, Email me, Visit live site, Back to the portfolio, "(opens in
a new tab)", Built with, Highlights, Best for, What you get, Responsibilities and Contact details.

```js
// who, and the hero
export const profile = { name, role, location, email, phone, github, resume, roles: [...], summary, summaryTail }
export const highlights = [ { value, label } ]              // the hero's stat tiles
export const heroIntro = { status, lead, leadEmphasis: [...], liveLabel }

// About
export const aboutIntro = { eyebrow, title }                // the lead is profile.summaryTail
export const aboutPillars = [ { icon, title, body } ]
export const aboutFocus = { title, rows: [ { icon, label, value } ] }

// Work: the live websites
export const liveSites = [
  { id, name, url, category, tagline, summary, features: [...], stack: [...], accent,
    images: { desktop, desktopSmall, mobile }, note?, noteShort?, context? },
]
export const liveSitesIntro = { eyebrow, title, lead }

// Skills: one flat list of groups, so add, remove or reorder freely
export const skillsIntro = { eyebrow, title, lead, primaryKicker, dailyLabel, otherLabel, dailyCount }
export const skills = [ { id, name, note, icon, primary?, items: [ { name, daily? } ] } ]

// Experience, Projects, Education, Contact, footer
export const experienceIntro = { eyebrow, title, lead }
export const experience = [ { company, title, period, current?, points: [...], stack: [...] } ]
export const projectsIntro = { eyebrow, title, lead, moreLabel }
export const projects = [ { name, tagline, featured?, icon, points: [...], stack: [...] } ]
export const educationIntro = { eyebrow, title, lead }
export const education = [ { degree, school, period, current? } ]
export const certifications = [ { name, issuer, period } ]
export const contactCta = { eyebrow, title, titleTail, body }
export const footerCredits = { builtWith: [...] }

// /services/
export const servicesPage = { h1, intro, primaryAction, secondaryAction, liveTitle, liveMore }
export const websiteTypesIntro = { eyebrow, title, lead }
export const websiteTypes = [ { id, examples?, name, icon, preview, blurb, bestFor, highlights: [...] } ]
export const servicesIntro = { eyebrow, titleLead, titleAccent, lead }
export const services = [
  { id, icon, title, tagline, flag?, pitch, bestFor, deliverables: [...], stack: [...], proof },
]
export const servicesCta = { headline, sub, buttonLabel, mailSubject, mailBody }

// page order: the nav, the scroll-spy and the section ordinals
export const navLinks = [ { id, label, href?, page? } ]
export const pageSections   // navLinks without the `page: true` entries
export const sectionNo      // (id) => "01", "02"… or null
```

A few fields carry placeholders or conventions:

- `heroIntro.leadEmphasis` lists the phrases of `lead` that render in bold. The hero chip reads
  `${liveSites.length} ${heroIntro.liveLabel}` ("5 live sites").
- `skillsIntro.dailyCount` has `{daily}` and `{total}` placeholders, which the Skills section fills in.
- `liveSites[].note` is an honest caveat the visitor should know before clicking (a sign-in wall, demo
  data, a service that is down). `noteShort` is its two-to-three-word form, for the `/services/` list.
- Live-site copy comes from what each site actually shows. Never add metrics or features that are not on
  the site.

## The two pages

`vite.config.js` declares **two HTML entries**, not a client-side router:

| Entry | Source | Mounts | Output |
| --- | --- | --- | --- |
| `main` | `index.html` | `src/App.jsx` | `dist/index.html` |
| `services` | `services/index.html` | `src/ServicesApp.jsx` | `dist/services/index.html` |

So `/services/` is a genuinely separate document with its own `<title>`, meta description, canonical, OG
tags, share image and structured data. It needs no routing dependency, and neither page ships the other's
JavaScript: Rollup splits a shared vendor chunk plus one small per-page chunk. Both entries reuse
`Background`, `Nav` and `Footer`.

`<Nav standalone current="services" />` is what makes the shared nav work off the home page: the
section entries become `/#about` instead of `#about`, the scroll-spy does not run (there are no
sections to spy on), and the active item is the current page rather than an observed section.

### Page order and section numbers

`navLinks` is the single source of truth for the nav. It drives the nav, the scroll-spy **and**
the numbered eyebrow on every section, via `sectionNo(id)`, so there are no hand-written `01 —`
strings left to go stale. To move a section, reorder `navLinks` and match it in `App.jsx`; every
ordinal renumbers itself.

An entry with `page: true` is a separate HTML page rather than a home-page section, so it carries
a real `href` and is excluded from both the scroll-spy and the numbering. `pageSections` is the
filtered list the ordinals actually count, and `sectionNo` returns `null` for anything absent from
it, so the eyebrow drops its prefix instead of rendering `00 —`.

### Work (live websites)

Each `liveSites` entry becomes a case in the Work section: a screenshot window, the copy, the stack and a
"Visit live site" link with the hostname beside it. Screenshots live in `public/work/` as WebP; DESIGN.md
§11 has the file-naming rule. The same sites appear on `/services/` as a compact list, and a website type
links to the sites in its `examples`.

### Website types

`websiteTypes` feeds the gallery at the top of `/services/`. `preview` names a composition in
`SiteMockup.jsx`. Compositions live in the component because a layout is markup, not content, and
encoding one as coordinate arrays in the data file would make the data unreadable without buying
anything. Adding a type means adding a composition there and mapping its `icon` in
`WebsiteTypes.jsx`. `examples` lists the `liveSites` ids that really are that kind of site, and each one's
`note` is shown under its link.

### Services

Each service is a row in one frosted bento plate. `pitch` addresses the client in second person and leads
with the outcome rather than the technology; `deliverables` render as the "What you get" list; `proof`
must name a **real** project from the `projects` array, and links through to the home page's Projects
section. A service may carry a short `flag` (for example "Core strength"), rendered as a chip in its row:
emphasis by label, not by size.

### Skills

The Skills section is one primary band plus one bento. The single group marked `primary: true` renders
as the wide band at the top; every other group is a cell of the bento below, in array order. `name` is the
plain-English group title and `note` is the one line under it saying what the group is for.

Marking an item `daily: true` gives it a dot, a heavier weight and a plate. The key in the band explains
the two styles, and the count line under the bento says how many of the technologies are used every day.

### Icons

Icons are [lucide-react](https://lucide.dev) names, referenced as strings in the data and mapped in the
component that renders them. Skills, Projects, Services, WebsiteTypes and About map them in an `ICONS`
object. The other maps are keyed by id and are presentation only: Nav uses `TILES`, LiveWork uses
`SITE_UI`, ServicesApp uses `SITE_ICONS` and Experience uses `STACK_ICONS`. If you add a new icon name to
the data, add it to that map too: an unmapped name silently falls back to the component's default icon
rather than failing the build.

### Replacing the résumé PDF

Drop the new file at `public/Upendra_Kumar_Mahto_CV.pdf` (or change `profile.resume` to match a
different filename). The nav, the mobile menu and Contact all point at it. Give the PDF a Title and an
Author in its metadata, because search results show the Title.

## Design notes

- **Design system.** The Liquid Glass system, its tokens, material tiers, components, budgets and rules are
  documented in [`DESIGN.md`](DESIGN.md). Read it before changing any styling. It also covers the Services
  bento and the Website types sketches.
- **Theming.** Light/dark is a `.dark` class on `<html>`, set before first paint by an inline
  script so there is no flash. The script is generated from `src/lib/prepaint.js` and injected
  into both HTML entries by a small plugin in `vite.config.js`; the same module drives the
  runtime theme store (`src/lib/theme.js`). It follows the OS setting until the user picks a
  theme, which is then stored in `localStorage`, and keeps `<meta name="theme-color">` in step.
- **Colours.** Design tokens are defined per theme in `src/styles/tokens.css`.
- **Type.** Inter is self-hosted (`public/fonts/inter-var-latin.woff2`, with its OFL licence next to it) and
  preloaded by both HTML entries. A metric-matched `Inter Fallback` face stands in until it arrives, so the
  swap does not shift the layout.
- **Stylesheets.** Each page links two CSS files: the shared `src/index.css` (tokens, glass, primitives, nav,
  footer) and its own `src/styles/entry-home.css` or `src/styles/entry-services.css` with just that page's
  sections. Tailwind scans no files; `sr-only` is the only utility, listed in `index.css`.
- **Motion.** Scroll reveals use one `IntersectionObserver` per `Reveal` (`components/Reveal.jsx`), and
  everything is disabled under `prefers-reduced-motion`. That block removes transitions outright and zeroes
  animation and transition **delays** as well as durations: a stagger is expressed as a delay, so without
  that the content would sit invisible for the full delay and then snap in.
- **The `/services/` accent ramp** (`src/lib/accent.js`). The service rows step from `--accent-ink` to a teal
  ink (`--sys-teal` mixed toward `--fg`), so every step is legible in both themes: measured at 5.0:1 or better
  in light and 5.8:1 or better in dark on the real frost behind them. The icon tiles step from
  `--sys-indigo` to `--sys-teal`.
- **What the served HTML carries.** A second `vite.config.js` plugin (`portfolio:head`) writes schema.org
  JSON-LD (the Person, plus the WebPage on `/services/`) and a `<noscript>` fallback with the contact
  links into both entries, from `profile.js`. Each page has a 1200×630 share card (`public/og/`), and
  `public/` also holds the favicons (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`), `robots.txt`
  and `sitemap.xml`.

## Deploying

The build is fully static: run `npm run build`, then serve `dist/`.

- **Netlify / Vercel.** Build command `npm run build`, publish directory `dist`.
- **GitHub Pages.** Set `base: '/<repo-name>/'` in `vite.config.js` first, then publish `dist/`.

## Stack

React 18 · Vite 6 · Tailwind CSS v4 · lucide-react
