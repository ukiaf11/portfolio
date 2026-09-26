// LiquidGlass.jsx: one component for every glass surface on the site. See DESIGN.md.
//
//   tier="faux"     tint + specular rim + sheen, NO backdrop-filter. Chips, tiles, list
//                   insets, small controls, and anything inside another glass surface.
//   tier="frost"    real backdrop blur in every engine. Content-layer panels and cards.
//                   Budget: 8 visible per viewport, the header's included.
//   tier="refract"  frost everywhere; Chromium desktop upgrades it to SVG refraction.
//                   The budget is FULL: nav capsule, theme toggle, hero CTA. Add no more.
//
//   variant="regular"    the default
//   variant="strong"     higher tint: sheets and cards that float over busy content
//   variant="legible"    frost for TEXT panels that overlap screenshots: higher tint plus
//                        a literal contrast(.7) in the backdrop, so a black or white
//                        screenshot cannot drag the panel into a grey smear
//   variant="prominent"  accent-tinted glass for the one primary action in a view
//
// Shape belongs to CSS. Faux and frost surfaces take their corner radius from the
// stylesheet (a --r-* token, or .glass-capsule for a pill), never from a prop.
// `radius` exists only for tier="refract": the lens map is computed from it, so it is
// also applied inline there, which keeps the lens and the visible shape identical.
//
// Refraction is Chromium-only and is applied ONLY as an inline style while
// html[data-glass="refract"]. Everything else keeps the literal frosted backdrop-filter
// from glass.css, so Safari and Firefox never lose their blur.
import { createElement, forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getDisplacementMap } from '../../lib/glass/displacementMap.js'
import { useGlassMode } from '../../lib/glass/glassMode.js'

const TIER_CLASS = { faux: 'glass', frost: 'glass glass-frost', refract: 'glass glass-refract' }
const VARIANT_CLASS = { regular: '', strong: 'glass-strong', legible: 'glass-legible', prominent: 'glass-prominent' }

const LiquidGlass = forwardRef(function LiquidGlass(
  {
    as = 'div',
    tier = 'frost',
    variant = 'regular',
    radius = null, // px, refract only (999 = capsule). Must match the rendered corner.
    bezel = 18, // refract: width of the curved rim that bends light
    thickness = 12, // refract: glass depth; bigger bends harder
    blur = 3, // refract: extra frost on top of the refraction (px)
    tone, // refract: backdrop tone; defaults to --glass-refract-tone
    interactive = false, // gel press + pointer-tracked sheen
    className = '',
    style,
    children,
    ...rest
  },
  forwardedRef
) {
  const ref = useRef(null)
  const setRef = useCallback(
    (node) => {
      ref.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef]
  )
  const id = 'lg' + useId().replace(/[^a-zA-Z0-9_-]/g, '') // React 18 ids contain ':'
  const mode = useGlassMode()
  const isRefract = tier === 'refract'
  const wantsRefraction = isRefract && radius != null && mode === 'refract'
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (!import.meta.env.DEV) return
    if (!TIER_CLASS[tier]) console.warn(`LiquidGlass: unknown tier "${tier}"`)
    if (VARIANT_CLASS[variant] === undefined) console.warn(`LiquidGlass: unknown variant "${variant}"`)
    if (tier === 'refract' && radius == null)
      console.warn('LiquidGlass: tier="refract" needs `radius` (the lens map is built from it). Rendering frost.')
    if (tier !== 'refract' && radius != null)
      console.warn(`LiquidGlass: \`radius\` is ignored on tier="${tier}". Set border-radius in CSS (a --r-* token).`)
  }, [tier, variant, radius])

  // Build (or reuse) the displacement map for the element's exact border-box size.
  // ResizeObserver ignores transforms, so hover/press scaling never rebuilds it.
  useEffect(() => {
    if (!wantsRefraction) {
      setMap(null)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const ro = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const box = entry.borderBoxSize?.[0]
        const w = Math.round(box ? box.inlineSize : el.offsetWidth)
        const h = Math.round(box ? box.blockSize : el.offsetHeight)
        if (w < 16 || h < 16) return
        setMap((prev) =>
          prev && prev.w === w && prev.h === h ? prev : getDisplacementMap(w, h, radius, bezel, thickness)
        )
      })
    })
    ro.observe(el, { box: 'border-box' })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [wantsRefraction, radius, bezel, thickness])

  // Pointer-tracked specular sheen: two custom properties, rAF-throttled, hover only.
  useEffect(() => {
    const el = ref.current
    if (!interactive || !el) return
    if (!matchMedia('(hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }
    el.addEventListener('pointermove', move, { passive: true })
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [interactive])

  const refracting = wantsRefraction && map
  const cls = [
    TIER_CLASS[tier] ?? TIER_CLASS.frost,
    VARIANT_CLASS[variant],
    interactive && 'glass-interactive',
    refracting && 'is-refracting',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const merged = isRefract && radius != null ? { ...style, borderRadius: radius } : style
  if (refracting) {
    // Chromium-only path (gated by data-glass="refract"), so var() is safe HERE and only here.
    merged.backdropFilter = `url(#${id}) blur(${blur}px) ${tone ?? 'var(--glass-refract-tone)'}`
  }

  return (
    <>
      {createElement(as, { ref: setRef, className: cls, style: merged, ...rest }, children)}
      {refracting &&
        createPortal(
          <svg
            aria-hidden="true"
            focusable="false"
            width="0"
            height="0"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
          >
            <filter
              id={id}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={map.href}
                x="0"
                y="0"
                width={map.w}
                height={map.h}
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={map.scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>,
          document.body
        )}
    </>
  )
})

export default LiquidGlass
export { LiquidGlass as Glass }
