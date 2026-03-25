'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  {
    title: 'Brand Films',
    count: '2,400+',
    description: 'Cinematic stories that capture your brand\'s essence in seconds',
    gradient: 'from-cyan/20 via-cyan/5 to-transparent',
    color: '#00f0ff',
    span: 'col-span-2 row-span-2',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Performance Creatives',
    count: '5,000+',
    description: 'Thumb-stopping visuals engineered for conversion',
    gradient: 'from-purple/20 via-purple/5 to-transparent',
    color: '#8b5cf6',
    span: 'col-span-1 row-span-1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'Identity Systems',
    count: '120+',
    description: 'Complete visual languages that scale across every touchpoint',
    gradient: 'from-pink/20 via-pink/5 to-transparent',
    color: '#ff006e',
    span: 'col-span-1 row-span-1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Creator Partnerships',
    count: '300+',
    description: 'Authentic collaborations that audiences actually trust',
    gradient: 'from-neon-green/20 via-neon-green/5 to-transparent',
    color: '#39ff14',
    span: 'col-span-1 row-span-2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Paid Media Engines',
    count: '₹12Cr+',
    description: 'Data-driven campaigns that turn spend into revenue',
    gradient: 'from-cyan/15 via-purple/10 to-transparent',
    color: '#00f0ff',
    span: 'col-span-1 row-span-1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Content Libraries',
    count: '8,000+',
    description: 'Living archives of brand content ready to deploy anywhere',
    gradient: 'from-pink/15 via-cyan/10 to-transparent',
    color: '#ff006e',
    span: 'col-span-1 row-span-1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function VideoShowreel() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.deliverable-card');
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="gradient-orb w-[600px] h-[600px] bg-purple/5 top-[20%] left-[-10%]" />
      <div className="gradient-orb w-[500px] h-[500px] bg-cyan/5 bottom-[10%] right-[-10%]" style={{ animationDelay: '-4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4"
          >
            What We Craft
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] tracking-tight"
          >
            Every Brand Deserves a <span className="gradient-text">Visual Language</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-xl mx-auto text-lg"
          >
            Every asset we produce is designed to convert — not just look pretty.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4">
          {deliverables.map((item) => (
            <div
              key={item.title}
              className={`deliverable-card ${item.span} relative group rounded-2xl md:rounded-3xl border border-gray-800/40 overflow-hidden bg-surface/30 backdrop-blur-sm hover:border-gray-700/60 transition-all duration-700 cursor-default opacity-0`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Hover spotlight */}
              <div
                className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-7">
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      borderColor: `${item.color}30`,
                      color: item.color,
                      background: `${item.color}08`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] leading-none"
                    style={{ color: item.color }}
                  >
                    {item.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom animated line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
