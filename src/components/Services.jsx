import { useEffect, useRef } from 'react'
import { ArrowRight, Bot, Check, Gauge, LayoutDashboard, Mail, MessagesSquare, Network, Phone } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { accentFor, tileFor } from '../lib/accent'
import { services, servicesCta, servicesIntro, profile } from '../data/profile'

const ICONS = { Gauge, LayoutDashboard, Network, Bot }

const pad = (n) => String(n).padStart(2, '0')

/**
 * Moves the light under the plate.
 *
 * The blob is a fixed-size, pre-rasterised circle shifted with translate3d, so a
 * pointer move is a compositor transform rather than a repaint of the whole layer.
 * --mx/--my are written on the childless glow node so style invalidation touches one
 * element instead of the section's entire subtree, and the single layout read is
 * inside the rAF callback: at most once per frame, never once per pointermove.
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
    // CSS side of this gate is live, so sampling once would let the two disagree.
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
      // Only once a real pointer sample has landed may the light show, so it can
      // never bloom at the plate's top-left from an unset --mx/--my.
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

/**
 * One service = one row of the lattice, split by a seam into two cells:
 *   story  what it is and why it matters (tile, name, tagline, pitch) and the real
 *          project it is grounded in, with the link to that build
 *   spec   who it suits, what you get (an inset grouped list), what it is built with
 * Every colour that varies per row is one step on the accent ramp (lib/accent.js):
 * --svc-tile fills the icon tile, --svc-ink marks the tagline, the checks and the link.
 */
function ServiceRow({ service, index, total }) {
  const Icon = ICONS[service.icon] ?? LayoutDashboard
  const titleId = `service-${service.id}-title`

  return (
    <li
      id={`service-${service.id}`}
      className="bento__cell svc-row"
      style={{ '--svc-ink': accentFor(index, total), '--svc-tile': tileFor(index, total) }}
    >
      <div className="svc-story">
        <div className="svc-head">
          <span className="tile tile--lg svc-tile" aria-hidden="true">
            <Icon size={22} strokeWidth={2.1} />
          </span>
          {service.flag && <span className="chip chip--accent svc-flag">{service.flag}</span>}
          <span className="svc-no" aria-hidden="true">
            {pad(index + 1)}
            <span> / {pad(total)}</span>
          </span>
        </div>

        <h3 id={titleId} className="svc-title">
          {service.title}
        </h3>
        <p className="svc-tagline">{service.tagline}</p>
        <p className="svc-pitch">{service.pitch}</p>

        <div className="svc-proof">
          <h4 className="svc-label">Already built</h4>
          <p className="svc-proof__text">{service.proof}</p>
          {/* The projects live on the home page, so the link is absolute: "#projects"
              does not exist on /services/. */}
          <a href="/#projects" className="svc-proof__link">
            See the build
            <span className="sr-only">: the projects behind {service.title}</span>
            <ArrowRight size={16} strokeWidth={2.3} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="svc-spec">
        <div className="svc-spec__who">
          <h4 className="svc-label">Best for</h4>
          <p className="svc-best">{service.bestFor}</p>
        </div>

        <div className="svc-spec__get">
          <h4 className="svc-label">What you get</h4>
          <ul className="svc-get inset">
            {service.deliverables.map((item) => (
              <li key={item} className="svc-get__row">
                <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="svc-spec__stack">
          <h4 className="svc-label">Built with</h4>
          <ul className="svc-stack">
            {service.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

/** The closing call to action: one frost card, faux buttons inside it (no nesting). */
function ServicesCta() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(servicesCta.mailSubject)}&body=${encodeURIComponent(servicesCta.mailBody)}`

  return (
    <LiquidGlass as="div" tier="frost" role="group" aria-labelledby="svc-cta-title" className="svc-cta">
      <span className="tile tile--lg svc-cta__tile" style={{ '--tile': 'var(--sys-green)' }} aria-hidden="true">
        <MessagesSquare size={22} strokeWidth={2.1} />
      </span>

      <div className="svc-cta__copy">
        <h3 id="svc-cta-title" className="svc-cta__title">
          {servicesCta.headline}
        </h3>
        <p className="svc-cta__sub">{servicesCta.sub}</p>
      </div>

      <div className="svc-cta__actions">
        <LiquidGlass
          as="a"
          href={mailto}
          tier="faux"
          variant="prominent"
          interactive
          className="btn btn-lg glass-capsule svc-cta__btn"
        >
          {servicesCta.buttonLabel}
          <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </LiquidGlass>
        <ul className="svc-cta__meta" aria-label="Or reach me directly">
          <li>
            <a href={`mailto:${profile.email}`}>
              <Mail size={15} aria-hidden="true" />
              {profile.email}
            </a>
          </li>
          <li>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              <Phone size={15} aria-hidden="true" />
              {profile.phone}
            </a>
          </li>
        </ul>
      </div>
    </LiquidGlass>
  )
}

/**
 * The lattice: ONE frosted bento plate, subdivided by hairline seams, with a light that
 * travels underneath it on fine pointers. One filter pass for all four services, and
 * the CTA card is the section's second and last frost surface.
 */
export default function Services() {
  const { plateRef, glowRef } = useSpotlight()

  return (
    <Section
      id="services"
      className="svc"
      numbered={false}
      eyebrow={servicesIntro.eyebrow}
      title={
        <>
          {servicesIntro.titleLead} <span className="svc-accent-text">{servicesIntro.titleAccent}</span>
        </>
      }
      lead={servicesIntro.lead}
    >
      <div className="svc-stackup">
        <Reveal>
          <LiquidGlass as="div" tier="frost" ref={plateRef} className="bento svc-plate">
            {/* The light sits under the cells: a soft wash that follows the pointer. */}
            <div ref={glowRef} aria-hidden="true" className="svc-glow">
              <span className="svc-glow__blob" />
            </div>

            <ol className="bento__grid svc-grid">
              {services.map((service, i) => (
                <ServiceRow key={service.id} service={service} index={i} total={services.length} />
              ))}
            </ol>
          </LiquidGlass>
        </Reveal>

        <Reveal delay={80}>
          <ServicesCta />
        </Reveal>
      </div>
    </Section>
  )
}
