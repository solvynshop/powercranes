import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Loader2, Mail, MessageCircle, Phone, Send, X } from 'lucide-react';
import { fleet, fleetById } from '@/lib/fleet';
import { mailLink, phoneHref, site, waLink } from '@/lib/config';
import { useQuote } from '@/lib/quote';
import { Link, useRouter } from '@/lib/router';
import { useI18n } from '@/i18n';
import { Reveal, SectionHead } from './Section';

type Duration = '' | 'half' | 'day' | 'week' | 'month';
type Channel = 'form' | 'whatsapp' | 'email';
type FieldKey = 'name' | 'phone' | 'email' | 'consent';

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  crane: string;
  load: string;
  radius: string;
  height: string;
  date: string;
  duration: Duration;
  details: string;
  consent: boolean;
  /** Honeypot: real visitors never see or fill it. */
  website: string;
};

const empty: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  city: '',
  crane: '',
  load: '',
  radius: '',
  height: '',
  date: '',
  duration: '',
  details: '',
  consent: false,
  website: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Quote() {
  const { t } = useI18n();
  const { draft, setDraft } = useQuote();
  const { navigate } = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle');
  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    consent: useRef<HTMLInputElement>(null),
  };
  const uid = useId();
  const id = (key: string) => `${uid}-${key}`;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  // Pick up a lift sent from the planner, or a crane chosen on the fleet card.
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

  const errors: Partial<Record<FieldKey, string>> = {};
  if (form.name.trim().length < 2) errors.name = t.quote.errors.name;
  if (form.phone.replace(/\D/g, '').length < 8) errors.phone = t.quote.errors.phone;
  if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) errors.email = t.quote.errors.email;
  if (!form.consent) errors.consent = t.quote.errors.consent;
  const errorKeys = Object.keys(errors) as FieldKey[];
  const shown = (key: FieldKey) => (attempted ? errors[key] : undefined);

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

  const finish = (via: Channel) => {
    setDraft(null);
    setForm(empty);
    setAttempted(false);
    setStatus('idle');
    navigate(`/thank-you?via=${via}`);
  };

  const send = async (channel: Channel) => {
    setAttempted(true);
    if (errorKeys.length) {
      refs[errorKeys[0]].current?.focus();
      return;
    }
    if (form.website) return finish(channel); // honeypot filled: a bot. Pretend success, send nothing.

    const text = buildMessage();
    if (channel === 'whatsapp') {
      window.open(waLink(text), '_blank', 'noopener,noreferrer');
      return finish('whatsapp');
    }
    if (channel === 'email') {
      window.location.href = mailLink(t.quote.mailSubject, text);
      return finish('email');
    }

    setStatus('sending');
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: t.quote.mailSubject,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          _replyto: form.email.trim(),
          company: form.company.trim(),
          city: form.city.trim(),
          message: text,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      finish('form');
    } catch {
      setStatus('failed');
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(primary);
  };

  const hasForm = Boolean(site.formEndpoint);
  const hasWa = Boolean(site.whatsapp);
  const primary: Channel = hasForm ? 'form' : hasWa ? 'whatsapp' : 'email';
  const secondary = (['whatsapp', 'email'] as const).filter((c) => c !== primary && (c !== 'whatsapp' || hasWa));
  const channelLabel: Record<Channel, string> = { form: t.quote.submit, whatsapp: t.quote.sendWhatsApp, email: t.quote.sendEmail };
  const channelIcon = { form: Send, whatsapp: MessageCircle, email: Mail } as const;
  const hint = primary === 'form' ? t.quote.hintForm : primary === 'whatsapp' ? t.quote.hintWhatsApp : t.quote.hintEmail;
  const PrimaryIcon = channelIcon[primary];
  const sending = status === 'sending';

  const label = 'caps mb-1.5 block font-mono text-[11px] font-semibold text-navy-500';
  const fieldClass = (key: FieldKey) => `field ${shown(key) ? '!border-red-500 !ring-2 !ring-red-500/20' : ''}`;
  const hasPlannerData = Boolean(draft && draft.load !== undefined);

  const FieldError = ({ field }: { field: FieldKey }) =>
    shown(field) ? (
      <p id={id(`${field}-err`)} className="mt-1 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: FieldKey) => ({ 'aria-invalid': Boolean(shown(field)), 'aria-describedby': shown(field) ? id(`${field}-err`) : undefined });

  return (
    <section id="quote" className="bg-paper py-16 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHead index="08" tag={t.quote.tag} title={t.quote.title} intro={t.quote.intro} className="!mb-8" />
          <p className="caps mb-3 font-mono text-xs font-semibold text-navy-500">{t.quote.alt}</p>
          <ul className="space-y-3 text-lg font-semibold text-navy-900">
            {site.phone && (
              <li>
                <a href={phoneHref} className="inline-flex items-center gap-2 hover:text-brand-700" dir="ltr">
                  <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
            )}
            {site.whatsapp && (
              <li>
                <a href={waLink()} className="inline-flex items-center gap-2 hover:text-brand-700" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  {t.contact.whatsapp}
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

            {attempted && errorKeys.length > 0 && (
              <p role="alert" className="mb-5 rounded border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-800">
                {t.quote.errors.summary}
              </p>
            )}
            {status === 'failed' && (
              <p role="alert" className="mb-5 rounded border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-800">
                {t.quote.errors.send}{' '}
                <a href={`mailto:${site.email}`} className="underline" dir="ltr">
                  {site.email}
                </a>
                {site.phone && (
                  <>
                    {' · '}
                    <a href={phoneHref} className="underline" dir="ltr">
                      {site.phone}
                    </a>
                  </>
                )}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id('name')} className={label}>
                  {t.quote.name} *
                </label>
                <input id={id('name')} ref={refs.name} className={fieldClass('name')} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} {...a11y('name')} />
                <FieldError field="name" />
              </div>
              <div>
                <label htmlFor={id('phone')} className={label}>
                  {t.quote.phone} *
                </label>
                <input
                  id={id('phone')}
                  ref={refs.phone}
                  className={fieldClass('phone')}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  {...a11y('phone')}
                />
                <FieldError field="phone" />
              </div>
              <div>
                <label htmlFor={id('email')} className={label}>
                  {t.quote.emailField}
                </label>
                <input
                  id={id('email')}
                  ref={refs.email}
                  className={fieldClass('email')}
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  {...a11y('email')}
                />
                <FieldError field="email" />
              </div>
              <div>
                <label htmlFor={id('company')} className={label}>
                  {t.quote.company}
                </label>
                <input id={id('company')} className="field" autoComplete="organization" value={form.company} onChange={(e) => set('company', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
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
                  <input id={id(key)} className="field" type="number" min={0} inputMode="decimal" dir="ltr" value={form[key]} onChange={(e) => set(key, e.target.value)} />
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

            {/* Honeypot: hidden from people and screen readers, tempting for bots. */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
              </label>
            </div>

            <div className="mt-5">
              <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-700">
                <input
                  ref={refs.consent}
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-brand-500"
                  {...a11y('consent')}
                />
                <span>
                  {t.quote.consentPre}
                  <Link to="/privacy" className="font-semibold text-brand-800 underline" target="_blank">
                    {t.quote.consentLink}
                  </Link>
                  {t.quote.consentPost}
                </span>
              </label>
              <FieldError field="consent" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
                {sending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <PrimaryIcon className="h-5 w-5" aria-hidden="true" />}
                {sending ? t.quote.sending : channelLabel[primary]}
              </button>
              {secondary.map((channel) => {
                const Icon = channelIcon[channel];
                return (
                  <button key={channel} type="button" disabled={sending} onClick={() => void send(channel)} className="btn btn-outline-dark w-full sm:w-auto">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {channelLabel[channel]}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-navy-500">{hint}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
