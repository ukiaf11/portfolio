import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, Download } from 'lucide-react'
import { navLinks, pageSections, profile } from '../data/profile'

/**
 * Shared across both entry points.
 *
 * `standalone` means this is rendering on a page that is NOT the home page, so the
 * section entries have to point back at it (`/#about`, not `#about`) and there is no
 * scroll-spy to run — the active item is the page link for the current page instead.
 */
export default function Nav({ standalone = false, current = null }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(standalone ? current : 'about')
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: the section closest to the top band of the viewport wins.
  useEffect(() => {
    if (standalone) return
    const sections = pageSections
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [standalone])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // A page entry keeps its own href; a section entry has to reach back to the home
  // page when we are not on it.
  const hrefFor = (link) =>
    link.page ? link.href : standalone ? `/#${link.id}` : `#${link.id}`

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      <a
        href={standalone ? '#main' : '#about'}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2.5' : 'py-4 sm:py-5'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled ? 'surface shadow-lg shadow-black/5 mx-3 sm:mx-auto' : 'border border-transparent'
          }`}
        >
          <a
            href={standalone ? '/' : '#top'}
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-teal-400 text-[13px] font-bold text-ink-900">
              UK
            </span>
            <span className="hidden sm:inline">
              upendra<span className="text-brand-400">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={hrefFor(link)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active === link.id
                      ? 'text-brand-400'
                      : 'text-muted hover:text-[var(--fg)]'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid h-9 w-9 place-items-center rounded-lg border transition-colors hover:bg-[var(--card-hover)]"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href={profile.resume}
              download
              className="hidden items-center gap-2 rounded-lg bg-[var(--fg)] px-3.5 py-2 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5 sm:flex"
            >
              <Download size={15} />
              Résumé
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border transition-colors hover:bg-[var(--card-hover)] lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-3 top-20 rounded-2xl p-3 transition-all duration-300 ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
          }`}
          style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)' }}
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={hrefFor(link)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[15px] transition-colors hover:bg-[var(--card-hover)] ${
                    active === link.id ? 'text-brand-400' : ''
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            download
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--fg)] px-4 py-3 text-sm font-medium text-[var(--bg)]"
          >
            <Download size={15} />
            Download Résumé
          </a>
        </div>
      </div>
    </>
  )
}
