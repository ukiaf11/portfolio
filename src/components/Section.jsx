import Reveal from './Reveal'
import { sectionNo } from '../data/profile'

/**
 * The section frame: a numbered eyebrow capsule, the section title and an optional lead,
 * then the section's own content. See DESIGN.md, "Section frame".
 *
 *   <Section id="skills" eyebrow="Skills" title="What I build with" lead="…">…</Section>
 *
 * - The ordinal comes from sectionNo(id), i.e. the page order in profile.js `navLinks`,
 *   so reordering sections never leaves a stale hand-written number behind. Sections that
 *   are not home-page nav entries (the /services/ page) pass `numbered={false}`.
 * - From 1024px the head is two columns: the title on the left, the lead on the right,
 *   bottom-aligned, so a wide viewport never leaves its right half empty.
 * - The eyebrow is faux glass (no backdrop-filter): it is small and text-first. The title
 *   and lead sit on the wallpaper, which is tuned to keep them above 4.5:1.
 * - `title` may be a node; `className` is added to the <section>.
 */
export default function Section({ id, eyebrow, title, lead, numbered = true, className = '', children }) {
  const no = numbered ? sectionNo(id) : null
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={['section', className].filter(Boolean).join(' ')}>
      <Reveal className={lead ? 'section__head' : 'section__head section__head--solo'}>
        <p className="eyebrow glass glass-capsule">
          {no && (
            <span className="eyebrow__no" aria-hidden="true">
              {no}
            </span>
          )}
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="section__title">
          {title}
        </h2>
        {lead && <p className="section__lead">{lead}</p>}
      </Reveal>
      <div className="section__body">{children}</div>
    </section>
  )
}
