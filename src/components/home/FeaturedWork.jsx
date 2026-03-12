'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const projects = [
  {
    title: 'Luxe Beauty Brand Launch',
    category: 'Branding',
    gradient: 'from-pink/20 via-purple/20 to-cyan/20',
    metrics: '+340% brand awareness',
  },
  {
    title: 'FitLife Social Campaign',
    category: 'Social Media',
    gradient: 'from-cyan/20 via-neon-green/20 to-purple/20',
    metrics: '2.5M impressions',
  },
  {
    title: 'TechStart Influencer Launch',
    category: 'Influencer Marketing',
    gradient: 'from-purple/20 via-pink/20 to-cyan/20',
    metrics: '50+ creator partnerships',
  },
  {
    title: 'EcoWear Digital Rebrand',
    category: 'Branding + Social',
    gradient: 'from-neon-green/20 via-cyan/20 to-purple/20',
    metrics: '+180% engagement',
  },
];

export default function FeaturedWork() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Work"
          title="Featured Case Studies"
          description="Real results for real brands. See how we've transformed businesses through digital marketing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} relative`}>
                {/* Overlay pattern */}
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-cyan bg-cyan/10 border border-cyan/20 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400">{project.metrics}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-cyan hover:gap-3 transition-all duration-300 font-medium"
          >
            View All Projects <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
