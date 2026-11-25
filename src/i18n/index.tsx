/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { fr, type Dict } from './fr';
import { en } from './en';
import { ar } from './ar';
import { useRouter } from '@/lib/router';
import type { Lang } from '@/seo/langs';

export type { Lang };

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

const dictionaries: Record<Lang, Dict> = { fr, en, ar };

type I18nValue = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dict;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue>({ lang: 'fr', dir: 'ltr', t: fr, setLang: () => undefined });

/** The language comes from the address (see the router): "/" French, "/en/" English, "/ar/" Arabic. */
export function I18nProvider({ children }: { children: ReactNode }) {
  const { lang, switchLang } = useRouter();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    // Cairo (Arabic) is only downloaded when someone actually reads the site in Arabic.
    if (lang === 'ar' && !document.getElementById('font-cairo')) {
      const link = document.createElement('link');
      link.id = 'font-cairo';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, [lang, dir]);

  const value = useMemo<I18nValue>(() => ({ lang, dir, t: dictionaries[lang], setLang: switchLang }), [lang, dir, switchLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

/** Replace {key} placeholders in a translated string. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
