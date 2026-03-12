import Hero from '@/components/home/Hero';
import ClientLogos from '@/components/home/ClientLogos';
import Marquee from '@/components/ui/Marquee';
import SectionDivider from '@/components/ui/SectionDivider';
import TextRevealSection from '@/components/home/TextRevealSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import VideoShowreel from '@/components/home/VideoShowreel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection';
import ResultsShowcase from '@/components/home/ResultsShowcase';
import BrandTransform from '@/components/home/BrandTransform';
import FeaturedWork from '@/components/home/FeaturedWork';
import AwardsBanner from '@/components/home/AwardsBanner';
import InfiniteTextWall from '@/components/home/InfiniteTextWall';
import Testimonials from '@/components/home/Testimonials';
import ProcessSection from '@/components/home/ProcessSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Marquee variant="gradient" />
      <TextRevealSection />
      <SectionDivider variant="diamond" />
      <ServicesPreview />
      <Marquee variant="outline" text="RESULTS • IMPACT • GROWTH • INNOVATION • STRATEGY • CREATIVE • " speed={25} />
      <VideoShowreel />
      <SectionDivider variant="gradient" />
      <WhyChooseUs />
      <StatsSection />
      <SectionDivider variant="diamond" />
      <ResultsShowcase />
      <BrandTransform />
      <SectionDivider variant="gradient" />
      <FeaturedWork />
      <InfiniteTextWall />
      <AwardsBanner />
      <Testimonials />
      <SectionDivider variant="diamond" />
      <ProcessSection />
      <CTASection />
    </>
  );
}
