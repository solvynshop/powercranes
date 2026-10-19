import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useReveal } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n';

export function Contact() {
  const { ref, isVisible } = useReveal({ threshold: 0.08 });
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1400);
  };

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-ink-400 outline-none transition-all duration-300 focus:border-steel-400/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-steel-500/20';

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
      <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-steel-700/20 blur-3xl" />
      <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: info */}
          <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-300">
              {t('contactTag')}
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t('contactTitle')}
              <span className="text-gradient-steel">{t('consultation')}</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-200">
              {t('contactBody')}
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, title: t('address'), lines: ['183 Avenue Prince Héritier,', 'Centre Nrea RDC, Local N°15,', 'Tanger-Médina, Morocco'] },
                { icon: Phone, title: t('phone'), lines: ['+212 5 39 00 00 00'] },
                { icon: Mail, title: t('email'), lines: ['contact@powercranesma.com'] },
                { icon: Clock, title: t('hours'), lines: ['Mon – Fri · 08:30 – 18:30', 'Sat · 09:00 – 13:00'] },
              ].map((c) => (
                <div key={c.title} className="glass rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-500/20 text-steel-300">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-steel-300">{c.title}</div>
                      {c.lines.map((l) => (
                        <div key={l} className="text-sm font-medium text-white">{l}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className={`reveal ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.12s' }}>
            <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 sm:p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-ink-300">{t('fullName')} *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`mt-1.5 ${field}`} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-ink-300">{t('company')}</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={`mt-1.5 ${field}`} placeholder="Company name" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-ink-300">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`mt-1.5 ${field}`} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-ink-300">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`mt-1.5 ${field}`} placeholder="+212 ..." />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.15em] text-ink-300">{t('yourRequest')} *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`mt-1.5 ${field} resize-none`} placeholder={t('describeRequest')} />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="btn-primary mt-6 w-full disabled:opacity-80"
              >
                {status === 'idle' && (<><Send className="h-4 w-4" /> {t('send')}</>)}
                {status === 'sending' && (<><Loader2 className="h-4 w-4 animate-spin" /> {t('sending')}</>)}
                {status === 'sent' && (<><CheckCircle2 className="h-4 w-4" /> {t('received')}</>)}
              </button>

              <p className="mt-3 text-center text-xs text-ink-400">
                {t('reply')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
