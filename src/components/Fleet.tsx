import { ArrowRight } from 'lucide-react';
import { fleet } from '@/lib/fleet';
import { useI18n } from '@/i18n';
import { useQuote } from '@/lib/quote';
import { Reveal, SectionHead } from './Section';

export function Fleet() {
  const { t } = useI18n();
  const { setDraft } = useQuote();
  const crane = fleet[0];

  return (
    <section id="fleet" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="01" tag={t.fleet.tag} title={t.fleet.title} intro={t.fleet.intro} />

        <Reveal>
          <article className="grid overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card lg:grid-cols-[1.25fr_1fr]">
            <div className="blueprint relative flex items-center justify-center bg-navy-950 px-4 py-10 sm:px-10">
              <div className="absolute left-1/2 top-1/2 h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[80px]" aria-hidden="true" />
              <img
                src="/brand/crane-100t.webp"
                alt={t.hero.alt}
                width={1100}
                height={438}
                loading="lazy"
                className="relative w-full max-w-xl drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-end justify-between gap-3">
                <p className="font-display text-7xl font-extrabold leading-none text-navy-900">
                  {crane.tons}
                  <span className="ms-2 text-3xl text-brand-600">{t.units.t}</span>
                </p>
                <p className="caps pb-2 font-mono text-[11px] font-semibold text-navy-400">{t.fleet.capacity}</p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-navy-100 py-4">
                <div>
                  <dt className="caps font-mono text-[11px] font-semibold text-navy-400">{t.fleet.boom}</dt>
                  <dd className="mt-0.5 font-mono text-xl font-semibold text-navy-900" dir="ltr">
                    {crane.boom} {t.units.m}
                  </dd>
                </div>
                <div>
                  <dt className="caps font-mono text-[11px] font-semibold text-navy-400">{t.fleet.axles}</dt>
                  <dd className="mt-0.5 font-mono text-xl font-semibold text-navy-900">{crane.axles}</dd>
                </div>
              </dl>

              <p className="caps mt-5 font-mono text-[11px] font-semibold text-brand-700">{t.fleet.bestFor}</p>
              <p className="mt-1 flex-1 text-lg leading-relaxed text-navy-700">{t.fleet.use[crane.id]}</p>

              <a href="#quote" onClick={() => setDraft({ craneId: crane.id })} className="btn btn-dark mt-6 w-full">
                {t.fleet.cta}
                <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </div>
          </article>
        </Reveal>
        <p className="mt-6 text-sm text-navy-500">{t.fleet.note}</p>
      </div>
    </section>
  );
}
