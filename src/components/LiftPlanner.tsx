import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { fleet, type CraneClass } from '@/lib/fleet';
import { PIVOT_H, SAFETY_FACTOR, SLING_H, capacityCurve, evaluateLift, type LiftInput, type LiftResult } from '@/lib/lift';
import { fmt, useI18n } from '@/i18n';
import { useQuote } from '@/lib/quote';
import { Crane, Load, LOCAL_UNITS_PER_METRE } from './Crane';
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

type SceneProps = { input: LiftInput; result: LiftResult; label: string; unitM: string };

function PlannerScene({ input, result, label, unitM }: SceneProps) {
  const W = 720;
  const H = 400;
  const ground = 350;
  const pivotX = 150;
  const { radius, height } = input;

  const crane: CraneClass | undefined = (result.recommended ?? result.options[result.options.length - 1])?.crane;
  const L = result.boomNeeded;
  const sinA = Math.sqrt(Math.max(1 - (radius / L) ** 2, 0));

  // px per metre, limited so the whole lift fits and the crane body stays on screen.
  const s = Math.min((W - pivotX - 80) / (radius + 12), (ground - 36) / (height + SLING_H + 5), 14);
  const cs = s / LOCAL_UNITS_PER_METRE;

  // Drop from the boom tip to the underside of the load, in metres, converted to rope length.
  const dropM = PIVOT_H + L * sinA - height;
  const ropeLength = Math.max(dropM * LOCAL_UNITS_PER_METRE - 56, 6);

  const targetX = pivotX + radius * s;
  const topY = ground - height * s;
  const wallX = targetX + 1.6 * s;
  const wallW = Math.max(W - 72 - wallX, 24);
  const dimX = W - 32;
  const dimY = ground + 24;

  const Pill = ({ x, y, text }: { x: number; y: number; text: string }) => (
    <g>
      <rect x={x - 38} y={y - 12} width="76" height="22" rx="3" fill="#040D25" stroke="#F89008" strokeWidth="1" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFD08A" fontFamily="'JetBrains Mono', monospace">
        {text}
      </text>
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={label} dir="ltr">
      {/* Structure the load is placed against */}
      <rect x={wallX} y={topY} width={wallW} height={ground - topY} fill="#0C2552" stroke="#3C5E9E" strokeWidth="1.5" />
      <line x1={wallX} y1={topY} x2={wallX + wallW} y2={topY} stroke="#F89008" strokeWidth="2" strokeDasharray="5 5" />

      {/* Height dimension */}
      <line x1={targetX} y1={topY} x2={dimX} y2={topY} stroke="#F89008" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      <line x1={dimX} y1={ground} x2={dimX} y2={topY} stroke="#F89008" strokeWidth="1.5" />
      <line x1={dimX - 5} y1={ground} x2={dimX + 5} y2={ground} stroke="#F89008" strokeWidth="1.5" />
      <line x1={dimX - 5} y1={topY} x2={dimX + 5} y2={topY} stroke="#F89008" strokeWidth="1.5" />
      <Pill x={dimX - 6} y={(ground + topY) / 2} text={`H ${height} ${unitM}`} />

      <Crane
        x={pivotX}
        ground={ground}
        cs={cs}
        axles={crane?.axles ?? 4}
        boomPx={L * s}
        angle={result.angle}
        ropeLength={ropeLength}
        tone="dark"
      >
        <Load w={36} h={22} sling={14} tone="dark" />
      </Crane>

      {/* Ground + radius dimension */}
      <line x1="0" y1={ground} x2={W} y2={ground} stroke="#3C5E9E" strokeWidth="2" />
      <line x1={pivotX} y1={dimY} x2={targetX} y2={dimY} stroke="#F89008" strokeWidth="1.5" />
      <line x1={pivotX} y1={dimY - 5} x2={pivotX} y2={dimY + 5} stroke="#F89008" strokeWidth="1.5" />
      <line x1={targetX} y1={dimY - 5} x2={targetX} y2={dimY + 5} stroke="#F89008" strokeWidth="1.5" />
      <Pill x={(pivotX + targetX) / 2} y={dimY} text={`R ${radius} ${unitM}`} />
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
  const py = y(input.load);

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
            <Slider label={t.planner.load} unit={t.units.t} value={input.load} min={1} max={300} onChange={(load) => set({ load })} />
            <Slider label={t.planner.radius} unit={m} value={input.radius} min={3} max={60} onChange={(radius) => set({ radius })} />
            <Slider label={t.planner.height} unit={m} value={input.height} min={0} max={80} onChange={(height) => set({ height })} />
            <p className="border-t border-white/10 pt-4 text-sm leading-relaxed text-navy-300">{t.planner.disclaimer}</p>
          </Reveal>

          <Reveal delay={100} className="min-w-0 space-y-4">
            <div className="rounded-lg border border-white/10 bg-navy-900/80 p-3 sm:p-4">
              <PlannerScene input={input} result={result} label={t.planner.sceneAlt} unitM={m} />
            </div>

            <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-5">
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
                  {rec ? (
                    <LoadChart crane={rec.crane} input={input} radiusAxis={t.planner.radiusAxis} capacityAxis={t.planner.capacityAxis} />
                  ) : (
                    <div className="flex h-40 items-center justify-center text-center text-sm text-navy-300">—</div>
                  )}
                </div>
              </div>
            </div>

            <a
              href="#quote"
              onClick={() => setDraft({ craneId: rec?.crane.id ?? '', ...input })}
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
