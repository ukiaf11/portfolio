import { Braces, Briefcase, CalendarDays, Check, Code, Container, GitBranch, Send } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { experience, experienceIntro } from '../data/profile'
import { parseDay, formatDay, isoDay } from '../lib/dates'

/** Icon disc per technology in a role's stack (decorative). Unknown names fall back. */
const STACK_ICONS = {
  'Django REST Framework': { icon: Braces, tile: 'var(--sys-indigo)' },
  Postman: { icon: Send, tile: 'var(--sys-orange)' },
  Docker: { icon: Container, tile: 'var(--sys-blue)' },
  Git: { icon: GitBranch, tile: 'var(--sys-pink)' },
}
const STACK_FALLBACK = { icon: Code, tile: 'var(--sys-teal)' }

/** Whole months between two dates, spelled out: "8 months", "1 year", "2 years 3 months". */
function tenure(from, to) {
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
  if (to.getDate() < from.getDate()) months -= 1
  if (months < 1) return 'Less than a month'
  const y = Math.floor(months / 12)
  const mo = months % 12
  const part = (n, unit) => (n ? `${n} ${unit}${n === 1 ? '' : 's'}` : '')
  return [part(y, 'year'), part(mo, 'month')].filter(Boolean).join(' ')
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Sets the role's own stack in semibold wherever a point mentions it, so the prose
 * and the stack capsules underneath read as one thing.
 */
function withStack(text, stack) {
  if (!stack?.length) return text
  const terms = [...stack].sort((a, b) => b.length - a.length).map(escapeRe)
  const re = new RegExp(`\\b(${terms.join('|')})\\b`, 'g')
  return text.split(re).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="xp-term">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

function Role({ job, index }) {
  const [startText, endText] = job.period.split('—').map((s) => s.trim())
  const start = parseDay(startText)
  const titleId = `xp-role-${index}`
  const since = job.current && start
  const length = since ? tenure(start, new Date()) : null

  return (
    <Reveal as="li" delay={index * 100} className={job.current ? 'xp-item xp-item--current' : 'xp-item'}>
      {/* The rail: a glass tube with a node per role. From 1024px it doubles as a time
          axis (now, time in role, start date). It is aria-hidden because the card
          carries the same dates as text for every reader. */}
      <div className="xp-rail reveal-fade" aria-hidden="true">
        <span className="xp-rail__tube" />
        <span className="xp-rail__stop xp-rail__stop--end">
          <span className="xp-rail__label">{job.current ? 'Now' : endText}</span>
          <span className="xp-node glass glass-capsule">
            <span className="xp-node__core" />
          </span>
        </span>
        {length && <span className="xp-rail__span">{length}</span>}
        <span className="xp-rail__stop xp-rail__stop--start">
          <span className="xp-rail__label">
            <span className="xp-rail__caption">Started</span>
            {start ? formatDay(start) : startText}
          </span>
          <span className="xp-rail__dot" />
        </span>
      </div>

      <LiquidGlass as="article" tier="frost" className="xp-card" aria-labelledby={titleId}>
        <header className="xp-card__head">
          <span className="tile tile--lg xp-card__tile" style={{ '--tile': 'var(--sys-green)' }} aria-hidden="true">
            <Briefcase size={22} strokeWidth={2.1} />
          </span>
          <div className="xp-card__who">
            <h3 id={titleId} className="xp-card__company">
              {job.company}
            </h3>
            <p className="xp-card__role">{job.title}</p>
            <p className="xp-card__when">
              <CalendarDays size={15} strokeWidth={2.1} aria-hidden="true" />
              {since ? (
                <>
                  <span>
                    Since <time dateTime={isoDay(start)}>{formatDay(start)}</time>
                  </span>
                  <span className="xp-card__len">
                    <span className="xp-card__sep" aria-hidden="true">
                      ·
                    </span>{' '}
                    {length}
                  </span>
                </>
              ) : (
                <span>
                  {startText}
                  {endText && ` — ${endText}`}
                </span>
              )}
            </p>
          </div>
          {job.current && <span className="chip chip--live xp-card__status">Present</span>}
        </header>

        <div className="xp-card__body">
          <div className="xp-card__main">
            <h4 className="xp-card__label">Responsibilities</h4>
            <ul className="xp-points">
              {job.points.map((point) => (
                <li key={point}>
                  <span className="xp-points__mark" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{withStack(point, job.stack)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="xp-card__aside">
            <h4 className="xp-card__label">Built with</h4>
            <ul className="xp-stack">
              {job.stack.map((tech) => {
                const { icon: Icon, tile } = STACK_ICONS[tech] ?? STACK_FALLBACK
                return (
                  <li key={tech} className="chip xp-stack__chip">
                    <span className="tile xp-stack__tile" style={{ '--tile': tile }} aria-hidden="true">
                      <Icon size={12} strokeWidth={2.5} />
                    </span>
                    {tech}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </LiquidGlass>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      className="xp"
      eyebrow={experienceIntro.eyebrow}
      title={experienceIntro.title}
      lead={experienceIntro.lead}
    >
      <ol className="xp-timeline">
        {experience.map((job, i) => (
          <Role key={job.company + job.period} job={job} index={i} />
        ))}
      </ol>
    </Section>
  )
}
