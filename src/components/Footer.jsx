import { ArrowUp, ArrowUpRight, Github, Mail } from 'lucide-react'
import LiquidGlass from './glass/LiquidGlass'
import GlassPreference from './glass/GlassPreference'
import { profile } from '../data/profile'

/**
 * The site footer, shared by both pages (styles/sections/footer.css).
 *
 * A bottom toolbar that answers the floating one at the top: ONE frosted bar (a full
 * capsule on wide screens) with faux capsule controls inside, so the footer costs a
 * single backdrop-filter pass. It holds the social links, the "Reduce transparency"
 * switch, the credits and Back to top.
 *
 * DOM order is the focus order on every layout (GitHub, Email, the switch, Back to top);
 * CSS grid areas only move the credits, which hold nothing focusable.
 *
 * "Back to top" targets #main, which exists on both pages (#top is only on the home
 * page's hero).
 */

const BUILT_WITH = ['React', 'Vite', 'Tailwind CSS']

export default function Footer() {
  const year = new Date().getFullYear()
  const capsule = 'btn glass glass-capsule glass-interactive footer-btn'

  return (
    <footer className="site-footer">
      <LiquidGlass tier="frost" className="footer-bar">
        <ul className="footer-links" aria-label="Elsewhere">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={capsule}>
              <Github size={16} strokeWidth={2.1} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={14} strokeWidth={2.3} aria-hidden="true" className="footer-btn__out" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className={capsule}>
              <Mail size={16} strokeWidth={2.1} aria-hidden="true" />
              Email
            </a>
          </li>
        </ul>

        <div className="footer-pref">
          <GlassPreference className="footer-switch" />
        </div>

        <p className="footer-credit">
          <span className="footer-credit__copy">
            © {year} {profile.name}
          </span>
          <span className="footer-credit__built">
            <span>Built with</span>
            {BUILT_WITH.map((t, i) => (
              <span key={t} className="chip footer-chip">
                {t}
                {i < BUILT_WITH.length - 1 && <span className="sr-only">,</span>}
              </span>
            ))}
          </span>
        </p>

        <a href="#main" className={`${capsule} footer-top`}>
          <ArrowUp size={16} strokeWidth={2.2} aria-hidden="true" />
          Back to top
        </a>
      </LiquidGlass>
    </footer>
  )
}
