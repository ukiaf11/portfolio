import {
  ArrowUpRight,
  Building2,
  Check,
  Globe,
  Info,
  Lock,
  MessagesSquare,
  Scissors,
  Smartphone,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { liveSites, liveSitesIntro } from '../data/profile'

/**
 * Presentation-only details per site, keyed by `liveSites[].id`. Nothing here is a claim:
 *  icon          the glyph on the site's app-icon tile (tinted with the site's own accent)
 *  dark          the desktop screenshot is dark, so in light theme the text card that
 *                overlaps it takes a higher tint (no grey smear where it crosses the shot)
 *  noteIcon      the glyph beside the site's note
 *  shows         what each screenshot actually shows, for the alt text
 *  desktopWidth  the real pixel width of `images.desktop` when it is not 1280. Omni Panel's
 *                (omni-panel-1152.webp) is a native-resolution 1152x720 crop of the
 *                1440x900 capture, centred on the sign-in card with equal room above and
 *                below (never upscaled), so its srcset descriptor has to say so.
 */
const SITE_UI = {
  'mobile-accessories': { icon: Smartphone },
  'hotel-express': { icon: UtensilsCrossed, dark: true },
  saloon: { icon: Scissors },
  'omni-panel': {
    icon: MessagesSquare,
    dark: true,
    noteIcon: Lock,
    shows: { desktop: 'sign-in screen', phone: 'sign-up screen' },
    desktopWidth: 1152,
  },
  'ai-content-optimizer': {
    icon: Sparkles,
    dark: true,
    shows: { desktop: 'new-analysis form', phone: 'dashboard' },
  },
}
const uiOf = (id) => SITE_UI[id] ?? {}

const hostOf = (url) => {
  try {
    const u = new URL(url)
    return u.host + (u.pathname === '/' ? '' : u.pathname.replace(/\/$/, ''))
  } catch {
    return url
  }
}

const pad = (n) => String(n).padStart(2, '0')

/**
 * A mouse-only duplicate of the case's one real link ("Visit live site"): it makes the
 * screenshot and the title clickable without adding a tab stop or a second link to the
 * accessibility tree. It is an empty overlay, so the heading text and the image alt stay
 * readable.
 */
function HitArea({ site, className }) {
  return (
    <a
      className={className}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}

/**
 * The index row: one capsule per site, each jumping to its case. The ordinal matches the
 * case card's "01 / 05"; it is visual only (the ordered list already gives the position).
 */
function SiteIndex() {
  return (
    <Reveal as="nav" aria-label="Live sites" className="work-index">
      <ol className="work-index__list">
        {liveSites.map((site, i) => (
          <li key={site.id}>
            <a
              href={`#work-${site.id}`}
              className="work-index__link glass glass-capsule glass-interactive"
              style={{ '--site': site.accent }}
            >
              <span className="work-index__dot" aria-hidden="true" />
              <span className="work-index__no" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span className="work-index__name">{site.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

/**
 * The media stage: the desktop screenshot in a minimal Tahoe window (a faux-glass frame
 * with traffic lights, and the hostname in a clear+dim capsule on the title strip), plus
 * the phone capture in a glass bezel hanging off the window's outer lower corner. The
 * capsule lives on the strip, above the screenshot, so the phone can never cover it.
 *
 * Reveal rules: the capsule blurs its backdrop, so nothing that wraps it may carry
 * opacity. The frame, lights, glow, screenshot and phone are siblings that each fade on
 * their own (.reveal-fade); the wrapper only moves.
 */
function Stage({ site }) {
  const { images } = site
  const ui = uiOf(site.id)
  const shows = ui.shows ?? {}
  const host = hostOf(site.url)
  return (
    <div className="work-stage">
      <span className="work-stage__glow reveal-fade" aria-hidden="true" />
      <div className="work-window">
        <span className="work-window__frame glass reveal-fade" aria-hidden="true" />
        <div className="work-window__bar" aria-hidden="true">
          <span className="work-window__lights reveal-fade">
            <i />
            <i />
            <i />
          </span>
          <span className="work-address glass-clear glass-dim">
            <span className="work-address__live">Live</span>
            <Lock size={11} strokeWidth={2.6} />
            <span className="work-address__host">{host}</span>
          </span>
        </div>
        <img
          className="work-window__shot reveal-fade"
          src={images.desktopSmall}
          srcSet={`${images.desktopSmall} 640w, ${images.desktop} ${ui.desktopWidth ?? 1280}w`}
          sizes="(min-width: 1280px) 790px, (min-width: 1024px) 62vw, calc(100vw - 48px)"
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
          alt={`${site.name} ${shows.desktop ?? 'home page'} on a desktop browser`}
        />
      </div>

      {images.mobile && (
        <div className="work-phone reveal-fade">
          <img
            src={images.mobile}
            width="390"
            height="844"
            loading="lazy"
            decoding="async"
            alt={`${site.name} ${shows.phone ?? 'home page'} on a phone`}
          />
          <HitArea site={site} className="work-phone__hit" />
        </div>
      )}

      <HitArea site={site} className="work-stage__hit" />
    </div>
  )
}

/** The pitch: who it is for, what it does, and the one real link. */
function Card({ site, index, total, titleId }) {
  const ui = uiOf(site.id)
  const Icon = ui.icon ?? Globe
  const NoteIcon = ui.noteIcon ?? Info
  const host = hostOf(site.url)
  return (
    <LiquidGlass tier="frost" variant="legible" className="work-card">
      <div className="work-card__head">
        <span className="tile tile--lg" style={{ '--tile': site.accent }} aria-hidden="true">
          <Icon size={22} strokeWidth={2.1} />
        </span>
        <span className="work-card__no" aria-hidden="true">
          {pad(index + 1)}
          <span> / {pad(total)}</span>
        </span>
      </div>

      <h3 id={titleId} className="work-card__name">
        <span className="work-card__name-text">
          {site.name}
          <ArrowUpRight className="work-card__name-arrow" size={20} strokeWidth={2.4} aria-hidden="true" />
          <HitArea site={site} className="work-card__name-hit" />
        </span>
      </h3>

      <ul className="work-card__meta">
        <li className="chip chip--accent">{site.category}</li>
        {site.context && (
          <li className="chip work-card__context">
            <Building2 size={13} strokeWidth={2.2} aria-hidden="true" />
            Built at {site.context}
          </li>
        )}
      </ul>

      <p className="work-card__tagline">{site.tagline}</p>
      <p className="work-card__summary">{site.summary}</p>

      {site.note && (
        <p className="work-card__note inset">
          <NoteIcon size={15} strokeWidth={2.3} aria-hidden="true" />
          <span>{site.note}</span>
        </p>
      )}

      <div className="work-card__actions">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn glass glass-prominent glass-capsule glass-interactive"
        >
          Visit live site
          <span className="sr-only">: {site.name} (opens in a new tab)</span>
          <ArrowUpRight size={17} strokeWidth={2.3} aria-hidden="true" />
        </a>
        <span className="work-card__host">
          <Globe size={14} strokeWidth={2.2} aria-hidden="true" />
          <span>{host}</span>
        </span>
      </div>
    </LiquidGlass>
  )
}

/** The spec strip: what it does and what it is built with. Type on the wallpaper, no glass. */
function Specs({ site }) {
  return (
    <div className="work-specs">
      <div className="work-specs__group work-specs__group--features">
        <h4 className="work-specs__label">Highlights</h4>
        <ul className="work-specs__features">
          {site.features.map((f) => (
            <li key={f}>
              <Check size={15} strokeWidth={2.6} aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="work-specs__group work-specs__group--stack">
        <h4 className="work-specs__label">Built with</h4>
        <ul className="work-specs__stack">
          {site.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * One case. The DOM reads pitch, pictures, specs (so the heading leads and the one link
 * comes early); CSS places the pictures first on phones and beside the card on desktop.
 */
function WorkItem({ site, index, total }) {
  const flip = index % 2 === 1
  const ui = uiOf(site.id)
  const titleId = `work-${site.id}-title`
  return (
    <li
      id={`work-${site.id}`}
      className={['work-item', flip && 'work-item--flip', ui.dark && 'work-item--dark'].filter(Boolean).join(' ')}
      style={{ '--site': site.accent }}
    >
      <article className="work-case" aria-labelledby={titleId}>
        <Reveal className="work-case__card" delay={120}>
          <Card site={site} index={index} total={total} titleId={titleId} />
        </Reveal>
        <Reveal className="work-case__media">
          <Stage site={site} />
        </Reveal>
        <Reveal className="work-case__specs" delay={180}>
          <Specs site={site} />
        </Reveal>
      </article>
    </li>
  )
}

export default function LiveWork() {
  return (
    <Section
      id="work"
      className="work"
      eyebrow={liveSitesIntro.eyebrow}
      title={liveSitesIntro.title}
      lead={liveSitesIntro.lead}
    >
      <SiteIndex />
      <ol className="work-list">
        {liveSites.map((site, i) => (
          <WorkItem key={site.id} site={site} index={i} total={liveSites.length} />
        ))}
      </ol>
    </Section>
  )
}
