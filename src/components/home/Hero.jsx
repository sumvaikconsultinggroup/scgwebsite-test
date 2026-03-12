'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';
import TextScramble from '@/components/ui/TextScramble';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

export default function Hero() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const badgeRef = useRef(null);
  const sideTextLeftRef = useRef(null);
  const sideTextRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
      )
        .fromTo(
          line1Ref.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2 },
          '-=0.3'
        )
        .fromTo(
          line2Ref.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2 },
          '-=0.7'
        )
        .fromTo(
          line3Ref.current,
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
          [sideTextLeftRef.current, sideTextRightRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
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

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background/90 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 w-px h-20 bg-gradient-to-b from-cyan/30 to-transparent z-10 hidden lg:block" />
      <div className="absolute top-24 left-8 w-20 h-px bg-gradient-to-r from-cyan/30 to-transparent z-10 hidden lg:block" />
      <div className="absolute bottom-24 right-8 w-px h-20 bg-gradient-to-t from-purple/30 to-transparent z-10 hidden lg:block" />
      <div className="absolute bottom-24 right-8 w-20 h-px bg-gradient-to-l from-purple/30 to-transparent z-10 hidden lg:block" />

      {/* Side text - vertical */}
      <div
        ref={sideTextLeftRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4 opacity-0"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 [writing-mode:vertical-lr] rotate-180">
          Est. 2018
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
      </div>

      <div
        ref={sideTextRightRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4 opacity-0"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple/30 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 [writing-mode:vertical-lr]">
          500+ Brands
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[95vw] mx-auto text-center px-4">
        {/* Top badge */}
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Award-Winning Digital Agency
          </span>
        </div>

        {/* Main headline — oversized, multi-line */}
        <h1 className="font-[family-name:var(--font-heading)] font-bold leading-[0.85] tracking-tighter">
          <span
            ref={line1Ref}
            className="block text-[13vw] md:text-[11vw] text-foreground opacity-0"
          >
            WE CREATE
          </span>
          <span
            ref={line2Ref}
            className="block text-[13vw] md:text-[11vw] gradient-text opacity-0"
          >
            DIGITAL
          </span>
          <span
            ref={line3Ref}
            className="block text-[13vw] md:text-[11vw] stroke-text-thick opacity-0"
          >
            EMPIRES
          </span>
        </h1>

        {/* Subtitle with scramble */}
        <div ref={subtitleRef} className="mt-8 mb-12 opacity-0">
          <TextScramble
            text="Strategic Branding · Viral Social Media · Influencer Partnerships"
            className="text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase"
            delay={1800}
            speed={25}
          />
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0">
          <MagneticButton href="/portfolio" className="group">
            <span className="px-10 py-5 text-sm font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_100%] text-background rounded-full group-hover:bg-right transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]">
              View Our Work
            </span>
          </MagneticButton>
          <MagneticButton href="/contact" className="group">
            <span className="px-10 py-5 text-sm font-bold uppercase tracking-[0.15em] border border-foreground/20 text-foreground rounded-full group-hover:border-cyan group-hover:text-cyan group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500">
              Start a Project
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll to explore</span>
        <div className="w-px h-14 bg-gradient-to-b from-cyan/50 to-transparent scroll-line" />
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px animated-gradient-line z-10" />
    </section>
  );
}
