import { ArrowRight, ChevronDown, ShieldCheck, Truck, Globe2 } from 'lucide-react';
import { images, stats } from '@/lib/content';
import { useMouseParallax, scrollToId } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function Hero() {
  const mouse = useMouseParallax();
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.heroCrane}
          alt="Industrial tower cranes against a bright sky"
          className="h-full w-full object-cover scale-110"
          style={{ transform: `scale(1.1) translate(${mouse.x * -14}px, ${mouse.y * -14}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/65 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
      </div>

      {/* Floating glass orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[12%] top-[22%] h-72 w-72 rounded-full bg-steel-500/20 blur-3xl animate-float-slow"
          style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }}
        />
        <div
          className="absolute right-[14%] top-[34%] h-80 w-80 rounded-full bg-amber-500/10 blur-3xl animate-float-slower"
          style={{ transform: `translate(${mouse.x * -40}px, ${mouse.y * -20}px)` }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-ink-200 animate-fade-in"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success-400" />
            </span>
            {t('heroEyebrow')}
          </div>

          <h1
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t('heroTitle1')}
            <br />
            <span className="shimmer-text">{t('heroTitle2')}</span>
            <br />
            {t('heroTitle3')}
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg animate-fade-up"
            style={{ animationDelay: '0.25s' }}
          >
            {t('heroBody')}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button onClick={() => scrollToId('products')} className="btn-primary">
              {t('explore')}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId('contact')} className="btn-ghost">
              {t('request')}
            </button>
          </div>

          {/* Trust chips */}
          <div
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            {[
              { icon: ShieldCheck, label: t('compliant') },
              { icon: Truck, label: t('delivery') },
              { icon: Globe2, label: t('customs') },
            ].map((chip) => (
              <div key={chip.label} className="flex items-center gap-2 text-sm text-ink-300">
                <chip.icon className="h-4 w-4 text-steel-300" />
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass-dark rounded-t-3xl border-b-0 px-6 py-5 sm:px-10 sm:py-6">
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="text-center sm:text-left animate-fade-up"
                  style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                >
                  <dt className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs text-ink-300 sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollToId('about')}
        className="absolute left-1/2 top-[88%] z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-400 transition-colors hover:text-white sm:flex"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">{t('scroll')}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
