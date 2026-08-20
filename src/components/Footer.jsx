import { ArrowUp, Github, Mail } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-center font-mono text-xs text-muted sm:text-left">
          © {new Date().getFullYear()} {profile.name} · Built with React, Vite &amp; Tailwind CSS
        </p>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="grid h-9 w-9 place-items-center rounded-lg border text-muted transition-colors hover:bg-[var(--card-hover)] hover:text-brand-400"
          >
            <Github size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send an email"
            className="grid h-9 w-9 place-items-center rounded-lg border text-muted transition-colors hover:bg-[var(--card-hover)] hover:text-brand-400"
          >
            <Mail size={16} />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-lg border text-muted transition-colors hover:bg-[var(--card-hover)] hover:text-brand-400"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
