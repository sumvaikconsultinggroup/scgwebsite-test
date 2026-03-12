'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function ApplicationModal({ isOpen, onClose, target, type = 'campaign', onSubmit }) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ name, email, message, targetId: target?.id });
    setMessage('');
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass rounded-2xl p-8 max-w-md w-full"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-foreground transition-colors"
            >
              <HiX size={20} />
            </button>

            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-2">
              {type === 'campaign' ? 'Apply to Campaign' : 'Connect with Creator'}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              {type === 'campaign'
                ? `Apply to "${target?.title}" by ${target?.brandName}`
                : `Send a message to ${target?.name}`
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all resize-none"
                  placeholder={type === 'campaign' ? 'Tell the brand why you\'re a great fit...' : 'Describe your project or collaboration idea...'}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
              >
                {type === 'campaign' ? 'Submit Application' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
