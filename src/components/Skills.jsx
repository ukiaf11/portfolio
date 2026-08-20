import {
  Container, Database, MonitorSmartphone, Plug,
  Server, Sparkles, TerminalSquare,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { skills } from '../data/profile'

const ICONS = {
  MonitorSmartphone, Server, Database, Container, Plug, Sparkles, TerminalSquare,
}

/**
 * One technology. Daily drivers get a filled dot, heavier weight and a tinted
 * plate — never colour alone, and the meaning is stated in the section lead
 * rather than hidden behind a legend the reader has to go and decode.
 */
function Chip({ name, daily = false }) {
  return (
    <li className={daily ? 'skill-chip skill-chip--daily' : 'skill-chip'}>
      {daily && <span aria-hidden="true" className="skill-chip__dot" />}
      {name}
      {daily && <span className="sr-only"> — used daily</span>}
    </li>
  )
}

function ChipList({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5 sm:gap-2">
      {items.map((item) => (
        <Chip key={item.name} name={item.name} daily={item.daily} />
      ))}
    </ul>
  )
}

/** Icon tile. Sized up on the featured band so it anchors the wider layout. */
function IconTile({ icon, featured = false }) {
  const Icon = ICONS[icon] ?? Server
  return (
    <span className={`skill-tile ${featured ? 'skill-tile--featured' : ''}`}>
      <Icon size={featured ? 20 : 17} strokeWidth={1.9} />
    </span>
  )
}

/**
 * The one group worth leading with. Header across the top, technologies across
 * the full width below — a two-column split leaves a dead corner, because the
 * heading stack is always taller than a single row of chips.
 */
function FeaturedCard({ group }) {
  return (
    <article className="skill-card skill-card--featured group p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <IconTile icon={group.icon} featured />
        <div className="min-w-0 flex-1">
          <span className="skill-pill">Primary focus</span>
          <h3 className="mt-2 text-[17px] leading-tight font-semibold">{group.name}</h3>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted">{group.note}</p>
        </div>
      </div>
      <div className="mt-5">
        <ChipList items={group.items} />
      </div>
    </article>
  )
}

/** Every other group — one card, one question answered. */
function GroupCard({ group }) {
  return (
    <article className="skill-card group flex h-full flex-col p-5">
      <div className="flex items-start gap-3.5">
        <IconTile icon={group.icon} />
        <div className="min-w-0">
          <h3 className="text-[15px] leading-tight font-semibold">{group.name}</h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{group.note}</p>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <ChipList items={group.items} />
      </div>
    </article>
  )
}

export default function Skills() {
  const featured = skills.find((group) => group.primary)
  const rest = skills.filter((group) => !group.primary)

  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title="What I build with"
      lead="Grouped by what each thing actually does. The highlighted items are what I work with every day — the rest is solid working knowledge I reach for when a problem calls for it."
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        {featured && (
          <Reveal>
            <FeaturedCard group={featured} />
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {rest.map((group, i) => (
            <Reveal key={group.id} delay={80 + i * 70} className="h-full">
              <GroupCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
