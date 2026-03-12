'use client';
import { motion } from 'framer-motion';
import GlowCard from '@/components/ui/GlowCard';
import GradientButton from '@/components/ui/GradientButton';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiPaintBrush, HiSpeakerWave, HiUsers } from 'react-icons/hi2';
import { HiCheck, HiArrowRight } from 'react-icons/hi';

const services = [
  {
    icon: HiPaintBrush,
    title: 'Branding',
    subtitle: 'Build an Unforgettable Identity',
    description: 'We craft brand identities that capture your essence and connect with your audience on an emotional level. From strategy to visual execution, we build brands that leave lasting impressions.',
    color: 'cyan',
    features: [
      'Brand Strategy & Positioning',
      'Logo & Visual Identity Design',
      'Brand Guidelines & Style Guide',
      'Brand Voice & Messaging',
      'Competitive Analysis',
      'Brand Audit & Refresh',
    ],
    process: ['Discovery', 'Research', 'Strategy', 'Design', 'Refinement', 'Launch'],
    pricing: [
      { name: 'Starter', price: '$2,500', features: ['Logo Design', 'Color Palette', 'Basic Guidelines'] },
      { name: 'Professional', price: '$7,500', features: ['Full Visual Identity', 'Brand Strategy', 'Guidelines Manual', 'Social Templates'], popular: true },
      { name: 'Enterprise', price: '$15,000+', features: ['Complete Rebrand', 'Market Research', 'Multi-platform Assets', 'Ongoing Support'] },
    ],
  },
  {
    icon: HiSpeakerWave,
    title: 'Social Media Marketing',
    subtitle: 'Dominate Every Platform',
    description: 'Turn your social media presence into a growth engine. We create scroll-stopping content, build engaged communities, and drive real business results through strategic social campaigns.',
    color: 'purple',
    features: [
      'Content Strategy & Calendar',
      'Visual & Video Content Creation',
      'Community Management',
      'Paid Social Advertising',
      'Analytics & Reporting',
      'Platform Optimization',
    ],
    process: ['Audit', 'Strategy', 'Content', 'Launch', 'Engage', 'Optimize'],
    pricing: [
      { name: 'Growth', price: '$1,500/mo', features: ['3 Platforms', '12 Posts/Month', 'Basic Analytics'] },
      { name: 'Scale', price: '$3,500/mo', features: ['5 Platforms', '30 Posts/Month', 'Community Mgmt', 'Paid Ads'], popular: true },
      { name: 'Dominate', price: '$7,000+/mo', features: ['All Platforms', 'Daily Content', 'Full Management', 'Dedicated Team'] },
    ],
  },
  {
    icon: HiUsers,
    title: 'Influencer Marketing',
    subtitle: 'Amplify Through Authentic Voices',
    description: 'Leverage our network of 500+ vetted creators to reach millions. We handle everything from influencer discovery to campaign execution and ROI measurement.',
    color: 'pink',
    features: [
      'Influencer Discovery & Vetting',
      'Campaign Strategy & Planning',
      'Creator Brief Development',
      'Content Approval & Management',
      'Performance Tracking & ROI',
      'Long-term Partnership Building',
    ],
    process: ['Objectives', 'Matching', 'Briefing', 'Creation', 'Distribution', 'Analysis'],
    pricing: [
      { name: 'Micro', price: '$3,000', features: ['5-10 Micro Influencers', 'Single Platform', 'Campaign Report'] },
      { name: 'Impact', price: '$10,000', features: ['15-25 Influencers', 'Multi-platform', 'Content Rights', 'Detailed Analytics'], popular: true },
      { name: 'Viral', price: '$25,000+', features: ['50+ Influencers', 'Celebrity Talent', 'Full Production', 'Guaranteed Reach'] },
    ],
  },
];

const colorClasses = {
  cyan: { text: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/30', glow: 'shadow-[0_0_20px_rgba(0,240,255,0.2)]' },
  purple: { text: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/30', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
  pink: { text: 'text-pink', bg: 'bg-pink/10', border: 'border-pink/30', glow: 'shadow-[0_0_20px_rgba(255,0,110,0.2)]' },
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6"
          >
            Solutions That <span className="gradient-text">Drive Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Comprehensive digital marketing services designed to elevate your brand,
            engage your audience, and deliver measurable results.
          </motion.p>
        </div>

        {/* Services Detail */}
        <div className="space-y-32">
          {services.map((service, idx) => {
            const c = colorClasses[service.color];
            return (
              <div key={service.title} id={service.title.toLowerCase().replace(/\s/g, '-')}>
                {/* Service Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center mb-6`}>
                    <service.icon className={`text-3xl ${c.text}`} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-2">
                    {service.title}
                  </h2>
                  <p className={`text-lg ${c.text} font-medium mb-4`}>{service.subtitle}</p>
                  <p className="text-gray-400 max-w-2xl leading-relaxed">{service.description}</p>
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-3 glass rounded-xl p-4"
                    >
                      <div className={`w-6 h-6 rounded-full ${c.bg} flex items-center justify-center flex-shrink-0`}>
                        <HiCheck className={`text-sm ${c.text}`} />
                      </div>
                      <span className="text-foreground text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Process */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">Our Process</h3>
                  <div className="flex flex-wrap gap-4">
                    {service.process.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${c.bg} border ${c.border} flex items-center justify-center text-xs font-bold ${c.text}`}>
                          {i + 1}
                        </div>
                        <span className="text-sm text-gray-400">{step}</span>
                        {i < service.process.length - 1 && (
                          <HiArrowRight className="text-gray-600 text-sm" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Pricing */}
                <h3 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">Pricing Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.pricing.map((plan, i) => (
                    <GlowCard key={plan.name} glowColor={service.color} delay={i * 0.1} className={plan.popular ? `border-${service.color}/30 ${c.glow}` : ''}>
                      {plan.popular && (
                        <span className={`inline-block px-3 py-1 mb-4 text-xs font-bold ${c.text} ${c.bg} rounded-full`}>
                          Most Popular
                        </span>
                      )}
                      <h4 className="text-lg font-bold text-foreground">{plan.name}</h4>
                      <div className={`text-2xl font-bold ${c.text} my-3 font-[family-name:var(--font-heading)]`}>{plan.price}</div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                            <HiCheck className={c.text} /> {f}
                          </li>
                        ))}
                      </ul>
                      <GradientButton
                        href="/contact"
                        variant={plan.popular ? 'primary' : 'secondary'}
                        size="sm"
                        className="w-full"
                      >
                        Get Started
                      </GradientButton>
                    </GlowCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 glass rounded-2xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Let&apos;s chat about your goals and create a custom strategy tailored to your brand.
          </p>
          <GradientButton href="/contact" size="lg">
            Book a Free Consultation <HiArrowRight />
          </GradientButton>
        </motion.div>
      </div>
    </div>
  );
}
