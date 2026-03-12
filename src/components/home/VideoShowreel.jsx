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
      // Scale video container from small to full width on scroll
      gsap.fromTo(
        videoRef.current,
        { scale: 0.7, borderRadius: '40px' },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 10%',
            scrub: 1,
          },
        }
      );

      // Parallax the text
      gsap.fromTo(
        textRef.current,
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'top -10%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Top label */}
      <div ref={textRef} className="text-center mb-12 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4">
          Our Showreel
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
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
        {/* Fake video — gradient animated background */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface">
          {/* Cinematic gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-background to-purple/20" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="gradient-orb w-[600px] h-[600px] bg-cyan/15 top-[-10%] left-[-10%]" />
              <div className="gradient-orb w-[500px] h-[500px] bg-purple/20 bottom-[-10%] right-[-10%]" style={{ animationDelay: '-3s' }} />
              <div className="gradient-orb w-[400px] h-[400px] bg-pink/10 top-[30%] left-[40%]" style={{ animationDelay: '-5s' }} />
            </div>
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-50" />
            {/* Scanlines */}
            <div className="absolute inset-0 scanlines" />
          </div>

          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {/* Large SUMVAIK text */}
            <div className="text-[20vw] font-bold font-[family-name:var(--font-heading)] stroke-text-thick leading-none select-none mb-8">
              SUMVAIK
            </div>

            {/* Play button */}
            <button
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-cyan/50 transition-all duration-500 group-hover:scale-110 animate-breathe"
              data-cursor-hover
            >
              <div className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-cyan/10 transition-colors duration-500" />
              {isPlaying ? (
                <div className="flex gap-2 relative z-10">
                  <div className="w-3 h-8 bg-white rounded-sm" />
                  <div className="w-3 h-8 bg-white rounded-sm" />
                </div>
              ) : (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <p className="mt-6 text-sm text-gray-400 uppercase tracking-[0.2em]">
              {isPlaying ? 'Now Playing' : 'Play Showreel'}
            </p>
          </div>

          {/* Animated gradient border at top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-px animated-gradient-line" />
          <div className="absolute bottom-0 left-0 right-0 h-px animated-gradient-line" />
        </div>
      </div>
    </section>
  );
}
