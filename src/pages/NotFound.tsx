import { useI18n } from '@/i18n';
import { Link, useRouter } from '@/lib/router';
import { usePageMeta } from '@/lib/meta';

export default function NotFound() {
  const { t } = useI18n();
  const { path } = useRouter();
  usePageMeta({ title: t.notFound.meta.title, path, noindex: true });

  return (
    <section className="container-x max-w-xl pb-20 pt-32 text-center sm:pt-44">
      <p className="font-display text-8xl font-extrabold leading-none text-brand-500" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-navy-900">{t.notFound.h}</h1>
      <p className="mt-3 text-lg leading-relaxed text-navy-600">{t.notFound.p}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-dark">
          {t.notFound.home}
        </Link>
        <Link to="/#quote" className="btn btn-outline-dark">
          {t.notFound.quote}
        </Link>
      </div>
    </section>
  );
}
