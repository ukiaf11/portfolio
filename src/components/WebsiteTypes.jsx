import {
  ArrowUpRight,
  Building2,
  ConciergeBell,
  MousePointerClick,
  PanelsTopLeft,
  ShoppingBag,
  SquareUserRound,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import SiteMockup from './SiteMockup'
import { liveSites, websiteTypes, websiteTypesIntro } from '../data/profile'

const ICONS = {
  Building2, ShoppingBag, MousePointerClick, ConciergeBell, PanelsTopLeft, SquareUserRound,
}

/**
 * Presentation only, keyed by `websiteTypes[].id`: the system colour of each type's
 * app-icon tile. The same hue colours the few clickable-looking parts of its sketch
 * (buttons, prices, chart data), so a tile and its drawing read as one object and
 * the six stay easy to tell apart. Decorative on both counts: it never carries text.
 */
const HUES = {
  'business-site': 'var(--sys-blue)',
  'online-shop': 'var(--sys-green)',
  'landing-page': 'var(--sys-pink)',
  'booking-site': 'var(--sys-orange)',
  'customer-portal': 'var(--sys-teal)',
  'portfolio-site': 'var(--sys-purple)',
}
const SPARE_HUES = ['var(--sys-indigo)', 'var(--sys-blue)', 'var(--sys-green)', 'var(--sys-orange)']

const SITES = new Map(liveSites.map((site) => [site.id, site]))

/** The live sites a type links to, looked up by id; an unknown id is dropped (and flagged in dev). */
function examplesOf(type) {
  return (type.examples ?? []).flatMap((id) => {
    const site = SITES.get(id)
    if (!site && import.meta.env?.DEV) console.warn(`WebsiteTypes: "${type.id}" lists unknown live site "${id}"`)
    return site ? [site] : []
  })
}

const noteId = (type, site) => `wt-note-${type.id}-${site.id}`

/**
 * One type: the specimen (a sketch in a faux-glass window), then its label on bare
 * ground. From 640px each item is a subgrid of the list's rows, so the names, the
 * "Best for" lines, the chips and the live links line up across a row however long
 * each blurb runs.
 */
function TypeItem({ type, index }) {
  const Icon = ICONS[type.icon] ?? Building2
  const hue = HUES[type.id] ?? SPARE_HUES[index % SPARE_HUES.length]
  const examples = examplesOf(type)

  return (
    <Reveal as="li" delay={(index % 3) * 90} className="wt-item" style={{ '--wt-hue': hue }}>
      <SiteMockup preview={type.preview} />

      <h3 className="wt-name">
        <span className="tile wt-name__tile" aria-hidden="true">
          <Icon size={17} strokeWidth={2.2} />
        </span>
        {type.name}
      </h3>

      <p className="wt-blurb">{type.blurb}</p>

      <p className="wt-best">
        <span className="wt-label">Best for</span>
        <span className="wt-best__text">{type.bestFor}</span>
      </p>

      <ul className="wt-marks" aria-label={`${type.name} highlights`}>
        {type.highlights.map((mark) => (
          <li key={mark} className="chip">
            {mark}
          </li>
        ))}
      </ul>

      {examples.length > 0 && (
        <div className="wt-live">
          {/* The label is spoken as part of each link's name instead (see below). */}
          <p className="wt-label" aria-hidden="true">
            {examples.length > 1 ? 'Live examples' : 'Live example'}
          </p>
          <ul className="wt-live__list">
            {examples.map((site) => (
              <li key={site.id}>
                <LiquidGlass
                  as="a"
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tier="faux"
                  interactive
                  className="btn btn-sm glass-capsule wt-live__link"
                  style={{ '--site': site.accent }}
                  aria-describedby={site.note ? noteId(type, site) : undefined}
                >
                  <span className="wt-live__dot" aria-hidden="true" />
                  <span className="sr-only">See a live example: </span>
                  {site.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight className="wt-live__arrow" size={16} strokeWidth={2.4} aria-hidden="true" />
                </LiquidGlass>
              </li>
            ))}
          </ul>
          {/* The caveat a visitor should know before clicking (a sign-in wall, demo
              data), from liveSites[].note; each link points at its own. */}
          {examples.some((site) => site.note) && (
            <div className="wt-live__notes">
              {examples.filter((site) => site.note).map((site) => (
                <p key={site.id} id={noteId(type, site)} className="wt-live__note">
                  {examples.length > 1 && <span className="wt-live__note-site">{site.name}: </span>}
                  {site.note}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </Reveal>
  )
}

export default function WebsiteTypes() {
  return (
    <Section
      id="website-types"
      className="wt"
      numbered={false}
      eyebrow={websiteTypesIntro.eyebrow}
      title={websiteTypesIntro.title}
      lead={websiteTypesIntro.lead}
    >
      <ul className="wt-grid">
        {websiteTypes.map((type, i) => (
          <TypeItem key={type.id} type={type} index={i} />
        ))}
      </ul>
    </Section>
  )
}
