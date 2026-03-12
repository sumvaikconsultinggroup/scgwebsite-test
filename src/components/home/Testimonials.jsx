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
        if (i === 0) return;

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
      {/* Background */}
      <div className="gradient-orb w-[500px] h-[500px] bg-cyan/5 top-[20%] left-[-10%]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-purple/5 bottom-[20%] right-[-10%]" style={{ animationDelay: '-3s' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-3 text-center">Testimonials</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] text-foreground text-center tracking-tight mb-20">
          Voices That <span className="gradient-text">Matter</span>
        </h2>

        <div className="relative" style={{ minHeight: '500px' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative overflow-hidden rounded-3xl p-10 md:p-14 mb-6 border border-gray-800/30 bg-surface-light/80 backdrop-blur-sm group hover:border-gray-700/50 transition-all duration-500"
            >
              {/* Hover spotlight */}
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${t.metricColor}08, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Top row: stars + metric */}
                <div className="flex items-center justify-between mb-8">
                  <div className="text-cyan text-lg tracking-wider">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <span
                    className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] px-5 py-2 rounded-full border"
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
                <div
                  className="text-8xl md:text-[120px] font-serif leading-none mb-4 select-none"
                  style={{ color: `${t.metricColor}10` }}
                >
                  &ldquo;
                </div>

                <p className="text-2xl md:text-4xl text-gray-200 leading-[1.3] mb-12 font-light font-[family-name:var(--font-heading)] tracking-tight">
                  {t.quote}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-background font-bold text-lg"
                      style={{ background: `linear-gradient(135deg, ${t.metricColor}, ${t.metricColor}88)` }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl font-[family-name:var(--font-heading)] font-bold text-gray-700 select-none hidden md:block">
                    {t.company}
                  </span>
                </div>
              </div>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                style={{ background: `linear-gradient(90deg, ${t.metricColor}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
