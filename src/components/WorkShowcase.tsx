import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, Maximize2, Radio } from 'lucide-react';
import { images } from '@/lib/content';
import { useLanguage } from '@/lib/i18n';
import { useReveal } from '@/lib/hooks';

const slides = [
  { image: images.heroCrane2, en: 'Heavy lift, precisely planned.', fr: 'Chaque levage, planifié avec précision.', meta: 'CRANE OPERATIONS · MOROCCO' },
  { image: images.portIstanbul, en: 'Keeping ports in motion.', fr: 'Les ports toujours en mouvement.', meta: 'PORT & LOGISTICS · TANGER-MED' },
  { image: images.factoryFloor, en: 'Equipment that performs under pressure.', fr: "Des équipements qui tiennent la cadence.", meta: 'INDUSTRIAL SUPPLY · B2B' },
];

const droneVideoUrl = '';

export function WorkShowcase() {
  const { language, t } = useLanguage();
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-950" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mb-10 flex flex-col justify-between gap-5 reveal ${isVisible ? 'is-visible' : ''} sm:flex-row sm:items-end`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
              <Radio className="h-3.5 w-3.5" /> {language === 'fr' ? 'Sur le terrain' : 'In the field'}
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {language === 'fr' ? 'Le travail derrière chaque levage.' : 'The work behind every lift.'}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-300">
            {language === 'fr' ? 'Un aperçu de nos environnements de travail — bientôt enrichi par vos vidéos drone.' : 'A glimpse into the environments we supply — soon enriched with your own drone footage.'}
          </p>
        </div>

        <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] reveal ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.12s' }}>
          <div className="relative aspect-[16/9] min-h-[420px] sm:min-h-0">
            {slides.map((slide, index) => (
              <img key={slide.image} src={slide.image} alt={language === 'fr' ? slide.fr : slide.en} className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${active === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:p-10 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-steel-300">{slides[active].meta}</div>
                <h3 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-4xl">{language === 'fr' ? slides[active].fr : slides[active].en}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => move(-1)} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/15" aria-label="Previous slide"><ArrowLeft className="h-4 w-4" /></button>
                <button onClick={() => setPaused((value) => !value)} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/15" aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
                <button onClick={() => move(1)} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/15" aria-label="Next slide"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-3 sm:px-8">
            <div className="flex gap-1.5">{slides.map((slide, index) => <button key={slide.meta} onClick={() => setActive(index)} className={`h-1 rounded-full transition-all ${active === index ? 'w-10 bg-amber-400' : 'w-4 bg-white/20'}`} aria-label={`Show slide ${index + 1}`} />)}</div>
            <div className="flex items-center gap-2 text-xs text-ink-400"><Play className="h-3.5 w-3.5" /> {language === 'fr' ? 'Présentation visuelle' : 'Visual presentation'}</div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
          <div className="relative aspect-video bg-ink-900">
            <video controls preload="metadata" poster={images.sunsetCranes} src={droneVideoUrl || undefined} className="h-full w-full object-cover" aria-label={language === 'fr' ? 'Vidéo drone Power Cranes' : 'Power Cranes drone video'} />
            {!droneVideoUrl && <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-950/30"><div className="glass-strong rounded-full px-5 py-3 text-xs font-medium text-white"><Play className="mr-2 inline h-4 w-4 text-amber-300" /> {language === 'fr' ? 'Vidéo drone à venir' : 'Drone film coming soon'}</div></div>}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300"><Play className="h-4 w-4" /></div><div><div className="text-sm font-semibold text-white">{language === 'fr' ? 'Votre film drone arrive ici' : 'Your drone film belongs here'}</div><div className="text-xs text-ink-300">{language === 'fr' ? 'Lecteur prêt pour votre prochaine vidéo de chantier.' : 'A ready-made player for your next site video.'}</div></div></div>
          </div>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost"><Maximize2 className="h-4 w-4" /> {t('contact')}</button>
        </div>
      </div>
    </section>
  );
}
