import { useEffect, useRef, useState } from 'react'

/**
 * Lifts children into view once, the first time they cross the viewport.
 *
 *   <Reveal>…</Reveal>
 *   <Reveal as="li" delay={i * 80} className="pillar-wrap" id="…" aria-label="…">…</Reveal>
 *
 * Any other prop (id, aria-*, data-*, event handlers) is forwarded to the element; `style`
 * is merged with the stagger variable rather than replaced.
 *
 * The wrapper only ever TRANSFORMS. It never carries opacity, will-change, filter or mask,
 * because each of those turns it into a backdrop root and every glass surface inside it
 * loses its blur. The fade is done in CSS (styles/ui.css): a wrapper with no glass inside
 * fades as a whole, a wrapper with glass inside fades each glass surface individually.
 * The stagger is a custom property so the CSS fade and the transform share one delay.
 *
 * threshold is 0, not a ratio, and that is deliberate. intersectionRatio is measured
 * against the TARGET's own box, so it is capped at rootHeight / targetHeight: a target
 * taller than 1/ratio viewports can NEVER reach a ratio threshold, and Chrome derives
 * isIntersecting from the threshold index, so such a target stays hidden forever
 * while its links stay in the tab order. That bites at 400% zoom (WCAG 1.4.10 Reflow).
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  threshold = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  return (
    <Tag
      {...rest}
      ref={ref}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      className={['reveal', visible && 'is-visible', className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  )
}
