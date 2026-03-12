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
    company: 'Luxe Beauty',
    metric: '3x Revenue Growth',
    metricColor: '#00f0ff',
  },
  {
    quote: 'The influencer campaign exceeded all expectations. 400% ROI and 50K new organic followers.',
    name: 'Marcus Johnson',
    role: 'CMO, FitLife',
    company: 'FitLife',
    metric: '400% ROI',
    metricColor: '#8b5cf6',
  },
  {
    quote: 'Their branding work gave us a new identity that truly resonates. Revenue increased 200% after the rebrand.',
    name: 'Priya Patel',
    role: 'Founder, EcoWear',
    company: 'EcoWear',
    metric: '200% Revenue Increase',
    metricColor: '#ff006e',
  },
  {
    quote: 'Working with SCG is like having a growth cheat code. Their data-driven approach is unmatched.',
    name: 'David Kim',
    role: 'VP Marketing, TechStart',
    company: 'TechStart',
    metric: '5x Lead Generation',
    metricColor: '#39ff14',
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
              {/* Top row: stars + metric */}
              <div className="flex items-center justify-between mb-6">
                {/* Star rating */}
                <div className="text-cyan text-lg tracking-wider">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                {/* Result metric */}
                <span
                  className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full border"
                  style={{
                    color: t.metricColor,
                    borderColor: `${t.metricColor}33`,
                    background: `${t.metricColor}0a`,
                  }}
                >
                  {t.metric}
                </span>
              </div>

              {/* Quote mark */}
              <div className="text-6xl md:text-8xl font-serif text-cyan/10 leading-none mb-4 select-none">&ldquo;</div>

              <p className="text-xl md:text-3xl text-gray-200 leading-relaxed mb-10 font-light">
                {t.quote}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-background font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                {/* Company logo text */}
                <span className="text-lg md:text-xl font-[family-name:var(--font-heading)] font-bold text-gray-600 select-none">
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
