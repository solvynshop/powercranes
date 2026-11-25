import { track as vercelTrack } from '@vercel/analytics';

type EventName = 'quote_submit' | 'whatsapp_click' | 'phone_click' | 'email_click' | 'planner_cta' | 'lang_switch';

/** Fire-and-forget conversion event. Vercel Analytics is cookieless; GA4 only exists after cookie consent. */
export function trackEvent(name: EventName, data?: Record<string, string | number>) {
  try {
    vercelTrack(name, data);
  } catch {
    /* analytics must never break the page */
  }
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', name, data);
  } catch {
    /* ignore */
  }
}
