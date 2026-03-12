'use client';
import { motion } from 'framer-motion';

const brandsRow1 = [
  { name: 'Google', weight: 700, size: 'text-2xl' },
  { name: 'Nike', weight: 800, size: 'text-3xl' },
  { name: 'Spotify', weight: 600, size: 'text-2xl' },
  { name: 'Airbnb', weight: 700, size: 'text-xl' },
  { name: 'Netflix', weight: 800, size: 'text-3xl' },
];

const brandsRow2 = [
  { name: 'Stripe', weight: 700, size: 'text-2xl' },
  { name: 'Shopify', weight: 600, size: 'text-xl' },
  { name: 'Adobe', weight: 800, size: 'text-2xl' },
  { name: 'Meta', weight: 700, size: 'text-3xl' },
  { name: 'Amazon', weight: 800, size: 'text-2xl' },
];

function LogoRow({ brands, direction = 'left', duration = 30 }) {
  const repeated = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((brand, i) => (
          <span
            key={`${brand.name}-${i}`}
            className={`${brand.size} font-[family-name:var(--font-heading)] text-gray-600 hover:text-gray-300 transition-colors duration-300 cursor-default select-none`}
            style={{ fontWeight: brand.weight }}
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Trusted by 500+ leading brands worldwide
        </span>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <LogoRow brands={brandsRow1} direction="left" duration={35} />
        <LogoRow brands={brandsRow2} direction="right" duration={40} />
      </div>
    </section>
  );
}
