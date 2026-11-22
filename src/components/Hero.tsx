import { ArrowRight, CalendarClock, ClipboardCheck, Truck, UserCheck } from 'lucide-react';
import { useI18n } from '@/i18n';

const badgeIcons = [UserCheck, Truck, ClipboardCheck, CalendarClock];

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="blueprint absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-8 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pb-20 lg:pt-36">
        <div>
          <p className="eyebrow text-brand-400">{t.hero.eyebrow}</p>
          <h1 className="caps-tight mt-5 font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl xl:text-6xl">
            {t.hero.title} <span className="text-brand-500">{t.hero.accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#quote" className="btn btn-primary">
              {t.hero.ctaQuote}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </a>
            <a href="#planner" className="btn btn-outline">
              {t.hero.ctaPlanner}
            </a>
          </div>
        </div>

        <div className="relative lg:-me-6">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(closest-side at 50% 50%, rgba(248,144,8,0.28), rgba(248,144,8,0) 100%)' }} aria-hidden="true" />
          <img
            src="/brand/crane-100t.webp"
            alt={t.hero.alt}
            width={1100}
            height={468}
            fetchPriority="high"
            className="float-y relative w-full"
          />
          <div className="glass absolute -bottom-2 start-2 rounded-2xl px-4 py-2.5 sm:start-6" dir="ltr">
            <p className="font-display text-3xl font-extrabold leading-none">
              100<span className="ms-1 text-xl text-brand-400">{t.units.t}</span>
            </p>
            <p className="caps mt-1 font-mono text-[10px] font-semibold text-navy-200">4 × 4 · {t.fleet.capacity}</p>
          </div>
        </div>
      </div>

      <div className="hazard h-2" aria-hidden="true" />
      <div className="glass-dark relative !rounded-none !border-x-0">
        <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
          {t.hero.badges.map((badge, i) => {
            const Icon = badgeIcons[i] ?? UserCheck;
            return (
              <li key={badge} className="flex items-center gap-3 text-sm font-semibold text-navy-100 sm:text-base">
                <Icon className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
                <span>{badge}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
