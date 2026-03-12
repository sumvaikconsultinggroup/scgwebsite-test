'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const chars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function TextScramble({ text, className = '', delay = 0, speed = 30 }) {
  const [displayText, setDisplayText] = useState('');
  const hasAnimated = useRef(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const length = text.length;
    let iteration = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1 / 2;

        if (iteration >= length) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText || '\u00A0'.repeat(text.length)}
    </span>
  );
}
