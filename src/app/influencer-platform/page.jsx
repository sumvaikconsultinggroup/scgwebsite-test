'use client';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import GlowCard from '@/components/ui/GlowCard';
import FloatingShapes from '@/components/ui/FloatingShapes';
import { HiUsers, HiArrowRight, HiSearchCircle, HiLightningBolt, HiChartBar, HiSpeakerphone } from 'react-icons/hi';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const featuredInfluencers = [
  { name: 'Aria Martinez', niche: 'Beauty & Fashion', followers: '1.2M', engagement: '4.8%', platforms: [FaInstagram, FaTiktok], initials: 'AM' },
  { name: 'Jake Chen', niche: 'Tech & Gaming', followers: '890K', engagement: '5.2%', platforms: [FaYoutube, FaTiktok], initials: 'JC' },
  { name: 'Sofia Rossi', niche: 'Fitness & Wellness', followers: '650K', engagement: '6.1%', platforms: [FaInstagram, FaYoutube], initials: 'SR' },
  { name: 'Marcus Davis', niche: 'Food & Lifestyle', followers: '2.1M', engagement: '3.9%', platforms: [FaTiktok, FaInstagram], initials: 'MD' },
];

const activeCampaigns = [
  { brand: 'NovaSkin', title: 'Summer Glow Collection Launch', budget: '$5K-10K', niche: 'Beauty', spots: 8 },
  { brand: 'FitPro', title: 'New Year Fitness Challenge', budget: '$3K-7K', niche: 'Fitness', spots: 15 },
  { brand: 'TechWave', title: 'Gadget Review Program', budget: '$2K-5K', niche: 'Tech', spots: 20 },
];

const features = [
  { icon: HiSearchCircle, title: 'Smart Matching', description: 'AI-powered algorithm matches brands with the perfect creators based on niche, audience, and goals.', color: 'cyan' },
  { icon: HiLightningBolt, title: 'Instant Connect', description: 'Apply to campaigns or reach out to influencers directly. No middlemen, no delays.', color: 'purple' },
  { icon: HiChartBar, title: 'Performance Tracking', description: 'Track campaign performance with real-time analytics and detailed ROI reports.', color: 'pink' },
];

export default function InfluencerPlatformPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <FloatingShapes />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-pink border border-pink/20 rounded-full bg-pink/5"
          >
            Influencer Marketing Platform
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] mb-6"
          >
            <span className="text-foreground">Where Brands Meet</span><br />
            <span className="gradient-text">Creators</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
          >
            Connect with thousands of verified influencers or find the perfect brand partnerships.
            Our marketplace makes influencer marketing effortless.
          </motion.p>

          {/* Two Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <GradientButton href="/influencer-platform/campaigns" variant="primary" size="lg">
              <HiSpeakerphone /> I&apos;m a Brand
            </GradientButton>
            <GradientButton href="/influencer-platform/influencers" variant="pink" size="lg">
              <HiUsers /> I&apos;m an Influencer
            </GradientButton>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '5,000+', label: 'Creators' },
              { val: '1,200+', label: 'Campaigns' },
              { val: '$2M+', label: 'Paid Out' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold gradient-text-cyan font-[family-name:var(--font-heading)]">{s.val}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-3">How It Works</h2>
            <p className="text-gray-400">Simple, transparent, and powerful</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlowCard key={f.title} glowColor={f.color} delay={i * 0.1}>
                <f.icon className={`text-3xl mb-4 ${f.color === 'cyan' ? 'text-cyan' : f.color === 'purple' ? 'text-purple' : 'text-pink'}`} />
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground">Featured Creators</h2>
            <a href="/influencer-platform/influencers" className="text-sm text-cyan flex items-center gap-1 hover:gap-2 transition-all">
              View All <HiArrowRight />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInfluencers.map((inf, i) => (
              <GlowCard key={inf.name} glowColor={i % 2 === 0 ? 'cyan' : 'purple'} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink to-purple mx-auto mb-3 flex items-center justify-center text-white font-bold">
                    {inf.initials}
                  </div>
                  <h4 className="font-bold text-foreground">{inf.name}</h4>
                  <p className="text-xs text-gray-500 mb-3">{inf.niche}</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {inf.platforms.map((Icon, j) => (
                      <Icon key={j} className="text-gray-400" size={14} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-surface rounded-lg p-2">
                      <div className="text-sm font-bold text-cyan">{inf.followers}</div>
                      <div className="text-[10px] text-gray-500">Followers</div>
                    </div>
                    <div className="bg-surface rounded-lg p-2">
                      <div className="text-sm font-bold text-purple">{inf.engagement}</div>
                      <div className="text-[10px] text-gray-500">Engagement</div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground">Active Campaigns</h2>
            <a href="/influencer-platform/campaigns" className="text-sm text-cyan flex items-center gap-1 hover:gap-2 transition-all">
              View All <HiArrowRight />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCampaigns.map((c, i) => (
              <GlowCard key={c.title} glowColor="pink" delay={i * 0.1}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-white font-bold text-xs">
                    {c.brand.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-foreground">{c.brand}</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">{c.title}</h4>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-500">Budget: <span className="text-cyan">{c.budget}</span></span>
                  <span className="px-2 py-0.5 text-xs bg-pink/10 text-pink rounded-full">{c.niche}</span>
                </div>
                <div className="text-xs text-gray-400">{c.spots} spots remaining</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of brands and creators already growing on our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href="/influencer-platform/dashboard">
              Go to Dashboard <HiArrowRight />
            </GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
}
