import type { ReactNode } from 'react';

/**
 * Vector mobile crane, drawn in SVG. It renders a <g> so it can be placed
 * inside any <svg> scene (hero, fleet cards, lift planner).
 *
 * Geometry is in "local units": the boom pivot sits at (0,0) and the ground is
 * CRANE_G units below it. The whole crane is scaled by `cs`, so 20 local units
 * equal one metre when `cs = pxPerMetre / 20` (the planner relies on that).
 */
export const CRANE_G = 70;
export const LOCAL_UNITS_PER_METRE = 20;

export const C = {
  orange: '#F89008',
  orangeLight: '#FBA026',
  navy: '#08183C',
  blue: '#1F4FA8',
  glass: '#BFD3F2',
  wheel: '#0B1226',
  rim: '#6683BA',
};

type CraneProps = {
  /** Horizontal position of the boom pivot, in scene px. */
  x: number;
  /** Y of the ground line, in scene px. */
  ground: number;
  /** Body scale (scene px per local unit). */
  cs: number;
  axles?: number;
  /** Boom length in scene px (not local units). */
  boomPx: number;
  /** Boom angle above the horizontal, in degrees. */
  angle: number;
  /** Luff the boom with CSS (hero only). The hook counter-rotates to stay vertical. */
  animate?: boolean;
  /** Rope length from boom tip to hook block, in local units. */
  ropeLength?: number;
  outriggers?: boolean;
  /** 'dark' = drawn on a dark background (lighter rope). */
  tone?: 'light' | 'dark';
  /** Drawn at the hook, origin = just below the hook. */
  children?: ReactNode;
};

export function Crane({
  x,
  ground,
  cs,
  axles = 4,
  boomPx,
  angle,
  animate = false,
  ropeLength = 60,
  outriggers = true,
  tone = 'light',
  children,
}: CraneProps) {
  const L = boomPx / cs;
  const cr = 110;
  const cl = -(70 + axles * 14);
  const front = Math.ceil(axles / 2);
  const rear = axles - front;
  const wheelX = [
    ...Array.from({ length: front }, (_, i) => cr - 34 - i * 28),
    ...Array.from({ length: rear }, (_, i) => cl + 34 + i * 28),
  ];
  const rope = tone === 'dark' ? '#C9D4EA' : C.navy;
  const legX = [cl + 22, cr - 58];

  return (
    <g transform={`translate(${x} ${ground - CRANE_G * cs}) scale(${cs})`}>
      {/* Outriggers */}
      {outriggers &&
        legX.map((lx) => (
          <g key={lx}>
            <rect x={lx - 3} y="46" width="6" height="22" fill={C.navy} />
            <rect x={lx - 12} y="66" width="24" height="4" rx="1" fill={C.navy} />
          </g>
        ))}

      {/* Carrier chassis + cab */}
      <rect x={cl} y="34" width={cr - cl} height="14" rx="3" fill={C.blue} />
      <path d={`M${cr - 46} 34V10L${cr - 14} 6L${cr} 22V34Z`} fill={C.orange} />
      <path d={`M${cr - 40} 12L${cr - 17} 9L${cr - 6} 22H${cr - 40}Z`} fill={C.glass} />

      {/* Wheels */}
      {wheelX.map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy="56" r="14" fill={C.wheel} stroke={C.rim} strokeWidth="2" />
          <circle cx={wx} cy="56" r="5" fill={C.orange} />
        </g>
      ))}

      {/* Turret, counterweight, operator cab */}
      <rect x="-66" y="-2" width="14" height="36" rx="2" fill="#173768" />
      <rect x="-54" y="-14" width="76" height="48" rx="4" fill={C.orange} />
      <rect x="-54" y="22" width="76" height="6" fill={C.navy} />
      <path d="M-2-14V-34H22L30-22V-14Z" fill={C.orange} />
      <path d="M2-31H20L26-22H2Z" fill={C.glass} />

      {/* Boom: rotated about the pivot. The hook group undoes the rotation. */}
      <g transform={`rotate(${-angle})`}>
        <g className={animate ? 'crane-luff' : undefined}>
          <rect x="-8" y="-8" width={L * 0.46 + 8} height="16" rx="2" fill={C.orange} />
          <rect x={L * 0.4} y="-6.5" width={L * 0.36} height="13" rx="2" fill={C.orangeLight} />
          <rect x={L * 0.7} y="-5" width={L * 0.3} height="10" rx="2" fill={C.blue} />
          <path
            d={`M${L * 0.14} -8V8M${L * 0.26} -8V8M${L * 0.52} -6.5V6.5M${L * 0.64} -6.5V6.5`}
            stroke={C.navy}
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />
          <circle cx={L} cy="0" r="5" fill={C.navy} stroke={C.rim} strokeWidth="1" />
          <circle cx={L} cy="0" r="1.8" fill={C.orange} />

          <g transform={`translate(${L} 0)`}>
            <g transform={`rotate(${angle})`}>
              <g className={animate ? 'crane-counter' : undefined}>
                <line x1="0" y1="0" x2="0" y2={ropeLength} stroke={rope} strokeWidth="2" />
                <rect x="-7" y={ropeLength} width="14" height="12" rx="2" fill={C.navy} stroke={C.rim} strokeWidth="1" />
                <path
                  d={`M0 ${ropeLength + 12}v5a5 5 0 1 1-5 5`}
                  fill="none"
                  stroke={rope}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <g transform={`translate(0 ${ropeLength + 20})`}>{children}</g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

type LoadProps = {
  w: number;
  h: number;
  sling?: number;
  tone?: 'light' | 'dark';
};

/** A slung load (precast element / equipment crate) for the hook. Origin = hook. */
export function Load({ w, h, sling = 24, tone = 'light' }: LoadProps) {
  const line = tone === 'dark' ? '#C9D4EA' : C.navy;
  return (
    <g>
      <path d={`M0 0L${-w / 2 + 4} ${sling}M0 0L${w / 2 - 4} ${sling}`} stroke={line} strokeWidth="1.6" fill="none" />
      <rect x={-w / 2} y={sling} width={w} height={h} rx="2" fill="#173768" stroke={C.orange} strokeWidth="2" />
      <path
        d={`M${-w / 2 + 2} ${sling + h - 2}L${-w / 2 + 14} ${sling + 2}M${-w / 2 + 16} ${sling + h - 2}L${-w / 2 + 28} ${sling + 2}`}
        stroke={C.orange}
        strokeOpacity="0.55"
        strokeWidth="3"
      />
    </g>
  );
}
