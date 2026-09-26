/**
 * Miniature wireframes of the six kinds of site, each shown in a small Tahoe window.
 *
 * Compositions live here rather than in profile.js on purpose: a layout is markup,
 * not content, and encoding it as coordinate arrays in the data file would make the
 * data unreadable without buying anything. profile.js just names which composition a
 * type uses.
 *
 * The window is FAUX glass (tint, specular rim, shadow, no backdrop-filter): six of
 * them fit in one viewport, and frost would blow the budget of 8. The page inside it
 * is an OPAQUE sheet, so every colour in a drawing is one known value per theme.
 *
 * Everything in a drawing is sized in `max(px, cqw)` against the sheet's own inline
 * size, so a preview scales as a single unit and needs no internal breakpoints.
 * Nothing here carries text, so nothing inside a preview needs a contrast measurement.
 * The only colour is `--wt-hue` (set per type by WebsiteTypes), and it goes only on
 * the things you would actually click or care about: buttons, prices, the current
 * nav item, chart data.
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
   Symmetric and orderly: a nav, a full-width banner with a centred headline,
   three equal service cards, a footer rule. Banner over a "three equal columns"
   row is the silhouette. */
function BrochureStack() {
  return (
    <>
      <Nav i={0} />
      <P i={1} cls="wf-hero wf-col">
        <div className="wf-bar wf-bar--strong" style={{ width: '58%' }} />
        <div className="wf-bar wf-bar--faint" style={{ width: '42%' }} />
        <div className="wf-btn" style={{ width: '24%', marginTop: 'max(3px, 1.4cqw)' }} />
      </P>
      <div className="wf-row" style={{ alignItems: 'stretch' }}>
        {[0, 1, 2].map((n) => (
          <P key={n} i={5 + n} cls="wf-panel wf-grow">
            <div className="wf-col">
              <div className="wf-dot wf-dot--on" />
              <div className="wf-bar wf-bar--strong" style={{ width: '80%' }} />
              <div className="wf-bar wf-bar--faint" style={{ width: '100%' }} />
              <div className="wf-bar wf-bar--faint" style={{ width: '64%' }} />
            </div>
          </P>
        ))}
      </div>
      <P i={8} cls="wf-rule" />
      <div className="wf-row wf-anim" style={{ '--i': '8' }}>
        <div className="wf-bar wf-bar--faint" style={{ width: '22%' }} />
        <div className="wf-grow" />
        <div className="wf-bar wf-bar--faint" style={{ width: '12%' }} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------- shop
   Dense and uniform: a search field and a row of filters, then a repeating grid
   of tiles that each carry a picture and an accent price, filling the page. The
   uniform grid plus accent price tags is the silhouette. */
function ProductGrid() {
  return (
    <>
      <div className="wf-row wf-anim" style={{ '--i': '0' }}>
        <div className="wf-bar wf-bar--strong" style={{ width: '16%' }} />
        <div className="wf-search wf-grow" />
        <div className="wf-cart" />
      </div>
      <div className="wf-row wf-anim" style={{ '--i': '1' }}>
        <div className="wf-chip wf-chip--on" style={{ width: '13%' }} />
        <div className="wf-chip" style={{ width: '11%' }} />
        <div className="wf-chip" style={{ width: '15%' }} />
        <div className="wf-chip" style={{ width: '10%' }} />
      </div>
      <div className="wf-tiles">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <P key={n} i={2 + n} cls="wf-col">
            <div className="wf-media wf-grow" />
            <div className="wf-bar wf-bar--faint" style={{ width: '86%' }} />
            <div className="wf-bar wf-bar--accent" style={{ width: '42%' }} />
          </P>
        ))}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- landing
   Mostly empty, with one sign-up form dead centre: an email field joined to a
   saturated button. The emptiness IS the silhouette — one page, one job, one
   thing to do. No nav: a landing page has nowhere else to send you. */
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
        <P i={4} cls="wf-form" w="66%" style={{ marginTop: 'max(3px, 1.6cqw)' }}>
          <div className="wf-form__field" />
          <div className="wf-btn wf-form__btn" />
        </P>
        <P i={5} cls="wf-bar wf-bar--faint" w="30%" />
      </div>
      <div className="wf-row wf-anim" style={{ '--i': '6', justifyContent: 'center', gap: 'max(6px, 4cqw)' }}>
        {[14, 11, 15, 12].map((w, n) => (
          <div key={n} className="wf-bar wf-bar--faint" style={{ width: `${w}%` }} />
        ))}
      </div>
    </>
  )
}

/* --------------------------------------------------------------- booking
   Split: a priced list on the left; on the right a picker with a strip of days
   and a grid of time slots, one chosen and two already taken. List-beside-
   picker is the silhouette, and it is the only composition that shows a choice
   being made. */
function MenuAndSlots() {
  return (
    <>
      <Nav i={0} cta />
      <div className="wf-row" style={{ alignItems: 'stretch', flex: 1, gap: 'max(4px, 2.4cqw)' }}>
        <div className="wf-col wf-grow" style={{ flex: 1.15, justifyContent: 'space-between' }}>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <P key={n} i={1 + n} cls="wf-row" style={{ alignItems: 'center' }}>
              <div className="wf-block" style={{ width: 'max(10px, 7.4cqw)', height: 'max(10px, 7.4cqw)' }} />
              <div className="wf-col wf-grow" style={{ gap: 'max(2px, 1cqw)' }}>
                <div className="wf-bar wf-bar--strong" style={{ width: '72%' }} />
                <div className="wf-bar wf-bar--faint" style={{ width: '46%' }} />
              </div>
              <div className="wf-bar wf-bar--accent" style={{ width: '16%' }} />
            </P>
          ))}
        </div>
        <P i={7} cls="wf-panel wf-col" style={{ flex: 0.85 }}>
          <div className="wf-bar wf-bar--strong" style={{ width: '64%' }} />
          <div className="wf-days">
            {[0, 1, 2, 3, 4].map((n) => (
              <div key={n} className={`wf-day${n === 1 ? ' wf-day--on' : ''}`} />
            ))}
          </div>
          <div className="wf-rule" />
          <div className="wf-slots">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => (
              <div key={n} className={`wf-chip${n === 4 ? ' wf-chip--on' : ''}${n === 9 || n === 2 || n === 13 ? ' wf-chip--taken' : ''}`} />
            ))}
          </div>
          <div className="wf-row" style={{ marginTop: 'auto' }}>
            <div className="wf-bar wf-bar--faint" style={{ width: '40%' }} />
            <div className="wf-grow" />
            <div className="wf-bar wf-bar--accent" style={{ width: '18%' }} />
          </div>
          <div className="wf-btn" style={{ width: '100%' }} />
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
      <P i={0} cls="wf-col wf-side" w="22%" style={{ gap: 'max(3px, 1.8cqw)' }}>
        <div className="wf-row">
          <div className="wf-dot wf-dot--on" />
          <div className="wf-bar wf-bar--strong wf-grow" />
        </div>
        <div className="wf-rule" />
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="wf-row">
            <div className="wf-dot" />
            <div className={`wf-bar wf-grow ${n === 0 ? 'wf-bar--accent' : 'wf-bar--faint'}`} />
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
      <div className="wf-mosaic">
        <P i={1} cls="wf-media wf-media--hero" style={{ gridColumn: 'span 2', gridRow: 'span 2' }} />
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

/**
 * The specimen: a faux-glass window (title strip with neutral "inactive" traffic
 * lights and an empty address capsule) holding the opaque sheet the drawing sits on.
 * The hue glow behind it is what the translucent frame picks up, the way a Work
 * window picks up its site's brand colour.
 *
 * Decorative: it illustrates the caption that follows it and carries no information
 * of its own, so it is hidden rather than described.
 */
export default function SiteMockup({ preview }) {
  const Composition = COMPOSITIONS[preview] ?? BrochureStack
  if (!COMPOSITIONS[preview] && import.meta.env?.DEV) {
    console.warn(`SiteMockup: no composition named "${preview}"`)
  }
  return (
    <div className="wt-specimen" aria-hidden="true">
      <div className="wt-window glass">
        <div className="wt-window__bar">
          <span className="wt-window__lights">
            <i />
            <i />
            <i />
          </span>
          <span className="wt-window__address" />
        </div>
        <div className="wf-stage">
          <div className="wf-sheet">
            <Composition />
          </div>
        </div>
      </div>
    </div>
  )
}
