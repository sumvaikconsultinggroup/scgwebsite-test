'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  { before: 'Zero Online Presence', after: '85M Organic Impressions', metric: 'QSR Chain', color: '#00f0ff' },
  { before: '₹38 CAC', after: '₹20 CAC', metric: 'EdTech Startup', color: '#8b5cf6' },
  { before: 'No Brand Identity', after: 'Category-Defining Brand', metric: 'D2C Fashion', color: '#ff006e' },
  { before: '800 Followers', after: '340K Followers in 8 Months', metric: 'Fitness Brand', color: '#39ff14' },
];

export default function BrandTransform() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Stagger items
      itemsRef.current.filter(Boolean).forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 60%',
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
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="gradient-orb w-[800px] h-[800px] bg-purple/5 top-[20%] left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-24 opacity-0">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4">
            Before & After
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold font-[family-name:var(--font-heading)] leading-[0.85] tracking-tight">
            <span className="text-gray-600">From</span>{' '}
            <span className="text-foreground">Zero</span>
            <br />
            <span className="text-gray-600">to</span>{' '}
            <span className="gradient-text">Hero</span>
          </h2>
        </div>

        {/* Transformation cards */}
        <div className="space-y-6">
          {transformations.map((t, i) => (
            <div
              key={t.after}
              ref={(el) => (itemsRef.current[i] = el)}
              className="opacity-0 group"
              style={{ perspective: '800px' }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-800/30 bg-surface/20 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-700">
                <div className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-6 md:gap-0">
                  {/* Before */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 block mb-1">Before</span>
                    <span className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-gray-600 line-through decoration-gray-700">
                      {t.before}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 px-8">
                    <div className="flex items-center gap-2">
                      <div className="w-12 md:w-24 h-px" style={{ background: `linear-gradient(90deg, ${t.color}33, ${t.color})` }} />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: t.color }}>
                        <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* After */}
                  <div className="flex-1 text-center md:text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: t.color }}>After</span>
                    <span
                      className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: t.color }}
                    >
                      {t.after}
                    </span>
                  </div>

                  {/* Metric badge */}
                  <div className="flex-shrink-0 md:ml-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-[0.1em]"
                      style={{
                        borderColor: `${t.color}33`,
                        color: t.color,
                        background: `${t.color}08`,
                      }}
                    >
                      {t.metric}
                    </motion.div>
                  </div>
                </div>

                {/* Bottom progress line */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-1000"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
