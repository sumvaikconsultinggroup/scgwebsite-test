'use client';
import { motion } from 'framer-motion';

const awards = [
  { year: '2024', title: 'Top 50 Agencies', org: 'Agency Reporter' },
  { year: '2024', title: 'Best Influencer Campaign', org: 'Social Samosa' },
  { year: '2023', title: 'Rising Star Agency', org: 'Campaign India' },
  { year: '2023', title: 'Best Use of UGC', org: 'Afaqs' },
  { year: '2023', title: 'D2C Marketing Award', org: 'YourStory' },
  { year: '2022', title: 'Digital Agency to Watch', org: 'Exchange4Media' },
];

export default function AwardsBanner() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />

      {/* Gradient orbs */}
      <div className="gradient-orb w-[400px] h-[400px] bg-cyan/8 top-0 left-[20%]" />
      <div className="gradient-orb w-[300px] h-[300px] bg-purple/8 bottom-0 right-[20%]" style={{ animationDelay: '-4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 block mb-4"
          >
            Press & Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] tracking-tight"
          >
            <span className="stroke-text">Featured</span>{' '}
            <span className="gradient-text">In</span>
          </motion.h2>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {awards.map((award, i) => (
            <motion.div
              key={`${award.title}-${award.year}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 text-center h-full group-hover:border-cyan/30 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.1)] transition-all duration-500">
                {/* Year badge */}
                <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan bg-cyan/10 rounded-full">
                  {award.year}
                </div>

                {/* Trophy icon */}
                <div className="mb-3">
                  <svg className="w-8 h-8 mx-auto text-gray-600 group-hover:text-cyan transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388a12.03 12.03 0 00-5.25 0" />
                  </svg>
                </div>

                <h4 className="text-sm font-bold text-foreground mb-1 leading-tight">
                  {award.title}
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {award.org}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
