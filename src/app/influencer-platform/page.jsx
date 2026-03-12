'use client';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
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

const steps = [
  { icon: HiSearchCircle, title: 'Smart Matching', description: 'AI-powered algorithm matches brands with the perfect creators based on niche, audience, and goals.', color: 'cyan' },
  { icon: HiLightningBolt, title: 'Instant Connect', description: 'Apply to campaigns or reach out to influencers directly. No middlemen, no delays.', color: 'purple' },
  { icon: HiChartBar, title: 'Performance Tracking', description: 'Track campaign performance with real-time analytics and detailed ROI reports.', color: 'pink' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function InfluencerPlatformPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#050510]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/60 via-transparent to-[#050510]" />
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] mb-6 leading-tight"
          >
            <span className="text-foreground">Where Brands Meet</span>
            <br />
            <span className="bg-gradient-to-r from-cyan via-purple to-pink bg-clip-text text-transparent">
              Creators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-12"
          >
            Connect with thousands of verified influencers or find the perfect brand partnerships.
            Our marketplace makes influencer marketing effortless.
          </motion.p>

          {/* Two CTA Path Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 max-w-2xl mx-auto"
          >
            <a
              href="/influencer-platform/campaigns"
              className="group relative w-full sm:w-72 p-8 rounded-2xl border border-gray-800 bg-surface/50 backdrop-blur-sm hover:border-cyan/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)] cursor-pointer text-left"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-4">
                  <HiSpeakerphone className="text-cyan text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">I&apos;m a Brand</h3>
                <p className="text-sm text-gray-400 mb-4">Find creators, launch campaigns, and grow your reach.</p>
                <span className="inline-flex items-center gap-1 text-sm text-cyan font-medium group-hover:gap-2 transition-all">
                  Browse Campaigns <HiArrowRight />
                </span>
              </div>
            </a>

            <a
              href="/influencer-platform/influencers"
              className="group relative w-full sm:w-72 p-8 rounded-2xl border border-gray-800 bg-surface/50 backdrop-blur-sm hover:border-pink/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,110,0.1)] cursor-pointer text-left"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-pink/10 border border-pink/20 flex items-center justify-center mb-4">
                  <HiUsers className="text-pink text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">I&apos;m an Influencer</h3>
                <p className="text-sm text-gray-400 mb-4">Discover brand deals, get paid, and grow your audience.</p>
                <span className="inline-flex items-center gap-1 text-sm text-pink font-medium group-hover:gap-2 transition-all">
                  Browse Creators <HiArrowRight />
                </span>
              </div>
            </a>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { val: '5,000+', label: 'Creators', color: 'text-cyan' },
              { val: '1,200+', label: 'Campaigns', color: 'text-purple' },
              { val: '$2M+', label: 'Paid Out', color: 'text-pink' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${s.color} font-[family-name:var(--font-heading)]`}>{s.val}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">How It Works</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">Simple, transparent, and powerful</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((f, i) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="relative p-8 rounded-2xl border border-gray-800 bg-surface/30 hover:border-gray-700 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-background border border-gray-800 flex items-center justify-center">
                  <span className={`text-xs font-bold ${f.color === 'cyan' ? 'text-cyan' : f.color === 'purple' ? 'text-purple' : 'text-pink'}`}>
                    {i + 1}
                  </span>
                </div>
                <f.icon className={`text-3xl mb-5 ${f.color === 'cyan' ? 'text-cyan' : f.color === 'purple' ? 'text-purple' : 'text-pink'}`} />
                <h3 className="text-lg font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground"
            >
              Featured Creators
            </motion.h2>
            <a href="/influencer-platform/influencers" className="text-sm text-cyan flex items-center gap-1 hover:gap-2 transition-all">
              View All <HiArrowRight />
            </a>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredInfluencers.map((inf, i) => (
              <motion.div
                key={inf.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-gray-800 bg-surface/30 hover:border-gray-700 transition-all duration-300"
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground"
            >
              Active Campaigns
            </motion.h2>
            <a href="/influencer-platform/campaigns" className="text-sm text-cyan flex items-center gap-1 hover:gap-2 transition-all">
              View All <HiArrowRight />
            </a>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {activeCampaigns.map((c, i) => {
              const accentColors = ['from-cyan/20 to-cyan/0', 'from-purple/20 to-purple/0', 'from-pink/20 to-pink/0'];
              const borderColors = ['hover:border-cyan/30', 'hover:border-purple/30', 'hover:border-pink/30'];
              return (
                <motion.div
                  key={c.title}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className={`relative p-6 rounded-2xl border border-gray-800 bg-surface/30 ${borderColors[i]} transition-all duration-300 overflow-hidden`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColors[i]}`} />
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center rounded-2xl p-12 border border-gray-800 bg-surface/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join thousands of brands and creators already growing on our platform.
            </p>
            <MagneticButton
              href="/influencer-platform/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
              strength={0.3}
            >
              Go to Dashboard <HiArrowRight />
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
