import {
  Boxes, MessagesSquare, UtensilsCrossed, Repeat, Sprout, Github, Star, ArrowUpRight,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { projects, profile } from '../data/profile'

const ICONS = { Boxes, MessagesSquare, UtensilsCrossed, Repeat, Sprout }

function ProjectCard({ project, index }) {
  const Icon = ICONS[project.icon] ?? Boxes
  const featured = project.featured

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl surface card-glow p-6 transition-colors hover:bg-[var(--card-hover)] sm:p-7 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Ghost index numeral — omitted on the featured card, where the badge sits in that corner */}
      {!featured && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-3 font-mono text-[6rem] font-bold leading-none opacity-[0.045] transition-opacity duration-500 group-hover:opacity-[0.09]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-teal-400/12 text-brand-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <Icon size={22} />
        </span>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-400/12 px-2.5 py-1 font-mono text-[11px] font-medium text-brand-400">
            <Star size={11} className="fill-current" />
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug sm:text-xl">{project.name}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">{project.tagline}</p>

      <ul className={`mt-5 space-y-2.5 ${featured ? 'sm:columns-2 sm:gap-6 sm:space-y-0' : ''}`}>
        {project.points.map((point) => (
          <li
            key={point}
            className={`flex gap-2.5 text-[13.5px] leading-relaxed text-muted ${
              featured ? 'sm:mb-2.5 sm:break-inside-avoid' : ''
            }`}
          >
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand-400" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border px-2 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-brand-400/25"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've architected and shipped"
      lead="Platforms built end to end — from the credit engine that prices every transaction, to embeddable assistants other businesses drop into their own sites."
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={(i % 2) * 90}
            className={project.featured ? 'lg:col-span-2' : ''}
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-6 flex items-center justify-between gap-4 rounded-2xl surface card-glow p-6 transition-colors hover:bg-[var(--card-hover)]"
        >
          <span className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-400/12 text-brand-400 transition-transform group-hover:scale-110">
              <Github size={22} />
            </span>
            <span>
              <span className="block text-[15px] font-semibold">More on GitHub</span>
              <span className="block font-mono text-[12.5px] text-muted">github.com/ukiaf11</span>
            </span>
          </span>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400"
          />
        </a>
      </Reveal>
    </Section>
  )
}
