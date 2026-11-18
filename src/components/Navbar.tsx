import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LANGS, useI18n } from '@/i18n';
import { useActiveSection } from '@/lib/hooks';
import { navIds } from '@/lib/nav';
import { Logo } from './Logo';

function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className="flex overflow-hidden rounded border border-white/20">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1.5 font-mono text-xs font-semibold transition ${
            lang === code ? 'bg-brand-500 text-navy-950' : 'text-navy-100 hover:bg-white/10'
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="Power Cranes" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`rounded px-3 py-2 text-base font-semibold transition hover:text-brand-400 ${
                    active === id ? 'text-brand-400' : 'text-navy-100'
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <a href="#quote" className="btn btn-primary hidden !py-2 sm:inline-flex">
            {t.nav.quote}
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-white/20 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 bg-navy-950 lg:hidden">
          <ul className="container-x py-3">
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-3 font-display text-2xl font-bold text-white"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a href="#quote" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                {t.nav.quote}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
