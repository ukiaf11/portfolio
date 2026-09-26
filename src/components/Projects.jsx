import { ArrowUpRight, Boxes, Github, MessagesSquare, Repeat, Sprout, Star, UtensilsCrossed } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { projects, profile } from '../data/profile'

/**
 * Projects: the CV case studies. See DESIGN.md and styles/sections/projects.css.
 *
 * Frost budget: two backdrop-filter surfaces for the whole section, whatever the
 * viewport. The featured case is its own wide frost panel; the other four share ONE
 * frost bento, one hairline-divided cell each. The GitHub card is faux (no blur).
 *
 * These are described from the CV and deliberately NOT linked to the live sites in
 * #work: which project runs which site is unconfirmed.
 */

const ICONS = { Boxes, MessagesSquare, UtensilsCrossed, Repeat, Sprout }
/** Decorative app-icon tile colour per project icon. Tiles never carry text. */
const TILES = {
  Boxes: 'var(--sys-blue)',
  MessagesSquare: 'var(--sys-teal)',
  UtensilsCrossed: 'var(--sys-orange)',
  Repeat: 'var(--sys-pink)',
  Sprout: 'var(--sys-green)',
}

const pad = (n) => String(n).padStart(2, '0')
const hostOf = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

function Tile({ icon, size = 'lg' }) {
  const Icon = ICONS[icon] ?? Boxes
  return (
    <span
      className={`tile ${size === 'lg' ? 'tile--lg' : ''}`}
      style={{ '--tile': TILES[icon] ?? 'var(--sys-blue)' }}
      aria-hidden="true"
    >
      <Icon size={size === 'lg' ? 22 : 19} strokeWidth={2.1} />
    </span>
  )
}

/** The big engraved numeral in a card's corner. Drawn from a data attribute in CSS so
 *  it stays out of the accessibility tree and out of the text-contrast measurements. */
const Ordinal = ({ no }) => <span className="projects-ordinal" data-no={pad(no)} aria-hidden="true" />

function Points({ points, two = false }) {
  return (
    <ul className={`projects-points ${two ? 'projects-points--two' : ''}`}>
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  )
}

function Stack({ stack, label = false }) {
  return (
    <>
      <h4 className={label ? 'projects-label' : 'sr-only'}>Built with</h4>
      <ul className="projects-stack">
        {stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>
    </>
  )
}

function FeaturedCase({ project, no }) {
  const titleId = `project-${pad(no)}`
  return (
    <LiquidGlass as="article" tier="frost" className="projects-feature" aria-labelledby={titleId}>
      <Ordinal no={no} />
      <div className="projects-feature__intro">
        <div className="projects-feature__marks">
          <Tile icon={project.icon} />
          <span className="chip chip--accent projects-badge">
            <Star size={12} strokeWidth={2.4} aria-hidden="true" />
            Featured
          </span>
        </div>
        <h3 id={titleId} className="projects-feature__name">
          {project.name}
        </h3>
        <p className="projects-feature__tagline">{project.tagline}</p>
      </div>

      <div className="projects-feature__body">
        <h4 className="projects-label">Highlights</h4>
        <Points points={project.points} two />
      </div>

      <div className="projects-feature__stack">
        <Stack stack={project.stack} label />
      </div>
    </LiquidGlass>
  )
}

function Case({ project, no }) {
  const titleId = `project-${pad(no)}`
  return (
    <li className="bento__cell projects-case">
      <article className="projects-case__inner" aria-labelledby={titleId}>
        <Ordinal no={no} />
        <Tile icon={project.icon} size="md" />
        <h3 id={titleId} className="projects-case__name">
          {project.name}
        </h3>
        <p className="projects-case__tagline">{project.tagline}</p>
        <Points points={project.points} />
        <Stack stack={project.stack} />
      </article>
    </li>
  )
}

export default function Projects() {
  const featuredIndex = Math.max(0, projects.findIndex((p) => p.featured))
  const featured = projects[featuredIndex]
  const rest = projects.map((p, i) => ({ p, no: i + 1 })).filter(({ p }) => p !== featured)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've architected and shipped"
      lead="Platforms built end to end — from the credit engine that prices every transaction, to embeddable assistants other businesses drop into their own sites."
    >
      <div className="projects">
        <Reveal>
          <FeaturedCase project={featured} no={featuredIndex + 1} />
        </Reveal>

        {rest.length > 0 && (
          <Reveal delay={80}>
            <LiquidGlass as="div" tier="frost" className="bento projects-grid">
              <ul className="bento__grid projects-grid__cells">
                {rest.map(({ p, no }) => (
                  <Case key={p.name} project={p} no={no} />
                ))}
              </ul>
            </LiquidGlass>
          </Reveal>
        )}

        <Reveal delay={120}>
          <LiquidGlass
            as="a"
            tier="faux"
            interactive
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-more"
          >
            <span className="tile tile--lg projects-more__tile" aria-hidden="true">
              <Github size={22} strokeWidth={2.1} />
            </span>
            <span className="projects-more__text">
              <span className="projects-more__title">More on GitHub</span>
              <span className="projects-more__host">{hostOf(profile.github)}</span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
            <span className="projects-more__go" aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={2.3} />
            </span>
          </LiquidGlass>
        </Reveal>
      </div>
    </Section>
  )
}
