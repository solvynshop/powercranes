import { MessageCircle } from 'lucide-react';
import { site, waLink } from '@/lib/config';
import { trackEvent } from '@/lib/track';
import { useI18n } from '@/i18n';

/** Desktop WhatsApp shortcut (phones already have the sticky bar). */
export function WhatsAppFab() {
  const { t } = useI18n();
  if (!site.whatsapp) return null;
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { from: 'fab' })}
      aria-label={t.sticky.whatsapp}
      className="group fixed bottom-6 end-6 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl md:flex"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-300 group-hover:max-w-[8rem] group-hover:pe-1 group-focus-visible:max-w-[8rem]">
        {t.sticky.whatsapp}
      </span>
    </a>
  );
}
