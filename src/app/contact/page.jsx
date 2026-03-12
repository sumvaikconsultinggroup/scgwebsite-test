'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiChevronDown } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

const faqs = [
  { q: 'How long does a typical branding project take?', a: 'Most branding projects take 4-8 weeks from discovery to final delivery, depending on scope and complexity.' },
  { q: 'What social media platforms do you manage?', a: 'We manage all major platforms including Instagram, TikTok, Twitter/X, LinkedIn, Facebook, YouTube, and Pinterest.' },
  { q: 'How do you measure influencer campaign success?', a: 'We track reach, engagement rate, click-throughs, conversions, and overall ROI using our proprietary analytics dashboard.' },
  { q: 'Do you offer custom packages?', a: 'Absolutely! We tailor our services to each client\'s unique needs and budget. Schedule a call to discuss your goals.' },
  { q: 'Can I use the content calendar tool for free?', a: 'Yes! Our content calendar generator is completely free. Premium features like AI-powered captions are coming soon.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6"
          >
            Let&apos;s <span className="gradient-text">Start Building</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Ready to take your brand to the next level? Drop us a message and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                  placeholder="Company Name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Service Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground focus:outline-none focus:border-cyan/50 transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="branding">Branding</option>
                    <option value="social-media">Social Media Marketing</option>
                    <option value="influencer">Influencer Marketing</option>
                    <option value="full-suite">Full Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground focus:outline-none focus:border-cyan/50 transition-all"
                  >
                    <option value="">Select budget</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4 text-neon-green font-medium"
                  >
                    Message sent successfully! We&apos;ll be in touch soon.
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 px-6 text-base font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
                  >
                    Send Message
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">Get in Touch</h3>
              <div className="space-y-5">
                {[
                  { icon: HiMail, label: 'Email', value: 'hello@scgdigital.com' },
                  { icon: HiPhone, label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: HiLocationMarker, label: 'Office', value: '123 Digital Ave, Suite 500\nSan Francisco, CA 94102' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-foreground whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: FaInstagram, label: 'Instagram' },
                  { icon: FaTwitter, label: 'Twitter' },
                  { icon: FaLinkedinIn, label: 'LinkedIn' },
                  { icon: FaTiktok, label: 'TikTok' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-11 h-11 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">Office Hours</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Mon - Fri</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Saturday</span>
                  <span className="text-foreground">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <HiChevronDown className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-gray-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
