import { ArrowUpRight, Download, Github, Mail, MapPin, Phone } from 'lucide-react'
import Reveal from './Reveal'
import LiquidGlass from './glass/LiquidGlass'
import { profile, sectionNo } from '../data/profile'

/**
 * The closing call to action: ONE frosted panel on the wallpaper, split bento-style by a
 * hairline into the pitch (eyebrow, headline, copy, the two actions) and the contact
 * details (one faux capsule row per channel, each with a round icon tile).
 *
 * No name card here on purpose: the floating brand capsule in the header already shows the
 * monogram and name in every viewport, so the details cell stays a plain grouped list.
 *
 * Glass budget: the panel is the section's only backdrop-filter surface. Everything inside
 * it (the eyebrow, both buttons, the channel rows) is faux glass, so nothing nests.
 *
 * The heading lives in the panel rather than in a <Section> head, so this renders its own
 * <section> with the shared .section frame and the same eyebrow capsule and ordinal.
 */

// The pitch copy. It predates profile.js having a contact block; it moves there when the
// design-system lead adds one (requested in the Contact report).
const copy = {
  eyebrow: 'Contact',
  title: "Let's build something",
  titleTail: 'that scales',
  body: 'Open to full stack roles and freelance work — especially anything involving Django backends, microservices or AI integration. The fastest way to reach me is email.',
}

const channels = [
  {
    id: 'email',
    icon: Mail,
    tile: 'var(--sys-blue)',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    id: 'phone',
    icon: Phone,
    tile: 'var(--sys-green)',
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'github',
    icon: Github,
    tile: 'var(--sys-indigo)',
    label: 'GitHub',
    value: profile.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.github,
    external: true,
  },
  // Not a link: there is nowhere useful to send a visitor, so it renders as a static row.
  { id: 'location', icon: MapPin, tile: 'var(--sys-orange)', label: 'Location', value: profile.location },
]

function Channel({ icon: Icon, tile, label, value, href, external }) {
  const body = (
    <>
      <span className="tile contact-channel__tile" style={{ '--tile': tile }} aria-hidden="true">
        <Icon size={19} strokeWidth={2.1} />
      </span>
      <span className="contact-channel__text">
        <span className="contact-channel__label">{label}</span>{' '}
        <span className="contact-channel__value">{value}</span>
      </span>
    </>
  )

  if (!href) {
    return <div className="contact-channel contact-channel--static">{body}</div>
  }

  return (
    <a
      href={href}
      className="contact-channel glass glass-capsule glass-interactive"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {body}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      <ArrowUpRight className="contact-channel__go" size={18} strokeWidth={2.2} aria-hidden="true" />
    </a>
  )
}

export default function Contact() {
  const no = sectionNo('contact')

  return (
    <section id="contact" aria-labelledby="contact-title" className="section contact">
      <Reveal className="contact__stage">
        {/* A soft accent pool BEHIND the panel (a sibling, never an ancestor), so the frost
            picks up a glow where the pitch sits. Static; it fades with the reveal. */}
        <div className="contact__glow reveal-fade" aria-hidden="true" />

        <LiquidGlass as="div" tier="frost" className="bento contact-panel">
          <div className="bento__grid contact-panel__grid">
            <div className="bento__cell contact-pitch">
              <p className="eyebrow glass glass-capsule">
                {no && (
                  <span className="eyebrow__no" aria-hidden="true">
                    {no}
                  </span>
                )}
                {copy.eyebrow}
              </p>

              <h2 id="contact-title" className="contact-pitch__title">
                <span>{copy.title}</span> <span className="contact-pitch__title-2">{copy.titleTail}</span>
              </h2>

              <p className="contact-pitch__copy">{copy.body}</p>

              <div className="contact-pitch__actions">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-lg glass glass-prominent glass-capsule glass-interactive"
                >
                  <Mail size={18} strokeWidth={2.1} aria-hidden="true" />
                  Email me
                </a>
                <a
                  href={profile.resume}
                  download
                  className="btn btn-lg glass glass-capsule glass-interactive"
                >
                  <Download size={18} strokeWidth={2.1} aria-hidden="true" />
                  Download résumé
                </a>
              </div>
            </div>

            <div className="bento__cell contact-card">
              <h3 id="contact-direct" className="contact-card__title">
                Contact details
              </h3>
              <ul className="contact-channels" aria-labelledby="contact-direct">
                {channels.map(({ id, ...c }) => (
                  <li key={id}>
                    <Channel {...c} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LiquidGlass>
      </Reveal>
    </section>
  )
}
