import { useSyncExternalStore } from 'react'
import { PREPAINT_CONFIG as cfg, computeGlassMode } from '../prepaint.js'

/**
 * The glass-mode store: keeps <html data-glass="refract | frost | solid"> current.
 *
 * The decision itself lives in lib/prepaint.js (computeGlassMode), which the pre-paint
 * script also runs before the first paint, so the two can never drift apart.
 *
 * While anything is subscribed, the mode is recomputed when:
 *   - one of the media queries it depends on changes (reduced transparency, increased
 *     contrast, forced colours, pointer type)
 *   - another tab writes the glass preference (`storage` events for the glass key ONLY;
 *     a theme toggle or any other key never touches the mode)
 *   - this tab calls setGlassPreference()
 */

const listeners = new Set()
let unbind = null
let state = null // { mode, preference }: replaced, never mutated, so snapshots compare by identity
let memoryPreference = null // used only when localStorage is blocked
const SERVER_STATE = Object.freeze({ mode: 'frost', preference: null })

function readPreference() {
  try {
    return window.localStorage.getItem(cfg.glassKey)
  } catch {
    return memoryPreference
  }
}

function read() {
  return { mode: document.documentElement.dataset.glass || 'frost', preference: readPreference() }
}

/** Recomputes the mode, writes it to <html>, and notifies subscribers if anything changed. */
function refresh() {
  const mode = computeGlassMode(cfg, readPreference())
  if (document.documentElement.dataset.glass !== mode) document.documentElement.dataset.glass = mode
  const next = read()
  if (!state || next.mode !== state.mode || next.preference !== state.preference) {
    state = next
    listeners.forEach((listener) => listener())
  }
}

function bind() {
  const queries = [...cfg.solidQueries, cfg.refractQuery].map((q) => window.matchMedia(q))
  // key === null means localStorage.clear() in another tab.
  const onStorage = (event) => {
    if (event.key === cfg.glassKey || event.key === null) refresh()
  }
  queries.forEach((mq) => mq.addEventListener('change', refresh))
  window.addEventListener('storage', onStorage)
  return () => {
    queries.forEach((mq) => mq.removeEventListener('change', refresh))
    window.removeEventListener('storage', onStorage)
  }
}

function subscribe(listener) {
  if (listeners.size === 0) unbind = bind()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && unbind) {
      unbind()
      unbind = null
    }
  }
}

const getSnapshot = () => state ?? (state = read())
const getServerSnapshot = () => SERVER_STATE

/** @returns {{ mode: 'refract'|'frost'|'solid', preference: 'solid'|'frost'|null }} */
export function useGlassState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** @returns {'refract'|'frost'|'solid'} */
export function useGlassMode() {
  return useGlassState().mode
}

/**
 * The in-site preference, for the "Reduce transparency" switch (<GlassPreference>).
 * Safari has no prefers-reduced-transparency query, so this is the only way a Safari
 * user can ask for solid surfaces. The pre-paint script reads it on the next load.
 */
export function setGlassPreference(value /* 'solid' | 'frost' | null */) {
  memoryPreference = value || null
  try {
    if (value) window.localStorage.setItem(cfg.glassKey, value)
    else window.localStorage.removeItem(cfg.glassKey)
  } catch {
    // Blocked storage: memoryPreference still applies it to this page view.
  }
  refresh()
}
