import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/lib/content';
import { useScrollProgress, useActiveSection, scrollToId } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const progress = useScrollProgress();
  const { language, setLanguage, t } = useLanguage();
  const active = useActiveSection(['home', 'products', 'sectors', 'process', 'about', 'contact']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 ${
              scrolled ? 'glass-dark shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)]' : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <button onClick={() => go('home')} className="group flex items-center gap-2.5">
              <Logo />
              <div className="flex flex-col leading-none text-left">
                <img src="/brand/logo-full-dark.png" alt="Power Cranes" className="h-12 w-auto" />
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-steel-300/80">
                  SARL AU · Morocco
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                const hasChildren = !!link.children;
                return (
                  <li
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(link.id)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => go(link.id)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white bg-white/[0.08]'
                          : 'text-ink-200 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {t(link.id)}
                      {hasChildren && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            openDropdown === link.id ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>

                    {/* Dropdown */}
                    {hasChildren && (
                      <div
                        className={`absolute left-1/2 top-full mt-2 w-[360px] -translate-x-1/2 transition-all duration-300 ${
                          openDropdown === link.id
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="glass-dark rounded-2xl p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                          {link.children!.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setOpenDropdown(null);
                                go(link.id);
                                setTimeout(() => {
                                  const el = document.getElementById(c.id);
                                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 500);
                              }}
                              className="group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors duration-200 hover:bg-white/[0.06]"
                            >
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-steel-500/15 text-steel-300 transition-colors group-hover:bg-steel-500/25">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{c.label}</div>
                                <div className="mt-0.5 text-xs text-ink-300">{c.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTA + burger */}
            <div className="flex items-center gap-2">
              <button onClick={() => go('contact')} className="hidden sm:inline-flex btn-primary !py-2.5 !px-5">
                {t('quote')}
              </button>
              <div className="hidden sm:flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
                {(['en', 'fr'] as const).map((code) => (
                  <button key={code} onClick={() => setLanguage(code)} className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition-all ${language === code ? 'bg-white text-ink-950' : 'text-ink-300 hover:text-white'}`}>
                    {code}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress bar */}
        <div className="mx-auto mt-2 max-w-7xl px-6">
          <div className="h-px w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-steel-400 to-amber-400 transition-[width] duration-150"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-ink-900/95 border-l border-white/10 p-6 pt-24 transition-transform duration-500 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="space-y-1">
            <div className="mb-6 flex items-center justify-between px-4">
              <span className="text-xs uppercase tracking-[0.18em] text-ink-400">Language</span>
              <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
                {(['en', 'fr'] as const).map((code) => (
                  <button key={code} onClick={() => setLanguage(code)} className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${language === code ? 'bg-white text-ink-950' : 'text-ink-300'}`}>{code}</button>
                ))}
              </div>
            </div>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-medium text-ink-100 transition-colors hover:bg-white/[0.06]"
                >
                  {t(link.id)}
                  <ChevronDown className="h-4 w-4 text-ink-400" />
                </button>
                {link.children && (
                  <ul className="ml-3 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {link.children.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => {
                            setMobileOpen(false);
                            go(link.id);
                          }}
                          className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-ink-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                        >
                          {c.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => go('contact')} className="btn-primary mt-6 w-full">
            {t('quote')}
          </button>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-steel-500 to-steel-800 shadow-[0_6px_20px_-6px_rgba(47,131,246,0.6)]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18 L12 5 L19 18" className="text-white" />
        <path d="M12 5 V20" className="text-amber-300" />
        <circle cx="12" cy="5" r="1.5" className="text-amber-300" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}
