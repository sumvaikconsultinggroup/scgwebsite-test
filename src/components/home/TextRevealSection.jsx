'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealSection() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  const text = 'We believe every brand has a story worth telling — one that resonates, inspires, and endures. We are not just marketers. We are architects of perception, engineers of desire, and storytellers who understand that the distance between invisible and unforgettable is strategy.';
  const words = text.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.filter(Boolean).forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.08 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${5 + (i / words.length) * 70}% 80%`,
              end: `${10 + (i / words.length) * 70}% 60%`,
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [words.length]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Centered gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-[1.2] tracking-tight text-center">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="inline-block mr-[0.3em] opacity-[0.08] transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-purple/20 to-transparent" />
    </section>
  );
}
