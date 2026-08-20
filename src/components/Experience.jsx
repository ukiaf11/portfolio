import { Briefcase, CheckCircle2 } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { experience } from '../data/profile'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 — Experience"
      title="Where I've been building"
      lead="Shipping secure backend modules and APIs in a production team environment."
    >
      <ol className="relative space-y-8 border-l pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <Reveal key={job.company} as="li" delay={i * 100} className="relative">
            <span className="absolute -left-[calc(1.5rem+7px)] top-2 grid h-3.5 w-3.5 place-items-center sm:-left-[calc(2rem+7px)]">
              <span className="h-3.5 w-3.5 rounded-full bg-brand-400/25" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>

            <article className="rounded-2xl surface card-glow p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-400/12 text-brand-400">
                    <Briefcase size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold sm:text-lg">{job.company}</h3>
                    <p className="mt-0.5 text-sm text-brand-400">{job.title}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] text-muted">
                  {job.current && <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />}
                  {job.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                    <CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <li key={tech} className="rounded-md bg-brand-400/10 px-2 py-1 font-mono text-[11px] text-brand-400">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
