'use client';
import GlowCard from '@/components/ui/GlowCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { HiPaintBrush, HiSpeakerWave, HiUsers } from 'react-icons/hi2';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  {
    icon: HiPaintBrush,
    title: 'Branding',
    description: 'Craft a powerful brand identity that resonates with your audience and stands out in the digital landscape.',
    color: 'cyan',
    features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
  },
  {
    icon: HiSpeakerWave,
    title: 'Social Media Marketing',
    description: 'Dominate social platforms with data-driven strategies and content that sparks engagement and drives conversions.',
    color: 'purple',
    features: ['Content Creation', 'Community Management', 'Paid Advertising', 'Analytics'],
  },
  {
    icon: HiUsers,
    title: 'Influencer Marketing',
    description: 'Connect with the right voices to amplify your brand message and reach millions of potential customers.',
    color: 'pink',
    features: ['Influencer Matching', 'Campaign Strategy', 'ROI Tracking', 'Creator Partnerships'],
  },
];

const colorMap = {
  cyan: 'text-cyan',
  purple: 'text-purple',
  pink: 'text-pink',
};

const bgMap = {
  cyan: 'bg-cyan/10',
  purple: 'bg-purple/10',
  pink: 'bg-pink/10',
};

export default function ServicesPreview() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="What We Do"
          title="Services That Drive Results"
          description="From brand creation to viral campaigns, we deliver full-spectrum digital marketing solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <GlowCard key={service.title} glowColor={service.color} delay={i * 0.15}>
              <div className={`w-12 h-12 rounded-xl ${bgMap[service.color]} flex items-center justify-center mb-5`}>
                <service.icon className={`text-2xl ${colorMap[service.color]}`} />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${bgMap[service.color].replace('/10', '')}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 text-sm font-medium ${colorMap[service.color]} hover:gap-2 transition-all duration-300`}
              >
                Learn More <HiArrowRight />
              </Link>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
