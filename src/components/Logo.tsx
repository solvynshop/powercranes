type LogoProps = {
  /** 'light' = artwork for dark backgrounds (white "POWER"), 'dark' = for light backgrounds (navy "POWER"). */
  tone?: 'light' | 'dark';
  className?: string;
};

/** The real Power Cranes logo (crane + wordmark), identical in every language. */
export function Logo({ tone = 'light', className = 'h-12' }: LogoProps) {
  return (
    <img
      src={tone === 'light' ? '/brand/logo-dark.webp' : '/brand/logo-light.webp'}
      alt="Power Cranes"
      width={900}
      height={388}
      className={`w-auto ${className}`}
      decoding="async"
    />
  );
}
