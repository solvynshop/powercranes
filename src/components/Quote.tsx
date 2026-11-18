import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import { fleet, fleetById } from '@/lib/fleet';
import { mailLink, phoneHref, site, waLink } from '@/lib/config';
import { useQuote } from '@/lib/quote';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

type Duration = '' | 'half' | 'day' | 'week' | 'month';

type FormState = {
  name: string;
  phone: string;
  company: string;
  city: string;
  crane: string;
  load: string;
  radius: string;
  height: string;
  date: string;
  duration: Duration;
  details: string;
};

const empty: FormState = {
  name: '',
  phone: '',
  company: '',
  city: '',
  crane: '',
  load: '',
  radius: '',
  height: '',
  date: '',
  duration: '',
  details: '',
};

export function Quote() {
  const { t } = useI18n();
  const { draft, setDraft } = useQuote();
  const [form, setForm] = useState<FormState>(empty);
  const [attempted, setAttempted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const id = (key: string) => `${uid}-${key}`;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  // Pick up a lift sent from the planner, or a crane chosen on a fleet card.
  useEffect(() => {
    if (!draft) return;
    setForm((f) => ({
      ...f,
      crane: draft.craneId ?? f.crane,
      load: draft.load !== undefined ? String(draft.load) : f.load,
      radius: draft.radius !== undefined ? String(draft.radius) : f.radius,
      height: draft.height !== undefined ? String(draft.height) : f.height,
    }));
  }, [draft]);

  const clearPlanner = () => {
    setDraft(null);
    setForm((f) => ({ ...f, load: '', radius: '', height: '' }));
  };

  const buildMessage = (): string => {
    const m = t.quote.msg;
    const lines: string[] = [m.hello, ''];
    const add = (label: string, value: string) => {
      if (value.trim()) lines.push(`${label}: ${value.trim()}`);
    };
    add(m.name, form.name);
    add(m.phone, form.phone);
    add(m.company, form.company);
    add(m.city, form.city);
    const crane = fleetById(form.crane);
    if (crane) add(m.crane, `${crane.tons} ${t.units.t}`);
    if (form.load) add(m.load, `${form.load} ${t.units.t}`);
    if (form.radius) add(m.radius, `${form.radius} ${t.units.m}`);
    if (form.height) add(m.height, `${form.height} ${t.units.m}`);
    add(m.date, form.date);
    if (form.duration) add(m.duration, t.quote.durations[form.duration]);
    add(m.details, form.details);
    return lines.join('\n');
  };

  const send = (channel: 'whatsapp' | 'email') => {
    setAttempted(true);
    if (!form.name.trim()) return nameRef.current?.focus();
    if (!form.phone.trim()) return phoneRef.current?.focus();

    const text = buildMessage();
    if (channel === 'whatsapp' && site.whatsapp) {
      window.open(waLink(text), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = mailLink(t.quote.mailSubject, text);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(site.whatsapp ? 'whatsapp' : 'email');
  };

  const nameError = attempted && !form.name.trim();
  const phoneError = attempted && !form.phone.trim();
  const label = 'caps mb-1.5 block font-mono text-[11px] font-semibold text-navy-500';
  const hasPlannerData = Boolean(draft && draft.load !== undefined);

  return (
    <section id="quote" className="bg-paper py-16 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHead index="08" tag={t.quote.tag} title={t.quote.title} intro={t.quote.intro} className="!mb-8" />
          <ul className="space-y-3 text-lg font-semibold text-navy-900">
            {site.whatsapp && (
              <li>
                <a href={waLink()} className="inline-flex items-center gap-2 hover:text-brand-700" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  {t.contact.whatsapp}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a href={phoneHref} className="inline-flex items-center gap-2 hover:text-brand-700" dir="ltr">
                  <span className="sr-only">{t.contact.phone}</span>
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-brand-700" dir="ltr">
                <Mail className="h-5 w-5 text-brand-600" aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="rounded-lg border border-navy-100 bg-white p-5 shadow-card sm:p-7">
            {hasPlannerData && draft && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded border border-brand-300 bg-brand-50 px-3.5 py-2.5 text-sm text-navy-800">
                <p>
                  <span className="font-semibold">{t.quote.fromPlanner}:</span>{' '}
                  <span className="font-mono" dir="ltr">
                    {draft.load} {t.units.t} · R {draft.radius} {t.units.m} · H {draft.height} {t.units.m}
                  </span>
                </p>
                <button type="button" onClick={clearPlanner} className="inline-flex items-center gap-1 font-semibold text-brand-800 hover:underline">
                  <X className="h-4 w-4" aria-hidden="true" />
                  {t.quote.clearPlanner}
                </button>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id('name')} className={label}>
                  {t.quote.name} *
                </label>
                <input
                  id={id('name')}
                  ref={nameRef}
                  className="field"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={nameError}
                  aria-describedby={nameError ? id('name-err') : undefined}
                />
                {nameError && (
                  <p id={id('name-err')} className="mt-1 text-sm font-medium text-red-700">
                    {t.quote.required}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={id('phone')} className={label}>
                  {t.quote.phone} *
                </label>
                <input
                  id={id('phone')}
                  ref={phoneRef}
                  className="field"
                  type="tel"
                  autoComplete="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={phoneError}
                  aria-describedby={phoneError ? id('phone-err') : undefined}
                />
                {phoneError && (
                  <p id={id('phone-err')} className="mt-1 text-sm font-medium text-red-700">
                    {t.quote.required}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={id('company')} className={label}>
                  {t.quote.company}
                </label>
                <input id={id('company')} className="field" autoComplete="organization" value={form.company} onChange={(e) => set('company', e.target.value)} />
              </div>
              <div>
                <label htmlFor={id('city')} className={label}>
                  {t.quote.city}
                </label>
                <input id={id('city')} className="field" value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor={id('crane')} className={label}>
                {t.quote.crane}
              </label>
              <select id={id('crane')} className="field" value={form.crane} onChange={(e) => set('crane', e.target.value)}>
                <option value="">{t.quote.craneAuto}</option>
                {fleet.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.tons} {t.units.t}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {(
                [
                  ['load', t.quote.load],
                  ['radius', t.quote.radius],
                  ['height', t.quote.height],
                ] as const
              ).map(([key, text]) => (
                <div key={key}>
                  <label htmlFor={id(key)} className={label}>
                    {text}
                  </label>
                  <input
                    id={id(key)}
                    className="field"
                    type="number"
                    min={0}
                    inputMode="decimal"
                    dir="ltr"
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id('date')} className={label}>
                  {t.quote.date}
                </label>
                <input id={id('date')} className="field" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
              </div>
              <div>
                <label htmlFor={id('duration')} className={label}>
                  {t.quote.duration}
                </label>
                <select id={id('duration')} className="field" value={form.duration} onChange={(e) => set('duration', e.target.value as Duration)}>
                  <option value="">—</option>
                  {(Object.keys(t.quote.durations) as Exclude<Duration, ''>[]).map((key) => (
                    <option key={key} value={key}>
                      {t.quote.durations[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor={id('details')} className={label}>
                {t.quote.message}
              </label>
              <textarea
                id={id('details')}
                className="field min-h-24 resize-y"
                rows={3}
                placeholder={t.quote.messagePh}
                value={form.details}
                onChange={(e) => set('details', e.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                {site.whatsapp ? <MessageCircle className="h-5 w-5" aria-hidden="true" /> : <Mail className="h-5 w-5" aria-hidden="true" />}
                {site.whatsapp ? t.quote.sendWhatsApp : t.quote.sendEmail}
              </button>
              {site.whatsapp && (
                <button type="button" onClick={() => send('email')} className="btn btn-outline-dark w-full sm:w-auto">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  {t.quote.sendEmail}
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-navy-500">{site.whatsapp ? t.quote.hintWhatsApp : t.quote.hintEmail}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
