import { MessageCircle, Phone } from 'lucide-react';
import { phoneHref, site, waLink } from '@/lib/config';
import { useI18n } from '@/i18n';

/** Thumb-reach actions pinned to the bottom of the screen on phones. */
export function StickyBar() {
  const { t } = useI18n();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="flex gap-2 p-2">
        {site.phone && (
          <a href={phoneHref} className="btn btn-outline flex-1 !px-3 !py-2.5">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {t.sticky.call}
          </a>
        )}
        {site.whatsapp && (
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1 !px-3 !py-2.5">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {t.sticky.whatsapp}
          </a>
        )}
        <a href="#quote" className="btn btn-primary flex-[1.4] !px-3 !py-2.5">
          {t.sticky.quote}
        </a>
      </div>
    </div>
  );
}
