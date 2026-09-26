/**
 * Pre-paint state for <html>: the colour theme (`class="dark"`), the glass mode
 * (`data-glass="refract | frost | solid"`) and `<meta name="theme-color">`.
 *
 * This is the ONE implementation. It has two consumers:
 *
 *   1. vite.config.js serialises the functions below with Function.prototype.toString
 *      and injects them as an inline <script> into the <head> of every HTML entry, at
 *      the `<!-- prepaint -->` marker. That is what makes the first paint correct.
 *   2. lib/theme.js and lib/glass/glassMode.js import the same functions to re-apply
 *      the state when the user, the OS or another tab changes it.
 *
 * Because of (1), every function here must be SELF-CONTAINED: no imports, no references
 * to other module-level names (configuration comes in as `cfg`), no calls to each other,
 * and ES5 syntax, because the inline copy is not transpiled. Browser globals only.
 */

export const PREPAINT_CONFIG = {
  themeKey: 'theme',
  glassKey: 'glass',
  // The browser chrome matches the wallpaper. Mirrors --wp-base in styles/tokens.css.
  themeColor: { light: '#e6edf7', dark: '#050814' },
  // Any one of these forces solid glass. glassMode.js listens to exactly this list.
  solidQueries: [
    '(prefers-reduced-transparency: reduce)',
    '(prefers-contrast: more)',
    '(forced-colors: active)',
  ],
  // SVG refraction is only worth its cost with a fine pointer (a desktop).
  refractQuery: '(hover: hover) and (pointer: fine)',
}

/** @returns {'dark'|'light'} the stored choice, else the OS preference. */
export function readTheme(cfg) {
  var saved = null
  try {
    saved = window.localStorage.getItem(cfg.themeKey)
  } catch (e) {}
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Puts `theme` on <html> and points every <meta name="theme-color"> at the same palette. */
export function applyTheme(theme, cfg) {
  var dark = theme === 'dark'
  document.documentElement.classList.toggle('dark', dark)
  var metas = document.querySelectorAll('meta[name="theme-color"]')
  for (var i = 0; i < metas.length; i++) {
    metas[i].setAttribute('content', dark ? cfg.themeColor.dark : cfg.themeColor.light)
  }
}

/**
 * Picks the glass tier for this device.
 *
 * SVG refraction inside backdrop-filter cannot be feature-detected: Firefox and Safari
 * parse `backdrop-filter: url(#x)` (so CSS.supports says yes) and then drop it. It is
 * therefore gated on the Chromium engine (UA Client Hints, which Firefox, Safari and every
 * iOS browser lack), a fine pointer and a device that is not low-end.
 *
 * `pref` is the in-site preference ('solid' | 'frost' | null). Leave it undefined to
 * read it from localStorage, which is what the pre-paint script does.
 *
 * @returns {'refract'|'frost'|'solid'}
 */
export function computeGlassMode(cfg, pref) {
  if (pref === undefined) {
    pref = null
    try {
      pref = window.localStorage.getItem(cfg.glassKey)
    } catch (e) {}
  }
  if (pref === 'solid') return 'solid'
  for (var i = 0; i < cfg.solidQueries.length; i++) {
    if (window.matchMedia(cfg.solidQueries[i]).matches) return 'solid'
  }
  var css = window.CSS
  if (!(css && css.supports && css.supports('(backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))'))) {
    return 'solid'
  }
  if (pref === 'frost') return 'frost'
  var nav = window.navigator
  var brands = (nav.userAgentData && nav.userAgentData.brands) || []
  var chromium = false
  for (var j = 0; j < brands.length; j++) if (brands[j].brand === 'Chromium') chromium = true
  var lowEnd = nav.deviceMemory < 4 || nav.hardwareConcurrency < 4
  return chromium && !lowEnd && window.matchMedia(cfg.refractQuery).matches ? 'refract' : 'frost'
}

/**
 * The inline <head> script. Called by the Vite plugin in vite.config.js, never in the
 * browser. Each function is bound to a local variable rather than called by its declared
 * name, so the script keeps working even if a bundler renames the declarations.
 */
export function prepaintScript(cfg = PREPAINT_CONFIG) {
  return `(function (cfg) {
  var readTheme = ${readTheme.toString()};
  var applyTheme = ${applyTheme.toString()};
  var computeGlassMode = ${computeGlassMode.toString()};
  var root = document.documentElement;
  try { applyTheme(readTheme(cfg), cfg); } catch (e) {}
  try { root.setAttribute('data-glass', computeGlassMode(cfg)); } catch (e) { root.setAttribute('data-glass', 'frost'); }
})(${JSON.stringify(cfg)});`
}
