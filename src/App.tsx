import { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from '@/i18n';
import { QuoteProvider } from '@/lib/quote';
import { RouterProvider, useRouter } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyBar } from '@/components/StickyBar';
import { CookieBanner } from '@/components/CookieBanner';
import Home from '@/pages/Home';

// Secondary pages are loaded on demand, so the home page stays as light as possible.
const Legal = lazy(() => import('@/pages/Legal'));
const Thanks = lazy(() => import('@/pages/Thanks'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-navy-100 border-t-brand-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function Routes() {
  const { path } = useRouter();
  switch (path) {
    case '/':
      return <Home />;
    case '/privacy':
      return <Legal kind="privacy" />;
    case '/terms':
      return <Legal kind="terms" />;
    case '/thank-you':
      return <Thanks />;
    default:
      return <NotFound />;
  }
}

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <QuoteProvider>
          <Navbar />
          <main id="main">
            <Suspense fallback={<PageFallback />}>
              <Routes />
            </Suspense>
          </main>
          <Footer />
          <StickyBar />
          <CookieBanner />
          <Analytics />
        </QuoteProvider>
      </RouterProvider>
    </I18nProvider>
  );
}
