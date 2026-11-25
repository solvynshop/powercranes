import { trackEvent } from '@/lib/track';
import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { fleet, type CraneClass } from '@/lib/fleet';
import { PIVOT_H, SAFETY_FACTOR, SLING_H, capacityCurve, evaluateLift, type LiftInput, type LiftResult } from '@/lib/lift';
import { fmt, useI18n } from '@/i18n';
import { useQuote } from '@/lib/quote';
import { Reveal, SectionHead } from './Section';

/* ------------------------------------------------------------------ */
/* Slider with a numeric field (typing never fights the clamp)         */
/* ------------------------------------------------------------------ */

type SliderProps = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function Slider({ label, unit, value, min, max, onChange }: SliderProps) {
  const id = useId();
  const [text, setText] = useState(String(value));
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));

  // Re-sync the field when the slider (or a preset) changes the value, but not while the
  // user is mid-typing a number that clamps to the current value.
  useEffect(() => {
    if (clamp(Number(text)) !== value) setText(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-navy-100">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5" dir="ltr">
          <input
            id={id}
            type="number"
            min={min}
            max={max}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value !== '') onChange(clamp(Number(e.target.value)));
            }}
            onBlur={() => setText(String(value))}
            className="w-20 rounded border border-white/20 bg-navy-950 px-2 py-1 text-end font-mono text-lg font-semibold text-white focus:border-brand-500 focus:outline-none"
          />
          <span className="font-mono text-sm text-navy-300">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-brand-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* To-scale diagram of the lift                                        */
/* ------------------------------------------------------------------ */

type SceneProps = { input: LiftInput; result: LiftResult; label: string; unitM: string; unitT: string };

/* ------------------------------------------------------------------ */
/* The crane, drawn in metres (rear of the carrier at x = 0, ground at */
/* y = 0, up is negative) with the colours and layout of the logo:     */
/* orange cab and boom, blue chassis, four axles, 100 t class.         */
/* ------------------------------------------------------------------ */

const PIVOT_X = 1.9; // boom foot, metres from the rear of the carrier
const CAB_ANCHOR = { x: 3.1, y: -2.7 }; // where the luffing cylinder is fixed on the turret

const WHEELS = [1.6, 3.1, 7.9, 9.4];

function CraneBody() {
  return (
    <g>
      <ellipse cx="6.2" cy="0.04" rx="6.8" ry="0.24" fill="#000" opacity="0.3" />
      {/* chassis, outrigger boxes */}
      <path d="M0.2 -2.0 H11.9 V-1.0 H0.2 Z" fill="url(#c-blue)" />
      <path d="M0.2 -1.72 H11.9" stroke="#0B1F4D" strokeWidth="0.08" />
      <rect x="0.3" y="-1.6" width="0.75" height="0.42" rx="0.06" fill="#F89008" />
      <rect x="5.2" y="-1.6" width="1.1" height="0.42" rx="0.06" fill="#F89008" />
      {/* turret: orange body, blue lower band, counterweight shading */}
      <path d="M0.3 -2.0 V-3.9 Q0.3 -4.0 0.4 -4.0 H2.8 V-3.4 H5.6 V-2.0 Z" fill="url(#c-orange)" />
      <path d="M0.3 -2.0 V-2.7 H5.6 V-2.0 Z" fill="url(#c-blue)" />
      <rect x="0.3" y="-3.95" width="1.1" height="1.25" fill="#7A3F00" opacity="0.22" />
      <path d="M2.8 -3.4 V-4.0" stroke="#8A4A00" strokeWidth="0.06" />
      {/* operator cab */}
      <path d="M3.1 -3.3 V-4.45 Q3.1 -4.6 3.25 -4.6 H4.95 Q5.15 -4.6 5.25 -4.4 L5.6 -3.5 V-3.3 Z" fill="url(#c-blue)" />
      <path d="M3.4 -4.4 H4.85 L5.2 -3.55 H3.4 Z" fill="url(#c-glass)" />
      {/* front cab */}
      <path d="M8.3 -1.0 V-3.2 Q8.3 -3.7 8.8 -3.7 H11.0 Q11.4 -3.7 11.6 -3.35 L12.1 -2.4 Q12.2 -2.2 12.2 -1.9 V-1.0 Z" fill="url(#c-orange)" />
      <path d="M8.3 -2.3 H12.2 V-1.0 H8.3 Z" fill="url(#c-blue)" />
      <path d="M10.45 -3.55 H11.05 L11.8 -2.5 H10.45 Z" fill="url(#c-glass)" />
      <path d="M8.7 -3.45 H10.3 V-2.5 H8.7 Z" fill="url(#c-glass)" />
      <rect x="11.92" y="-2.0" width="0.26" height="0.18" rx="0.04" fill="#FFE9A8" />
      <rect x="11.6" y="-1.25" width="0.7" height="0.25" rx="0.05" fill="#0B1226" />
      {/* wheel arches and wheels */}
      {WHEELS.map((x) => (
        <circle key={`a${x}`} cx={x} cy="-0.7" r="0.84" fill="#0A1A44" />
      ))}
      {WHEELS.map((x) => (
        <g key={x}>
          <circle cx={x} cy="-0.7" r="0.7" fill="#0E1424" />
          <circle cx={x} cy="-0.7" r="0.45" fill="#1F4FA8" />
          <circle cx={x} cy="-0.7" r="0.3" fill="#143377" />
          <circle cx={x} cy="-0.7" r="0.1" fill="#0B1226" />
        </g>
      ))}
    </g>
  );
}

function PlannerScene({ input, result, label, unitM, unitT }: SceneProps) {
  const W = 760;
  const H = 430;
  const ground = 378;
  const { radius, height, load } = input;

  const L = result.boomNeeded;
  const rise = Math.sqrt(Math.max(L * L - radius * radius, 0));
  const angleDeg = (Math.atan2(rise, radius) * 180) / Math.PI;

  // px per metre: the whole lift (crane + load + wall) must fit, and the crane stays a readable size.
  const widthM = PIVOT_X + Math.max(radius + 5, 10.2);
  const s = Math.min((W - 40 - 82) / widthM, (ground - 30) / (height + SLING_H + 3.5), 22);

  const rearX = 24;
  const pivotX = rearX + PIVOT_X * s;
  const pivotY = ground - PIVOT_H * s;
  const tipX = pivotX + radius * s;
  const tipY = pivotY - rise * s;
  const ux = (tipX - pivotX) / (L * s);
  const uy = (tipY - pivotY) / (L * s);

  // Luffing cylinder: from the turret to the underside of the boom, 28 % along it.
  const anchor = { x: rearX + CAB_ANCHOR.x * s, y: ground + CAB_ANCHOR.y * s };
  const att = {
    x: pivotX + ux * L * s * 0.28 - uy * 0.5 * s,
    y: pivotY + uy * L * s * 0.28 + ux * 0.5 * s,
  };
  const mid = { x: (anchor.x * 0.55 + att.x * 0.45), y: (anchor.y * 0.55 + att.y * 0.45) };

  // Load hangs from the boom head: rope, hook block, slings, load.
  const topY = ground - height * s;
  const loadH = Math.min(1.9 * s, 44);
  const loadW = Math.min(3.2 * s, 76);
  const loadTop = topY - loadH;
  const blockY = Math.min(loadTop - 1.1 * s, loadTop - 6);
  const wallX = tipX + 2.4 * s;
  const wallW = Math.max(W - 86 - wallX, 24);
  const dimX = W - 46;
  const dimY = ground + 24;

  // Telescopic boom: four sections, each a little slimmer than the one before.
  const secEnds = [0, 0.3, 0.58, 0.82, 1];
  const secH = [1.0, 0.84, 0.7, 0.56];

  const Pill = ({ x, y, text }: { x: number; y: number; text: string }) => (
    <g>
      <rect x={x - 38} y={y - 12} width="76" height="22" rx="11" fill="#040D25" stroke="#F89008" strokeWidth="1" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFD08A" fontFamily="'JetBrains Mono', monospace">
        {text}
      </text>
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={label} dir="ltr">
      <defs>
        <linearGradient id="c-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB23A" />
          <stop offset="0.6" stopColor="#F89008" />
          <stop offset="1" stopColor="#C46A00" />
        </linearGradient>
        <linearGradient id="c-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A5FC4" />
          <stop offset="1" stopColor="#163A80" />
        </linearGradient>
        <linearGradient id="c-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FA6E6" />
          <stop offset="1" stopColor="#0F2147" />
        </linearGradient>
      </defs>

      {/* Structure the load is placed against */}
      <rect x={wallX} y={topY} width={wallW} height={ground - topY} fill="#0C2552" stroke="#3C5E9E" strokeWidth="1.5" />
      <line x1={wallX} y1={topY} x2={wallX + wallW} y2={topY} stroke="#F89008" strokeWidth="2" strokeDasharray="5 5" />

      {/* Height dimension */}
      <line x1={tipX} y1={topY} x2={dimX} y2={topY} stroke="#F89008" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      <line x1={dimX} y1={ground} x2={dimX} y2={topY} stroke="#F89008" strokeWidth="1.5" />
      <line x1={dimX - 5} y1={ground} x2={dimX + 5} y2={ground} stroke="#F89008" strokeWidth="1.5" />
      <line x1={dimX - 5} y1={topY} x2={dimX + 5} y2={topY} stroke="#F89008" strokeWidth="1.5" />
      <Pill x={dimX - 6} y={(ground + topY) / 2} text={`H ${height} ${unitM}`} />

      {/* Luffing cylinder (cylinder + chrome rod), then the boom, behind the turret */}
      <line x1={anchor.x} y1={anchor.y} x2={mid.x} y2={mid.y} stroke="#2B3552" strokeWidth={Math.max(0.3 * s, 3)} strokeLinecap="round" />
      <line x1={mid.x} y1={mid.y} x2={att.x} y2={att.y} stroke="#C9D4EA" strokeWidth={Math.max(0.16 * s, 2)} strokeLinecap="round" />

      <g transform={`translate(${pivotX} ${pivotY}) rotate(${-angleDeg})`}>
        {secH.map((h, i) => {
          const x0 = secEnds[i] * L * s - (i ? 0.25 * s : 0);
          const x1 = secEnds[i + 1] * L * s;
          return (
            <g key={i}>
              <rect x={x0} y={(-h / 2) * s} width={x1 - x0} height={h * s} rx={0.08 * s} fill="url(#c-orange)" stroke="#8A4A00" strokeWidth="0.8" />
              <rect x={x0} y={(-h / 2) * s} width={Math.max(0.16 * s, 2)} height={h * s} fill="#163A80" />
              <line x1={x0 + 0.3 * s} y1={(-h / 2) * s + 0.2 * s} x2={x1 - 0.3 * s} y2={(-h / 2) * s + 0.2 * s} stroke="#FFD28A" strokeWidth="1" opacity="0.7" />
            </g>
          );
        })}
        {/* boom head and sheave */}
        <rect x={L * s - 0.25 * s} y={-0.42 * s} width={0.55 * s} height={0.84 * s} rx={0.18 * s} fill="#10296B" stroke="#F89008" strokeWidth="1.2" />
        <circle cx={L * s} cy={0} r={Math.max(0.17 * s, 3)} fill="#F89008" stroke="#040D25" strokeWidth="1" />
      </g>

      {/* Rope, hook block, slings and load */}
      <line x1={tipX} y1={tipY} x2={tipX} y2={blockY} stroke="#E8EDF8" strokeWidth="1.5" />
      <rect x={tipX - 6} y={blockY} width="12" height="14" rx="2" fill="#D6342C" stroke="#7E1712" strokeWidth="1" />
      <path d={`M${tipX} ${blockY + 14}L${tipX - loadW / 2} ${loadTop}M${tipX} ${blockY + 14}L${tipX + loadW / 2} ${loadTop}`} stroke="#E8EDF8" strokeWidth="1" fill="none" />
      <rect x={tipX - loadW / 2} y={loadTop} width={loadW} height={loadH} rx="2" fill="#5C6F96" stroke="#E8EDF8" strokeWidth="1.5" />
      <text x={tipX} y={loadTop + loadH / 2 + 4} textAnchor="middle" fontSize={Math.min(13, loadH * 0.5)} fontWeight="700" fill="#fff" fontFamily="'JetBrains Mono', monospace">
        {load} {unitT}
      </text>

      {/* The crane */}
      <g transform={`translate(${rearX} ${ground}) scale(${s})`}>
        <CraneBody />
        {/* boom foot bracket, on top of the turret */}
        <circle cx={PIVOT_X} cy={-PIVOT_H} r="0.3" fill="#10296B" stroke="#F89008" strokeWidth="0.1" />
        <circle cx={PIVOT_X} cy={-PIVOT_H} r="0.1" fill="#F89008" />
      </g>

      {/* Ground + radius dimension */}
      <line x1="0" y1={ground} x2={W} y2={ground} stroke="#3C5E9E" strokeWidth="2" />
      <line x1={pivotX} y1={dimY} x2={tipX} y2={dimY} stroke="#F89008" strokeWidth="1.5" />
      <line x1={pivotX} y1={dimY - 5} x2={pivotX} y2={dimY + 5} stroke="#F89008" strokeWidth="1.5" />
      <line x1={tipX} y1={dimY - 5} x2={tipX} y2={dimY + 5} stroke="#F89008" strokeWidth="1.5" />
      <Pill x={(pivotX + tipX) / 2} y={dimY} text={`R ${radius} ${unitM}`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Load chart: usable capacity vs reach, with the user's lift marked   */
/* ------------------------------------------------------------------ */

type ChartProps = { crane: CraneClass; input: LiftInput; radiusAxis: string; capacityAxis: string };

function LoadChart({ crane, input, radiusAxis, capacityAxis }: ChartProps) {
  const W = 340;
  const H = 210;
  const pad = { l: 44, r: 14, t: 14, b: 40 };
  const xMax = Math.ceil((crane.boom * 0.85) / 10) * 10;
  const yMax = crane.tons;
  const x = (r: number) => pad.l + (r / xMax) * (W - pad.l - pad.r);
  const y = (c: number) => H - pad.b - (c / yMax) * (H - pad.t - pad.b);

  const curve = capacityCurve(crane);
  const line = curve.map((p, i) => `${i ? 'L' : 'M'}${x(p.r).toFixed(1)} ${y(p.cap).toFixed(1)}`).join('');
  const area = `${line}L${x(curve[curve.length - 1].r).toFixed(1)} ${y(0)}L${x(curve[0].r).toFixed(1)} ${y(0)}Z`;

  const xTicks = Array.from({ length: xMax / 10 + 1 }, (_, i) => i * 10);
  const yTicks = [0, Math.round(yMax / 2), yMax];
  const px = x(input.radius);
  const py = Math.max(y(input.load), pad.t);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${capacityAxis} / ${radiusAxis}`} dir="ltr">
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={pad.l} y1={y(v)} x2={W - pad.r} y2={y(v)} stroke="#fff" strokeOpacity="0.1" />
          <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#9DB0D6" fontFamily="'JetBrains Mono', monospace">
            {v}
          </text>
        </g>
      ))}
      {xTicks.map((v) => (
        <text key={v} x={x(v)} y={H - pad.b + 16} textAnchor="middle" fontSize="11" fill="#9DB0D6" fontFamily="'JetBrains Mono', monospace">
          {v}
        </text>
      ))}
      <path d={area} fill="#173768" opacity="0.7" />
      <path d={line} fill="none" stroke="#F89008" strokeWidth="2.5" />
      <line x1={px} y1={py} x2={px} y2={y(0)} stroke="#fff" strokeOpacity="0.5" strokeDasharray="3 3" />
      <line x1={pad.l} y1={py} x2={px} y2={py} stroke="#fff" strokeOpacity="0.5" strokeDasharray="3 3" />
      <circle cx={px} cy={py} r="7" fill="#F89008" fillOpacity="0.25" />
      <circle cx={px} cy={py} r="4" fill="#F89008" stroke="#fff" strokeWidth="1.5" />
      <text x={(pad.l + W - pad.r) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#C9D4EA">
        {radiusAxis}
      </text>
      <text transform={`translate(12 ${(pad.t + H - pad.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="11" fill="#C9D4EA">
        {capacityAxis}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function LiftPlanner() {
  const { t } = useI18n();
  const { setDraft } = useQuote();
  const [input, setInput] = useState<LiftInput>({ load: 20, radius: 12, height: 15 });
  const set = (patch: Partial<LiftInput>) => setInput((prev) => ({ ...prev, ...patch }));

  const result = useMemo(() => evaluateLift(input, fleet), [input]);
  const rec = result.recommended;
  const m = t.units.m;

  return (
    <section id="planner" className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-24">
      <div className="blueprint absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead index="02" tag={t.planner.tag} title={t.planner.title} intro={t.planner.intro} tone="dark" />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <Reveal className="space-y-7 rounded-lg border border-white/10 bg-navy-900/80 p-5 sm:p-6">
            <Slider label={t.planner.load} unit={t.units.t} value={input.load} min={1} max={120} onChange={(load) => set({ load })} />
            <Slider label={t.planner.radius} unit={m} value={input.radius} min={3} max={44} onChange={(radius) => set({ radius })} />
            <Slider label={t.planner.height} unit={m} value={input.height} min={0} max={50} onChange={(height) => set({ height })} />
            <p className="border-t border-white/10 pt-4 text-sm leading-relaxed text-navy-300">{t.planner.disclaimer}</p>
          </Reveal>

          <Reveal delay={100} className="min-w-0 space-y-4">
            <div className="rounded-lg border border-white/10 bg-navy-900/80 p-3 sm:p-4">
              <PlannerScene input={input} result={result} label={t.planner.sceneAlt} unitM={m} unitT={t.units.t} />
            </div>

            <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-5">
                <img src="/brand/crane-100t.webp" alt={t.hero.alt} width={1100} height={468} loading="lazy" decoding="async" className="mb-4 h-24 w-auto" />
                {rec ? (
                  <>
                    <p className="caps font-mono text-xs font-semibold text-brand-400">{t.planner.recommended}</p>
                    <p className="mt-1 font-display text-6xl font-extrabold leading-none">
                      {rec.crane.tons}
                      <span className="ms-2 text-3xl text-brand-500">{t.units.t}</span>
                    </p>

                    <dl className="mt-5 space-y-3 text-sm">
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="text-navy-200">{t.planner.utilisation}</dt>
                          <dd className="font-mono text-base font-semibold">{Math.round(rec.utilisation * 100)} %</dd>
                        </div>
                        <div className="relative mt-1.5 h-2.5 rounded-full bg-navy-700">
                          <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.min(rec.utilisation, 1) * 100}%` }} />
                          <span className="absolute -inset-y-1 w-0.5 bg-white/70" style={{ insetInlineStart: `${100 / SAFETY_FACTOR}%` }} aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-navy-200">{fmt(t.planner.capacityAt, { r: input.radius })}</dt>
                        <dd className="font-mono text-base font-semibold">
                          {rec.capacity.toFixed(1)} {t.units.t}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-navy-200">{t.planner.boomNeeded}</dt>
                        <dd className="font-mono text-base font-semibold">
                          {result.boomNeeded.toFixed(1)} {m}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-navy-200">{t.planner.boomAngle}</dt>
                        <dd className="font-mono text-base font-semibold">{Math.round(result.angle)}°</dd>
                      </div>
                    </dl>

                    {result.alternatives.length > 0 && (
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <p className="text-sm text-navy-300">{t.planner.alternatives}</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {result.alternatives.map((o) => (
                            <li key={o.crane.id} className="rounded border border-white/20 px-2.5 py-1 font-mono text-sm font-semibold">
                              {o.crane.tons} {t.units.t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-display text-3xl font-extrabold leading-tight text-brand-400">{t.planner.none}</p>
                    <p className="mt-3 leading-relaxed text-navy-200">
                      {result.limit === 'reach' ? t.planner.noneReach : t.planner.noneLoad}
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-5">
                <p className="caps font-mono text-xs font-semibold text-brand-400">{t.planner.chart}</p>
                <div className="mt-3">
                  <LoadChart crane={fleet[0]} input={input} radiusAxis={t.planner.radiusAxis} capacityAxis={t.planner.capacityAxis} />
                </div>
              </div>
            </div>

            <a
              href="#quote"
              onClick={() => {
                setDraft({ craneId: rec?.crane.id ?? '', ...input });
                trackEvent('planner_cta');
              }}
              className="btn btn-primary w-full sm:w-auto"
            >
              {t.planner.cta}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
