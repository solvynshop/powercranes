type LogoProps = {
  /** 'light' = white wordmark for dark backgrounds, 'dark' = navy wordmark for light ones. */
  tone?: 'light' | 'dark';
  className?: string;
};

/** Vector crane mark: orange tile, navy mobile crane. Mirrors /public/favicon.svg. */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="9" fill="#F89008" />
      <rect x="8" y="26" width="14" height="6" rx="1" fill="#08183C" />
      <rect x="5" y="32" width="38" height="5" rx="1" fill="#08183C" />
      <path d="M34 32V27l4-2h4l1 7z" fill="#08183C" />
      <path d="M12 27 35 8" stroke="#08183C" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M35 8v11" stroke="#08183C" strokeWidth="1.5" />
      <rect x="33.5" y="19" width="3" height="3.5" fill="#08183C" />
      <g fill="#08183C">
        <circle cx="11" cy="39" r="3.4" />
        <circle cx="19" cy="39" r="3.4" />
        <circle cx="28" cy="39" r="3.4" />
        <circle cx="36" cy="39" r="3.4" />
      </g>
      <g fill="#F89008">
        <circle cx="11" cy="39" r="1" />
        <circle cx="19" cy="39" r="1" />
        <circle cx="28" cy="39" r="1" />
        <circle cx="36" cy="39" r="1" />
      </g>
    </svg>
  );
}

/** Mark + wordmark. The wordmark stays Latin and italic in every language. */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const text = tone === 'light' ? 'text-white' : 'text-navy-900';
  const bar = tone === 'light' ? 'bg-white' : 'bg-navy-900';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span className={`block font-brand text-2xl font-extrabold italic uppercase ${text}`}>
          Power <span className="text-brand-500">Cranes</span>
        </span>
        <span className="mt-1.5 flex gap-1" aria-hidden="true">
          <i className={`block h-[3px] flex-[3] ${bar}`} />
          <i className="block h-[3px] flex-[2] bg-brand-500" />
          <i className={`block h-[3px] flex-[3] ${bar}`} />
        </span>
      </span>
    </span>
  );
}
