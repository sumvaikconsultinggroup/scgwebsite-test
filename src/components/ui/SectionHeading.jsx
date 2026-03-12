'use client';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-16 ${className}`}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4 gradient-text">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
