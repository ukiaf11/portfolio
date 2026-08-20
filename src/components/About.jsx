import { Braces, Cpu, Layers, Lock } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { profile } from '../data/profile'

const pillars = [
  {
    icon: Layers,
    title: 'Microservice architecture',
    body: 'Splitting platforms into services that scale and deploy on their own terms, with a credit core holding the transaction lifecycle together.',
  },
  {
    icon: Braces,
    title: 'Django & DRF backends',
    body: 'Secure APIs, authentication systems and data models built to survive real multi-tenant traffic, not just a demo.',
  },
  {
    icon: Lock,
    title: 'Security & fintech',
    body: 'Double-entry ledgers, live currency conversion, Razorpay flows and credentials moved off .env into Google Secret Manager.',
  },
  {
    icon: Cpu,
    title: 'AI integration',
    body: 'Gemini and Claude APIs wired into products through Google AI Studio — assistants and automation that ship, not prototypes.',
  },
]

export default function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="Bridging infrastructure and experience">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <Reveal>
          <p className="text-base leading-relaxed text-muted sm:text-[17px]">{profile.summary}</p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">{profile.summaryTail}</p>

          <div className="mt-8 rounded-2xl surface p-5 font-mono text-[13px] leading-relaxed">
            <div className="flex gap-1.5 pb-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
            </div>
            <p><span className="text-muted">const</span> <span className="text-brand-400">focus</span> = {'{'}</p>
            <p className="pl-4"><span className="text-teal-400">backend</span>: <span className="text-muted">'Django · DRF · PostgreSQL'</span>,</p>
            <p className="pl-4"><span className="text-teal-400">frontend</span>: <span className="text-muted">'React'</span>,</p>
            <p className="pl-4"><span className="text-teal-400">scale</span>: <span className="text-muted">'microservices · multi-tenant'</span>,</p>
            <p className="pl-4"><span className="text-teal-400">edge</span>: <span className="text-muted">'AI integration · fintech'</span>,</p>
            <p>{'}'}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="group h-full rounded-2xl surface card-glow p-5 transition-colors hover:bg-[var(--card-hover)]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400/12 text-brand-400 transition-transform group-hover:scale-110">
                  <p.icon size={19} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
