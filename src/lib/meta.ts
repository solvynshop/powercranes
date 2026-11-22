import { useEffect } from 'react';
import { site } from './config';

type PageMeta = { title: string; description?: string; path: string; noindex?: boolean };

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Per-page <title>, description, canonical, Open Graph and robots tags. */
export function usePageMeta({ title, description, path, noindex = false }: PageMeta) {
  useEffect(() => {
    document.title = title;
    const url = `${site.url}${path === '/' ? '/' : path}`;
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
    meta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    }, 'href', url);
  }, [title, description, path, noindex]);
}
