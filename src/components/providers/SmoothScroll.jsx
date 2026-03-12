'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const rafCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(rafCallback);
      };
    } catch (err) {
      console.error('SmoothScroll init failed:', err);
    }
  }, []);

  return <>{children}</>;
}
