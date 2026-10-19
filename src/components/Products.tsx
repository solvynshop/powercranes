import { ArrowUpRight } from 'lucide-react';
import { products } from '@/lib/content';
import { useReveal } from '@/lib/hooks';
import type { Product } from '@/lib/content';
import { useLanguage } from '@/lib/i18n';

export function Products() {
  const { ref, isVisible } = useReveal({ threshold: 0.05 });
  const { t } = useLanguage();

  return (
    <section id="products" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-950" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 mask-fade-b" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} max-w-2xl`}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
            {t('whatSupply')}
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {t('catalogTitle')}
            <span className="text-gradient-steel">{t('heavyIndustry')}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-200">
            {t('catalogBody')}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { ref, isVisible } = useReveal({ threshold: 0.2 });
  const { localName } = useLanguage();
  const Icon = product.icon;

  return (
    <article
      ref={ref}
      id={product.id}
      className={`card-hover group relative overflow-hidden rounded-3xl glass p-6 reveal ${
        isVisible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-steel-500/0 blur-3xl transition-all duration-700 group-hover:bg-steel-500/20" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-steel-500/30 to-steel-700/20 text-steel-200 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-ink-400 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-white">{localName(product.id, product.name, 'product')}</h3>
      <p className="relative mt-1 text-sm font-medium text-steel-300">{product.tagline}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-ink-300">{product.description}</p>

      <dl className="relative mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {product.specs.map((s) => (
          <div key={s.label}>
            <dt className="text-[10px] uppercase tracking-[0.12em] text-ink-400">{s.label}</dt>
            <dd className="mt-0.5 text-xs font-semibold text-white">{s.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
