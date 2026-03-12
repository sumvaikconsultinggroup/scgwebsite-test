'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Branding',
    description: 'We build brands that are impossible to ignore. From visual identity to brand strategy, we create systems that resonate and endure.',
    color: '#00f0ff',
    features: ['Visual Identity', 'Brand Strategy', 'Guidelines'],
  },
  {
    number: '02',
    title: 'Social Media',
    description: 'Content that stops the scroll. Strategies that drive engagement. We turn your social presence into a growth engine.',
    color: '#8b5cf6',
    features: ['Content Creation', 'Community', 'Paid Ads'],
  },
  {
    number: '03',
    title: 'Influencer',
    description: 'Connect with the right voices. We match brands with creators who authentically amplify your message to millions.',
    color: '#ff006e',
    features: ['Creator Matching', 'Campaigns', 'ROI Tracking'],
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
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 relative"
          >
            {/* Background number */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-bold font-[family-name:var(--font-heading)] leading-none select-none pointer-events-none"
              style={{ color: service.color, opacity: 0.03 }}
            >
              {service.number}
            </div>

            <div className="relative z-10 max-w-3xl">
              {/* Number */}
              <div
                className="text-7xl md:text-9xl font-bold font-[family-name:var(--font-heading)] leading-none mb-4"
                style={{ color: service.color, opacity: 0.3 }}
              >
                {service.number}
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] text-foreground leading-[0.9] tracking-tight mb-6">
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

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:gap-4"
                style={{ color: service.color }}
                data-cursor-hover
              >
                Learn More
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <path d="M14 1L19 6M19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
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
