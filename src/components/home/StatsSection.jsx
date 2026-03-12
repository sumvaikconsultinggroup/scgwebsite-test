'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 500, suffix: '+', label: 'Brands Served', color: 'text-cyan' },
  { value: 2000, suffix: '+', label: 'Campaigns Launched', color: 'text-purple' },
  { value: 50, suffix: 'M+', label: 'Total Reach', color: 'text-pink' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', color: 'text-neon-green' },
];

function StatItem({ stat, inView, index }) {
  const count = useCountUp(stat.value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className={`text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] ${stat.color} mb-2`}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} inView={inView} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
