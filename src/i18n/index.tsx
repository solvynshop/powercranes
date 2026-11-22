/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fr, type Dict } from './fr';
import { en } from './en';
import { ar } from './ar';

export type Lang = 'fr' | 'en' | 'ar';

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

const dictionaries: Record<Lang, Dict> = { fr, en, ar };
const STORAGE_KEY = 'powercranes-lang';

const isLang = (value: unknown): value is Lang => value === 'fr' || value === 'en' || value === 'ar';

/** First supported language among the device's preferred languages (fr-MA, ar-SA, en-US...). */
function deviceLang(): Lang | null {
  const prefs = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const pref of prefs) {
    const base = String(pref).toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return null;
}

/** ?lang=en in the URL wins, then the visitor's saved choice, then the device language, then French. */
function initialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage or URL access can be blocked: fall through to the device language */
  }
  return deviceLang() ?? 'fr';
}

type I18nValue = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dict;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue>({ lang: 'fr', dir: 'ltr', t: fr, setLang: () => undefined });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = dictionaries[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dictionaries[lang].meta.description);
  }, [lang, dir]);

  const value = useMemo<I18nValue>(() => ({ lang, dir, t: dictionaries[lang], setLang }), [lang, dir, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

/** Replace {key} placeholders in a translated string. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
