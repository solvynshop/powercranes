import { I18nProvider } from '@/i18n';
import { QuoteProvider } from '@/lib/quote';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Fleet } from '@/components/Fleet';
import { LiftPlanner } from '@/components/LiftPlanner';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Sectors } from '@/components/Sectors';
import { Coverage } from '@/components/Coverage';
import { Safety } from '@/components/Safety';
import { Quote } from '@/components/Quote';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { StickyBar } from '@/components/StickyBar';

export default function App() {
  return (
    <I18nProvider>
      <QuoteProvider>
        <Navbar />
        <main>
          <Hero />
          <Fleet />
          <LiftPlanner />
          <Services />
          <Process />
          <Sectors />
          <Coverage />
          <Safety />
          <Quote />
          <Contact />
        </main>
        <Footer />
        <StickyBar />
      </QuoteProvider>
    </I18nProvider>
  );
}
