import {
  ArrowDown, ArrowUp, ChevronDown, Container, Database,
  MonitorSmartphone, Plug, Server, Sparkles, TerminalSquare,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { skills } from '../data/profile'

const ICONS = {
  MonitorSmartphone, Server, Database, Container, Plug, Sparkles, TerminalSquare,
}

/**
 * One technology node. `core` items get a filled dot, heavier weight and a tinted
 * plate — never colour alone: the dot is a shape cue and the legend names it.
 */
function Chip({ name, core = false }) {
  return (
    <li className={core ? 'stack-chip stack-chip--core' : 'stack-chip'}>
      {core && <span aria-hidden="true" className="stack-chip__dot" />}
      {name}
      {core && <span className="sr-only"> — core</span>}
    </li>
  )
}

/** A horizontal band of the runtime stack: label rail on the left, nodes on the right. */
function LayerRow({ layer }) {
  const Icon = ICONS[layer.icon] ?? Server
  const primary = Boolean(layer.primary)

  return (
    <div className={`stack-layer group p-4 sm:p-5 ${primary ? 'stack-layer--core' : ''}`}>
      <span aria-hidden="true" className="stack-layer__edge" />

      <div className="grid gap-3 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-start sm:gap-5">
        <div className="flex items-start gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-brand-400 transition-transform duration-300 group-hover:scale-110 ${
              primary ? 'from-brand-400/30 to-teal-400/16' : 'from-brand-400/14 to-teal-400/10'
            }`}
          >
            <Icon size={17} />
          </span>

          <div className="min-w-0">
            <h4 className="text-[14px] font-semibold leading-tight">{layer.name}</h4>
            <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              {layer.role}
            </p>
            {primary && (
              <span className="mt-2 inline-block rounded-full bg-brand-400/14 px-2 py-[3px] font-mono text-[10px] font-medium text-brand-400">
                primary focus
              </span>
            )}
          </div>
        </div>

        <ul className="flex flex-wrap gap-1.5 sm:gap-2">
          {layer.items.map((item) => (
            <Chip key={item.name} name={item.name} core={item.core} />
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Flow marker drawn between two layers. */
function Connector() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-1">
      <span className="h-3 w-px bg-[var(--line)]" />
      <ChevronDown size={14} strokeWidth={2.2} className="-my-1 text-brand-400/70" />
      <span className="h-3 w-px bg-[var(--line)]" />
    </div>
  )
}

/** A capability that hangs off the stack rather than sitting inside it. */
function AttachedNode({ node }) {
  const Icon = ICONS[node.icon] ?? Plug

  return (
    <article className="stack-node group relative flex h-full flex-col rounded-2xl surface card-glow p-5 transition-colors hover:bg-[var(--card-hover)]">
      {/* "plugged into the stack" tick — desktop only, drawn into the column gap */}
      <span
        aria-hidden="true"
        className="absolute top-9 -left-5 hidden w-5 border-t border-dashed border-teal-400/40 lg:block"
      />
      <span
        aria-hidden="true"
        className="absolute top-9 -left-[3px] hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal-400/70 lg:block"
      />

      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-teal-400/18 to-brand-400/10 text-teal-400 transition-transform duration-300 group-hover:scale-110">
          <Icon size={17} />
        </span>
        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold leading-tight">{node.name}</h4>
          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            {node.role}
          </p>
        </div>
      </div>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {node.items.map((item) => (
          <Chip key={item} name={item} />
        ))}
      </ul>
    </article>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title="The stack, layer by layer"
      lead="Drawn the way I actually build: a thin React client over a Django service layer, PostgreSQL and Redis holding state, Docker and Git underneath — with integrations, model APIs and my day-to-day tooling plugged in at the edges."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-5">
        {/* ---------- the runtime stack ---------- */}
        <div className="flex flex-col gap-3">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-brand-400 uppercase">
                Runtime stack
              </h3>
              <p
                aria-hidden="true"
                className="flex items-center gap-1.5 font-mono text-[11px] text-muted"
              >
                <ArrowDown size={11} className="text-brand-400" />
                request
                <span className="px-0.5 opacity-40">·</span>
                <ArrowUp size={11} className="text-teal-400" />
                response
              </p>
            </div>
          </Reveal>

          <Reveal delay={60} className="flex-1">
            <ol className="h-full rounded-2xl surface card-glow p-3 sm:p-4">
              {skills.stack.map((layer, i) => (
                <li key={layer.id}>
                  <LayerRow layer={layer} />
                  {i < skills.stack.length - 1 && <Connector />}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* ---------- everything that attaches to it ---------- */}
        <div className="flex flex-col gap-3">
          <Reveal delay={80}>
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-teal-400 uppercase">
              Attached to the stack
            </h3>
          </Reveal>

          <div className="grid flex-1 gap-4 sm:grid-cols-3 lg:flex lg:flex-col lg:justify-between">
            {skills.attached.map((node, i) => (
              <Reveal key={node.id} delay={120 + i * 80}>
                <AttachedNode node={node} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- legend: what the weighting means ---------- */}
      <Reveal delay={160}>
        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-xl border border-dashed px-4 py-3.5">
          <p className="flex items-center gap-2.5 text-[12.5px] leading-snug text-muted">
            <span className="stack-chip stack-chip--core">
              <span aria-hidden="true" className="stack-chip__dot" />
              Core
            </span>
            what I build with every day
          </p>
          <p className="flex items-center gap-2.5 text-[12.5px] leading-snug text-muted">
            <span className="stack-chip">Supporting</span>
            solid working knowledge, used where it fits
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
