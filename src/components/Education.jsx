import { Award, BadgeCheck, GraduationCap } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { education, certifications } from '../data/profile'

/**
 * Education: the academic timeline and the certifications, in ONE frost bento
 * (a single backdrop-filter surface for the whole section). Everything inside is faux:
 * the timeline is an inset grouped list, each credential an inset plate.
 *
 * The current stage is marked three ways, never by colour alone: a filled node with a
 * halo (the others are hollow rings), a capsule with a status dot around the period
 * (which carries the word "Pursuing" from the data), and aria-current="step".
 */

/** Decorative tile colours for the credentials, in order. Tiles never carry text. */
const CRED_TILES = ['var(--sys-teal)', 'var(--sys-purple)', 'var(--sys-pink)', 'var(--sys-green)']

function GroupHead({ icon: Icon, tile, id, children }) {
  return (
    <div className="education-group__head">
      <span className="tile tile--sm" style={{ '--tile': tile }} aria-hidden="true">
        <Icon size={15} strokeWidth={2.2} />
      </span>
      <h3 id={id} className="education-group__title">
        {children}
      </h3>
    </div>
  )
}

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Learning, formal and otherwise"
      lead="A computer applications master's in progress, on top of a full stack development track."
    >
      <Reveal>
        <LiquidGlass as="div" tier="frost" className="bento education">
          <div className="bento__grid education__grid">
            <div className="bento__cell education-group">
              <GroupHead icon={GraduationCap} tile="var(--sys-indigo)" id="education-academic">
                Academic
              </GroupHead>
              <ol className="education-steps inset">
                {education.map((item) => (
                  <li
                    key={item.degree}
                    className={`education-step ${item.current ? 'education-step--current' : ''}`}
                    aria-current={item.current ? 'step' : undefined}
                  >
                    <span className="education-step__node" aria-hidden="true" />
                    <div className="education-step__text">
                      <h4 className="education-step__degree">{item.degree}</h4>
                      <p className="education-step__school">{item.school}</p>
                    </div>
                    {item.current ? (
                      <span className="chip chip--live education-step__period">{item.period}</span>
                    ) : (
                      <span className="education-step__period">{item.period}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bento__cell education-group">
              <GroupHead icon={Award} tile="var(--sys-orange)" id="education-certs">
                Certifications &amp; Courses
              </GroupHead>
              <ul className="education-creds">
                {certifications.map((cert, i) => (
                  <li key={cert.name} className="education-cred inset">
                    <div className="education-cred__top">
                      <span
                        className="tile"
                        style={{ '--tile': CRED_TILES[i % CRED_TILES.length] }}
                        aria-hidden="true"
                      >
                        <BadgeCheck size={19} strokeWidth={2.1} />
                      </span>
                      <span className="education-cred__period">{cert.period}</span>
                    </div>
                    <h4 className="education-cred__name">{cert.name}</h4>
                    <p className="education-cred__issuer">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LiquidGlass>
      </Reveal>
    </Section>
  )
}
