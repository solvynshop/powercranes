import { fr } from '@/i18n/fr';
import { en } from '@/i18n/en';
import { ar } from '@/i18n/ar';
import { gallery } from '@/lib/gallery';
import { CITIES, CITY_PATH, cityName } from './cities';
import { LANG_CODES, localize, type Lang } from './langs';

const dicts = { fr, en, ar };
const fill = (s: string, city: string) => s.replace('{city}', city);

export type PageInfo = {
  route: string;
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  intro: string;
  noindex?: boolean;
  faq?: boolean;
  images?: { src: string; caption: string; city: string }[];
};

/** Every page that exists as a real HTML file after the build, in every language. Used by the prerender script. */
export function allPages(): PageInfo[] {
  const out: PageInfo[] = [];
  for (const lang of LANG_CODES) {
    const t = dicts[lang];
    out.push({ route: '/', lang, title: t.meta.title, description: t.meta.description, h1: `${t.hero.title} ${t.hero.accent}`, intro: t.hero.sub, faq: true, images: gallery.filter((g) => g.type === 'image').map((g) => ({ src: g.src, caption: g.caption[lang], city: g.city[lang] })) });
    out.push({ route: '/privacy', lang, title: t.legal.privacy.meta.title, description: t.legal.privacy.meta.description, h1: t.legal.privacy.title, intro: t.legal.privacy.intro });
    out.push({ route: '/terms', lang, title: t.legal.terms.meta.title, description: t.legal.terms.meta.description, h1: t.legal.terms.title, intro: t.legal.terms.intro });
    out.push({ route: '/thank-you', lang, title: t.thanks.meta.title, description: t.thanks.meta.description, h1: t.thanks.form.h, intro: t.thanks.form.p, noindex: true });
    for (const c of CITIES) {
      const n = cityName(c.slug, lang);
      out.push({
        route: `${CITY_PATH}/${c.slug}`,
        lang,
        title: fill(t.city.metaTitle, n),
        description: fill(t.city.metaDesc, n),
        h1: fill(t.city.h1, n),
        intro: `${fill(t.city.intro, n)} ${(t.cityNotes as Record<string, string>)[c.slug]}`,
        faq: true,
      });
    }
  }
  return out;
}

export { dicts, localize };
