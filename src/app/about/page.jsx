'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlowCard from '@/components/ui/GlowCard';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/hooks/useCountUp';
import { HiLightningBolt, HiEye, HiHeart, HiCube } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const timeline = [
  { year: '2018', title: 'Founded', description: 'SCG Digital was born with a mission to revolutionize digital marketing for ambitious brands.' },
  { year: '2019', title: 'First 50 Clients', description: 'Expanded our branding services and launched our social media management division.' },
  { year: '2020', title: 'Influencer Network', description: 'Built partnerships with 500+ creators across Instagram, TikTok, and YouTube.' },
  { year: '2021', title: 'Award-Winning', description: 'Recognized as a top 10 digital marketing agency with multiple industry awards.' },
  { year: '2022', title: 'Platform Launch', description: 'Launched our proprietary influencer marketplace connecting brands and creators.' },
  { year: '2023', title: 'Global Expansion', description: 'Expanded operations to 15+ countries, serving brands across 6 continents.' },
];

const values = [
  { icon: HiLightningBolt, title: 'Innovation', description: 'We stay ahead of digital trends to give our clients a competitive edge.', color: 'cyan' },
  { icon: HiEye, title: 'Transparency', description: 'Clear communication and honest reporting at every step of the journey.', color: 'purple' },
  { icon: HiHeart, title: 'Passion', description: 'We genuinely care about our clients\' success and celebrate every win.', color: 'pink' },
  { icon: HiCube, title: 'Results-Driven', description: 'Every strategy is backed by data and optimized for measurable outcomes.', color: 'green' },
];

const team = [
  { name: 'Alex Rivera', role: 'CEO & Founder', initials: 'AR' },
  { name: 'Jessica Tran', role: 'Creative Director', initials: 'JT' },
  { name: 'Michael Brooks', role: 'Head of Strategy', initials: 'MB' },
  { name: 'Aisha Patel', role: 'Influencer Relations Lead', initials: 'AP' },
];

const colorMap = { cyan: 'text-cyan', purple: 'text-purple', pink: 'text-pink', green: 'text-neon-green' };
const bgMap = { cyan: 'bg-cyan/10', purple: 'bg-purple/10', pink: 'bg-pink/10', green: 'bg-neon-green/10' };

function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const clients = useCountUp(500, 2000, inView);
  const campaigns = useCountUp(2000, 2000, inView);
  const countries = useCountUp(15, 1500, inView);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 mb-20">
      {[
        { val: clients, suffix: '+', label: 'Clients' },
        { val: campaigns.toLocaleString(), suffix: '+', label: 'Campaigns' },
        { val: countries, suffix: '+', label: 'Countries' },
      ].map((s) => (
        <div key={s.label} className="text-center glass rounded-xl p-6">
          <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-1">
            {s.val}{s.suffix}
          </div>
          <div className="text-gray-500 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
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
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6"
          >
            We Are <span className="gradient-text">SCG Digital</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A team of digital marketing experts, creative minds, and data scientists
            united by one goal: making your brand impossible to ignore.
          </motion.p>
        </div>

        {/* Stats */}
        <StatsBar />

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              To democratize world-class digital marketing by giving every ambitious brand
              access to the strategies, tools, and influencer networks that drive real growth.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We believe in the power of authentic storytelling, data-driven creativity,
              and partnerships that create genuine value for audiences.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              To become the world&apos;s most innovative digital marketing ecosystem — where brands
              find their voice, creators find their audience, and campaigns create movements.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We envision a future where marketing is not about interruption but about
              inspiration, connection, and shared value.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <SectionHeading label="Our Journey" title="The SCG Story" />
        <div className="relative mb-24">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/30 via-purple/30 to-pink/30" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                  <span className="text-cyan font-bold text-lg font-[family-name:var(--font-heading)]">{item.year}</span>
                  <h4 className="text-xl font-bold text-foreground mt-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                </div>
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-cyan/50 z-10 mt-1" />
                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <SectionHeading label="Core Values" title="What Drives Us" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <GlowCard key={v.title} glowColor={v.color} delay={i * 0.1}>
              <div className={`w-10 h-10 rounded-lg ${bgMap[v.color]} flex items-center justify-center mb-4`}>
                <v.icon className={`text-xl ${colorMap[v.color]}`} />
              </div>
              <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
              <p className="text-sm text-gray-400">{v.description}</p>
            </GlowCard>
          ))}
        </div>

        {/* Team */}
        <SectionHeading label="Our Team" title="Meet the Experts" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-purple mx-auto mb-4 flex items-center justify-center text-background text-xl font-bold">
                {member.initials}
              </div>
              <h4 className="font-bold text-foreground">{member.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{member.role}</p>
              <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-cyan hover:border-cyan/30 transition-all"
                  >
                    <Icon size={12} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
