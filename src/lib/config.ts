/**
 * Site-wide contact details. Edit this file to update the site.
 *
 * `phone` and `whatsapp` are intentionally EMPTY: the previous site showed a
 * placeholder number (+212 5 39 00 00 00). While these stay empty, every
 * call / WhatsApp button is hidden and quote requests go out by e-mail.
 * Fill them in and the buttons appear everywhere automatically.
 */
export const site = {
  name: 'Power Cranes',
  legalName: 'Power Cranes SARL AU',
  url: 'https://powercranesma.com',
  email: 'contact@powercranesma.com',

  /** Display format, e.g. '+212 6 12 34 56 78'. Leave '' until you have the real number. */
  phone: '',
  /** Digits only, with country code, no "+": e.g. '212612345678'. Leave '' until ready. */
  whatsapp: '',

  address: ['183 Avenue Prince Héritier', 'Centre Nrea RDC, Local N°15', 'Tanger-Médina, Maroc'],
  mapQuery: '183 Avenue Prince Heritier, Tanger, Maroc',
};

export const phoneHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : '';

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

export function waLink(text?: string): string {
  if (!site.whatsapp) return '';
  const base = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailLink(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
