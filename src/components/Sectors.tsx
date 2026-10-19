import { sectors, images } from '@/lib/content';
import { useReveal } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function Sectors() {
  const { ref, isVisible } = useReveal({ threshold: 0.08 });
  const { t } = useLanguage();

  return (
    <section id="sectors" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.08] mix-blend-overlay" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} max-w-2xl`}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
            {t('sectorsTag')}
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {t('sectorsTitle')}
            <span className="text-gradient-steel">{t('backbone')}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-200">
            {t('sectorsBody')}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <SectorCard key={s.id} id={s.id} name={s.name} blurb={s.blurb} icon={s.icon} index={i} />
          ))}
        </div>

        {/* Wide feature banner */}
        <FeatureBanner />
      </div>
    </section>
  );
}

function SectorCard({
  id, name, blurb, icon: Icon, index,
}: { id: string; name: string; blurb: string; icon: typeof sectors[number]['icon']; index: number }) {
  const { ref, isVisible } = useReveal({ threshold: 0.25 });
  const { localName } = useLanguage();
  return (
    <div
      ref={ref}
      id={id}
      className={`card-hover group relative overflow-hidden rounded-3xl glass-dark p-6 reveal ${
        isVisible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-steel-500/0 to-steel-500/0 transition-all duration-700 group-hover:from-steel-500/10 group-hover:to-transparent" />
      <Icon className="h-7 w-7 text-steel-300 transition-transform duration-500 group-hover:scale-110" />
      <h3 className="relative mt-4 text-base font-semibold tracking-tight text-white">{localName(id, name, 'sector')}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-ink-300">{blurb}</p>
      <div className="relative mt-4 h-px w-12 bg-gradient-to-r from-steel-400 to-transparent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

function FeatureBanner() {
  const { ref, isVisible } = useReveal({ threshold: 0.15 });
  const { t } = useLanguage();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} relative mt-6 overflow-hidden rounded-3xl border border-white/10`}
    >
      <img
        src={images.portCranes}
        alt="Cranes at an industrial port under a clear blue sky"
        className="h-72 w-full object-cover sm:h-96"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-14">
        <span className="text-xs uppercase tracking-[0.22em] text-steel-300">{t('tangerReady')}</span>
        <h3 className="mt-3 max-w-xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {t('marineTitle')}
        </h3>
        <p className="mt-3 max-w-lg text-sm text-ink-200">
          Spreaders, slings and rigging certified by DNV and Bureau Veritas — supplied directly to
          terminal operators at Tanger-Med.
        </p>
      </div>
    </div>
  );
}
