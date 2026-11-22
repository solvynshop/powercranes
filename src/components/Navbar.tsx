import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LANGS, useI18n } from '@/i18n';
import { useActiveSection } from '@/lib/hooks';
import { navIds } from '@/lib/nav';
import { Logo } from './Logo';

/** 0 → 1 while the page scrolls, plus whether we've left the top of the page. */
function useScroll() {
  const [state, setState] = useState({ progress: 0, scrolled: false });
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ progress: max > 0 ? Math.min(window.scrollY / max, 1) : 0, scrolled: window.scrollY > 24 });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
}

function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center rounded-full border border-white/10 bg-white/[0.05] p-1 ${className}`}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition ${
            lang === code ? 'bg-white text-navy-950' : 'text-navy-200 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const active = useActiveSection([...navIds]);
  const { progress, scrolled } = useScroll();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav
            aria-label="Main"
            className={`flex items-center justify-between gap-3 rounded-full py-2 ps-4 pe-2.5 transition-all duration-500 sm:ps-5 ${
              scrolled || open ? 'glass-dark shadow-[0_20px_60px_-25px_rgba(0,0,0,0.75)]' : 'border border-transparent bg-transparent'
            }`}
          >
            <a href="#top" aria-label="Power Cranes" onClick={() => setOpen(false)} className="shrink-0">
              <Logo className="h-10 sm:h-11" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'true' : undefined}
                    className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-300 ${
                      active === id ? 'bg-white/10 text-white' : 'text-navy-100 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <LangSwitch />
              <a href="#quote" className="btn btn-primary hidden !rounded-full !px-5 !py-2.5 sm:inline-flex">
                {t.nav.quote}
              </a>
              <button
                type="button"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t.nav.close : t.nav.menu}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </nav>

          <div className="mx-6 mt-2 h-px overflow-hidden rounded-full bg-white/5" aria-hidden="true">
            <div className="h-full bg-gradient-to-r from-brand-600 to-brand-300" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`glass-dark fixed inset-0 z-40 overflow-y-auto pt-24 transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="container-x pb-10">
          {navIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block border-b border-white/10 py-4 font-display text-3xl font-bold text-white"
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href="#quote" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="btn btn-primary w-full !rounded-full">
              {t.nav.quote}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
