'use client';
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }) {
  const meshRef = useRef();
  const { pointer } = useThree();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ff006e'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.015) * 0.15;
    meshRef.current.rotation.y += pointer.x * 0.02;
    meshRef.current.rotation.x += pointer.y * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyLines({ count = 30 }) {
  const groupRef = useRef();

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const pos = new Float32Array(6);
      const start = [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15];
      const angle = Math.random() * Math.PI * 2;
      const length = 0.5 + Math.random() * 2;

      pos[0] = start[0];
      pos[1] = start[1];
      pos[2] = start[2];
      pos[3] = start[0] + Math.cos(angle) * length;
      pos[4] = start[1] + Math.sin(angle) * length;
      pos[5] = start[2] + (Math.random() - 0.5) * length;

      result.push(pos);
    }
    return result;
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((positions, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={2} array={positions} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial
            color={['#00f0ff', '#8b5cf6', '#ff006e'][i % 3]}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

export default function ParticleCloud() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Particles count={800} />
          <EnergyLines count={40} />
        </Suspense>
      </Canvas>
    </div>
  );
}
