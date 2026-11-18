import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="04" tag={t.process.tag} title={t.process.title} />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal className="border-t-4 border-navy-900 pt-5" delay={i * 80}>
                <p className="font-display text-6xl font-extrabold leading-none text-brand-500" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="caps-tight mt-4 font-display text-2xl font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-navy-600">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
