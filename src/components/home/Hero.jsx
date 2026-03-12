'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';
import TextScramble from '@/components/ui/TextScramble';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

const trustBrands = ['Nike', 'Spotify', 'Airbnb', 'Stripe', 'Netflix'];

export default function Hero() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, delay: 0.3 }
      )
        .fromTo(
          line2Ref.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2 },
          '-=0.7'
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          logosRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background/80 pointer-events-none" />

      <div className="relative z-10 max-w-[90vw] mx-auto text-center px-4">
        {/* Main headline — oversized */}
        <h1 className="font-[family-name:var(--font-heading)] font-bold leading-[0.9] tracking-tighter">
          <span
            ref={line1Ref}
            className="block text-[12vw] md:text-[10vw] text-foreground opacity-0"
          >
            WE CREATE
          </span>
          <span
            ref={line2Ref}
            className="block text-[12vw] md:text-[10vw] gradient-text opacity-0"
          >
            DIGITAL EMPIRES
          </span>
        </h1>

        {/* Subtitle with scramble */}
        <div ref={subtitleRef} className="mt-8 mb-12 opacity-0">
          <TextScramble
            text="Strategic Branding • Viral Social Media • Influencer Partnerships"
            className="text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase"
            delay={1500}
            speed={25}
          />
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0">
          <MagneticButton href="/portfolio" className="group">
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] bg-foreground text-background rounded-full group-hover:bg-cyan group-hover:text-background transition-colors duration-300">
              Our Work
            </span>
          </MagneticButton>
          <MagneticButton href="/contact" className="group">
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] border border-foreground/30 text-foreground rounded-full group-hover:border-cyan group-hover:text-cyan transition-colors duration-300">
              Start a Project
            </span>
          </MagneticButton>
        </div>

        {/* Trust indicators */}
        <div ref={logosRef} className="mt-16 opacity-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {trustBrands.map((brand, i) => (
              <span
                key={brand}
                className="text-lg md:text-xl font-[family-name:var(--font-heading)] text-gray-500 opacity-60 hover:opacity-100 hover:text-gray-300 transition-all duration-300 select-none"
                style={{ fontWeight: i % 2 === 0 ? 700 : 600 }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan/50 to-transparent scroll-line" />
      </div>
    </section>
  );
}
