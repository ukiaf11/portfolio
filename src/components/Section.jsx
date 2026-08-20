import Reveal from './Reveal'

/** Consistent section frame: numbered eyebrow, title, optional lead paragraph. */
export default function Section({ id, eyebrow, title, lead, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.22em] text-brand-400 uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-[clamp(1.9rem,5vw,3rem)] font-bold">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{lead}</p>}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-400/60 via-[var(--line)] to-transparent" />
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  )
}
