export type FleetId = 'c100';

export type CraneClass = {
  id: FleetId;
  /** Maximum rated load, in tonnes. */
  tons: number;
  /** Maximum main boom length, in metres. */
  boom: number;
  /** Number of axles of the carrier. */
  axles: number;
};

/**
 * Power Cranes' mobile crane: 100 t, 4 axles (the machine shown in the logo).
 *
 * ⚠️ `boom` (52 m) is a typical value for a 4-axle 100 t crane: replace it with
 * the real main-boom length from the crane's data plate / load chart. The fleet
 * cards and the lift planner both read from this single list. To add a crane,
 * add an entry here, extend FleetId, and add its `fleet.use` text in src/i18n/*.ts.
 */
export const fleet: CraneClass[] = [{ id: 'c100', tons: 100, boom: 52, axles: 4 }];

export const fleetById = (id: string): CraneClass | undefined => fleet.find((c) => c.id === id);
