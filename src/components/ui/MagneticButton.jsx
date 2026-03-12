'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MagneticButton({ children, href, onClick, className = '', strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.create(Link) : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center ${className}`}
      data-cursor-hover
    >
      {children}
    </Component>
  );
}
