import { ArrowUp } from 'lucide-react';
import { phoneHref, site } from '@/lib/config';
import { navIds } from '@/lib/nav';
import { useI18n } from '@/i18n';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-navy-950 pb-20 text-navy-200 md:pb-0">
      <div className="hazard h-2" aria-hidden="true" />
      <div className="container-x grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs leading-relaxed">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <p className="caps font-mono text-xs font-semibold text-brand-400">{t.footer.nav}</p>
          <ul className="mt-4 space-y-2">
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="caps font-mono text-xs font-semibold text-brand-400">{t.footer.contact}</p>
          <ul className="mt-4 space-y-2">
            {site.address.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="font-semibold text-white hover:text-brand-400" dir="ltr">
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={phoneHref} className="font-semibold text-white hover:text-brand-400" dir="ltr">
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-white">
            {t.footer.top}
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
