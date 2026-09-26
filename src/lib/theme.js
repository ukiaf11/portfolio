import { useSyncExternalStore } from 'react'
import { PREPAINT_CONFIG as cfg, applyTheme, readTheme } from './prepaint.js'

/**
 * The theme store: the ONE theme source for every component.
 *
 * The truth is the `dark` class on <html>. The pre-paint script (lib/prepaint.js,
 * injected by vite.config.js) sets it before the first paint; this module only observes
 * and changes it, so React state can never disagree with what is on screen.
 *
 *   const dark = useIsDark()
 *   setTheme(dark ? 'light' : 'dark')
 *
 * While anything is subscribed, it also follows:
 *   - any writer of <html class> (a MutationObserver, so devtools and scripts count too)
 *   - another tab changing the stored theme (`storage` events for the theme key ONLY)
 *   - the OS switching between light and dark, when no theme has been stored
 */

const listeners = new Set()
let unbind = null

const notify = () => listeners.forEach((listener) => listener())
const reapply = () => applyTheme(readTheme(cfg), cfg)

function bind() {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  // key === null means localStorage.clear() in another tab.
  const onStorage = (event) => {
    if (event.key === cfg.themeKey || event.key === null) reapply()
  }
  const scheme = window.matchMedia('(prefers-color-scheme: light)')
  window.addEventListener('storage', onStorage)
  scheme.addEventListener('change', reapply)

  return () => {
    observer.disconnect()
    window.removeEventListener('storage', onStorage)
    scheme.removeEventListener('change', reapply)
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

const getSnapshot = () => document.documentElement.classList.contains('dark')
// Both HTML entries ship <html class="dark">, so dark is the pre-hydration truth.
const getServerSnapshot = () => true

/** @returns {boolean} true while the dark theme is active. */
export function useIsDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Stores the choice and applies it: <html class> plus <meta name="theme-color">. */
export function setTheme(theme /* 'dark' | 'light' */) {
  try {
    window.localStorage.setItem(cfg.themeKey, theme)
  } catch {
    // Private mode or blocked storage: the choice still applies to this page.
  }
  applyTheme(theme, cfg)
}
