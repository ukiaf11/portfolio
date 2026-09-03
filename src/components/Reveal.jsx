import { useEffect, useRef, useState } from 'react'

/**
 * Fades + lifts children into view once, the first time they cross the viewport.
 *
 * threshold is 0, not a ratio, and that is deliberate. intersectionRatio is measured
 * against the TARGET's own box, so it is capped at rootHeight / targetHeight: a target
 * taller than 1/ratio viewports can NEVER reach a ratio threshold, and Chrome derives
 * isIntersecting from the threshold index — so such a target stays at opacity 0 forever
 * while its links stay in the tab order. That bites at 400% zoom (WCAG 1.4.10 Reflow),
 * and it bit the tallest wrappers here: Services, Projects, and Contact at the page end.
 * The negative bottom rootMargin already supplies the "has meaningfully entered" trigger,
 * so a ratio buys nothing and is unsafe for any target that can outgrow the viewport.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', threshold = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(node)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
