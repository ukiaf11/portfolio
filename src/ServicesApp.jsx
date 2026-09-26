import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  MessagesSquare,
  Scissors,
  Smartphone,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import Background from './components/Background'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WebsiteTypes from './components/WebsiteTypes'
import Services from './components/Services'
import LiquidGlass from './components/glass/LiquidGlass'
import { liveSites, profile, servicesPage } from './data/profile'

/**
 * The glyph on each live site's app-icon tile. The same glyphs as the home page's Work
 * section, so a site is recognisable across both pages. Presentation only.
 */
const SITE_ICONS = {
  'mobile-accessories': Smartphone,
  'hotel-express': UtensilsCrossed,
  saloon: Scissors,
  'omni-panel': MessagesSquare,
  'ai-content-optimizer': Sparkles,
}

/**
 * "Websites, and the software behind them" -> ["Websites, and the ", "software behind them"]:
 * the clause after "and (the)" carries the accent. Falls back to no accent if the copy
 * in profile.js stops having that shape.
 */
function splitHeadline(text) {
  const m = /^(.+?,\s+and\s+(?:the\s+)?)(\S.*)$/.exec(text)
  return m ? [m[1], m[2]] : [text, null]
}

/**
 * Proof, not a second Work section: the live sites as a Settings-style grouped list of
 * links (tile, name, category), one frost widget. Screenshots and write-ups stay on the
 * home page, which the footer link points to.
 */
function LiveProof() {
  return (
    <LiquidGlass as="div" tier="frost" role="group" aria-labelledby="svc-live-title" className="svc-live">
      <div className="svc-live__head">
        <span className="tile tile--sm" style={{ '--tile': 'var(--sys-green)' }} aria-hidden="true">
          <Globe size={15} strokeWidth={2.2} />
        </span>
        <p id="svc-live-title" className="svc-live__title">
          Live in production
        </p>
        <span className="chip chip--live svc-live__count">{liveSites.length} sites</span>
      </div>

      <ul className="svc-live__list inset">
        {liveSites.map((site) => {
          const Icon = SITE_ICONS[site.id] ?? AppWindow
          return (
            <li key={site.id}>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="svc-live__link">
                <span className="tile tile--sm" style={{ '--tile': site.accent }} aria-hidden="true">
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <span className="svc-live__text">
                  <span className="svc-live__name">{site.name}</span>
                  <span className="svc-live__cat">{site.category}</span>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight className="svc-live__arrow" size={17} strokeWidth={2.3} aria-hidden="true" />
              </a>
            </li>
          )
        })}
      </ul>

      <a href="/#work" className="svc-live__more">
        Screenshots and details
        <ArrowRight size={15} strokeWidth={2.3} aria-hidden="true" />
      </a>
    </LiquidGlass>
  )
}

/**
 * The standalone /services/ page.
 *
 * A real second HTML entry (see vite.config.js), not a client-side route: it gets its
 * own <title>, meta description and canonical URL, and neither page ships the other's
 * JavaScript. `Nav standalone` makes the section links point back at the home page.
 *
 * Glass in the page header: the live-sites widget (frost). The buttons are faux, and
 * the page's refract budget (nav capsule and theme toggle) is already spent.
 */
export default function ServicesApp() {
  const [headLead, headAccent] = splitHeadline(servicesPage.h1)

  return (
    <>
      <Background />
      <Nav standalone current="services" />

      <main id="main">
        <header className="svc-hero" aria-labelledby="svc-hero-title">
          <div className="svc-hero__grid">
            <div className="svc-hero__copy">
              <LiquidGlass as="a" href="/" tier="faux" interactive className="btn btn-sm glass-capsule svc-hero__back">
                <ArrowLeft size={16} strokeWidth={2.3} aria-hidden="true" />
                Back to the portfolio
              </LiquidGlass>

              <h1 id="svc-hero-title" className="svc-hero__title">
                {headLead}
                {headAccent && <span className="svc-accent-text">{headAccent}</span>}
              </h1>

              <p className="svc-hero__intro">{servicesPage.intro}</p>

              <div className="svc-hero__actions">
                <LiquidGlass
                  as="a"
                  href="#services"
                  tier="faux"
                  variant="prominent"
                  interactive
                  className="btn btn-lg glass-capsule"
                >
                  <Sparkles size={17} strokeWidth={2.1} aria-hidden="true" />
                  What I take on
                </LiquidGlass>
                <LiquidGlass
                  as="a"
                  href={`mailto:${profile.email}`}
                  tier="faux"
                  interactive
                  className="btn btn-lg glass-capsule"
                >
                  <Mail size={17} strokeWidth={2} aria-hidden="true" />
                  Start a conversation
                </LiquidGlass>
              </div>
            </div>

            <LiveProof />
          </div>
        </header>

        <WebsiteTypes />
        <Services />
      </main>

      <Footer />
    </>
  )
}
