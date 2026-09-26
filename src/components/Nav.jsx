import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Accessibility,
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  Download,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  UserRound,
  X,
} from 'lucide-react'
import Background from './Background'
import LiquidGlass from './glass/LiquidGlass'
import GlassPreference from './glass/GlassPreference'
import { navLinks, pageSections, profile } from '../data/profile'
import { setTheme, useIsDark } from '../lib/theme'

/**
 * The site header and the mobile menu sheet. Shared by both entry points.
 *
 * `standalone` means this renders on a page that is NOT the home page, so the section
 * entries point back at it (`/#about`, not `#about`) and there is no scroll-spy: the
 * active item is the page link for the current page instead.
 *
 * Layout (styles/nav.css)
 *   >= 1024  three floating pieces, like a Tahoe toolbar:
 *            [brand]      [ refracting capsule of links + liquid indicator ]      [theme][Résumé]
 *   <  1024  ONE capsule holding the avatar, the name and a labelled Menu button, with the
 *            theme toggle as a sibling drop:
 *            [ (UK) Upendra Kumar            (≡ Menu) ]  [theme]
 *   The capsule is the SAME refracting element at every width (its contents swap by CSS),
 *   so the page never has more than the three refract surfaces it is budgeted.
 *
 * Budget: the header costs exactly 2 backdrop-filter surfaces (capsule + toggle). The
 * brand and Résumé pills are faux glass with the chrome alpha.
 *
 * Scroll edge: under the controls (and under the sheet) sits a band that repaints the
 * static, fixed wallpaper and fades it out with a mask, so content scrolling up under the
 * toolbar dissolves into the wallpaper instead of running between the capsules. No
 * backdrop-filter, and at the top of the page it is pixel-identical to the wallpaper, so
 * it only shows when content is actually under it (iOS 26's scroll-edge effect, done
 * with one masked layer).
 */

const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

// System-Settings tiles for the sheet rows (decorative), keyed by navLinks id.
const TILES = {
  about: [UserRound, 'var(--sys-blue)'],
  work: [Globe, 'var(--sys-teal)'],
  services: [Sparkles, 'var(--sys-orange)'],
  skills: [Layers, 'var(--sys-purple)'],
  experience: [BriefcaseBusiness, 'var(--sys-indigo)'],
  projects: [Boxes, 'var(--sys-pink)'],
  education: [GraduationCap, 'var(--sys-green)'],
  contact: [Send, 'var(--sys-blue)'],
}
const TILE_FALLBACK = [ChevronRight, 'var(--sys-blue)']

const initials = profile.name
  .split(/\s+/)
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

/**
 * The liquid indicator. Two registered custom properties (--x1, --x2) are the pill's
 * left and right edges, transitioned separately: the edge in the direction of travel
 * leads on a fast, slightly overshooting curve and the other trails behind it, so the
 * pill stretches toward its target and then gathers itself up, like a drop of water.
 */
function useLiquidIndicator(active, listRef, linkRefs) {
  const [box, setBox] = useState(null) // { x1, x2, dir, instant, hidden }
  const prev = useRef(null)
  const blobRef = useRef(null)

  const measure = useCallback(() => {
    const el = active ? linkRefs.current[active] : null
    if (!el || !listRef.current || !el.offsetWidth) {
      prev.current = null
      setBox((b) => (b ? { ...b, hidden: true } : null))
      return
    }
    const x1 = el.offsetLeft
    const x2 = x1 + el.offsetWidth
    const last = prev.current
    const instant = !last // first appearance: place, don't slide in from 0
    const dir = last ? (x1 > last.x1 ? 'right' : x1 < last.x1 ? 'left' : last.dir) : 'right'
    prev.current = { x1, x2, dir }
    setBox({ x1, x2, dir, instant, hidden: false })
  }, [active, listRef, linkRefs])

  useLayoutEffect(measure, [measure])

  // Re-measure when the capsule reflows (fonts landing, breakpoint changes).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    let alive = true
    const ro = new ResizeObserver(() => measure())
    ro.observe(list)
    document.fonts?.ready.then(() => alive && measure()).catch(() => {})
    return () => {
      alive = false
      ro.disconnect()
    }
  }, [listRef, measure])

  // The squish: the drop flattens a little while it travels.
  useEffect(() => {
    if (!box || box.instant || box.hidden || reducedMotion()) return
    blobRef.current?.animate(
      [
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(0.84)', offset: 0.35 },
        { transform: 'scaleY(1.04)', offset: 0.75 },
        { transform: 'scaleY(1)' },
      ],
      { duration: 560, easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)' }
    )
  }, [box])

  return { box, blobRef }
}

export default function Nav({ standalone = false, current = null }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(standalone ? current : null)
  const dark = useIsDark()
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const linkRefs = useRef({})
  const menuBtnRef = useRef(null)
  const sheetRef = useRef(null)
  const { box, blobRef } = useLiquidIndicator(active, listRef, linkRefs)

  // Scroll-spy: the last section whose top has passed a line 30% down the viewport
  // wins. The observer only says WHEN something crossed its band; the answer is then
  // recomputed from scratch, so a fast jump (Home key, anchor link, smooth scroll
  // interrupted mid-way) can never leave a stale item lit. The hero is included, so
  // scrolling back to the top clears the indicator.
  useEffect(() => {
    if (standalone) return
    const targets = [document.getElementById('top'), ...pageSections.map((l) => document.getElementById(l.id))]
      .filter(Boolean)
    if (!targets.length) return
    const pick = () => {
      const line = window.innerHeight * 0.3
      let id = null
      for (const el of targets) if (el.getBoundingClientRect().top <= line) id = el.id
      setActive(id === 'top' ? null : id)
    }
    const io = new IntersectionObserver(pick, { rootMargin: '-25% 0px -65% 0px', threshold: 0 })
    targets.forEach((s) => io.observe(s))
    window.addEventListener('scrollend', pick)
    pick()
    return () => {
      io.disconnect()
      window.removeEventListener('scrollend', pick)
    }
  }, [standalone])

  const close = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) menuBtnRef.current?.focus({ preventScroll: true })
  }, [])

  // Sheet: lock scroll, close on Escape and hand focus back to the Menu button, and move
  // focus into the sheet when it opens. It is a disclosure, not a modal: no focus trap,
  // and it closes if focus wanders out of both the sheet and the header.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
      }
    }
    document.addEventListener('keydown', onKey)
    // Move focus to the first entry. If the panel is not focusable yet this frame (its
    // visibility still settling), retry for a few frames rather than leave focus behind.
    const first = sheetRef.current?.querySelector('a')
    let raf = 0
    let tries = 0
    const focusFirst = () => {
      first?.focus({ preventScroll: true })
      if (!sheetRef.current?.contains(document.activeElement) && ++tries < 6) raf = requestAnimationFrame(focusFirst)
    }
    focusFirst()
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  // Arriving with a hash (e.g. /#about from /services/): the target only exists once
  // React has rendered, after the browser's own fragment scroll gave up.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const el = id && document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
  }, [])

  // Close the sheet if the viewport grows past the breakpoint while it is open.
  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onSheetBlur = (e) => {
    const next = e.relatedTarget
    if (next && !sheetRef.current?.contains(next) && !headerRef.current?.contains(next)) setOpen(false)
  }

  // A page entry keeps its own href; a section entry has to reach back to the home
  // page when we are not on it.
  const hrefFor = (link) => (link.page ? link.href : standalone ? `/#${link.id}` : `#${link.id}`)
  const currentAttr = (link) => (active === link.id ? (link.page ? 'page' : 'true') : undefined)
  // "Services" is a separate page, not a section of this one: a glyph for the eye and a
  // hint for the ear (dropped where it IS the current page).
  const pageHint = (link) =>
    link.page && active !== link.id ? <span className="sr-only"> (separate page)</span> : null

  const homeHref = standalone ? '/' : '#top'
  const toggleTheme = () => setTheme(dark ? 'light' : 'dark')

  const indicatorStyle = box ? { '--x1': `${box.x1}px`, '--x2': `${box.x2}px` } : undefined

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Scroll edge: the wallpaper again, masked to fade out below the controls. */}
      <div className="scroll-edge" aria-hidden="true" data-sheet={open ? '' : undefined}>
        <Background />
      </div>

      <header ref={headerRef} className="site-header">
        <div className="site-header__inner">
          {/* Desktop brand: faux capsule (no backdrop-filter), chrome alpha. */}
          <a href={homeHref} className="brand glass glass-capsule glass-interactive" aria-label={`${profile.name}, home`}>
            <span className="brand__mark" aria-hidden="true">
              {initials}
            </span>
            <span className="brand__name" aria-hidden="true">
              {profile.name}
            </span>
          </a>

          <LiquidGlass
            tier="refract"
            radius={999}
            bezel={21}
            thickness={15}
            blur={1.5}
            className="nav-capsule glass-capsule"
          >
            {/* Phone and tablet: the brand lives inside the capsule. */}
            <a href={homeHref} className="nav-capsule__brand" aria-label={`${profile.name}, home`}>
              <span className="brand__mark" aria-hidden="true">
                {initials}
              </span>
              <span className="nav-capsule__name" aria-hidden="true">
                {profile.name}
              </span>
            </a>

            <nav aria-label="Primary" className="nav-desktop">
              <span
                aria-hidden="true"
                className="nav-indicator"
                data-dir={box?.dir}
                data-instant={box?.instant ? '' : undefined}
                data-hidden={!box || box.hidden ? '' : undefined}
                style={indicatorStyle}
              >
                <span ref={blobRef} className="nav-indicator__blob" />
              </span>
              <ul ref={listRef} className="nav-capsule__list">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      ref={(el) => (linkRefs.current[link.id] = el)}
                      href={hrefFor(link)}
                      aria-current={currentAttr(link)}
                      className="nav-link"
                    >
                      {link.label}
                      {link.page && <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" className="nav-link__glyph" />}
                      {pageHint(link)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="nav-menu"
            >
              <span className="nav-menu__plate">
                <span className="nav-menu__icon" aria-hidden="true">
                  <Menu size={17} strokeWidth={2.2} className="nav-menu__open" />
                  <X size={17} strokeWidth={2.2} className="nav-menu__close" />
                </span>
                {/* Both labels share one grid cell, so the capsule never changes width. */}
                <span className="nav-menu__label">
                  <span data-on={open ? undefined : ''}>Menu</span>
                  <span data-on={open ? '' : undefined}>Close</span>
                </span>
              </span>
            </button>
          </LiquidGlass>

          <div className="nav-actions">
            <LiquidGlass
              as="button"
              type="button"
              tier="refract"
              radius={999}
              bezel={18}
              thickness={12}
              blur={1.5}
              interactive
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="icon-btn glass-capsule"
            >
              <span className="theme-icon" data-dark={dark ? '' : undefined} aria-hidden="true">
                <Sun size={18} strokeWidth={2} className="theme-icon__sun" />
                <Moon size={17} strokeWidth={2} className="theme-icon__moon" />
              </span>
            </LiquidGlass>

            {/* Desktop only (the sheet carries it below 1024). Faux, chrome alpha. */}
            <a href={profile.resume} download className="btn btn-sm resume-btn glass glass-capsule glass-interactive">
              <Download size={16} strokeWidth={2.1} aria-hidden="true" />
              Résumé
            </a>
          </div>
        </div>
      </header>

      {/* Mobile sheet: a frosted panel that grows out of the Menu button. Inert when closed. */}
      <div className={`sheet${open ? ' is-open' : ''}`} inert={open ? undefined : ''}>
        <div className="sheet__scrim" onClick={() => close(true)} aria-hidden="true" />
        <LiquidGlass
          ref={sheetRef}
          id="mobile-menu"
          tier="frost"
          variant="strong"
          className="sheet__panel"
          onBlur={onSheetBlur}
        >
          <div className="sheet__scroll">
            <nav aria-label="Menu">
              <ul className="sheet__group sheet__list">
                {navLinks.map((link) => {
                  const [Icon, tint] = TILES[link.id] ?? TILE_FALLBACK
                  const Trail = link.page ? ArrowUpRight : ChevronRight
                  return (
                    <li key={link.id}>
                      <a
                        href={hrefFor(link)}
                        onClick={() => close(false)}
                        aria-current={currentAttr(link)}
                        className="sheet__link"
                      >
                        <span className="tile tile--sm" style={{ '--tile': tint }} aria-hidden="true">
                          <Icon size={15} strokeWidth={2.2} />
                        </span>
                        <span className="sheet__label">
                          {link.label}
                          {pageHint(link)}
                        </span>
                        <Trail
                          size={link.page ? 16 : 17}
                          strokeWidth={2.2}
                          aria-hidden="true"
                          className="sheet__trail"
                          data-page={link.page ? '' : undefined}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="sheet__group sheet__prefs">
              <span className="tile tile--sm" style={{ '--tile': 'var(--sys-blue)' }} aria-hidden="true">
                <Accessibility size={15} strokeWidth={2.2} />
              </span>
              <GlassPreference className="sheet__pref" />
            </div>

            <div className="sheet__actions">
              <a
                href={profile.resume}
                download
                onClick={() => close(false)}
                className="btn glass glass-prominent glass-capsule glass-interactive"
              >
                <Download size={16} strokeWidth={2.2} aria-hidden="true" />
                Résumé
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => close(false)}
                className="btn glass glass-capsule glass-interactive"
              >
                <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
                Email me
              </a>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </>
  )
}
