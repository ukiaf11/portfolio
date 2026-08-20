import { Mail, Phone, MapPin, Github, Download, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { profile } from '../data/profile'

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: Github, label: 'GitHub', value: 'github.com/ukiaf11', href: profile.github, external: true },
  { icon: MapPin, label: 'Location', value: profile.location },
]

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl surface p-8 text-center sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-[90px]"
            style={{ background: 'var(--glow-a)' }}
          />

          <div className="relative">
            <p className="font-mono text-xs tracking-[0.22em] text-brand-400 uppercase">06 — Contact</p>
            <h2 className="mt-3 text-[clamp(1.9rem,5vw,3rem)] font-bold">
              Let's build something <span className="gradient-text">that scales</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              Open to full stack roles and freelance work — especially anything involving Django
              backends, microservices or AI integration. The fastest way to reach me is email.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35"
              >
                <Mail size={16} />
                {profile.email}
              </a>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl surface px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-[var(--card-hover)]"
              >
                <Download size={16} />
                Download résumé
              </a>
            </div>

            <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-400/12 text-brand-400">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block font-mono text-[11px] tracking-wider text-muted uppercase">{label}</span>
                      <span className="block truncate text-[13.5px]">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight
                        size={16}
                        className="ml-auto shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400"
                      />
                    )}
                  </>
                )
                const cls =
                  'group flex w-full items-center gap-3 rounded-xl border p-3.5 transition-colors hover:bg-[var(--card-hover)]'
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className={cls}
                        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
