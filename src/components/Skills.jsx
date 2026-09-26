import {
  Container, Database, MonitorSmartphone, Plug,
  Server, Sparkles, TerminalSquare,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { skills } from '../data/profile'

const ICONS = {
  MonitorSmartphone, Server, Database, Container, Plug, Sparkles, TerminalSquare,
}

/** App-icon tile colour per group (decorative, never behind text). */
const TILES = {
  backend: 'var(--sys-blue)',
  frontend: 'var(--sys-teal)',
  databases: 'var(--sys-indigo)',
  infrastructure: 'var(--sys-orange)',
  ai: 'var(--sys-purple)',
  integrations: 'var(--sys-green)',
  tools: 'var(--sys-pink)',
}

const all = skills.flatMap((group) => group.items)
const dailyCount = all.filter((item) => item.daily).length

function GroupIcon({ group, size }) {
  const Icon = ICONS[group.icon] ?? Server
  return (
    <span
      className={size === 'lg' ? 'tile tile--lg' : 'tile'}
      style={{ '--tile': TILES[group.id] ?? 'var(--sys-blue)' }}
      aria-hidden="true"
    >
      <Icon size={size === 'lg' ? 23 : 19} strokeWidth={2.1} />
    </span>
  )
}

/**
 * One technology, as a faux capsule. Daily drivers get a dot, a heavier weight and a
 * tinted plate: three cues, none of them colour alone, and the meaning is spoken to
 * screen readers rather than left to a legend.
 */
function ChipList({ items, large = false }) {
  return (
    <ul className={large ? 'skills-chips skills-chips--lg' : 'skills-chips'}>
      {items.map(({ name, daily }) => (
        <li key={name} className={daily ? 'chip skills-chip skills-chip--daily' : 'chip skills-chip'}>
          {daily && <span className="skills-chip__dot" aria-hidden="true" />}
          {name}
          {daily && <span className="sr-only"> — used daily</span>}
        </li>
      ))}
    </ul>
  )
}

/** The one group worth leading with: a wide band, heading left and its stack right. */
function PrimaryBand({ group }) {
  const titleId = `skills-${group.id}`
  return (
    <LiquidGlass as="article" tier="frost" className="skills-band" aria-labelledby={titleId}>
      <div className="skills-band__intro">
        <GroupIcon group={group} size="lg" />
        <div className="skills-band__text">
          <p className="chip chip--accent skills-band__kicker">Primary focus</p>
          <h3 id={titleId} className="skills-band__name">
            {group.name}
          </h3>
          <p className="skills-band__note">{group.note}</p>
        </div>
      </div>
      <div className="skills-band__stack">
        <ChipList items={group.items} large />
        <p className="skills-key">
          <span className="skills-key__item">
            <span className="skills-key__swatch skills-key__swatch--daily" aria-hidden="true">
              <span className="skills-chip__dot" />
            </span>
            Used every day
          </span>
          <span className="skills-key__item">
            <span className="skills-key__swatch" aria-hidden="true" />
            Working knowledge
          </span>
          <span className="skills-key__count">
            {dailyCount} of {all.length} used daily
          </span>
        </p>
      </div>
    </LiquidGlass>
  )
}

export default function Skills() {
  const primary = skills.find((group) => group.primary)
  const rest = skills.filter((group) => group !== primary)

  return (
    <Section
      id="skills"
      className="skills"
      eyebrow="Skills"
      title="What I build with"
      lead="Grouped by what each thing actually does. The highlighted items are what I work with every day — the rest is solid working knowledge I reach for when a problem calls for it."
    >
      <div className="skills-layout">
        {primary && (
          <Reveal>
            <PrimaryBand group={primary} />
          </Reveal>
        )}

        {/* Every other group: ONE frosted panel split by hairlines (the bento), not six
            frosted cards. One filter pass, and the viewport stays inside the budget. */}
        <Reveal delay={90}>
          <LiquidGlass tier="frost" className="bento skills-bento">
            <ul className="bento__grid skills-grid">
              {rest.map((group) => (
                <li key={group.id} className="bento__cell skills-cell">
                  <div className="skills-cell__head">
                    <GroupIcon group={group} />
                    <div className="skills-cell__text">
                      <h3 className="skills-cell__name">{group.name}</h3>
                      <p className="skills-cell__note">{group.note}</p>
                    </div>
                  </div>
                  <ChipList items={group.items} />
                </li>
              ))}
            </ul>
          </LiquidGlass>
        </Reveal>
      </div>
    </Section>
  )
}
