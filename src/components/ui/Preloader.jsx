'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 12 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => setIsComplete(true), 400);
        setTimeout(() => setIsVisible(false), 1200);
      }
      setProgress(Math.min(current, 100));
    }, 80);

    return () => clearInterval(intervalRef.current);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          key="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Gradient orbs */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[100px] top-1/4 left-1/4 animate-float" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-purple/10 blur-[80px] bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '-3s' }} />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] tracking-tighter">
              <span className="gradient-text">Sumvaik</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-xs uppercase tracking-[0.4em] text-gray-500 mt-3"
            >
              Consulting Group
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-64 md:w-80">
            <div className="h-[1px] bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00f0ff, #8b5cf6, #ff006e)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Loading</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
