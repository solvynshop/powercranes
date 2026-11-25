import { gallery } from './gallery';

/** Section ids shown in the navbar and footer, in order. Labels live in t.nav[id]. The gallery link only exists once there are real photos. */
export const navIds = [
  'fleet',
  'planner',
  'services',
  'process',
  ...(gallery.length ? (['gallery'] as const) : []),
  'coverage',
  'faq',
  'contact',
] as ('fleet' | 'planner' | 'services' | 'process' | 'gallery' | 'coverage' | 'faq' | 'contact')[];
export type NavId = (typeof navIds)[number];
