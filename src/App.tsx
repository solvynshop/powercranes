import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Products } from '@/components/Products';
import { Sectors } from '@/components/Sectors';
import { FeatureSplit } from '@/components/FeatureSplit';
import { Process } from '@/components/Process';
import { Partners } from '@/components/Partners';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WorkShowcase } from '@/components/WorkShowcase';
import { Location } from '@/components/Location';
import { LanguageProvider } from '@/lib/i18n';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-ink-950 text-ink-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Location />
        <WorkShowcase />
        <Products />
        <Sectors />
        <FeatureSplit />
        <Process />
        <Partners />
        <Contact />
      </main>
      <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
