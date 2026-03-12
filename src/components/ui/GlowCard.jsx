'use client';
import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', glowColor = 'cyan', delay = 0 }) {
  const glowMap = {
    cyan: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    pink: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.15)]',
    green: 'hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]',
  };

  const borderMap = {
    cyan: 'hover:border-cyan/30',
    purple: 'hover:border-purple/30',
    pink: 'hover:border-pink/30',
    green: 'hover:border-neon-green/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${glowMap[glowColor]} ${borderMap[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
