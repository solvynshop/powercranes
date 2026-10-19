import { images } from '@/lib/content';
import { useReveal } from '@/lib/hooks';
import { Boxes, Gauge, ShieldCheck, Globe2 } from 'lucide-react';

export function FeatureSplit() {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <div className={`relative reveal ${isVisible ? 'is-visible' : ''}`}>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <img
                src={images.warehouse}
                alt="Industrial warehouse with overhead cranes"
                className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            </div>

            {/* Small inset */}
            <div className="absolute -bottom-6 -right-3 hidden w-44 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:block">
              <img src={images.gears} alt="Industrial gears" className="h-32 w-full object-cover" />
            </div>
          </div>

          {/* Text side */}
          <div className={`reveal ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.12s' }}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
              Why Power Cranes
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Reliability, safety,
              <span className="text-gradient-steel"> and compliance</span> — built in.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-200">
              Heavy industry cannot afford downtime. Every shipment we deliver is engineered, checked,
              and certified to keep your operations running — and your people safe.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Certified quality', text: 'EN 12385, DIN, ISO and DNV/BV compliant sourcing.' },
                { icon: Gauge, title: 'Fast lead times', text: '15–45 day delivery on most critical spare parts.' },
                { icon: Globe2, title: 'Import & customs', text: 'We handle freight, paperwork and Moroccan customs.' },
                { icon: Boxes, title: 'On-site stock', text: 'Tanger warehouse holds high-rotation components.' },
              ].map((f) => (
                <div key={f.title} className="glass rounded-2xl p-4">
                  <f.icon className="h-5 w-5 text-steel-300" />
                  <div className="mt-2.5 text-sm font-semibold text-white">{f.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-ink-300">{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
