import { Fragment } from 'react'
import {
  Building2, ShoppingBag, MousePointerClick, ConciergeBell, PanelsTopLeft, SquareUserRound,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import SiteMockup from './SiteMockup'
import { accentFor } from '../lib/accent'
import { websiteTypes, websiteTypesIntro } from '../data/profile'

const ICONS = {
  Building2, ShoppingBag, MousePointerClick, ConciergeBell, PanelsTopLeft, SquareUserRound,
}

/**
 * A specimen and its label: the wireframe sits in a frame, the caption sits on bare
 * ground beneath it. That is the whole reason this reads as a different object from
 * the service cells further down the same page, which put every word inside a
 * bordered face.
 */
function TypeFigure({ type, index, total }) {
  const Icon = ICONS[type.icon] ?? Building2

  return (
    <figure
      className="wf-figure flex h-full flex-col"
      style={{ '--accent': accentFor(index, total) }}
    >
      <SiteMockup preview={type.preview} />

      <figcaption className="wf-cap">
        <h3 className="wf-cap__name">
          <span className="wf-cap__icon">
            <Icon size={16} strokeWidth={2} />
          </span>
          {type.name}
        </h3>
        <p className="wf-cap__blurb">{type.blurb}</p>
        <p className="wf-cap__best">{type.bestFor}</p>
        <p className="wf-cap__marks">
          {type.highlights.map((mark, i) => (
            <Fragment key={mark}>
              {i > 0 && <span aria-hidden="true">·</span>}
              <b>{mark}</b>
            </Fragment>
          ))}
        </p>
      </figcaption>
    </figure>
  )
}

export default function WebsiteTypes() {
  return (
    <Section
      id="website-types"
      eyebrow="Website types"
      title={websiteTypesIntro.title}
      lead={websiteTypesIntro.lead}
    >
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {websiteTypes.map((type, i) => (
          <Reveal key={type.id} delay={(i % 3) * 90} className="h-full">
            <TypeFigure type={type} index={i} total={websiteTypes.length} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
