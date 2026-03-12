'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const categories = ['All', 'Branding', 'Social Media', 'Influencer'];

const projects = [
  {
    title: 'Luxe Beauty Brand Launch',
    client: 'Luxe Beauty',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    metrics: { reach: '2.5M', engagement: '+340%', roi: '5.2x' },
    tall: true,
  },
  {
    title: 'FitLife Social Takeover',
    client: 'FitLife',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    metrics: { reach: '8M', engagement: '+180%', roi: '3.8x' },
    tall: false,
  },
  {
    title: 'TechStart Product Launch',
    client: 'TechStart',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    metrics: { reach: '15M', engagement: '+520%', roi: '7.1x' },
    tall: false,
  },
  {
    title: 'EcoWear Digital Rebrand',
    client: 'EcoWear',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    metrics: { reach: '1.2M', engagement: '+200%', roi: '4.5x' },
    tall: true,
  },
  {
    title: 'FoodieBox Viral Campaign',
    client: 'FoodieBox',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    metrics: { reach: '50M', engagement: '+1200%', roi: '9.3x' },
    tall: true,
  },
  {
    title: 'GameZone Creator Program',
    client: 'GameZone',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    metrics: { reach: '25M', engagement: '+300%', roi: '6.2x' },
    tall: false,
  },
  {
    title: 'Bloom Wellness Launch',
    client: 'Bloom Wellness',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
    metrics: { reach: '3.5M', engagement: '+280%', roi: '4.8x' },
    tall: false,
  },
  {
    title: 'StyleBox Influencer Drop',
    client: 'StyleBox',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    metrics: { reach: '12M', engagement: '+450%', roi: '8.1x' },
    tall: true,
  },
];

const stats = [
  { value: '500+', label: 'Brands Served' },
  { value: '50M+', label: 'Total Reach' },
  { value: '98%', label: 'Client Satisfaction' },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden ${
        project.tall ? 'row-span-2 min-h-[520px]' : 'min-h-[320px]'
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/70 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-cyan bg-[#050510]/70 backdrop-blur-sm border border-cyan/20 rounded-full">
          {project.category}
        </span>
      </div>

      {/* Hover: View Case Study */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="px-6 py-3 text-sm font-semibold tracking-wide uppercase text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          View Case Study
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-sm text-gray-400 mb-1">{project.client}</p>
        <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-4">
          {project.title}
        </h3>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
          <div>
            <div className="text-base font-bold text-cyan">{project.metrics.reach}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Reach</div>
          </div>
          <div>
            <div className="text-base font-bold text-purple">{project.metrics.engagement}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Engagement</div>
          </div>
          <div>
            <div className="text-base font-bold text-pink">{project.metrics.roi}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">ROI</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] mb-6 text-foreground"
          >
            Our{' '}
            <span className="gradient-text">Work</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Proven results that speak for themselves. Explore our case studies and discover the impact of strategic, data-driven digital marketing.
          </motion.p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  filter === cat
                    ? 'bg-cyan text-background shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'text-gray-400 hover:text-foreground bg-surface hover:bg-surface-light border border-gray-800 hover:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(280px,auto)]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
