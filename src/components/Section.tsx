import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/hooks';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

type SectionHeadProps = {
  index: string;
  tag: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  className?: string;
};

export function SectionHead({ index, tag, title, intro, tone = 'light', className = '' }: SectionHeadProps) {
  const dark = tone === 'dark';
  return (
    <Reveal className={`mb-10 max-w-3xl sm:mb-12 ${className}`}>
      <p className={`eyebrow ${dark ? 'text-brand-400' : 'text-brand-700'}`}>
        <span>{index}</span>
        <span aria-hidden="true">/</span>
        <span>{tag}</span>
      </p>
      <h2
        className={`caps-tight mt-3 font-display text-4xl font-extrabold leading-[0.98] sm:text-5xl ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${dark ? 'text-navy-200' : 'text-navy-600'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
