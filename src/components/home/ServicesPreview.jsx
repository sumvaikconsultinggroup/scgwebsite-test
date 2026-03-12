'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Branding',
    subtitle: 'Your Identity, Redefined',
    description: 'Your logo is not your brand. We go deeper — positioning, messaging, visual systems, and brand guidelines that make people feel something when they see your name. We have rebranded 120+ companies across fashion, tech, food, and fitness.',
    color: '#00f0ff',
    features: ['Logo & Identity', 'Brand Positioning', 'Packaging Design', 'Brand Guidelines'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    stat: '120+',
    statLabel: 'brands built from scratch',
  },
  {
    number: '02',
    title: 'Social Media',
    subtitle: 'Where Followers Become Customers',
    description: 'We manage Instagram, LinkedIn, YouTube, and TikTok for brands that are tired of posting and praying. Our team writes the copy, shoots the reels, runs the ads, and reports every metric that matters. No vanity numbers — just qualified attention.',
    color: '#8b5cf6',
    features: ['Content Production', 'Community Management', 'Meta & Google Ads', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    stat: '85M+',
    statLabel: 'organic impressions generated',
  },
  {
    number: '03',
    title: 'Influencer',
    subtitle: 'The Right Voice Changes Everything',
    description: 'We have run 300+ influencer campaigns. Our in-house database has 10,000+ vetted creators across India. We handle discovery, negotiation, content approvals, posting schedules, and performance tracking end-to-end.',
    color: '#ff006e',
    features: ['Creator Sourcing', 'Campaign Management', 'UGC Production', 'Performance Analytics'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    stat: '10K+',
    statLabel: 'creators in our network',
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalWidth = container.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={containerRef} className="flex h-screen">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="flex-shrink-0 w-screen h-screen flex items-center px-8 md:px-16 lg:px-24 relative"
          >
            {/* Background number — massive */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-bold font-[family-name:var(--font-heading)] leading-none select-none pointer-events-none"
              style={{
                WebkitTextStroke: `1px ${service.color}08`,
                WebkitTextFillColor: 'transparent',
              }}
            >
              {service.number}
            </div>

            {/* Gradient orb for this service */}
            <div
              className="gradient-orb w-[500px] h-[500px] top-[20%] right-[10%]"
              style={{ background: `${service.color}08`, animationDelay: `${i * -2}s` }}
            />

            {/* Content + Image layout */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-7xl mx-auto">
              {/* Left: Content */}
              <div className="flex-1 max-w-xl">
                {/* Number + subtitle */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-heading)] leading-none"
                    style={{ color: `${service.color}30` }}
                  >
                    {service.number}
                  </div>
                  <div className="w-12 h-px" style={{ background: service.color }} />
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ color: service.color }}>
                    {service.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-heading)] text-foreground leading-[0.85] tracking-tight mb-6">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-full border"
                      style={{ borderColor: `${service.color}33`, color: service.color }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Result stat */}
                <div className="mb-8 flex items-baseline gap-3">
                  <span
                    className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: service.color }}
                  >
                    {service.stat}
                  </span>
                  <span className="text-sm text-gray-400 uppercase tracking-[0.1em]">
                    {service.statLabel}
                  </span>
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:gap-5 group"
                  style={{ color: service.color }}
                  data-cursor-hover
                >
                  Learn More
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ borderColor: `${service.color}33` }}
                  >
                    <svg width="16" height="10" viewBox="0 0 20 12" fill="none">
                      <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Right: Image */}
              <div className="hidden md:block flex-1 max-w-md lg:max-w-lg">
                <div
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden border"
                  style={{ borderColor: `${service.color}1a` }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Color overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15, transparent 60%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                  {/* Animated border on bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                  />
                </div>
              </div>
            </div>

            {/* Divider line */}
            {i < services.length - 1 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
