import { useEffect, useState } from 'react'
import { ArrowDown, Github, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { profile, highlights, marqueeTech } from '../data/profile'

/** Types a word out, holds, deletes, moves to the next. */
function useTypedRole(words, { typeMs = 85, deleteMs = 40, holdMs = 1700 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}

export default function Hero() {
  const typed = useTypedRole(profile.roles)

  return (
    <section id="top" className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8">
      <div className="reveal is-visible">
        <span className="inline-flex items-center gap-2 rounded-full surface px-3.5 py-1.5 font-mono text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          Available for opportunities
        </span>

        <h1 className="mt-7 text-[clamp(2.5rem,8vw,5.25rem)] font-extrabold leading-[0.98]">
          Upendra 
          <span className="gradient-text"> Kumar</span>
        </h1>

        <p className="mt-5 font-mono text-[clamp(1rem,3.2vw,1.5rem)] text-muted" aria-label={profile.role}>
          <span className="text-brand-400">&gt;</span>{' '}
          <span className="text-[var(--fg)]">{typed}</span>
          <span className="ml-0.5 inline-block w-[2px] animate-blink bg-brand-400 align-middle" style={{ height: '1.1em' }} />
        </p>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          I build <span className="text-[var(--fg)]">scalable microservices</span>, complex{' '}
          <span className="text-[var(--fg)]">multi-tenant SaaS architectures</span>, and{' '}
          <span className="text-[var(--fg)]">AI-integrated products</span> — robust Django backends
          paired with dynamic React frontends.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35"
          >
            <Sparkles size={16} />
            View my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl surface px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-[var(--card-hover)]"
          >
            <Mail size={16} />
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="grid h-11 w-11 place-items-center rounded-xl surface transition-all hover:-translate-y-0.5 hover:bg-[var(--card-hover)]"
          >
            <Github size={18} />
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted sm:text-[13px]">
          <li className="inline-flex items-center gap-2"><MapPin size={14} className="text-brand-400" />{profile.location}</li>
          <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-400"><Mail size={14} className="text-brand-400" />{profile.email}</a></li>
          <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-400"><Phone size={14} className="text-brand-400" />{profile.phone}</a></li>
        </ul>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <div
            key={h.label}
            className="reveal is-visible surface card-glow rounded-2xl p-4 sm:p-5"
            style={{ transitionDelay: `${200 + i * 90}ms` }}
          >
            <dt className="gradient-text font-mono text-2xl font-bold sm:text-3xl">{h.value}</dt>
            <dd className="mt-1 text-xs leading-snug text-muted sm:text-[13px]">{h.label}</dd>
          </div>
        ))}
      </dl>

      {/* Tech marquee */}
      <div className="marquee-mask mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-2.5 hover:[animation-play-state:paused]">
          {[...marqueeTech, ...marqueeTech].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="shrink-0 rounded-lg surface px-3 py-1.5 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="mx-auto mt-12 hidden animate-bounce text-muted transition-colors hover:text-brand-400 sm:block"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
