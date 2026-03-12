'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  { title: 'Luxe Beauty', category: 'Branding', metric: '+340% Awareness', gradient: 'from-pink/30 via-purple/20 to-cyan/10' },
  { title: 'FitLife', category: 'Social Media', metric: '2.5M Impressions', gradient: 'from-cyan/30 via-neon-green/20 to-purple/10' },
  { title: 'TechStart', category: 'Influencer', metric: '50+ Creators', gradient: 'from-purple/30 via-pink/20 to-cyan/10' },
  { title: 'EcoWear', category: 'Rebrand', metric: '+180% Engagement', gradient: 'from-neon-green/30 via-cyan/20 to-purple/10' },
  { title: 'FoodieBox', category: 'Viral Campaign', metric: '50M+ Views', gradient: 'from-pink/30 via-cyan/20 to-neon-green/10' },
  { title: 'GameZone', category: 'Creator Program', metric: '100+ Partners', gradient: 'from-purple/30 via-neon-green/20 to-cyan/10' },
];

export default function FeaturedWork() {
  const scrollRef = useRef(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-[90vw] mx-auto px-4 mb-12 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-3">Selected Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden md:flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-cyan transition-colors"
          data-cursor-hover
        >
          View All
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-[5vw] pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] snap-start group"
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor-hover
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
              <div className="absolute inset-0 grid-bg opacity-30" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400 border border-gray-700 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-[10vw] md:text-[5vw] font-bold font-[family-name:var(--font-heading)] text-foreground/5 leading-none">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-cyan font-medium">{project.metric}</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="md:hidden text-center mt-6">
        <Link href="/portfolio" className="text-sm text-cyan uppercase tracking-[0.15em]" data-cursor-hover>
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
