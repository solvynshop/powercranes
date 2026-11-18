import { CalendarClock, ClipboardCheck, Link2, Route, Truck, UserCheck } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

const icons = [UserCheck, Truck, ClipboardCheck, CalendarClock, Link2, Route];

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="blueprint-light bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="03" tag={t.services.tag} title={t.services.title} intro={t.services.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? UserCheck;
            return (
              <li key={item.title} className="h-full">
                <Reveal className="h-full rounded-lg border border-navy-100 bg-white p-6 shadow-card" delay={(i % 3) * 70}>
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-navy-900 text-brand-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="caps-tight mt-4 font-display text-2xl font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy-600">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
