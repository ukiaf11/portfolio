import { Boxes, Braces, Cpu, Layers, Lock, MonitorSmartphone, Server, Sparkles } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { profile } from '../data/profile'

const pillars = [
  {
    icon: Layers,
    tile: 'var(--sys-blue)',
    title: 'Microservice architecture',
    body: 'Splitting platforms into services that scale and deploy on their own terms, with a credit core holding the transaction lifecycle together.',
  },
  {
    icon: Braces,
    tile: 'var(--sys-indigo)',
    title: 'Django & DRF backends',
    body: 'Secure APIs, authentication systems and data models built to survive real multi-tenant traffic, not just a demo.',
  },
  {
    icon: Lock,
    tile: 'var(--sys-orange)',
    title: 'Security & fintech',
    body: 'Double-entry ledgers, live currency conversion, Razorpay flows and credentials moved off .env into Google Secret Manager.',
  },
  {
    icon: Cpu,
    tile: 'var(--sys-pink)',
    title: 'AI integration',
    body: 'Gemini and Claude APIs wired into products through Google AI Studio: assistants and automation that ship, not prototypes.',
  },
]

/** What used to be a `const focus = {…}` code block, as an inset grouped list. */
const focus = [
  { icon: Server, tile: 'var(--sys-blue)', label: 'Backend', value: 'Django · DRF · PostgreSQL' },
  { icon: MonitorSmartphone, tile: 'var(--sys-teal)', label: 'Frontend', value: 'React' },
  { icon: Boxes, tile: 'var(--sys-indigo)', label: 'Scale', value: 'Microservices · multi-tenant' },
  { icon: Sparkles, tile: 'var(--sys-purple)', label: 'Edge', value: 'AI integration · fintech' },
]

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
    <Section
      id="about"
      eyebrow="About"
      title="Bridging infrastructure and experience"
      lead={profile.summaryTail}
    >
      <div className="about">
        <Reveal>
          <LiquidGlass as="div" tier="frost" className="about__story">
            <p className="about__lede">{profile.summary}</p>

            <div className="about-focus inset">
              <h3 className="about-focus__title">Focus</h3>
              <dl className="about-focus__list">
                {focus.map(({ icon: Icon, tile, label, value }) => (
                  <div key={label} className="about-focus__row">
                    <dt className="about-focus__label">
                      <span className="tile tile--sm" style={{ '--tile': tile }} aria-hidden="true">
                        <Icon size={15} strokeWidth={2.2} />
                      </span>
                      {label}
                    </dt>
                    <dd className="about-focus__value">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </LiquidGlass>
        </Reveal>

        <Reveal delay={100}>
          <LiquidGlass as="div" tier="frost" className="bento about__bento">
            <ul className="bento__grid about__pillars">
              {pillars.map(({ icon: Icon, tile, title, body }) => (
                <li key={title} className="bento__cell about-pillar">
                  <span className="tile about-pillar__tile" style={{ '--tile': tile }} aria-hidden="true">
                    <Icon size={19} strokeWidth={2.1} />
                  </span>
                  <h3 className="about-pillar__title">{title}</h3>
                  <p className="about-pillar__body">{body}</p>
                </li>
              ))}
            </ul>
          </LiquidGlass>
        </Reveal>
      </div>
    </Section>
  )
}
