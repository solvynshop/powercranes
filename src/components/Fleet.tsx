import { ArrowRight } from 'lucide-react';
import { fleet, type CraneClass } from '@/lib/fleet';
import { useI18n } from '@/i18n';
import { useQuote } from '@/lib/quote';
import { Crane } from './Crane';
import { Reveal, SectionHead } from './Section';

/** Small illustrative crane for a fleet card: more axles and a longer boom as the class grows. */
function FleetArt({ crane, index }: { crane: CraneClass; index: number }) {
  const cs = 0.55;
  const angle = 48;
  const boomPx = 88 + index * 10;
  const left = (70 + crane.axles * 14) * cs;
  const reach = Math.max(110 * cs, boomPx * Math.cos((angle * Math.PI) / 180));
  const pivotX = (360 - (left + reach)) / 2 + left;

  return (
    <svg viewBox="0 0 360 170" className="h-full w-full" aria-hidden="true" focusable="false" dir="ltr">
      <Crane
        x={pivotX}
        ground={150}
        cs={cs}
        axles={crane.axles}
        boomPx={boomPx}
        angle={angle}
        ropeLength={50}
        tone="dark"
      />
      <line x1="0" y1="150" x2="360" y2="150" stroke="#3C5E9E" strokeWidth="2" />
    </svg>
  );
}

function FleetCard({ crane, index }: { crane: CraneClass; index: number }) {
  const { t } = useI18n();
  const { setDraft } = useQuote();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-500">
      <div className="blueprint h-44 bg-navy-950 sm:h-48">
        <FleetArt crane={crane} index={index} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-end justify-between gap-3">
          <p className="font-display text-5xl font-extrabold leading-none text-navy-900">
            {crane.tons}
            <span className="ms-1.5 text-2xl text-brand-600">{t.units.t}</span>
          </p>
          <p className="caps pb-1 font-mono text-[11px] font-semibold text-navy-400">{t.fleet.capacity}</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-navy-100 py-3">
          <div>
            <dt className="caps font-mono text-[11px] font-semibold text-navy-400">{t.fleet.boom}</dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold text-navy-900">
              {crane.boom} {t.units.m}
            </dd>
          </div>
          <div>
            <dt className="caps font-mono text-[11px] font-semibold text-navy-400">{t.fleet.axles}</dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold text-navy-900">{crane.axles}</dd>
          </div>
        </dl>

        <p className="caps mt-4 font-mono text-[11px] font-semibold text-brand-700">{t.fleet.bestFor}</p>
        <p className="mt-1 flex-1 text-base leading-relaxed text-navy-700">{t.fleet.use[crane.id]}</p>

        <a href="#quote" onClick={() => setDraft({ craneId: crane.id })} className="btn btn-dark mt-5 w-full">
          {t.fleet.cta}
          <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Fleet() {
  const { t } = useI18n();

  return (
    <section id="fleet" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="01" tag={t.fleet.tag} title={t.fleet.title} intro={t.fleet.intro} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((crane, i) => (
            <Reveal key={crane.id} className="h-full" delay={(i % 3) * 80}>
              <FleetCard crane={crane} index={i} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-navy-500">{t.fleet.note}</p>
      </div>
    </section>
  );
}
