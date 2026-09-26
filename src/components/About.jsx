import { Boxes, Braces, Cpu, Layers, Lock, MonitorSmartphone, Server, Sparkles } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { aboutFocus, aboutIntro, aboutPillars, profile } from '../data/profile'

/**
 * The copy (pillars and the Focus rows) is in profile.js; `icon` there is a lucide-react
 * name. These two maps turn it into the glyph and its app-icon tile colour (decorative).
 * An unknown name falls back to Layers on blue.
 */
const ICONS = { Layers, Braces, Lock, Cpu, Server, MonitorSmartphone, Boxes, Sparkles }
const TILES = {
  Layers: 'var(--sys-blue)',
  Braces: 'var(--sys-indigo)',
  Lock: 'var(--sys-orange)',
  Cpu: 'var(--sys-pink)',
  Server: 'var(--sys-blue)',
  MonitorSmartphone: 'var(--sys-teal)',
  Boxes: 'var(--sys-indigo)',
  Sparkles: 'var(--sys-purple)',
}
const iconOf = (name) => ICONS[name] ?? Layers
const tileOf = (name) => TILES[name] ?? 'var(--sys-blue)'

/**
 * The summary's closing line is the section lead: it says the title in a sentence, and it
 * fills the right half of the two-column head on wide screens.
 *
 * Two frosted panels, no more, as two wide bands: the story (the summary beside the Focus
 * grouped list) and ONE bento panel that holds the four pillars, divided by hairlines. The bento replaced
 * four separate frosted cards, which cost four filter passes and pushed the seam with the
 * hero over the frost budget. Everything inside both panels is faux (insets, tiles).
 */
export default function About() {
  return (
    <Section id="about" eyebrow={aboutIntro.eyebrow} title={aboutIntro.title} lead={profile.summaryTail}>
      <div className="about">
        <Reveal>
          <LiquidGlass as="div" tier="frost" className="about__story">
            <p className="about__lede">{profile.summary}</p>

            <div className="about-focus inset">
              <h3 className="about-focus__title">{aboutFocus.title}</h3>
              <dl className="about-focus__list">
                {aboutFocus.rows.map(({ icon, label, value }) => {
                  const Icon = iconOf(icon)
                  return (
                    <div key={label} className="about-focus__row">
                      <dt className="about-focus__label">
                        <span className="tile tile--sm" style={{ '--tile': tileOf(icon) }} aria-hidden="true">
                          <Icon size={15} strokeWidth={2.2} />
                        </span>
                        {label}
                      </dt>
                      <dd className="about-focus__value">{value}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </LiquidGlass>
        </Reveal>

        <Reveal delay={100}>
          <LiquidGlass as="div" tier="frost" className="bento about__bento">
            <ul className="bento__grid about__pillars">
              {aboutPillars.map(({ icon, title, body }) => {
                const Icon = iconOf(icon)
                return (
                  <li key={title} className="bento__cell about-pillar">
                    <span className="tile about-pillar__tile" style={{ '--tile': tileOf(icon) }} aria-hidden="true">
                      <Icon size={19} strokeWidth={2.1} />
                    </span>
                    <h3 className="about-pillar__title">{title}</h3>
                    <p className="about-pillar__body">{body}</p>
                  </li>
                )
              })}
            </ul>
          </LiquidGlass>
        </Reveal>
      </div>
    </Section>
  )
}
