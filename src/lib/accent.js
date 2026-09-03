/**
 * One step on a brand → teal ramp, mixed in oklab.
 *
 * Both endpoints are tokens that are already swapped per theme, so every step is
 * legible in light and dark without a per-theme colour table, and it still works if
 * an item is added to the list.
 *
 * Note this is the OPPOSITE call to the one in `.svc-glow`: --color-brand-400 and
 * --color-teal-400 are darkened for light mode, which ruins a "light" but is exactly
 * what you want for text, an icon, or a button fill on paper.
 */
export function accentFor(i, total) {
  const step = total > 1 ? Math.round((i / (total - 1)) * 90) : 0
  return `color-mix(in oklab, var(--color-brand-400) ${100 - step}%, var(--color-teal-400))`
}
