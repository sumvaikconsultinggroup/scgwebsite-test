'use client';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';

export default function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-purple/10 to-pink/10" />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4"
            >
              Ready to <span className="gradient-text">Dominate Digital?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
            >
              Try our free tools or get in touch to start your next viral campaign.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <GradientButton href="/tools/content-calendar" size="lg">
                <HiCalendar /> Content Calendar Tool
              </GradientButton>
              <GradientButton href="/influencer-platform" variant="pink" size="lg">
                Find Influencers <HiArrowRight />
              </GradientButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
