import { useEffect, useState } from 'react';
import { site } from '@/lib/config';
import { useI18n } from '@/i18n';
import { Link } from '@/lib/router';

const KEY = 'powercranes-consent';
export const OPEN_COOKIE_SETTINGS = 'powercranes:cookies';

const read = (): string | null => {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const write = (value: string) => {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked: the choice simply won't be remembered */
  }
};

/** Google Analytics is only ever loaded after an explicit "accept". */
function loadAnalytics(id: string) {
  if (document.getElementById('ga-script')) return;
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    w.dataLayer.push(args);
  };
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
}

/**
 * Cookie notice. Without a Google Analytics id the site sets no tracking cookies, so this is a plain
 * information notice (OK). With VITE_GA_ID it becomes a real accept / decline choice.
 */
export function CookieBanner() {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => read() === null);
  const ga = Boolean(site.gaId);

  useEffect(() => {
    if (ga && read() === 'granted') loadAnalytics(site.gaId);
  }, [ga]);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: 'granted' | 'denied' | 'seen') => {
    write(value);
    if (value === 'granted' && ga) loadAnalytics(site.gaId);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label={t.cookie.aria}
      className="glass-dark fixed inset-x-3 bottom-[4.75rem] z-[60] mx-auto max-w-3xl rounded-2xl p-4 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] md:bottom-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="flex-1 text-sm leading-relaxed text-navy-100">
          {ga ? t.cookie.ask : t.cookie.info}{' '}
          <Link to="/privacy" className="font-semibold text-brand-400 underline-offset-2 hover:underline">
            {t.cookie.more}
          </Link>
        </p>
        <div className="flex gap-2">
          {ga ? (
            <>
              <button type="button" onClick={() => choose('denied')} className="btn btn-outline !px-4 !py-2 !text-sm">
                {t.cookie.decline}
              </button>
              <button type="button" onClick={() => choose('granted')} className="btn btn-primary !px-4 !py-2 !text-sm">
                {t.cookie.accept}
              </button>
            </>
          ) : (
            <button type="button" onClick={() => choose('seen')} className="btn btn-primary !px-6 !py-2 !text-sm">
              {t.cookie.ok}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
