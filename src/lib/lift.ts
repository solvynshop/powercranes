import type { CraneClass } from './fleet';

/**
 * Indicative lift model used by the planner. It is a deliberately simple,
 * conservative approximation of a real load chart, good enough to pick a crane
 * class. It is NOT a substitute for a lift plan: the UI says so.
 */

/** The load (incl. rigging) must stay below capacity ÷ this factor. */
export const SAFETY_FACTOR = 1.25;
/** Height of the boom foot above ground, in metres. */
export const PIVOT_H = 3.5;
/** Clearance between boom tip and the placed load (hook block + slings), in metres. */
export const SLING_H = 3.5;
/** Boom is never worked flatter than this radius / length ratio (≈ 32° above horizontal). */
export const MAX_RADIUS_RATIO = 0.85;
/** Minimum working radius used by the capacity curve, in metres. */
export const MIN_RADIUS = 3;

export type LiftInput = { load: number; radius: number; height: number };

/** Rated capacity (t) of a crane class at a given working radius (m). */
export function capacityAt(crane: CraneClass, radius: number): number {
  const r = Math.max(radius, MIN_RADIUS);
  // Power-law fit of typical all-terrain load charts (a 100 t class keeps roughly
  // 34 t at 10 m, 24 t at 14 m, 15 t at 20 m). Slightly optimistic beyond 25 m,
  // which the extra SAFETY_FACTOR below absorbs.
  const raw = 1.2 * crane.tons * Math.pow(MIN_RADIUS / r, 1.05);
  return Math.min(crane.tons, raw);
}

/** Capacity actually usable once the safety margin is applied. */
export const usableCapacity = (crane: CraneClass, radius: number): number =>
  capacityAt(crane, radius) / SAFETY_FACTOR;

/** Boom length (m) needed to reach `radius` metres out and `height` metres up. */
export function boomRequired(radius: number, height: number): number {
  const rise = Math.max(height + SLING_H - PIVOT_H, 0);
  return Math.max(Math.hypot(radius, rise), radius / MAX_RADIUS_RATIO);
}

/** Boom angle above the horizontal, in degrees. */
export function boomAngle(radius: number, boomLength: number): number {
  const ratio = Math.min(Math.max(radius / boomLength, 0), 1);
  return (Math.acos(ratio) * 180) / Math.PI;
}

export type LiftOption = {
  crane: CraneClass;
  /** Rated capacity at the working radius, in tonnes. */
  capacity: number;
  /** load ÷ capacity, 0..1+ */
  utilisation: number;
  loadOk: boolean;
  reachOk: boolean;
  fits: boolean;
};

export type LiftResult = {
  boomNeeded: number;
  angle: number;
  options: LiftOption[];
  recommended?: LiftOption;
  alternatives: LiftOption[];
  /** Why nothing fits, judged on the largest crane. */
  limit?: 'load' | 'reach';
};

export function evaluateLift(input: LiftInput, fleet: CraneClass[]): LiftResult {
  const { load, radius, height } = input;
  const boomNeeded = boomRequired(radius, height);
  const sorted = [...fleet].sort((a, b) => a.tons - b.tons);

  const options: LiftOption[] = sorted.map((crane) => {
    const capacity = capacityAt(crane, radius);
    const loadOk = load * SAFETY_FACTOR <= capacity;
    const reachOk = boomNeeded <= crane.boom;
    return { crane, capacity, utilisation: load / capacity, loadOk, reachOk, fits: loadOk && reachOk };
  });

  const fitting = options.filter((o) => o.fits);
  const recommended = fitting[0];
  const alternatives = fitting.slice(1);

  let limit: LiftResult['limit'];
  if (!recommended) {
    const biggest = options[options.length - 1];
    limit = biggest && !biggest.reachOk ? 'reach' : 'load';
  }

  return {
    boomNeeded,
    angle: boomAngle(radius, boomNeeded),
    options,
    recommended,
    alternatives,
    limit,
  };
}

/** Sampled usable-capacity curve of a crane, for the load chart. */
export function capacityCurve(crane: CraneClass, steps = 40): { r: number; cap: number }[] {
  const rMax = crane.boom * MAX_RADIUS_RATIO;
  const points: { r: number; cap: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const r = MIN_RADIUS + ((rMax - MIN_RADIUS) * i) / steps;
    points.push({ r, cap: usableCapacity(crane, r) });
  }
  return points;
}
