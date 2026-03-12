import Hero from '@/components/home/Hero';
import ClientLogos from '@/components/home/ClientLogos';
import Marquee from '@/components/ui/Marquee';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Marquee />
      <ServicesPreview />
      <ProcessSection />
      <StatsSection />
      <FeaturedWork />
      <Testimonials />
      <CTASection />
    </>
  );
}
