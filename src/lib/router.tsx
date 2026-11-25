/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { DEFAULT_LANG, isLang, localize, splitPath, type Lang } from '@/seo/langs';

/**
 * A tiny client-side router. The language lives in the address: "/" is French, "/en/" English, "/ar/" Arabic.
 * Every page also exists as a real HTML file (see scripts/prerender.mjs), so no server rewrites are needed.
 */
const STORAGE_KEY = 'powercranes-lang';

type RouterValue = {
  /** Current language, taken from the address. */
  lang: Lang;
  /** Route without the language prefix, e.g. "/privacy". */
  path: string;
  search: string;
  /** Navigate to a logical route ("/privacy", "/#quote"): the language prefix is added for you. */
  navigate: (to: string) => void;
  /** Same page, other language. */
  switchLang: (lang: Lang) => void;
};

const RouterContext = createContext<RouterValue>({
  lang: DEFAULT_LANG,
  path: '/',
  search: '',
  navigate: () => undefined,
  switchLang: () => undefined,
});

const BOT = /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|preview/i;

/** First supported language among the device's preferred languages (fr-MA, ar-SA, en-US...). */
function deviceLang(): Lang | null {
  const prefs = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const pref of prefs) {
    const base = String(pref).toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return null;
}

/**
 * First visit on a French (unprefixed) address: send the visitor to the version that matches their phone's
 * language. A saved choice always wins, "?lang=" forces a language, and search-engine bots are never redirected.
 */
function firstVisitTarget(): string | null {
  try {
    const { pathname, search, hash } = window.location;
    if (splitPath(pathname).lang !== DEFAULT_LANG || BOT.test(navigator.userAgent)) return null;
    const params = new URLSearchParams(search);
    const forced = params.get('lang');
    let target: Lang | null = null;
    if (isLang(forced)) {
      target = forced;
      params.delete('lang');
      window.localStorage.setItem(STORAGE_KEY, forced);
    } else {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      target = isLang(saved) ? saved : deviceLang();
    }
    if (!target || target === DEFAULT_LANG) {
      return forced ? `${pathname}${params.toString() ? `?${params}` : ''}${hash}` : null;
    }
    const { route } = splitPath(pathname);
    return `${localize(route, target)}${params.toString() ? `?${params}` : ''}${hash}`;
  } catch {
    return null;
  }
}

const locOf = (pathname: string, search: string) => {
  const { lang, route } = splitPath(pathname);
  return { lang, path: route, search };
};
const read = () => locOf(window.location.pathname, window.location.search);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(() => {
    const target = firstVisitTarget();
    if (target) window.history.replaceState(null, '', target);
    return read();
  });

  useEffect(() => {
    const onPop = () => setLoc(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = useCallback((url: URL) => {
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
    setLoc(locOf(url.pathname, url.search));
    // Wait for the new page to render, then jump to the anchor (or the top).
    window.setTimeout(() => {
      if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'auto' });
    }, 60);
  }, []);

  const navigate = useCallback(
    (to: string) => go(new URL(localize(to, loc.lang), window.location.origin)),
    [go, loc.lang]
  );

  const switchLang = useCallback(
    (lang: Lang) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignore */
      }
      const url = new URL(localize(loc.path, lang) + window.location.search, window.location.origin);
      window.history.pushState(null, '', url.pathname + url.search + window.location.hash);
      setLoc({ lang, path: loc.path, search: url.search });
    },
    [loc.path]
  );

  const value = useMemo(() => ({ ...loc, navigate, switchLang }), [loc, navigate, switchLang]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/** An <a> that navigates without a full page reload (normal clicks only: new-tab clicks keep working). */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate, lang } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={localize(to, lang)} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
