'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    metric: '340%',
    label: 'Brand Awareness Increase',
    brand: 'Luxe Beauty',
    color: '#00f0ff',
    description: 'Complete brand overhaul that transformed market perception and tripled social following.',
  },
  {
    metric: '50M+',
    label: 'Campaign Impressions',
    brand: 'FoodieBox',
    color: '#8b5cf6',
    description: 'Viral TikTok campaign that broke the internet and generated 50 million organic views.',
  },
  {
    metric: '400%',
    label: 'Return on Ad Spend',
    brand: 'TechStart',
    color: '#ff006e',
    description: 'Strategic influencer partnerships that delivered 4x return on every dollar invested.',
  },
  {
    metric: '2.5M',
    label: 'Monthly Impressions',
    brand: 'FitLife',
    color: '#39ff14',
    description: 'Content strategy that turned a local gym into a global fitness brand.',
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
            Proven Results
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
