import { partnerBrands } from '@/lib/content';
import { useLanguage } from '@/lib/i18n';

export function Partners() {
  const { language } = useLanguage();
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 to-ink-900" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-ink-400">
          {language === 'fr' ? 'Sourcing auprès des leaders mondiaux' : "Sourcing from the world's leading manufacturers"}
        </p>

        <div className="mt-8 overflow-hidden mask-fade-x">
          <div className="marquee-track">
            {[...partnerBrands, ...partnerBrands].map((b, i) => (
              <div key={`${b.name}-${i}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-ink-200 transition-all hover:border-steel-400/30 hover:bg-white/[0.07] hover:text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-steel-500/30 to-steel-800/30 text-[10px] font-black text-steel-200 ring-1 ring-white/10">{b.name.slice(0, 2).toUpperCase()}</span>
                <span className="text-sm font-semibold tracking-tight sm:text-base">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
