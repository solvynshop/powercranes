/** Section ids shown in the navbar and footer, in order. Labels live in t.nav[id]. */
export const navIds = ['fleet', 'planner', 'services', 'process', 'coverage', 'contact'] as const;
export type NavId = (typeof navIds)[number];
