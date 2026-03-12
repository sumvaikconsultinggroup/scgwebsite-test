'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 120, suffix: '+', label: 'Brands Built', color: '#00f0ff' },
  { value: 300, suffix: '+', label: 'Campaigns Delivered', color: '#8b5cf6' },
  { value: 85, suffix: 'M+', label: 'Impressions Generated', color: '#ff006e' },
  { value: 10, suffix: 'K+', label: 'Creator Network', color: '#39ff14' },
];

function StatCounter({ stat, inView }) {
  const count = useCountUp(stat.value, 2000, inView);
  return (
    <div className="text-center group">
      <div
        className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] mb-3 leading-none"
        style={{ color: stat.color }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
      {/* Underline */}
      <div
        className="h-px w-0 group-hover:w-full mx-auto mt-4 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
      />
    </div>
  );
}

export default function StatsSection() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const { ref: counterRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.3, opacity: 0.1 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="gradient-orb w-[600px] h-[600px] bg-cyan/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Scaling text */}
        <div className="mb-16 text-center">
          <h2
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-[8rem] font-bold font-[family-name:var(--font-heading)] leading-[0.85] tracking-tight"
          >
            <span className="stroke-text">The Numbers</span>
            <br />
            <span className="gradient-text">Don't Lie</span>
          </h2>
        </div>

        {/* Counters */}
        <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
