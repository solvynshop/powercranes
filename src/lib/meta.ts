import { useEffect } from 'react';
import { LANG_CODES, localize } from '@/seo/langs';
import { site } from './config';
import { useRouter } from './router';

type PageMeta = { title: string; description?: string; path: string; noindex?: boolean };

const OG_LOCALE = { fr: 'fr_MA', en: 'en_US', ar: 'ar_MA' } as const;

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Per-page <title>, description, canonical, hreflang alternates, Open Graph and robots tags (client-side navigation). */
export function usePageMeta({ title, description, path, noindex = false }: PageMeta) {
  const { lang } = useRouter();
  useEffect(() => {
    document.title = title;
    const url = `${site.url}${localize(path, lang)}`;
    const meta = (key: string, value: string, by: 'name' | 'property' = 'name') =>
      setTag(`meta[${by}="${key}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute(by, key);
        return m;
      }, 'content', value);

    if (description) {
      meta('description', description);
      meta('og:description', description, 'property');
    }
    meta('og:title', title, 'property');
    meta('og:url', url, 'property');
    meta('og:locale', OG_LOCALE[lang], 'property');
    meta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    }, 'href', url);

    // hreflang alternates: one per language, plus x-default (French).
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    const alt = (code: string, href: string) => {
      const l = document.createElement('link');
      l.rel = 'alternate';
      l.hreflang = code;
      l.href = href;
      document.head.appendChild(l);
    };
    if (!noindex) {
      for (const code of LANG_CODES) alt(code, `${site.url}${localize(path, code)}`);
      alt('x-default', `${site.url}${localize(path, 'fr')}`);
    }
  }, [title, description, path, noindex, lang]);
}
