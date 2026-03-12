'use client';
import { motion } from 'framer-motion';

const shapes = [
  { size: 300, x: '10%', y: '20%', color: 'rgba(0,240,255,0.08)', duration: 20 },
  { size: 200, x: '70%', y: '60%', color: 'rgba(139,92,246,0.08)', duration: 25 },
  { size: 250, x: '80%', y: '10%', color: 'rgba(255,0,110,0.06)', duration: 22 },
  { size: 180, x: '20%', y: '70%', color: 'rgba(57,255,20,0.05)', duration: 28 },
  { size: 150, x: '50%', y: '40%', color: 'rgba(0,240,255,0.06)', duration: 18 },
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
