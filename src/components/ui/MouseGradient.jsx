'use client';
import { useEffect, useRef } from 'react';

export default function MouseGradient() {
  const gradientRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    const handleScroll = () => {
      mouse.current.y = mouse.current.y + window.scrollY;
    };

    let animId;
    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.05;
      current.current.y += (mouse.current.y - current.current.y) * 0.05;

      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate(${current.current.x - 300}px, ${current.current.y - 300}px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed pointer-events-none z-[1]"
      style={{
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.04) 0%, rgba(139, 92, 246, 0.02) 40%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'transform',
      }}
    />
  );
}
