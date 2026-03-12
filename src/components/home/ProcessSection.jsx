'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, market, and audience through comprehensive research and stakeholder interviews.',
    color: '#00f0ff',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Armed with data, we craft a tailored roadmap with clear KPIs and milestones defined upfront.',
    color: '#8b5cf6',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Our creative team brings strategy to life with precision and creative excellence.',
    color: '#ff006e',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scale',
    description: 'We analyze, optimize, and amplify what works. Continuous iteration ensures compounding growth.',
    color: '#39ff14',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 10%',
            scrub: 1,
          },
        }
      );

      stepsRef.current.filter(Boolean).forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${15 + i * 12}% 70%`,
              end: `${25 + i * 12}% 70%`,
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="gradient-orb w-[600px] h-[600px] bg-purple/5 top-[30%] right-[-15%]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4">
            How We Work
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight">
            Our <span className="gradient-text">Process</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[70px] left-[10%] right-[10%] h-[2px] z-0">
            <div
              ref={lineRef}
              className="w-full h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #00f0ff, #8b5cf6, #ff006e, #39ff14)',
                opacity: 0.4,
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[i] = el)}
                className="relative text-center opacity-0 group"
              >
                {/* Icon box */}
                <div className="relative z-10 mx-auto mb-8">
                  <div
                    className="w-[120px] h-[120px] mx-auto rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                    style={{
                      borderColor: `${step.color}33`,
                      background: `${step.color}08`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Glowing dot on timeline */}
                  <div
                    className="hidden md:block absolute -top-[19px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                    style={{
                      background: step.color,
                      boxShadow: `0 0 20px ${step.color}66`,
                    }}
                  />
                </div>

                {/* Number */}
                <div
                  className="text-sm font-bold font-[family-name:var(--font-heading)] tracking-[0.2em] mb-2"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>

                {/* Bottom color line on hover */}
                <div
                  className="h-[2px] w-0 group-hover:w-full mx-auto mt-6 transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
