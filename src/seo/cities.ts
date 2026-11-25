import type { Lang } from './langs';

/** Cities that get their own landing page: "/location-grue/<slug>/". */
export const CITIES = [
  { slug: 'tanger', names: { fr: 'Tanger', en: 'Tangier', ar: 'طنجة' } },
  { slug: 'tanger-med', names: { fr: 'Tanger-Med', en: 'Tanger-Med', ar: 'طنجة المتوسط' } },
  { slug: 'casablanca', names: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' } },
  { slug: 'rabat', names: { fr: 'Rabat', en: 'Rabat', ar: 'الرباط' } },
  { slug: 'marrakech', names: { fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش' } },
  { slug: 'agadir', names: { fr: 'Agadir', en: 'Agadir', ar: 'أكادير' } },
  { slug: 'fes', names: { fr: 'Fès', en: 'Fes', ar: 'فاس' } },
] as const;

export type CitySlug = (typeof CITIES)[number]['slug'];

export const CITY_PATH = '/location-grue';

export const findCity = (slug: string) => CITIES.find((c) => c.slug === slug);
export const cityName = (slug: string, lang: Lang) => findCity(slug)?.names[lang] ?? slug;
