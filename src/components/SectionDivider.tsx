import { useEffect, useRef, useState } from 'react';

type SectionDividerProps = {
  /** Small caption shown beside the cable when the hook lands, e.g. "02 · Sectors" */
  label?: string;
  className?: string;
};

/**
 * A "hoist line" that bridges two sections.
 * As you scroll, a crane hook descends a steel cable, swings slightly,
 * then settles and lands on the next section.
 */
export default function SectionDivider({ label, className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = reduce ? 1 : Math.min(Math.max((vh * 0.85 - rect.top) / (vh * 0.4), 0), 1);
      setP(next);
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const landed = p >= 0.98;
  // Damped swing: sways while descending, settles to 0 when landed
  const swing = Math.sin(p * Math.PI * 3) * (1 - p) * 12;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative mx-auto h-24 w-full max-w-7xl sm:h-32 ${className}`}
    >
      {/* Cable track */}
      <div className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-white/10" />

      {/* Measuring-tape ticks */}
      <div
        className="absolute bottom-3 left-1/2 top-3 w-2.5 -translate-x-1/2 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.7) 0 1px, transparent 1px 8px)',
        }}
      />

      {/* Cable fill (blue to amber, like the navbar line) */}
      <div
        className="absolute bottom-3 left-1/2 top-3 w-px origin-top bg-gradient-to-b from-blue-500 to-amber-300"
        style={{ transform: `translateX(-50%) scaleY(${p})` }}
      />

      {/* Pulley at the top */}
      <div className="absolute left-1/2 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-ink-950">
        <div className="h-1 w-1 rounded-full bg-blue-400" />
      </div>

      {/* Hook */}
      <div
        className="absolute left-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-amber-300/40 bg-ink-950 text-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.25)]"
        style={{
          top: `calc((100% - 52px) * ${p} + 12px)`,
          transform: `translateX(-50%) rotate(${swing}deg)`,
          transformOrigin: '50% -12px',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v8" />
          <path d="M12 10v6a4 4 0 1 1-4-4" />
        </svg>
      </div>

      {/* Landing point */}
      <div
        className={`absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border transition-all duration-500 ${
          landed
            ? 'scale-125 border-amber-300 bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.7)]'
            : 'border-blue-400/50 bg-transparent'
        }`}
      />

      {/* Optional caption */}
      {label && (
        <div
          className="absolute bottom-0 left-1/2 ml-5 text-[10px] uppercase tracking-[0.22em] text-steel-300 transition-opacity duration-500"
          style={{ opacity: landed ? 1 : 0 }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
