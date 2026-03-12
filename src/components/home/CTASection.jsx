'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const ParticleCloud = dynamic(() => import('@/components/three/ParticleCloud'), { ssr: false });

export default function CTASection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stroke fill animation
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleCloud />

      <div className="relative z-10 text-center px-4 max-w-[90vw]">
        <div ref={textRef}>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] leading-[0.95] tracking-tight mb-12">
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
              LET&apos;S BUILD
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
              SOMETHING
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
              EXTRAORDINARY
            </span>
          </h2>
        </div>

        <MagneticButton href="/contact" className="group" strength={0.4}>
          <span className="px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-cyan to-purple text-background rounded-full group-hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-shadow duration-300">
            Start a Project
          </span>
        </MagneticButton>
      </div>
    </section>
  );
}
