import { MapPin } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

export function Coverage() {
  const { t } = useI18n();

  return (
    <section id="coverage" className="bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="06" tag={t.coverage.tag} title={t.coverage.title} intro={t.coverage.text} />
        <Reveal>
          <ul className="flex flex-wrap gap-3">
            {t.coverage.cities.map((city, i) => (
              <li
                key={city}
                className={`flex items-center gap-2 rounded border px-4 py-2.5 font-display text-xl font-bold ${
                  i === 0 ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-800'
                }`}
              >
                <MapPin className={`h-4 w-4 ${i === 0 ? 'text-brand-500' : 'text-navy-400'}`} aria-hidden="true" />
                {city}
                {i === 0 && (
                  <span className="caps rounded-sm bg-brand-500 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-navy-950">
                    {t.coverage.hq}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
