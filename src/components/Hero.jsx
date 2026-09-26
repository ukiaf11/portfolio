import { useEffect, useRef } from 'react'
import { ArrowRight, Briefcase, Github, Mail, MapPin, Phone } from 'lucide-react'
import LiquidGlass from './glass/LiquidGlass'
import { useIsDark } from '../lib/theme'
import { experience, highlights, liveSites, profile } from '../data/profile'

/**
 * The depth stage's two decorative captures: a desktop window and a phone, both real
 * live sites, sitting BEHIND the frosted widgets so the glass has real content to pick
 * up. The same two sites swap roles with the theme, so the big window always matches the
 * wallpaper (a dark, warm Hotel Express window at night; the lilac Mobile Accessories
 * window by day) and the phone in front of it contrasts. A theme switch loads the other
 * pair then, never both up front.
 */
const bySite = (id, i) => liveSites.find((s) => s.id === id) ?? liveSites[i] ?? liveSites[0]
const STAGE = {
  dark: { window: bySite('hotel-express', 1), phone: bySite('mobile-accessories', 0) },
  light: { window: bySite('mobile-accessories', 0), phone: bySite('hotel-express', 1) },
}

/**
 * A very small pointer parallax for the stage's back planes (fine pointers only, never
 * under reduced motion). It writes two numbers, --px and --py in -1..1, onto the stage;
 * CSS turns them into a few pixels of travel per plane with a long ease, so the content
 * glides under the still, frosted widgets. Nothing runs while the pointer is still, and
 * nothing is listened to while the stage is off screen.
 */
function useStageParallax(ref) {
  useEffect(() => {
    const stage = ref.current
    if (!stage || typeof matchMedia !== 'function') return
    const ok = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let raf = 0
    let listening = false
    let inView = false

    const move = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const x = Math.max(-1, Math.min(1, (e.clientX / innerWidth) * 2 - 1))
        const y = Math.max(-1, Math.min(1, (e.clientY / innerHeight) * 2 - 1))
        stage.style.setProperty('--px', x.toFixed(3))
        stage.style.setProperty('--py', y.toFixed(3))
      })
    }
    const sync = () => {
      const want = ok.matches && inView
      if (want && !listening) addEventListener('pointermove', move, { passive: true })
      if (!want && listening) removeEventListener('pointermove', move)
      listening = want
      if (!ok.matches) {
        stage.style.removeProperty('--px')
        stage.style.removeProperty('--py')
      }
    }
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    io.observe(stage)
    ok.addEventListener?.('change', sync)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ok.removeEventListener?.('change', sync)
      removeEventListener('pointermove', move)
    }
  }, [ref])
}

export default function Hero() {
  const job = experience.find((j) => j.current) ?? experience[0]
  const [first, ...rest] = profile.name.split(' ')
  const [leadRole, ...otherRoles] = profile.roles
  const stageRef = useRef(null)
  useStageParallax(stageRef)
  const { window: windowSite, phone: phoneSite } = STAGE[useIsDark() ? 'dark' : 'light']

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="chip chip--live hero__status">Available for opportunities</p>

          {/* One text block (inline spans + <br>), not two block spans: it keeps the name
              the page's largest contentful paint, ahead of the stage's screenshots. */}
          <h1 id="hero-title" className="display hero__title">
            <span>{first}</span> <br />
            <span className="hero__title-2">{rest.join(' ')}</span>
          </h1>

          {/* Static, not rotating: every role is on screen at once (WCAG 2.2.2). */}
          <ul className="hero__roles" aria-label="Roles">
            <li className="hero__role hero__role--lead">{leadRole}</li>
            {otherRoles.map((r) => (
              <li key={r} className="hero__role">
                {r}
              </li>
            ))}
          </ul>

          <p className="hero__lead">
            I build <strong>scalable microservices</strong>, complex{' '}
            <strong>multi-tenant SaaS architectures</strong> and <strong>AI-integrated products</strong>:
            robust Django backends paired with dynamic React frontends.
          </p>

          <div className="hero__actions">
            <LiquidGlass
              as="a"
              href="#work"
              tier="refract"
              variant="prominent"
              radius={999}
              bezel={16}
              thickness={10}
              blur={2}
              tone="saturate(160%) brightness(0.9)"
              interactive
              className="btn btn-lg glass-capsule"
            >
              View my work
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </LiquidGlass>
            <LiquidGlass
              as="a"
              href={`mailto:${profile.email}`}
              tier="faux"
              interactive
              className="btn btn-lg glass-capsule"
            >
              <Mail size={17} strokeWidth={2} aria-hidden="true" />
              Get in touch
            </LiquidGlass>
            <LiquidGlass
              as="a"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              tier="faux"
              interactive
              aria-label="GitHub profile (opens in a new tab)"
              className="btn btn-lg btn-icon glass-capsule"
            >
              <Github size={19} strokeWidth={2} aria-hidden="true" />
            </LiquidGlass>
          </div>

          <ul className="hero__meta" aria-label="Contact details">
            <li>
              <MapPin size={15} aria-hidden="true" />
              {profile.location}
            </li>
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

        {/* The depth stage. Back planes: a live site's desktop window and its phone
            capture (decorative duplicates of the Work section, so alt=""). Front: two
            frosted widgets in the legible variant, because they overlap screenshots.
            Frost count here: the two widgets (the CTA above is the one refract). */}
        <div ref={stageRef} className="hero-stage" style={{ '--site': windowSite.accent }}>
          <LiquidGlass
            as="a"
            href="#work"
            tier="faux"
            variant="strong"
            interactive
            className="hero-stage__live glass-capsule"
          >
            <span className="hero-stage__dot" aria-hidden="true" />
            {liveSites.length} sites live in production
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </LiquidGlass>

          <div className="hero-stage__window" aria-hidden="true">
            <img
              src={windowSite.images.desktopSmall}
              width="640"
              height="400"
              alt=""
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </div>

          <div className="hero-stage__phone" aria-hidden="true">
            <img
              src={phoneSite.images.mobile}
              width="390"
              height="844"
              alt=""
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </div>

          <div className="hero-stage__widgets">
            <LiquidGlass
              as="div"
              tier="frost"
              variant="legible"
              role="group"
              aria-labelledby="hero-now"
              className="widget widget--now"
            >
              <div className="widget__head">
                <span className="tile tile--sm" style={{ '--tile': 'var(--sys-green)' }} aria-hidden="true">
                  <Briefcase size={15} strokeWidth={2.2} />
                </span>
                <p id="hero-now" className="widget__kicker">
                  Now
                </p>
                <span className="chip chip--live widget__live">Present</span>
              </div>
              <p className="widget__title">{job.title}</p>
              <p className="widget__sub">{job.company}</p>
              <p className="widget__meta">Since {job.period.split('—')[0].trim()}</p>
            </LiquidGlass>

            <LiquidGlass
              as="div"
              tier="frost"
              variant="legible"
              role="group"
              aria-label="At a glance"
              className="widget widget--stats"
            >
              <dl className="stats">
                {highlights.map((h) => (
                  <div key={h.label} className="stat inset">
                    <dt className="stat__label">{h.label}</dt>
                    <dd className="stat__value">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </section>
  )
}
