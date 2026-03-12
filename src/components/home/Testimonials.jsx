'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'SCG Digital transformed our brand from invisible to unforgettable. Their strategy tripled our engagement in 3 months.',
    name: 'Sarah Chen',
    role: 'CEO, Luxe Beauty',
  },
  {
    quote: 'The influencer campaign exceeded all expectations. 400% ROI and 50K new organic followers.',
    name: 'Marcus Johnson',
    role: 'CMO, FitLife',
  },
  {
    quote: 'Their branding work gave us a new identity that truly resonates. Revenue increased 200% after the rebrand.',
    name: 'Priya Patel',
    role: 'Founder, EcoWear',
  },
  {
    quote: 'Working with SCG is like having a growth cheat code. Their data-driven approach is unmatched.',
    name: 'David Kim',
    role: 'VP Marketing, TechStart',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === 0) return; // First card is visible by default

        gsap.fromTo(
          card,
          { yPercent: 100, opacity: 0.5 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${(i * 25)}% center`,
              end: `${(i * 25) + 20}% center`,
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-4">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-3 text-center">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-foreground text-center tracking-tight mb-16">
          What <span className="gradient-text">Clients Say</span>
        </h2>

        <div className="relative" style={{ minHeight: '400px' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative bg-surface-light rounded-2xl p-8 md:p-12 mb-6 border border-gray-800"
              style={{
                transform: i === 0 ? 'none' : undefined,
              }}
            >
              {/* Quote mark */}
              <div className="text-6xl md:text-8xl font-serif text-cyan/10 leading-none mb-4 select-none">&ldquo;</div>

              <p className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-8 font-light">
                {t.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-background font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
