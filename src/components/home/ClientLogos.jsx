'use client';
import { motion } from 'framer-motion';

const brandsRow1 = [
  { name: 'Google', weight: 700, size: 'text-2xl md:text-3xl' },
  { name: 'Nike', weight: 800, size: 'text-3xl md:text-4xl' },
  { name: 'Spotify', weight: 600, size: 'text-2xl md:text-3xl' },
  { name: 'Airbnb', weight: 700, size: 'text-xl md:text-2xl' },
  { name: 'Netflix', weight: 800, size: 'text-3xl md:text-4xl' },
  { name: 'Tesla', weight: 700, size: 'text-2xl md:text-3xl' },
  { name: 'Apple', weight: 600, size: 'text-xl md:text-2xl' },
];

const brandsRow2 = [
  { name: 'Stripe', weight: 700, size: 'text-2xl md:text-3xl' },
  { name: 'Shopify', weight: 600, size: 'text-xl md:text-2xl' },
  { name: 'Adobe', weight: 800, size: 'text-2xl md:text-3xl' },
  { name: 'Meta', weight: 700, size: 'text-3xl md:text-4xl' },
  { name: 'Amazon', weight: 800, size: 'text-2xl md:text-3xl' },
  { name: 'Discord', weight: 700, size: 'text-xl md:text-2xl' },
  { name: 'Figma', weight: 600, size: 'text-2xl md:text-3xl' },
];

function LogoRow({ brands, direction = 'left', duration = 30 }) {
  const repeated = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-5">
      <motion.div
        className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((brand, i) => (
          <span
            key={`${brand.name}-${i}`}
            className={`${brand.size} font-[family-name:var(--font-heading)] text-gray-700 hover:text-cyan transition-colors duration-500 cursor-default select-none`}
            style={{ fontWeight: brand.weight }}
            data-cursor-hover
          >
            {brand.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Trusted by 500+ leading brands worldwide
        </span>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <LogoRow brands={brandsRow1} direction="left" duration={35} />
        <LogoRow brands={brandsRow2} direction="right" duration={40} />
      </div>

      {/* Section divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
