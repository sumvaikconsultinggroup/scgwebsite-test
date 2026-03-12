'use client';
import { motion } from 'framer-motion';

const rows = [
  { text: 'BRANDING · STRATEGY · SOCIAL MEDIA · INFLUENCER · CONTENT · GROWTH · DIGITAL · CREATIVE · ', speed: 25, direction: 'left' },
  { text: 'VIRAL · ENGAGEMENT · ANALYTICS · ROI · CAMPAIGNS · STORYTELLING · DESIGN · IMPACT · ', speed: 30, direction: 'right' },
  { text: 'INNOVATION · SCALE · AUDIENCE · CONVERSION · COMMUNITY · PRESENCE · IDENTITY · REACH · ', speed: 20, direction: 'left' },
];

export default function InfiniteTextWall() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div className="space-y-4">
        {rows.map((row, i) => {
          const repeated = row.text.repeat(6);
          return (
            <div key={i} className="relative overflow-hidden">
              <motion.div
                className="whitespace-nowrap flex"
                animate={{
                  x: row.direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{ duration: row.speed, repeat: Infinity, ease: 'linear' }}
              >
                <span
                  className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] uppercase tracking-tight select-none"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {repeated}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
