import { useId } from 'react'
import { setGlassPreference, useGlassState } from '../../lib/glass/glassMode.js'

/**
 * The in-site "Reduce transparency" switch. Place it in the footer and the mobile menu.
 *
 * Chrome and Edge read the OS setting through prefers-reduced-transparency, but Safari has
 * no such media query, so this switch is the only way a Safari user can ask for solid
 * surfaces. The choice is stored and applied before paint on every later visit.
 *
 * When the OS already forces solid glass (reduced transparency, increased contrast or
 * forced colours), the switch shows "on", says why, and cannot be turned off here: the
 * system setting wins, exactly as it does in the pre-paint script.
 *
 *   <GlassPreference />
 *   <GlassPreference className="sheet__pref" />
 */
export default function GlassPreference({ className = '' }) {
  const { mode, preference } = useGlassState()
  const noteId = useId()
  const on = mode === 'solid'
  const forced = on && preference !== 'solid'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-disabled={forced || undefined}
      aria-describedby={forced ? noteId : undefined}
      className={['switch', className].filter(Boolean).join(' ')}
      onClick={() => {
        if (!forced) setGlassPreference(on ? null : 'solid')
      }}
    >
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      <span className="switch__label">Reduce transparency</span>
      {forced && (
        <span id={noteId} className="switch__note">
          Set by your system
        </span>
      )}
    </button>
  )
}
