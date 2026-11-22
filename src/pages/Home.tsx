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
import { useI18n } from '@/i18n';
import { usePageMeta } from '@/lib/meta';

export default function Home() {
  const { t } = useI18n();
  usePageMeta({ title: t.meta.title, description: t.meta.description, path: '/' });
  return (
    <>
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
    </>
  );
}
