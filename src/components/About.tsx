import { ArrowRight } from 'lucide-react';
import { images } from '@/lib/content';
import { useReveal, scrollToId } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function About() {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-steel-700/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
              {t('aboutTag')}
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t('aboutTitle')}
              <span className="text-gradient-steel">{t('aboutAccent')}</span>{t('aboutEnd')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-200">
              {t('aboutBody')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-300">
              {t('aboutBody2')}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { k: t('headquarters'), v: '183 Av. Prince Héritier, Centre Nrea RDC, Local N°15, Tanger-Médina' },
                { k: t('legal'), v: 'SARL AU · B2B Import-Export' },
                { k: t('served'), v: 'Industrial · Automotive · Logistics' },
                { k: t('online'), v: 'powercranesma.com' },
              ].map((item) => (
                <div key={item.k} className="glass rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-steel-300">{item.k}</div>
                  <div className="mt-1.5 text-sm font-medium text-white">{item.v}</div>
                </div>
              ))}
            </div>

            <button onClick={() => scrollToId('contact')} className="btn-ghost mt-8">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Visual */}
          <div className={`relative reveal ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <img
                src={images.cable}
                alt="Industrial crane structure against the sky"
                className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
            </div>

            {/* Floating glass card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 w-[78%] max-w-xs">
              <div className="glass-strong rounded-2xl p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-steel-500/20 text-steel-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 L12 22" />
                      <path d="M5 18 L12 5 L19 18" />
                      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t('reliability')}</div>
                    <div className="text-xs text-ink-300">{t('fromSourcing')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating mini badge */}
            <div className="absolute -top-5 -right-3 glass rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-2xl font-bold text-gradient-amber leading-none">15-45d</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-ink-300">{t('leadTime')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
