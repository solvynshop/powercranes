import { ExternalLink, MapPin, Navigation, Waves } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useReveal } from '@/lib/hooks';

export function Location() {
  const { language } = useLanguage();
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const address = '183 Avenue Prince Héritier, Centre Nrea RDC, Local N°15, Tanger-Médina, Morocco';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=183+Avenue+Prince+Héritier+Tanger+Morocco';

  return (
    <section id="location" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900 to-ink-950" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 reveal ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300"><Navigation className="h-3.5 w-3.5" /> {language === 'fr' ? 'Nous trouver' : 'Find us'}</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{language === 'fr' ? 'Au cœur de Tanger.' : 'At the heart of Tangier.'}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-200">{language === 'fr' ? 'À quelques minutes des grands axes logistiques du nord du Maroc, notre équipe vous accueille au Centre Nrea.' : 'Minutes from northern Morocco’s key logistics routes, our team welcomes you at Centre Nrea.'}</p>
            <div className="mt-8 glass rounded-2xl p-5">
              <div className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-500/20 text-steel-300"><MapPin className="h-5 w-5" /></div><div><div className="text-xs uppercase tracking-[0.15em] text-steel-300">Power Cranes SARL AU</div><div className="mt-1 text-sm leading-relaxed text-white">{address}</div></div></div>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-5 w-full !py-2.5"><ExternalLink className="h-4 w-4" /> {language === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}</a>
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#dce7ef] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <iframe title="Power Cranes location in Tangier" src="https://www.google.com/maps?q=183+Avenue+Prince+Heritier,+Tanger,+Morocco&output=embed" className="absolute inset-0 h-full w-full opacity-80 grayscale-[0.25] contrast-125" loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-steel-950/25 via-transparent to-ink-950/30" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-amber-300/80 bg-ink-950/80 shadow-[0_0_0_14px_rgba(245,158,11,0.12),0_0_0_30px_rgba(245,158,11,0.06)] backdrop-blur-md">
                <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 48 29 16l25 32" className="text-steel-300" /><path d="M29 16v36M15 39h35" className="text-amber-300" /><path d="M31 10h23" className="text-white" /><path d="M50 10v22" className="text-white" /><path d="M50 32h7" className="text-amber-300" /></svg>
                <span className="absolute -bottom-9 whitespace-nowrap rounded-full bg-ink-950/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Power Cranes</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink-950/85 px-3 py-2 text-xs text-white backdrop-blur-md"><Waves className="h-3.5 w-3.5 text-steel-300" /> Tanger-Médina · Morocco</div>
          </div>
        </div>
      </div>
    </section>
  );
}
