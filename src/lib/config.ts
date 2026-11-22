/**
 * Site-wide company details. Edit this file to update the site everywhere.
 * Source: the company letterhead (Engagement CNSS, Oct. 2026).
 */
export const site = {
  name: 'Power Cranes',
  legalName: 'Power Cranes SARL AU',
  url: 'https://powercranesma.com',
  email: 'info@powercranesma.com',

  /** Display format. */
  phone: '+212 667 015 303',
  /** Digits only, with country code, no "+". Leave '' to hide every WhatsApp button. */
  whatsapp: '212667015303',

  address: ['183 Avenue Prince Héritier', 'Center Nrea, Bureau N°15', 'Tanger, Maroc'],
  mapQuery: '183 Avenue Prince Heritier, Tanger, Maroc',

  /** Public business identifiers, shown in the legal notice. */
  legal: {
    manager: 'Soufiane Bakkali Kasmi',
    rc: '147703 (Tanger)',
    ice: '00346737700080',
    if: '60267987',
    tp: '50418438',
  },

  /**
   * Optional integrations, set as environment variables (Vercel > Settings > Environment Variables):
   *  VITE_FORM_ENDPOINT  a Formspree / Getform URL: quote requests are then delivered by e-mail
   *                      without opening WhatsApp or the mail app.
   *  VITE_GA_ID          a Google Analytics 4 id (G-XXXXXXXXXX): loaded only after cookie consent.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
  gaId: (import.meta.env.VITE_GA_ID as string | undefined) ?? '',
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
