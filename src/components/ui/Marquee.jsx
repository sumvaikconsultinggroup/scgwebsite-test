'use client';
import { motion } from 'framer-motion';

export default function Marquee({
  text = 'BRANDING • SOCIAL MEDIA • INFLUENCER MARKETING • CONTENT STRATEGY • GROWTH • DIGITAL • ',
  speed = 20,
  className = '',
  variant = 'default',
}) {
  const repeated = text.repeat(8);

  if (variant === 'gradient') {
    return (
      <div className={`relative overflow-hidden py-10 md:py-14 -rotate-1 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-purple/5 to-pink/5" />
        <div className="absolute top-0 left-0 right-0 h-px animated-gradient-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px animated-gradient-line" />
        <motion.div
          className="whitespace-nowrap flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-[family-name:var(--font-heading)] gradient-text uppercase tracking-tight select-none leading-none">
            {repeated}
          </span>
        </motion.div>
      </div>
    );
  }

  if (variant === 'outline') {
    return (
      <div className={`relative overflow-hidden py-8 rotate-1 ${className}`}>
        <motion.div
          className="whitespace-nowrap flex"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: speed * 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <span
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-[family-name:var(--font-heading)] uppercase tracking-tight select-none leading-none"
            style={{
              WebkitTextStroke: '1.5px rgba(0, 240, 255, 0.15)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {repeated}
          </span>
        </motion.div>
      </div>
    );
  }

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
