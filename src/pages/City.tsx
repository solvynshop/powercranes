import { ArrowRight, CalendarClock, ClipboardCheck, Truck, UserCheck } from 'lucide-react';
import { CITIES, CITY_PATH, cityName, findCity } from '@/seo/cities';
import { fmt, useI18n } from '@/i18n';
import { Link } from '@/lib/router';
import { usePageMeta } from '@/lib/meta';
import { Faq } from '@/components/Faq';
import { Quote } from '@/components/Quote';
import { Contact } from '@/components/Contact';
import { Reveal } from '@/components/Section';
import NotFound from './NotFound';

const icons = [CalendarClock, UserCheck, Truck, ClipboardCheck];

/** One landing page per city, so people searching "location grue <city>" land on a page about exactly that. */
export default function City({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const city = findCity(slug);
  const name = cityName(slug, lang);
  usePageMeta({
    title: fmt(t.city.metaTitle, { city: name }),
    description: fmt(t.city.metaDesc, { city: name }),
    path: `${CITY_PATH}/${slug}`,
  });
  if (!city) return <NotFound />;
  const notes = t.cityNotes as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="blueprint absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-8 pb-14 pt-28 sm:pt-36 lg:grid-cols-[1.1fr_1fr] lg:pb-20">
          <div>
            <p className="eyebrow text-brand-400">{fmt(t.city.eyebrow, { city: name })}</p>
            <h1 className="caps-tight mt-5 font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl">{fmt(t.city.h1, { city: name })}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">{fmt(t.city.intro, { city: name })}</p>
            <p className="mt-3 max-w-xl leading-relaxed text-navy-300">{notes[slug]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-primary">
                {fmt(t.city.cta, { city: name })}
                <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
              <Link to="/#planner" className="btn btn-outline">
                {t.hero.ctaPlanner}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(closest-side at 50% 50%, rgba(248,144,8,0.28), rgba(248,144,8,0) 100%)' }} aria-hidden="true" />
            <img src="/brand/crane-100t.webp" alt={t.hero.alt} width={1115} height={472} className="relative w-full" />
          </div>
        </div>
        <div className="hazard h-2" aria-hidden="true" />
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-x">
          <h2 className="caps-tight font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">{t.city.whyTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.city.why.map((item, i) => {
              const Icon = icons[i] ?? UserCheck;
              return (
                <li key={item.title}>
                  <Reveal className="h-full rounded-lg border border-navy-100 bg-white p-5" delay={i * 60}>
                    <Icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl font-bold text-navy-900">{fmt(item.title, { city: name })}</h3>
                    <p className="mt-1 text-navy-600">{item.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <h2 className="mt-14 font-display text-2xl font-bold text-navy-900">{t.city.otherTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== slug).map((c) => (
              <li key={c.slug}>
                <Link to={`${CITY_PATH}/${c.slug}`} className="inline-block rounded border border-navy-200 bg-white px-4 py-2 font-display text-lg font-bold text-navy-800 transition hover:border-brand-500 hover:text-brand-700">
                  {c.names[lang]}
                </Link>
              </li>
            ))}
            <li className="px-2 py-2 text-navy-500">{t.city.all}</li>
          </ul>
        </div>
      </section>

      <Faq />
      <Quote />
      <Contact />
    </>
  );
}
