import { ArrowRight, CalendarClock, ClipboardCheck, Truck, UserCheck } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Crane, Load } from './Crane';

const badgeIcons = [UserCheck, Truck, ClipboardCheck, CalendarClock];

/** Animated vector crane placing a load on a steel frame. Pure SVG + CSS, no images. */
export function HeroScene({ label }: { label: string }) {
  const ground = 420;
  const pivotX = 200;
  const cs = 1.1;
  const boomPx = 352;
  const pivotY = ground - 70 * cs;
  // Tip trajectory while luffing between 58° and 50°, drawn as a dashed arc.
  const rad = (d: number) => (d * Math.PI) / 180;
  const tip = (deg: number) => [pivotX + boomPx * Math.cos(rad(deg)), pivotY - boomPx * Math.sin(rad(deg))];
  const [x1, y1] = tip(58);
  const [x2, y2] = tip(50);

  const floors = [364, 308, 252, 196];
  const cols = [480, 550, 620];

  return (
    <svg viewBox="0 0 640 460" className="h-auto w-full" role="img" aria-label={label} dir="ltr">
      <defs>
        <pattern id="hero-hazard" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="14" height="28" fill="#F89008" />
          <rect x="14" width="14" height="28" fill="#08183C" />
        </pattern>
      </defs>

      {/* Steel frame under construction */}
      <g stroke="#3C5E9E" strokeWidth="3" fill="none">
        {cols.map((x) => (
          <line key={x} x1={x} y1={ground} x2={x} y2={floors[floors.length - 1]} />
        ))}
        {floors.map((y) => (
          <line key={y} x1={cols[0]} y1={y} x2={cols[cols.length - 1]} y2={y} />
        ))}
        <path strokeWidth="2" d="M480 420L550 364M550 364L480 308M550 308L620 364M620 252L550 308M480 252L550 196" />
      </g>
      <rect x="480" y="360" width="140" height="6" fill="#173768" />
      <rect x="480" y="304" width="140" height="6" fill="#173768" />

      {/* Working radius of the boom tip */}
      <path
        d={`M${x1} ${y1}A${boomPx} ${boomPx} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke="#F89008"
        strokeWidth="2"
        strokeDasharray="6 7"
        opacity="0.7"
      />

      <Crane
        x={pivotX}
        ground={ground}
        cs={cs}
        axles={5}
        boomPx={boomPx}
        angle={58}
        animate
        ropeLength={70}
        tone="dark"
      >
        <Load w={64} h={34} sling={26} tone="dark" />
      </Crane>

      {/* Ground */}
      <line x1="0" y1={ground} x2="640" y2={ground} stroke="#3C5E9E" strokeWidth="2" />
      <rect x="0" y={ground + 6} width="640" height="8" fill="url(#hero-hazard)" />
    </svg>
  );
}

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="blueprint absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-20">
        <div>
          <p className="eyebrow text-brand-400">{t.hero.eyebrow}</p>
          <h1 className="caps-tight mt-5 font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl xl:text-7xl">
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

        <div className="lg:-me-6">
          <HeroScene label={t.hero.alt} />
        </div>
      </div>

      <div className="hazard h-2" aria-hidden="true" />
      <div className="relative bg-navy-900">
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
