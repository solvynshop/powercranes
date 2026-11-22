import { ArrowLeft } from 'lucide-react';
import { phoneHref, site } from '@/lib/config';
import { useI18n } from '@/i18n';
import { Link } from '@/lib/router';
import { usePageMeta } from '@/lib/meta';

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useI18n();
  const page = t.legal[kind];
  const L = t.legal.labels;
  usePageMeta({ title: page.meta.title, description: page.meta.description, path: `/${kind}` });

  const rows: [string, string, string?][] = [
    [L.company, site.legalName],
    [L.manager, site.legal.manager],
    [L.rc, site.legal.rc],
    [L.ice, site.legal.ice],
    [L.if_, site.legal.if],
    [L.tp, site.legal.tp],
    [L.address, site.address.join(', ')],
    [L.email, site.email, `mailto:${site.email}`],
    [L.phone, site.phone, phoneHref],
  ];

  return (
    <article className="container-x max-w-3xl pb-20 pt-28 sm:pt-36">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
        <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        {t.legal.back}
      </Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy-900 sm:text-5xl">{page.title}</h1>
      <p className="mt-2 font-mono text-sm text-navy-500">{t.legal.updated}</p>
      <p className="mt-6 text-lg leading-relaxed text-navy-700">{page.intro}</p>

      {page.sections.map((section, i) => (
        <section key={section.h} className="mt-9">
          <h2 className="font-display text-2xl font-bold text-navy-900">{section.h}</h2>
          {kind === 'terms' && i === 0 && (
            <dl className="mt-3 divide-y divide-navy-100 rounded-lg border border-navy-100 bg-paper">
              {rows.map(([label, value, href]) => (
                <div key={label} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[14rem_1fr]">
                  <dt className="font-semibold text-navy-700">{label}</dt>
                  <dd className="text-navy-900" dir="auto">
                    {href ? (
                      <a href={href} className="text-brand-800 hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {section.p.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-relaxed text-navy-700">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
