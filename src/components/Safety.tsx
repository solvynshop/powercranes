import { ClipboardCheck, FileText, HardHat, ShieldCheck, Wrench } from 'lucide-react';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

const icons = [HardHat, Wrench, ClipboardCheck, ShieldCheck];

export function Safety() {
  const { t } = useI18n();

  return (
    <section id="safety" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="07" tag={t.safety.tag} title={t.safety.title} intro={t.safety.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.safety.items.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <li key={item.title} className="h-full">
                <Reveal className="h-full border-s-4 border-brand-500 bg-paper p-5" delay={i * 70}>
                  <Icon className="h-7 w-7 text-navy-900" aria-hidden="true" />
                  <h3 className="caps-tight mt-3 font-display text-2xl font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy-600">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8 flex items-start gap-3 rounded-lg border border-navy-100 p-4 text-navy-700">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          <p>{t.safety.docs}</p>
        </Reveal>
      </div>
    </section>
  );
}
