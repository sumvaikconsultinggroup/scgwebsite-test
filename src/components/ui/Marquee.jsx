'use client';
import { motion } from 'framer-motion';

export default function Marquee({ text = 'BRANDING • SOCIAL MEDIA • INFLUENCER MARKETING • CONTENT STRATEGY • GROWTH • DIGITAL • ', speed = 20, className = '' }) {
  const repeated = text.repeat(8);

  return (
    <div className={`relative overflow-hidden py-8 -rotate-2 ${className}`}>
      <motion.div
        className="whitespace-nowrap flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <span className="text-6xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-heading)] text-foreground/5 uppercase tracking-tight select-none">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}
