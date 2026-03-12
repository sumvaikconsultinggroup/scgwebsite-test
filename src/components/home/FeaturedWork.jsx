'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'Glow & Co.',
    category: 'Branding + Social',
    metric: '₹2.8Cr Revenue',
    gradient: 'from-pink/30 via-purple/20 to-cyan/10',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    color: '#ff006e',
  },
  {
    title: 'BiteBox',
    category: 'Influencer + Paid',
    metric: '85M Impressions',
    gradient: 'from-cyan/30 via-neon-green/20 to-purple/10',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    color: '#00f0ff',
  },
  {
    title: 'CodeCraft',
    category: 'Full-Stack Growth',
    metric: '47% Lower CAC',
    gradient: 'from-purple/30 via-pink/20 to-cyan/10',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    color: '#8b5cf6',
  },
  {
    title: 'ThreadCulture',
    category: 'Brand Overhaul',
    metric: '340K Followers',
    gradient: 'from-neon-green/30 via-cyan/20 to-purple/10',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    color: '#39ff14',
  },
  {
    title: 'MealPrep India',
    category: 'Social + UGC',
    metric: '11x ROAS',
    gradient: 'from-pink/30 via-cyan/20 to-neon-green/10',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    color: '#ff006e',
  },
  {
    title: 'LevelUp Academy',
    category: 'Paid Media + CRO',
    metric: '₹18 CAC',
    gradient: 'from-purple/30 via-neon-green/20 to-cyan/10',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    color: '#8b5cf6',
  },
];

export default function FeaturedWork() {
  const scrollRef = useRef(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="gradient-orb w-[500px] h-[500px] bg-purple/5 top-[10%] right-[-5%]" />

      {/* Header */}
      <div className="max-w-[90vw] mx-auto px-4 mb-16 flex items-end justify-between relative z-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-3">Our Work</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
            Real Results,{' '}
            <span className="gradient-text">Real Brands</span>
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden md:flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-cyan transition-colors group"
          data-cursor-hover
        >
          View All
          <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-cyan/5 transition-all">
            <svg width="16" height="10" viewBox="0 0 20 12" fill="none">
              <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] snap-start group"
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative h-[65vh] md:h-[75vh] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor-hover
            >
              {/* Background Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 35vw"
                className="transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 transition-all duration-500" />

              {/* Color tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10">
                <div className="flex justify-between items-start">
                  <span
                    className="text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full backdrop-blur-sm border"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}33`,
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10vw] md:text-[5vw] font-bold font-[family-name:var(--font-heading)] text-white/5 leading-none">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  {/* View project button - appears on hover */}
                  <div className="mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.15em] border border-white/20 rounded-full backdrop-blur-sm bg-white/5 text-white">
                      View Project
                      <svg width="14" height="8" viewBox="0 0 20 12" fill="none">
                        <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: project.color }}>
                    {project.metric}
                  </p>
                </div>
              </div>

              {/* Bottom color line */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="md:hidden text-center mt-8">
        <Link href="/portfolio" className="text-sm text-cyan uppercase tracking-[0.15em]" data-cursor-hover>
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
