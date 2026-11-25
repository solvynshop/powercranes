import { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { mapsEmbed, mapsLink, phoneHref, site, waLink } from '@/lib/config';
import { useI18n } from '@/i18n';
import { trackEvent } from '@/lib/track';
import { Reveal, SectionHead } from './Section';

type Row = { icon: LucideIcon; title: string; lines: string[]; href?: string; ltr?: boolean };

export function Contact() {
  const { t } = useI18n();
  const [mapReady, setMapReady] = useState(false);

  const rows: Row[] = [
    { icon: MapPin, title: t.contact.address, lines: site.address },
    { icon: Mail, title: t.contact.email, lines: [site.email], href: `mailto:${site.email}`, ltr: true },
    { icon: Clock, title: t.contact.hours, lines: t.contact.hoursLines },
  ];
  if (site.phone) rows.push({ icon: Phone, title: t.contact.phone, lines: [site.phone], href: phoneHref, ltr: true });
  if (site.whatsapp) rows.push({ icon: MessageCircle, title: t.contact.whatsapp, lines: [site.phone || '+' + site.whatsapp], href: waLink(), ltr: true });

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-24">
      <div className="blueprint absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead index="10" tag={t.contact.tag} title={t.contact.title} tone="dark" />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <ul className="space-y-3">
            {rows.map((row) => (
              <li key={row.title}>
                <Reveal className="flex gap-4 rounded-lg border border-white/10 bg-navy-900/80 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-brand-500 text-navy-950">
                    <row.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="caps font-mono text-[11px] font-semibold text-brand-400">{row.title}</p>
                    {row.lines.map((line) =>
                      row.href ? (
                        <a key={line} href={row.href} onClick={() => trackEvent(row.icon === Mail ? 'email_click' : row.icon === Phone ? 'phone_click' : 'whatsapp_click', { from: 'contact' })} className="block text-lg font-semibold hover:text-brand-400" dir={row.ltr ? 'ltr' : undefined}>
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-lg font-semibold">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={100} className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-navy-900">
            <div className="relative h-72 w-full flex-1 lg:min-h-[22rem]">
              {!mapReady && (
                <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-navy-800" role="status">
                  <MapPin className="h-8 w-8 text-navy-500" aria-hidden="true" />
                  <span className="sr-only">Loading map…</span>
                </div>
              )}
              <iframe
                title={t.contact.mapTitle}
                src={mapsEmbed}
                loading="lazy"
                onLoad={() => setMapReady(true)}
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline m-3 !py-2.5">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {t.contact.maps}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
