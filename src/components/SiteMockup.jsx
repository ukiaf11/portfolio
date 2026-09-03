/**
 * Miniature wireframes of the six kinds of site.
 *
 * Compositions live here rather than in profile.js on purpose: a layout is markup,
 * not content, and encoding it as coordinate arrays in the data file would make the
 * data unreadable without buying anything. profile.js just names which composition a
 * type uses.
 *
 * Everything is sized in `max(px, cqw)` against the stage's own inline size, so a
 * preview scales as a single unit and needs no internal breakpoints. Nothing here
 * carries text, so nothing inside a preview needs a contrast measurement.
 *
 * The silhouette test each composition has to pass: cover the caption, and a stranger
 * should still sort the six into six kinds of site. That is why business is a
 * symmetric three-up with a nav and portfolio is an irregular image mosaic with almost
 * no text — an earlier draft had both as "nav plus text bars plus image blocks" and
 * they were indistinguishable at 300px.
 */

/** One wireframe part: carries its stagger index and its entrance animation. */
function P({ i = 0, draw = false, cls = '', w, h, flex, style, children }) {
  return (
    <div
      className={`wf-anim${draw ? ' wf-anim--draw' : ''}${cls ? ` ${cls}` : ''}`}
      style={{ '--i': String(i), width: w, height: h, flex, ...style }}
    >
      {children}
    </div>
  )
}

/** Nav strip: a mark, some links, one of them current. */
function Nav({ i = 0, cta = false }) {
  return (
    <div className="wf-row wf-anim" style={{ '--i': String(i) }}>
      <div className="wf-bar wf-bar--strong" style={{ width: '18%' }} />
      <div className="wf-grow" />
      <div className="wf-bar wf-bar--accent" style={{ width: '9%' }} />
      <div className="wf-bar" style={{ width: '9%' }} />
      <div className="wf-bar" style={{ width: '9%' }} />
      {cta && <div className="wf-chip wf-chip--on" style={{ width: '14%' }} />}
    </div>
  )
}

/* ---------------------------------------------------------------- business
   Symmetric and orderly: a nav, a centred headline, three equal service cards,
   a footer rule. The "three equal columns" row is the silhouette. */
function BrochureStack() {
  return (
    <>
      <Nav i={0} />
      <P i={1} cls="wf-rule" />
      <div className="wf-col" style={{ alignItems: 'center', marginTop: 'max(4px, 2cqw)' }}>
        <P i={2} draw cls="wf-bar wf-bar--strong" w="62%" />
        <P i={3} draw cls="wf-bar wf-bar--faint" w="46%" />
        <P i={4} cls="wf-btn" w="26%" style={{ marginTop: 'max(3px, 1.5cqw)' }} />
      </div>
      <div className="wf-row" style={{ marginTop: 'auto', alignItems: 'stretch' }}>
        {[0, 1, 2].map((n) => (
          <P key={n} i={5 + n} cls="wf-panel wf-grow">
            <div className="wf-col">
              <div className="wf-dot" />
              <div className="wf-bar wf-bar--strong" style={{ width: '80%' }} />
              <div className="wf-bar wf-bar--faint" style={{ width: '100%' }} />
              <div className="wf-bar wf-bar--faint" style={{ width: '64%' }} />
            </div>
          </P>
        ))}
      </div>
      <P i={8} cls="wf-rule" />
      <div className="wf-row">
        <div className="wf-bar wf-bar--faint" style={{ width: '22%' }} />
        <div className="wf-grow" />
        <div className="wf-bar wf-bar--faint" style={{ width: '12%' }} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------- shop
   Dense and uniform: a search field, then a repeating grid of tiles that each
   carry a picture and an accent price. The uniform grid plus accent price tags
   is the silhouette. */
function ProductGrid() {
  return (
    <>
      <div className="wf-row wf-anim" style={{ '--i': '0' }}>
        <div className="wf-bar wf-bar--strong" style={{ width: '16%' }} />
        <div
          className="wf-grow"
          style={{
            height: 'max(5px, 3cqw)',
            borderRadius: '999px',
            border: '1px solid var(--wf-edge)',
            background: 'color-mix(in oklab, var(--fg) 4%, var(--wf-paper))',
          }}
        />
        <div className="wf-dot wf-dot--on" />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 'max(3px, 1.8cqw)',
          marginTop: 'max(2px, 1cqw)',
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <P key={n} i={1 + n} cls="wf-col">
            <div className="wf-media" style={{ height: 'max(16px, 11cqw)' }} />
            <div className="wf-bar wf-bar--faint" style={{ width: '86%' }} />
            <div className="wf-bar wf-bar--accent" style={{ width: '42%' }} />
          </P>
        ))}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- landing
   Mostly empty, with one saturated button dead centre. The emptiness IS the
   silhouette — one page, one job, one thing to click. */
function SingleOffer() {
  return (
    <>
      <div className="wf-row wf-anim" style={{ '--i': '0' }}>
        <div className="wf-bar wf-bar--strong" style={{ width: '20%' }} />
      </div>
      <div
        className="wf-col"
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: 'max(4px, 2.4cqw)' }}
      >
        <P i={1} draw cls="wf-bar wf-bar--strong" w="72%" style={{ height: 'max(5px, 3.2cqw)' }} />
        <P i={2} draw cls="wf-bar wf-bar--strong" w="54%" style={{ height: 'max(5px, 3.2cqw)' }} />
        <P i={3} draw cls="wf-bar wf-bar--faint" w="64%" />
        <P i={4} cls="wf-btn" w="38%" style={{ height: 'max(7px, 4.6cqw)', marginTop: 'max(2px, 1cqw)' }} />
        <P i={5} cls="wf-bar wf-bar--faint" w="30%" />
      </div>
      <div className="wf-row wf-anim" style={{ '--i': '6', justifyContent: 'center' }}>
        <div className="wf-dot" />
        <div className="wf-dot" />
        <div className="wf-dot" />
      </div>
    </>
  )
}

/* --------------------------------------------------------------- booking
   Split: a priced list on the left, a grid of bookable slots on the right with
   one taken. List-beside-pill-grid is the silhouette, and it is the only
   composition that shows a choice being made. */
function MenuAndSlots() {
  return (
    <>
      <Nav i={0} cta />
      <div className="wf-row" style={{ alignItems: 'stretch', flex: 1, gap: 'max(4px, 2.4cqw)' }}>
        <div className="wf-col wf-grow" style={{ flex: 1.15 }}>
          {[0, 1, 2, 3].map((n) => (
            <P key={n} i={1 + n} cls="wf-row" style={{ alignItems: 'center' }}>
              <div className="wf-block" style={{ width: 'max(9px, 6cqw)', height: 'max(9px, 6cqw)' }} />
              <div className="wf-col wf-grow" style={{ gap: 'max(2px, 1cqw)' }}>
                <div className="wf-bar wf-bar--strong" style={{ width: '72%' }} />
                <div className="wf-bar wf-bar--faint" style={{ width: '46%' }} />
              </div>
              <div className="wf-bar wf-bar--accent" style={{ width: '16%' }} />
            </P>
          ))}
        </div>
        <P i={5} cls="wf-panel wf-col" style={{ flex: 0.85 }}>
          <div className="wf-bar wf-bar--strong" style={{ width: '64%' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'max(2px, 1.4cqw)',
              marginTop: 'max(2px, 1cqw)',
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className={`wf-chip${n === 4 ? ' wf-chip--on' : ''}`} />
            ))}
          </div>
        </P>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- portal
   The only composition with a fixed sidebar, and the only one with a chart.
   A sidebar beside data is what says "application, not website". */
function PortalDashboard() {
  return (
    <div className="wf-row" style={{ alignItems: 'stretch', flex: 1, gap: 'max(4px, 2.2cqw)' }}>
      <P i={0} cls="wf-col" w="22%" style={{ gap: 'max(3px, 1.8cqw)' }}>
        <div className="wf-row">
          <div className="wf-dot wf-dot--on" />
          <div className="wf-bar wf-bar--strong wf-grow" />
        </div>
        <div className="wf-rule" />
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="wf-row">
            <div className="wf-dot" />
            <div className="wf-bar wf-bar--faint wf-grow" />
          </div>
        ))}
      </P>
      <div className="wf-col wf-grow">
        <P i={1} cls="wf-row">
          <div className="wf-bar wf-bar--strong" style={{ width: '34%' }} />
          <div className="wf-grow" />
          <div className="wf-dot" />
        </P>
        <div className="wf-row" style={{ alignItems: 'stretch' }}>
          {[0, 1].map((n) => (
            <P key={n} i={2 + n} cls="wf-panel wf-col wf-grow" style={{ gap: 'max(2px, 1.2cqw)' }}>
              <div className="wf-bar wf-bar--faint" style={{ width: '54%' }} />
              <div className="wf-bar wf-bar--accent" style={{ width: '34%', height: 'max(4px, 2.6cqw)' }} />
            </P>
          ))}
        </div>
        <P i={4} cls="wf-panel wf-grow" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="wf-bar wf-bar--faint" style={{ width: '30%' }} />
          <div className="wf-chart wf-grow" style={{ marginTop: 'max(3px, 1.6cqw)' }}>
            {[38, 56, 44, 72, 60, 88].map((h, n) => (
              <i key={n} style={{ height: `${h}%` }} />
            ))}
          </div>
        </P>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- portfolio
   The deliberate opposite of the business sheet: no nav strip, almost no text
   bars, and an irregular mosaic where the pictures ARE the page. */
function WorkMosaic() {
  return (
    <>
      <div className="wf-row wf-anim" style={{ '--i': '0' }}>
        <div className="wf-bar wf-bar--strong" style={{ width: '30%', height: 'max(4px, 2.6cqw)' }} />
        <div className="wf-grow" />
        <div className="wf-bar wf-bar--accent" style={{ width: '12%' }} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gridAutoRows: '1fr',
          gap: 'max(3px, 1.8cqw)',
          flex: 1,
          marginTop: 'max(2px, 1cqw)',
        }}
      >
        <P i={1} cls="wf-media" style={{ gridColumn: 'span 2', gridRow: 'span 2' }} />
        <P i={2} cls="wf-media" />
        <P i={3} cls="wf-media" />
        <P i={4} cls="wf-media" />
        <P i={5} cls="wf-media" style={{ gridColumn: 'span 2' }} />
      </div>
    </>
  )
}

const COMPOSITIONS = {
  'brochure-stack': BrochureStack,
  'product-grid': ProductGrid,
  'single-offer': SingleOffer,
  'menu-and-slots': MenuAndSlots,
  'portal-dashboard': PortalDashboard,
  'work-mosaic': WorkMosaic,
}

export default function SiteMockup({ preview }) {
  const Composition = COMPOSITIONS[preview] ?? BrochureStack
  if (!COMPOSITIONS[preview] && import.meta.env?.DEV) {
    console.warn(`SiteMockup: no composition named "${preview}"`)
  }
  return (
    // Decorative: it illustrates the caption that follows it and carries no
    // information of its own, so it is hidden rather than described.
    <div className="wf-stage" aria-hidden="true">
      <div className="wf-sheet">
        <Composition />
      </div>
    </div>
  )
}
