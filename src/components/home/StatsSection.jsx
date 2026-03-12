'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Brands Served' },
  { value: 2000, suffix: '+', label: 'Campaigns' },
  { value: 50, suffix: 'M+', label: 'Total Reach' },
  { value: 98, suffix: '%', label: 'Success Rate' },
];

function StatCounter({ stat, inView }) {
  const count = useCountUp(stat.value, 2000, inView);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-cyan mb-2">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
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
    <section ref={sectionRef} className="relative py-32 md:py-48 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Scaling text */}
        <div className="mb-20 text-center">
          <h2
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] text-foreground leading-[0.9] tracking-tight"
          >
            <span className="text-gray-500">500+ Brands</span>
            <br />
            <span className="gradient-text">Trust Us</span>
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
