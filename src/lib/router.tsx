/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

/**
 * A tiny client-side router: the site only has a handful of pages, so a dependency is not worth it.
 * Vercel rewrites the known paths to index.html (see vercel.json); unknown paths get public/404.html.
 */
type RouterValue = { path: string; search: string; navigate: (to: string) => void };

const RouterContext = createContext<RouterValue>({ path: '/', search: '', navigate: () => undefined });

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/';
const read = () => ({ path: normalise(window.location.pathname), search: window.location.search });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(read);

  useEffect(() => {
    const onPop = () => setLoc(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
    setLoc({ path: normalise(url.pathname), search: url.search });
    // Wait for the new page to render, then jump to the anchor (or the top).
    window.setTimeout(() => {
      if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'auto' });
    }, 60);
  }, []);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/** An <a> that navigates without a full page reload (normal clicks only: new-tab clicks keep working). */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
