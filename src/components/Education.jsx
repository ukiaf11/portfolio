import { GraduationCap, Award } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { education, certifications } from '../data/profile'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Learning, formal and otherwise"
      lead="A computer applications master's in progress, on top of a full stack development track."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-wide uppercase">
            <GraduationCap size={17} className="text-brand-400" />
            Academic
          </h3>
          <ol className="mt-6 relative space-y-4 border-l pl-6">
            {education.map((item, i) => (
              <Reveal key={item.degree} as="li" delay={i * 80} className="relative">
                <span className="absolute -left-[calc(1.5rem+5px)] top-3 h-2.5 w-2.5 rounded-full bg-brand-400/70 ring-4 ring-[var(--bg)]" />
                <div className="rounded-xl surface p-4 transition-colors hover:bg-[var(--card-hover)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-[14.5px] font-semibold">{item.degree}</h4>
                    <span className={`font-mono text-[11.5px] ${item.current ? 'text-teal-400' : 'text-muted'}`}>
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted">{item.school}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-wide uppercase">
            <Award size={17} className="text-teal-400" />
            Certifications & Courses
          </h3>
          <ul className="mt-6 space-y-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} as="li" delay={i * 90}>
                <div className="group rounded-xl surface card-glow p-5 transition-colors hover:bg-[var(--card-hover)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-[15px] font-semibold">{cert.name}</h4>
                    <span className="font-mono text-[11.5px] text-muted">{cert.period}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-muted">{cert.issuer}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
