'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    metric: '11x',
    label: 'Return on Ad Spend',
    brand: 'D2C Skincare Brand',
    color: '#00f0ff',
    description: 'Took over their entire paid media — Meta, Google, and influencer whitelisting. Went from burning cash on boosted posts to ₹11 back on every ₹1 spent within 90 days.',
  },
  {
    metric: '85M',
    label: 'Organic Impressions',
    brand: 'QSR Chain (42 Outlets)',
    color: '#8b5cf6',
    description: 'Managed their Instagram, launched a TikTok-first content strategy, and ran a micro-influencer seeding campaign across 12 cities. Zero paid media — pure organic reach.',
  },
  {
    metric: '₹2.8Cr',
    label: 'Revenue from Social',
    brand: 'Fashion Label',
    color: '#ff006e',
    description: 'Complete brand overhaul — new identity, new social presence, new influencer partnerships. Drove ₹2.8 crore in tracked revenue through Instagram and influencer campaigns in 6 months.',
  },
  {
    metric: '47%',
    label: 'Lower CAC',
    brand: 'EdTech Startup',
    color: '#39ff14',
    description: 'Replaced their agency-of-record with our full-stack team. Rebuilt their funnel, optimized creatives weekly, and cut customer acquisition cost by 47% in the first quarter.',
  },
];

export default function ResultsShowcase() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -5 : 5 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="gradient-orb w-[600px] h-[600px] bg-cyan/5 top-[10%] right-[-10%]" />
        <div className="gradient-orb w-[500px] h-[500px] bg-purple/5 bottom-[10%] left-[-10%]" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4"
          >
            Client Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] tracking-tight"
          >
            Numbers That{' '}
            <span className="gradient-text">Speak</span>
          </motion.h2>
        </div>

        {/* Results cards */}
        <div className="space-y-8">
          {results.map((result, i) => (
            <div
              key={result.brand}
              ref={(el) => (cardsRef.current[i] = el)}
              className="opacity-0"
              style={{ perspective: '1000px' }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-surface/50 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-700 group">
                {/* Spotlight effect on hover */}
                <div
                  className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${result.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-16">
                  {/* Large metric number */}
                  <div className="flex-shrink-0 text-center md:text-left md:w-64">
                    <div
                      className="text-6xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-heading)] leading-none"
                      style={{ color: result.color }}
                    >
                      {result.metric}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
                      {result.label}
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

                  {/* Content */}
                  <div className="flex-1">
                    <span
                      className="inline-block px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border"
                      style={{
                        color: result.color,
                        borderColor: `${result.color}33`,
                        background: `${result.color}0a`,
                      }}
                    >
                      {result.brand}
                    </span>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                      {result.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 hidden lg:block">
                    <div
                      className="w-14 h-14 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ borderColor: `${result.color}33` }}
                    >
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ color: result.color }}>
                        <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${result.color}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
