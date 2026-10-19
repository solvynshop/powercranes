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
import SectionDivider from '@/components/SectionDivider';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-ink-950 text-ink-100">
        <Navbar />
        <main>
          <Hero />
          <SectionDivider label="01" />
          <About />
          <SectionDivider label="02" />
          <Location />
          <SectionDivider label="03" />
          <WorkShowcase />
          <SectionDivider label="04" />
          <Products />
          <SectionDivider label="05" />
          <Sectors />
          <SectionDivider label="06" />
          <FeatureSplit />
          <SectionDivider label="07" />
          <Process />
          <SectionDivider label="08" />
          <Partners />
          <SectionDivider label="09" />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
