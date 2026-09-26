/**
 * Days as the data writes them ("September 15, 2025") and as the site shows them.
 *
 *   const d = parseDay(job.period.split('—')[0])   // a local Date, or null
 *   formatDay(d)                                    // "Sep 15, 2025": the ONE display format
 *   isoDay(d)                                       // "2025-09-15", for <time dateTime>
 *
 * Read by Hero.jsx (the "Now" widget) and Experience.jsx (the card and the rail), so one
 * start date never shows in two formats on the same page.
 */

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

/** "September 15, 2025" → Date. Parsed by hand: Date() string parsing varies by engine. */
export function parseDay(text) {
  const m = /^([a-z]+)\s+(\d{1,2}),\s*(\d{4})$/i.exec(text?.trim() ?? '')
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1
  return month < 0 ? null : new Date(Number(m[3]), month, Number(m[2]))
}

/** "Sep 15, 2025". The short month keeps the Experience rail label (from 1024px) on one line. */
export const formatDay = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/** "2025-09-15", for <time dateTime>. */
export const isoDay = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
