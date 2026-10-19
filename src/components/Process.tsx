import { processSteps } from '@/lib/content';
import { useReveal } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function Process() {
  const { ref, isVisible } = useReveal({ threshold: 0.08 });
  const { t } = useLanguage();

  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-950" />
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 w-72 rounded-full bg-steel-700/15 blur-3xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
            {t('howWork')}
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {t('processTitle')}
            <span className="text-gradient-steel">{t('endToEnd')}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-200">
            {t('processBody')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-steel-500/40 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <StepCard key={step.id} index={i} title={step.title} description={step.description} icon={step.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  index, title, description, icon: Icon,
}: { index: number; title: string; description: string; icon: typeof processSteps[number]['icon'] }) {
  const { ref, isVisible } = useReveal({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`card-hover group relative rounded-3xl glass p-6 reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-steel-500/25 to-steel-800/30 text-steel-200 ring-1 ring-white/10">
          <Icon className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-ink-950">
            {index + 1}
          </span>
        </div>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-300">{description}</p>
    </div>
  );
}
