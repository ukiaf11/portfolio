# Upendra Kumar — Portfolio

A single-page developer portfolio built from my CV. React + Vite + Tailwind CSS v4, no backend.

**Live sections:** Hero · About · Skills · Experience · Projects · Education · Contact

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
export const skills = {
  // the four runtime layers, client at the top -> infrastructure at the bottom
  stack: [ { id, name, role, icon, primary?, items: [{ name, core }] } ],
  // capabilities that hang off the stack rather than sit inside it
  attached: [ { id, name, role, icon, items: [...] } ],
}
export const projects = [ { name, tagline, featured, icon, points: [...], stack: [...] } ]
```

The Skills section renders as an architecture diagram: `stack` becomes the stacked layer bands
(the layer with `primary: true` gets the accent treatment), and `attached` becomes the side rail.
Marking an item `core: true` gives it a filled dot and heavier weight; the legend explains that.

Icons are [lucide-react](https://lucide.dev) names, referenced as strings in the data and mapped
in the component (`ICONS` object in `Skills.jsx` / `Projects.jsx`). If you add a new icon name to
the data, add it to that map too.

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
  everything is disabled under `prefers-reduced-motion`.

## Deploying

The build is fully static — `npm run build`, then serve `dist/`.

- **Netlify / Vercel** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first, then publish `dist/`.

## Stack

React 18 · Vite 6 · Tailwind CSS v4 · lucide-react
