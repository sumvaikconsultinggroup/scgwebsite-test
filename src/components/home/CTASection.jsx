'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const ParticleCloud = dynamic(() => import('@/components/three/ParticleCloud'), { ssr: false });

const benefits = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Free 30-Min Strategy Call',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Month-to-Month Contracts',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'First Results in 2 Weeks',
  },
];

export default function CTASection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = textRef.current?.querySelectorAll('.stroke-fill');
      if (spans) {
        spans.forEach((span) => {
          gsap.fromTo(
            span,
            { backgroundSize: '0% 100%' },
            {
              backgroundSize: '100% 100%',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'top 10%',
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
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <ParticleCloud />

      {/* Extra gradient orbs */}
      <div className="gradient-orb w-[600px] h-[600px] bg-cyan/5 top-[10%] left-[-10%]" />
      <div className="gradient-orb w-[500px] h-[500px] bg-pink/5 bottom-[10%] right-[-10%]" style={{ animationDelay: '-3s' }} />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px animated-gradient-line" />

      <div className="relative z-10 text-center px-4 max-w-[90vw]">
        <div ref={textRef}>
          <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-bold font-[family-name:var(--font-heading)] leading-[0.9] tracking-tighter mb-16">
            <span
              className="stroke-fill block"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0',
              }}
            >
              READY TO
            </span>
            <span
              className="stroke-fill block"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #8b5cf6, #ff006e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0',
              }}
            >
              GROW
            </span>
            <span
              className="stroke-fill block"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #ff006e, #00f0ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0',
              }}
            >
              FASTER?
            </span>
          </h2>
        </div>

        <MagneticButton href="/contact" className="group" strength={0.4}>
          <span className="px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_100%] text-background rounded-full group-hover:bg-right group-hover:shadow-[0_0_60px_rgba(0,240,255,0.4)] transition-all duration-700">
            Book Your Free Call
          </span>
        </MagneticButton>

        {/* Benefits row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-2 text-gray-400">
              <span className="text-cyan">{benefit.icon}</span>
              <span className="text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <p className="mt-8 text-xs text-gray-600 tracking-wide">
          Trusted by 120+ brands across India and beyond
        </p>
      </div>
    </section>
  );
}
