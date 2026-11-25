import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

/** Accessible accordion built on <details>: works without JavaScript, and the answers stay in the page for search engines. */
export function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="08" tag={t.faq.tag} title={t.faq.title} intro={t.faq.intro} />
        <Reveal className="max-w-3xl">
          <div className="divide-y divide-navy-100 rounded-lg border border-navy-100 bg-paper">
            {t.faq.items.map((item) => (
              <details key={item.q} className="group px-5 py-4 open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-navy-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-navy-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
