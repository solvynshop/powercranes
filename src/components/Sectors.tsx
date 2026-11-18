import { Anchor, Building2, Factory, Landmark, Zap } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

const icons = [Landmark, Anchor, Factory, Building2, Zap];

export function Sectors() {
  const { t } = useI18n();

  return (
    <section id="sectors" className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24">
      <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead index="05" tag={t.sectors.tag} title={t.sectors.title} intro={t.sectors.intro} tone="dark" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.sectors.items.map((item, i) => {
            const Icon = icons[i] ?? Landmark;
            return (
              <li key={item.title} className="h-full">
                <Reveal className="h-full rounded-lg border border-white/10 bg-navy-800/70 p-6" delay={(i % 3) * 70}>
                  <Icon className="h-8 w-8 text-brand-500" aria-hidden="true" />
                  <h3 className="caps-tight mt-4 font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy-200">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
