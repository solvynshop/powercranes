export type FleetId = 'c30' | 'c50' | 'c80' | 'c120' | 'c200' | 'c300';

export type CraneClass = {
  id: FleetId;
  /** Maximum rated load, in tonnes. */
  tons: number;
  /** Maximum main boom length, in metres. */
  boom: number;
  /** Number of axles of the carrier (drives the illustration). */
  axles: number;
};

/**
 * ⚠️ PLACEHOLDER FLEET.
 *
 * These six classes are typical mobile-crane sizes used to build and demo the
 * site. They are NOT the real Power Cranes fleet. Replace the numbers with the
 * real machines (rated load, boom length, axles) before going live: the fleet
 * cards and the lift planner both read from this single list.
 *
 * You can add, remove or rename entries. If you change the ids, also update
 * the `fleet.use` texts in src/i18n/*.ts and the FleetId type above.
 */
export const fleet: CraneClass[] = [
  { id: 'c30', tons: 30, boom: 31, axles: 3 },
  { id: 'c50', tons: 50, boom: 40, axles: 3 },
  { id: 'c80', tons: 80, boom: 48, axles: 4 },
  { id: 'c120', tons: 120, boom: 60, axles: 5 },
  { id: 'c200', tons: 200, boom: 68, axles: 6 },
  { id: 'c300', tons: 300, boom: 80, axles: 7 },
];

export const fleetById = (id: string): CraneClass | undefined => fleet.find((c) => c.id === id);
