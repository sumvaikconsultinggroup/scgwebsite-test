'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const categories = ['All', 'Branding', 'Social Media', 'Influencer'];

const projects = [
  {
    title: 'Luxe Beauty Brand Launch',
    category: 'Branding',
    description: 'Complete brand identity for a premium beauty brand, from logo to packaging to social presence.',
    metrics: { reach: '2.5M', engagement: '+340%', roi: '5.2x' },
    gradient: 'from-pink via-purple to-cyan',
    tags: ['Logo', 'Packaging', 'Social Templates'],
  },
  {
    title: 'FitLife Social Takeover',
    category: 'Social Media',
    description: 'Full social media management across 5 platforms with daily content and community engagement.',
    metrics: { reach: '8M', engagement: '+180%', roi: '3.8x' },
    gradient: 'from-cyan via-neon-green to-purple',
    tags: ['Instagram', 'TikTok', 'YouTube'],
  },
  {
    title: 'TechStart Product Launch',
    category: 'Influencer',
    description: 'Coordinated influencer campaign with 50+ tech creators for a SaaS product launch.',
    metrics: { reach: '15M', engagement: '+520%', roi: '7.1x' },
    gradient: 'from-purple via-pink to-cyan',
    tags: ['YouTube', 'Tech Influencers', 'Product Review'],
  },
  {
    title: 'EcoWear Digital Rebrand',
    category: 'Branding',
    description: 'Sustainable fashion brand repositioning with new visual identity and market strategy.',
    metrics: { reach: '1.2M', engagement: '+200%', roi: '4.5x' },
    gradient: 'from-neon-green via-cyan to-purple',
    tags: ['Rebrand', 'Sustainability', 'Fashion'],
  },
  {
    title: 'FoodieBox Viral Campaign',
    category: 'Social Media',
    description: 'Created a viral TikTok challenge that generated 50M+ views and 100K new subscribers.',
    metrics: { reach: '50M', engagement: '+1200%', roi: '9.3x' },
    gradient: 'from-pink via-cyan to-neon-green',
    tags: ['TikTok', 'Viral', 'UGC'],
  },
  {
    title: 'GameZone Creator Program',
    category: 'Influencer',
    description: 'Built an ongoing creator partnership program with 100+ gaming influencers worldwide.',
    metrics: { reach: '25M', engagement: '+300%', roi: '6.2x' },
    gradient: 'from-purple via-neon-green to-cyan',
    tags: ['Twitch', 'YouTube', 'Gaming'],
  },
  {
    title: 'Bloom Wellness Launch',
    category: 'Branding',
    description: 'Holistic wellness brand creation including name, identity, and digital presence strategy.',
    metrics: { reach: '3.5M', engagement: '+280%', roi: '4.8x' },
    gradient: 'from-cyan via-pink to-purple',
    tags: ['Health', 'Identity', 'Naming'],
  },
  {
    title: 'StyleBox Influencer Drop',
    category: 'Influencer',
    description: 'Fashion brand collab with 30 fashion influencers for a seasonal collection launch.',
    metrics: { reach: '12M', engagement: '+450%', roi: '8.1x' },
    gradient: 'from-pink via-purple to-neon-green',
    tags: ['Fashion', 'Instagram', 'Collabs'],
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6"
          >
            Our <span className="gradient-text">Best Work</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Real results for real brands. Explore our case studies and see the impact of strategic digital marketing.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyan/10 text-cyan border border-cyan/30'
                  : 'text-gray-500 hover:text-foreground border border-transparent hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setExpanded(expanded === project.title ? null : project.title)}
              >
                <div className="glass rounded-2xl overflow-hidden">
                  {/* Image placeholder */}
                  <div className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} relative opacity-20`}>
                    <div className="absolute inset-0 grid-bg opacity-50" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-medium text-cyan bg-cyan/10 border border-cyan/20 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] text-gray-500 bg-surface rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-foreground mb-2">
                      {project.title}
                    </h3>

                    <AnimatePresence>
                      {expanded === project.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
                      <div>
                        <div className="text-sm font-bold text-cyan">{project.metrics.reach}</div>
                        <div className="text-[10px] text-gray-500 uppercase">Reach</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-purple">{project.metrics.engagement}</div>
                        <div className="text-[10px] text-gray-500 uppercase">Engagement</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-pink">{project.metrics.roi}</div>
                        <div className="text-[10px] text-gray-500 uppercase">ROI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
