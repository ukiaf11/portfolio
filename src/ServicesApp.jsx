import { ArrowLeft, Mail, Sparkles } from 'lucide-react'
import Background from './components/Background'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WebsiteTypes from './components/WebsiteTypes'
import Services from './components/Services'
import { profile, servicesPage } from './data/profile'

/**
 * The standalone /services/ page.
 *
 * A real second HTML entry (see vite.config.js), not a client-side route: it gets its
 * own <title>, meta description and canonical URL, and neither page ships the other's
 * JavaScript. `Nav standalone` makes the section links point back at the home page.
 */
export default function ServicesApp() {
  return (
    <>
      <Background />
      <Nav standalone current="services" />

      <main id="main">
        <header className="mx-auto max-w-6xl px-5 pt-32 pb-4 sm:px-8 sm:pt-40">
          <div className="reveal is-visible">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-brand-400"
            >
              <ArrowLeft size={14} />
              Back to the portfolio
            </a>

            <h1 className="mt-6 text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.05] font-extrabold">
              Websites, and the{' '}
              <span className="gradient-text">software behind them</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              {servicesPage.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35"
              >
                <Sparkles size={16} />
                What I take on
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl surface px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-[var(--card-hover)]"
              >
                <Mail size={16} />
                Start a conversation
              </a>
            </div>
          </div>
        </header>

        <WebsiteTypes />
        <Services />
      </main>

      <Footer />
    </>
  )
}
