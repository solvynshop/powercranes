import { CheckCircle2, Phone } from 'lucide-react';
import { phoneHref, site } from '@/lib/config';
import { useI18n } from '@/i18n';
import { Link, useRouter } from '@/lib/router';
import { usePageMeta } from '@/lib/meta';

export default function Thanks() {
  const { t } = useI18n();
  const { search } = useRouter();
  const via = new URLSearchParams(search).get('via');
  const copy = via === 'whatsapp' ? t.thanks.whatsapp : via === 'email' ? t.thanks.email : t.thanks.form;
  usePageMeta({ title: t.thanks.meta.title, description: t.thanks.meta.description, path: '/thank-you', noindex: true });

  return (
    <section className="container-x max-w-2xl pb-20 pt-28 text-center sm:pt-40">
      <CheckCircle2 className="mx-auto h-16 w-16 text-brand-500" aria-hidden="true" />
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy-900 sm:text-5xl">{copy.h}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-navy-600">{copy.p}</p>
      {via === 'email' && (
        <p className="mt-3 font-semibold text-navy-900" dir="ltr">
          {site.email}
        </p>
      )}

      <div className="mt-10 rounded-lg border border-navy-100 bg-paper p-6 text-start">
        <h2 className="font-display text-xl font-bold text-navy-900">{t.thanks.next}</h2>
        <ol className="mt-4 space-y-3">
          {t.thanks.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-navy-700">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 font-mono text-sm font-bold text-navy-950">{i + 1}</span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-dark">
          {t.thanks.home}
        </Link>
        {site.phone && (
          <a href={phoneHref} className="btn btn-outline-dark">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {t.thanks.call}
          </a>
        )}
      </div>
    </section>
  );
}
