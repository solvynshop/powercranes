import { ArrowUp } from 'lucide-react';
import { scrollToId } from '@/lib/hooks';
import { navLinks } from '@/lib/content';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-steel-500 to-steel-800">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 18 L12 5 L19 18" className="text-white" />
                  <path d="M12 5 V20" className="text-amber-300" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-bold text-white">Power Cranes</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-steel-300/80">SARL AU · Morocco</div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              Specialized B2B supply of heavy lifting components, crane spare parts, and industrial
              material-handling equipment — bridging world-class manufacturers and Morocco's industry.
            </p>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-2 lg:grid lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-steel-300">Navigation</div>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-ink-300 transition-colors hover:text-white"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-xs uppercase tracking-[0.18em] text-steel-300">Contact</div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
                <li>183 Av. Prince Héritier, Local N°15</li>
                <li>Centre Nrea RDC, Tanger-Médina</li>
                <li className="text-white">contact@powercranesma.com</li>
                <li className="text-white">+212 5 39 00 00 00</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-steel-300">Ready to source?</div>
            <p className="mt-4 text-sm text-ink-300">Get a tailored quote within one business day.</p>
            <button onClick={() => scrollToId('contact')} className="btn-primary mt-4 w-full">
              Request a quote
            </button>
          </div>
        </div>

        <div className="divider-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Power Cranes SARL AU · powercranesma.com · All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-ink-200 transition-all hover:text-white hover:bg-white/[0.1]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
