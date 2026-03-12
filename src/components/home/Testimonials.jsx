'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiStar } from 'react-icons/hi';

const testimonials = [
  {
    quote: "SCG Digital transformed our brand from invisible to unforgettable. Their social media strategy tripled our engagement in just 3 months.",
    name: 'Sarah Chen',
    role: 'CEO, Luxe Beauty',
    rating: 5,
  },
  {
    quote: "The influencer marketing campaign they ran exceeded all expectations. We saw a 400% ROI and gained 50K new followers organically.",
    name: 'Marcus Johnson',
    role: 'CMO, FitLife',
    rating: 5,
  },
  {
    quote: "Their branding work gave us a completely new identity that resonates with our target market. Revenue increased by 200% after the rebrand.",
    name: 'Priya Patel',
    role: 'Founder, EcoWear',
    rating: 5,
  },
  {
    quote: "Working with SCG Digital is like having a growth cheat code. Their data-driven approach to content strategy is unmatched in the industry.",
    name: 'David Kim',
    role: 'VP Marketing, TechStart',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it — hear from the brands we've helped grow."
        />

        <div className="glass rounded-2xl p-8 md:p-12 relative min-h-[250px]">
          {/* Large quote mark */}
          <div className="absolute top-6 left-8 text-6xl text-cyan/10 font-serif">&ldquo;</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <HiStar key={i} className="text-cyan text-lg" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-purple mx-auto mb-3 flex items-center justify-center text-background font-bold">
                  {testimonials[current].name.charAt(0)}
                </div>
                <h4 className="font-semibold text-foreground">{testimonials[current].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-cyan w-8' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
