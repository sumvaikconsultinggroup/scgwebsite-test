'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Calendar Tool', href: '/tools/content-calendar' },
  { name: 'Influencer Hub', href: '/influencer-platform' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpen
            ? 'bg-background/60 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[90vw] mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-[60] flex items-center gap-3 group" data-cursor-hover>
              <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background font-bold text-lg group-hover:bg-cyan transition-colors duration-300">
                S
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-foreground tracking-tight hidden sm:block">
                SCG Digital
              </span>
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[60] flex items-center gap-3 group"
              data-cursor-hover
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-foreground transition-colors hidden sm:block">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
              <div className="w-10 h-10 flex flex-col items-center justify-center gap-1.5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[1.5px] bg-foreground origin-center"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[1.5px] bg-foreground origin-center"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex items-center justify-center"
          >
            <div className="max-w-4xl w-full px-8">
              <nav className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-2 text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight tracking-tight transition-colors duration-200 ${
                        pathname === link.href
                          ? 'text-cyan'
                          : 'text-foreground/20 hover:text-foreground'
                      }`}
                      data-cursor-hover
                    >
                      <span className="text-xs text-gray-600 font-normal font-[family-name:var(--font-body)] mr-3 align-top">
                        0{i + 1}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-800 pt-8"
              >
                <div className="text-sm text-gray-500">
                  <p>hello@scgdigital.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                  <a href="#" className="hover:text-cyan transition-colors" data-cursor-hover>Instagram</a>
                  <a href="#" className="hover:text-cyan transition-colors" data-cursor-hover>Twitter</a>
                  <a href="#" className="hover:text-cyan transition-colors" data-cursor-hover>LinkedIn</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
