import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import StatsSection from '@/components/home/StatsSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <StatsSection />
      <FeaturedWork />
      <Testimonials />
      <CTASection />
    </>
  );
}
