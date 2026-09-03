import { useEffect, useRef } from 'react'
import { Bot, Gauge, LayoutDashboard, Network, ArrowUpRight, ArrowRight } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { accentFor } from '../lib/accent'
import { services, servicesCta, profile } from '../data/profile'

const ICONS = { Gauge, LayoutDashboard, Network, Bot }

/**
 * Moves the light under the plate.
 *
 * The blob is a fixed-size, pre-rasterised circle shifted with translate3d, so a
 * pointer move is a compositor transform rather than a repaint of the whole layer.
 * --mx/--my are written on the childless glow node so style invalidation touches one
 * element instead of the section's entire subtree, and the single layout read is
 * inside the rAF callback — at most once per frame, never once per pointermove.
 */
function useSpotlight() {
  const plateRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const plate = plateRef.current
    const glow = glowRef.current
    if (!plate || !glow) return

    // Both queries are subscribed rather than sampled once: a tablet visitor can
    // attach a mouse, and an OS motion preference can be toggled, mid-session. The
    // CSS side of this gate is live, so sampling once would let the two disagree
    // for the rest of the session.
    const canHover = window.matchMedia('(hover: hover)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let frame = 0
    let cx = 0
    let cy = 0
    let tracking = false

    const paint = () => {
      frame = 0
      const rect = plate.getBoundingClientRect()
      glow.style.setProperty('--mx', `${cx - rect.left}px`)
      glow.style.setProperty('--my', `${cy - rect.top}px`)
      // Only once a real pointer sample has landed is the light allowed to show,
      // so it can never bloom at the plate's top-left from an unset --mx/--my.
      plate.dataset.lit = '1'
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (event) => {
      cx = event.clientX
      cy = event.clientY
      schedule()
    }

    // The plate slides under a stationary cursor as the page scrolls, so the cached
    // viewport point has to be re-projected or the light drifts off the pointer.
    const onReframe = () => {
      if (plate.dataset.lit === '1') schedule()
    }

    const detach = () => {
      plate.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onReframe)
      window.removeEventListener('resize', onReframe)
    }

    const sync = () => {
      const wanted = canHover.matches && !reduced.matches
      if (wanted === tracking) return
      tracking = wanted
      if (wanted) {
        plate.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('scroll', onReframe, { passive: true })
        window.addEventListener('resize', onReframe, { passive: true })
      } else {
        detach()
        delete plate.dataset.lit
      }
    }

    sync()
    canHover.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      canHover.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      detach()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { plateRef, glowRef }
}

function ServiceCell({ service, index, total }) {
  const Icon = ICONS[service.icon] ?? LayoutDashboard

  return (
    <article
      className="svc-cell"
      style={{ '--i': String(index), '--accent': accentFor(index, total) }}
    >
      <div className="svc-head">
        <span className="svc-tile">
          <Icon size={19} strokeWidth={1.9} />
        </span>
        {service.flag && <span className="svc-flag">{service.flag}</span>}
        <span aria-hidden="true" className="svc-head__line" />
      </div>

      <h3 className="mt-4 text-[17px] leading-snug font-semibold">{service.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--accent)' }}>
        {service.tagline}
      </p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{service.pitch}</p>

      <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--accent)' }}>
          Best for
        </span>
        <span className="mt-1 block">{service.bestFor}</span>
      </p>

      <ul className="svc-ledger">
        {service.deliverables.map((item, j) => (
          <li key={item} style={{ '--j': String(j) }}>
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {service.stack.map((tech) => (
          <li key={tech} className="svc-chip">
            {tech}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">{service.proof}</p>

      <a href="#projects" className="svc-proof mt-3 font-mono text-[11.5px]">
        See the build
        <ArrowUpRight size={13} className="shrink-0" aria-hidden="true" />
        <span className="sr-only"> — the projects behind {service.title}</span>
      </a>
    </article>
  )
}

export default function Services() {
  const { plateRef, glowRef } = useSpotlight()

  return (
    <Section
      id="services"
      eyebrow="Services"
      title={
        <>
          What I can <span className="gradient-text">build for you</span>
        </>
      }
      lead="Four kinds of work I take on — websites, custom applications, APIs and AI features. Each one is grounded in something I have already built, not a service line invented for this page."
    >
      <Reveal>
        <div ref={plateRef} className="svc-plate">
          {/* The light lives under the cell faces: soft across each face, full
              strength through the seams, where there is never any text. */}
          <div ref={glowRef} aria-hidden="true" className="svc-glow">
            <span className="svc-glow__blob" />
          </div>

          <div className="svc-grid">
            {services.map((service, i) => (
              <ServiceCell key={service.id} service={service} index={i} total={services.length} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent(servicesCta.mailSubject)}&body=${encodeURIComponent(servicesCta.mailBody)}`}
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl surface card-glow p-6 transition-colors hover:bg-[var(--card-hover)] sm:mt-5"
        >
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold">{servicesCta.headline}</span>
            <span className="mt-1 block max-w-xl text-[13px] leading-relaxed text-muted">
              {servicesCta.sub}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform group-hover:-translate-y-0.5">
            {servicesCta.buttonLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </Reveal>
    </Section>
  )
}
