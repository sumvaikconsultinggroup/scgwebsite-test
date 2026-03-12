'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: '01',
    title: 'Data-Driven\nCreativity',
    description: 'Every campaign starts with data. We analyze, strategize, then create content that resonates with your specific audience segments.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    color: '#00f0ff',
    stat: '98%',
    statLabel: 'Data accuracy',
  },
  {
    number: '02',
    title: 'Obsessive\nCraft',
    description: 'We don\'t do mediocre. Every pixel, every word, every strategy is obsessively refined until it\'s extraordinary.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: '#8b5cf6',
    stat: '3x',
    statLabel: 'Industry average',
  },
  {
    number: '03',
    title: 'Speed to\nMarket',
    description: 'While others are still planning, you\'re already launching. We move fast without sacrificing quality.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: '#ff006e',
    stat: '2wk',
    statLabel: 'Avg. launch time',
  },
  {
    number: '04',
    title: 'Network\nEffect',
    description: '500+ vetted creators across every niche. We don\'t just find influencers — we match you with the perfect voices for your brand.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: '#39ff14',
    stat: '500+',
    statLabel: 'Creator network',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading parallax
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-purple/5 top-[20%] left-[-10%]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-cyan/5 bottom-[10%] right-[-5%]" style={{ animationDelay: '-4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header — stacked massive text */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4">
            Why Sumvaik
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold font-[family-name:var(--font-heading)] leading-[0.85] tracking-tight">
            <span className="text-foreground">Built</span>
            <br />
            <span className="text-foreground">Different</span>
            <span className="gradient-text">.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-surface/30 backdrop-blur-sm p-8 md:p-10 h-full hover:border-gray-700/50 transition-all duration-700">
                {/* Hover spotlight */}
                <div
                  className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${reason.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Top row: number + icon */}
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="text-7xl md:text-8xl font-bold font-[family-name:var(--font-heading)] leading-none"
                      style={{ color: `${reason.color}15` }}
                    >
                      {reason.number}
                    </span>
                    <div
                      className="w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        borderColor: `${reason.color}33`,
                        color: reason.color,
                        background: `${reason.color}08`,
                      }}
                    >
                      {reason.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4 whitespace-pre-line leading-tight tracking-tight"
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                    {reason.description}
                  </p>

                  {/* Bottom stat */}
                  <div className="flex items-baseline gap-3 pt-6 border-t border-gray-800/50">
                    <span
                      className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: reason.color }}
                    >
                      {reason.stat}
                    </span>
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-500">
                      {reason.statLabel}
                    </span>
                  </div>
                </div>

                {/* Bottom animated line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${reason.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
