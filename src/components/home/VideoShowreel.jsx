'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowreel() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale video from small rounded to full bleed
      gsap.fromTo(
        videoRef.current,
        { scale: 0.65, borderRadius: '48px', opacity: 0.8 },
        {
          scale: 1,
          borderRadius: '0px',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 5%',
            scrub: 1,
          },
        }
      );

      // Parallax heading
      gsap.fromTo(
        textRef.current,
        { y: 0, opacity: 1 },
        {
          y: -120,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'top -15%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Heading */}
      <div ref={textRef} className="text-center mb-16 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4">
          Our Showreel
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
          See Us in <span className="gradient-text">Action</span>
        </h2>
      </div>

      {/* Video container */}
      <div
        ref={videoRef}
        className="relative mx-auto overflow-hidden cursor-pointer group"
        style={{ maxWidth: '100vw' }}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-surface">
          {/* Animated multi-layer background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/15 via-background to-purple/15" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="gradient-orb w-[700px] h-[700px] bg-cyan/20 top-[-20%] left-[-15%]" />
              <div className="gradient-orb w-[600px] h-[600px] bg-purple/20 bottom-[-20%] right-[-15%]" style={{ animationDelay: '-3s' }} />
              <div className="gradient-orb w-[500px] h-[500px] bg-pink/15 top-[20%] left-[30%]" style={{ animationDelay: '-5s' }} />
              <div className="gradient-orb w-[400px] h-[400px] bg-neon-green/8 bottom-[10%] left-[60%]" style={{ animationDelay: '-7s' }} />
            </div>

            {/* Grid + scanlines */}
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 scanlines" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {/* Massive brand name */}
            <div
              className="text-[18vw] md:text-[15vw] font-bold font-[family-name:var(--font-heading)] leading-none select-none mb-6"
              style={{
                WebkitTextStroke: '2px rgba(0, 240, 255, 0.12)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SUMVAIK
            </div>

            {/* Play button with glow ring */}
            <button
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-700"
              data-cursor-hover
            >
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full border border-cyan/20 group-hover:border-cyan/40 transition-colors duration-500"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              {/* Dashed middle ring */}
              <div
                className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-white/20 transition-colors duration-500"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              />
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-white/5 group-hover:bg-cyan/10 transition-colors duration-700 animate-breathe" />

              {isPlaying ? (
                <div className="flex gap-2 relative z-10">
                  <div className="w-3 h-10 bg-white rounded-sm" />
                  <div className="w-3 h-10 bg-white rounded-sm" />
                </div>
              ) : (
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <p className="mt-8 text-sm text-gray-400 uppercase tracking-[0.3em] group-hover:text-cyan transition-colors duration-500">
              {isPlaying ? 'Now Playing' : 'Play Showreel — 2024'}
            </p>
          </div>

          {/* Gradient lines */}
          <div className="absolute top-0 left-0 right-0 h-px animated-gradient-line" />
          <div className="absolute bottom-0 left-0 right-0 h-px animated-gradient-line" />

          {/* Side accents */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/10 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
