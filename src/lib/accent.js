/**
 * The /services/ accent ramp: one cool hue family, stepped across a list.
 *
 * Every value is a color-mix() of tokens that are already tuned per theme, so each step
 * works in light and dark without a colour table, and the ramp still spreads evenly if
 * an item is added. Two forms, because a fill and a text colour have opposite needs:
 *
 *   tileFor(i, total)    the FILL of an app-icon tile (.tile's --tile): the vivid system
 *                        colours, --sys-indigo through blue to --sys-teal. Mixed in oklch,
 *                        which walks the hue and keeps the chroma (oklab would grey out
 *                        the middle steps). Decorative; never behind text.
 *   accentFor(i, total)  the INK for text, icons and small marks: --accent-ink (the
 *                        site's own accent text colour) to a teal ink made by mixing
 *                        --sys-teal toward --fg. Mixing toward --fg is what makes it
 *                        legible in both themes: darker on the light glass, lighter on
 *                        the dark glass. Measured on the real frost behind the service
 *                        taglines, pointer light included: 5.0:1 or better in light and
 *                        5.8:1 or better in dark, at every step.
 *
 * WebsiteTypes.jsx imports accentFor too, so its signature and meaning (a legible ink)
 * stay fixed.
 */
const share = (i, total) => (total > 1 ? Math.round((i / (total - 1)) * 100) : 0)

const TEAL_INK = 'color-mix(in oklab, var(--sys-teal) 62%, var(--fg))'

export function accentFor(i, total) {
  return `color-mix(in oklab, var(--accent-ink) ${100 - share(i, total)}%, ${TEAL_INK})`
}

export function tileFor(i, total) {
  return `color-mix(in oklch, var(--sys-indigo) ${100 - share(i, total)}%, var(--sys-teal))`
}
