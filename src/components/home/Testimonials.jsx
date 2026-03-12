'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'We had tried three agencies before Sumvaik. Within the first month, they restructured our entire funnel and our cost-per-lead dropped by 40%. They don\'t just execute — they think.',
    name: 'Rohit Mehta',
    role: 'Founder, Glow & Co.',
    company: 'Glow & Co.',
    metric: '40% Lower CPL',
    metricColor: '#00f0ff',
    bgGradient: 'from-cyan/5 to-transparent',
  },
  {
    quote: 'They managed 42 outlet pages, created 200+ reels in a single quarter, and got us 85 million impressions without spending a rupee on ads. I still don\'t fully understand how they did it.',
    name: 'Ananya Sharma',
    role: 'Head of Marketing, BiteBox',
    company: 'BiteBox',
    metric: '85M Organic Reach',
    metricColor: '#8b5cf6',
    bgGradient: 'from-purple/5 to-transparent',
  },
  {
    quote: 'Sumvaik didn\'t just redesign our brand — they repositioned us in the market. Six months later, we are the brand people compare others to. That shift in perception is priceless.',
    name: 'Vikram Singh',
    role: 'CEO, ThreadCulture',
    company: 'ThreadCulture',
    metric: 'Category Leader',
    metricColor: '#ff006e',
    bgGradient: 'from-pink/5 to-transparent',
  },
  {
    quote: 'Their influencer team is genuinely different. They brought us creators who actually used our product, not just people who would post and ghost. Our UGC library went from 0 to 500+ assets.',
    name: 'Priya Nair',
    role: 'Brand Manager, MealPrep India',
    company: 'MealPrep India',
    metric: '500+ UGC Assets',
    metricColor: '#39ff14',
    bgGradient: 'from-neon-green/5 to-transparent',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin the section while cards stack up
      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.fromTo(
          card,
          {
            yPercent: 100,
            scale: 0.92,
            opacity: 0,
            rotateX: 4,
          },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: `${i * 22}% top`,
              end: `${i * 22 + 18}% top`,
              scrub: 1,
            },
          }
        );

        // Push previous cards back
        if (i > 0) {
          gsap.to(cards[i - 1], {
            scale: 0.96 - i * 0.015,
            y: -(i * 12),
            filter: `brightness(${1 - i * 0.08})`,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: `${i * 22}% top`,
              end: `${i * 22 + 18}% top`,
              scrub: 1,
            },
          });
        }
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${cards.length * 50}%`,
        pin: true,
        pinSpacing: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="gradient-orb w-[600px] h-[600px] bg-purple/5 top-[20%] right-[-10%]" />

      <div className="max-w-5xl mx-auto px-4 pt-24 md:pt-32 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Stacking cards */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`${i === 0 ? 'relative' : 'absolute inset-x-0 top-0'} group`}
              style={{
                zIndex: i + 1,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className={`relative overflow-hidden rounded-3xl p-10 md:p-16 border border-gray-800/30 bg-gradient-to-br ${t.bgGradient} backdrop-blur-md bg-surface/80`}>
                {/* Hover spotlight */}
                <div
                  className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${t.metricColor}08, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Top: stars + metric */}
                  <div className="flex items-center justify-between mb-10">
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

                  {/* Giant quote mark */}
                  <div
                    className="text-[120px] md:text-[180px] font-serif leading-none -mb-16 md:-mb-24 select-none"
                    style={{ color: `${t.metricColor}08` }}
                  >
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <p className="text-2xl md:text-4xl lg:text-5xl text-gray-100 leading-[1.2] mb-12 font-light font-[family-name:var(--font-heading)] tracking-tight">
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-background font-bold text-xl"
                        style={{ background: `linear-gradient(135deg, ${t.metricColor}, ${t.metricColor}88)` }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                    <span className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-gray-800 select-none hidden md:block tracking-tight">
                      {t.company}
                    </span>
                  </div>
                </div>

                {/* Bottom animated line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${t.metricColor}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
