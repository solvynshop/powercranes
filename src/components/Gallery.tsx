import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, MapPin, Play, X } from 'lucide-react';
import { gallery } from '@/lib/gallery';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

/** Real work photos and videos with a keyboard-friendly lightbox. Renders nothing until src/lib/gallery.ts has items. */
export function Gallery() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const count = gallery.length;

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(lang === 'ar' ? -1 : 1);
      if (e.key === 'ArrowLeft') step(lang === 'ar' ? 1 : -1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step, lang]);

  if (!count) return null;
  const current = open === null ? null : gallery[open];

  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead index="" tag={t.gallery.tag} title={t.gallery.title} intro={t.gallery.intro} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <li key={item.src}>
              <Reveal delay={Math.min(i, 5) * 50} className="h-full">
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(i);
                  }}
                  aria-label={`${t.gallery.open}: ${item.caption[lang]}`}
                  className="group relative block h-full w-full overflow-hidden rounded-lg bg-navy-100 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  {item.type === 'video' && !item.poster ? (
                    <video src={`${item.src}#t=0.5`} muted playsInline preload="metadata" aria-label={item.alt[lang]} className="aspect-[4/3] h-full w-full object-cover" />
                  ) : (
                    <img
                      src={item.type === 'video' ? item.poster : item.src}
                      alt={item.alt[lang]}
                      width={1600}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                  {item.type === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-navy-950 shadow-lg transition group-hover:scale-110">
                        <Play className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-3 pt-10 text-white">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.city[lang]}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug sm:text-base">{item.caption[lang]}</span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {current &&
        createPortal(
        <div role="dialog" aria-modal="true" aria-label={current.caption[lang]} className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 p-3 sm:p-6" onClick={close}>
          <div className="flex justify-end">
            <button ref={closeRef} type="button" onClick={close} aria-label={t.nav.close} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {current.type === 'video' ? (
              <video key={current.src} src={current.src} poster={current.poster} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" />
            ) : (
              <img src={current.src} alt={current.alt[lang]} className="max-h-full max-w-full rounded-lg object-contain" />
            )}
            {count > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label={t.gallery.prev} className="glass absolute start-0 flex h-11 w-11 items-center justify-center rounded-full text-white sm:start-2">
                  <ChevronLeft className="h-6 w-6 rtl:-scale-x-100" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className="glass absolute end-0 flex h-11 w-11 items-center justify-center rounded-full text-white sm:end-2">
                  <ChevronRight className="h-6 w-6 rtl:-scale-x-100" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <p className="mt-3 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">{current.city[lang]}</span>
            <span className="mt-1 block text-lg font-semibold">{current.caption[lang]}</span>
          </p>
        </div>,
        document.body
      )}
    </section>
  );
}
