/** Language helpers shared by the app and the build-time prerender script (no React here). */
export type Lang = 'fr' | 'en' | 'ar';
export const LANG_CODES: Lang[] = ['fr', 'en', 'ar'];
export const DEFAULT_LANG: Lang = 'fr';

export const isLang = (value: unknown): value is Lang => value === 'fr' || value === 'en' || value === 'ar';

const stripSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

/** "/en/privacy/" -> { lang: 'en', route: '/privacy' }. French has no prefix. */
export function splitPath(pathname: string): { lang: Lang; route: string } {
  const m = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (m) return { lang: m[1] as Lang, route: stripSlash(m[2] || '/') };
  return { lang: DEFAULT_LANG, route: stripSlash(pathname || '/') };
}

/** "/privacy" + 'en' -> "/en/privacy/". Keeps ?query and #hash. Every page is a folder, so URLs end with "/". */
export function localize(to: string, lang: Lang): string {
  const cut = to.search(/[?#]/);
  const base = cut === -1 ? to : to.slice(0, cut);
  const rest = cut === -1 ? '' : to.slice(cut);
  const clean = stripSlash(base.startsWith('/') ? base : `/${base}`);
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  const path = `${prefix}${clean === '/' ? '' : clean}/`;
  return `${path === '' ? '/' : path}${rest}`;
}
