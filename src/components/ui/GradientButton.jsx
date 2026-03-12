'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden group';

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4.5 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan to-purple text-background hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]',
    secondary: 'border border-cyan/30 text-cyan hover:bg-cyan/10 hover:border-cyan/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
    pink: 'bg-gradient-to-r from-purple to-pink text-white hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]',
  };

  const combined = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.div
        className={combined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link href={href} className="inline-flex items-center justify-center w-full h-full">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}
