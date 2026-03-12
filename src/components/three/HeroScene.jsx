'use client';
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import FloatingObject from './FloatingObject';
import * as THREE from 'three';

function MouseLight() {
  const lightRef = useRef();
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2;
      lightRef.current.position.y = (pointer.y * viewport.height) / 2;
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, 4]} intensity={3} color="#00f0ff" distance={15} />;
}

function ParticleField({ count = 600 }) {
  const meshRef = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ff006e'),
      new THREE.Color('#39ff14'),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = Math.random() * 0.04 + 0.01;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.015;
    meshRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;

    // Pulse the size
    const geo = meshRef.current.geometry;
    const sizeAttr = geo.getAttribute('size');
    if (sizeAttr) {
      for (let i = 0; i < count; i++) {
        sizeAttr.array[i] = sizes[i] * (1 + 0.3 * Math.sin(t * 2 + i * 0.1));
      }
      sizeAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyRing({ radius = 3, segments = 128, color = '#00f0ff', speed = 0.5, yOffset = 0 }) {
  const lineRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array((segments + 1) * 3);
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius, segments]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    lineRef.current.rotation.x = Math.PI / 3 + Math.sin(t * speed) * 0.1;
    lineRef.current.rotation.y = t * speed * 0.5;
    lineRef.current.position.y = yOffset + Math.sin(t * speed * 0.7) * 0.3;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={segments + 1} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </line>
  );
}

function Scene() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.15 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-pointer.y * 0.1 - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating 3D objects */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <FloatingObject geometry="torusKnot" position={[-3.5, 1.5, -2]} color="#00f0ff" wireframe scale={0.7} speed={0.3} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <FloatingObject geometry="octahedron" position={[3.5, -1, -1]} color="#8b5cf6" wireframe scale={0.9} speed={0.4} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <FloatingObject geometry="icosahedron" position={[0, 2.5, -3]} color="#ff006e" wireframe={false} scale={0.6} speed={0.5} />
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <FloatingObject geometry="dodecahedron" position={[-2.5, -2, -2]} color="#39ff14" wireframe scale={0.5} speed={0.6} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
        <FloatingObject geometry="torus" position={[3, 2, -4]} color="#00f0ff" wireframe scale={0.8} speed={0.2} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.6} floatIntensity={0.4}>
        <FloatingObject geometry="icosahedron" position={[-4, 0, -5]} color="#8b5cf6" wireframe scale={0.4} speed={0.7} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingObject geometry="octahedron" position={[4.5, -2, -6]} color="#ff006e" wireframe scale={0.3} speed={0.35} />
      </Float>

      {/* Energy rings */}
      <EnergyRing radius={4} color="#00f0ff" speed={0.3} yOffset={0} />
      <EnergyRing radius={5.5} color="#8b5cf6" speed={0.2} yOffset={0.5} />
      <EnergyRing radius={7} color="#ff006e" speed={0.15} yOffset={-0.3} />

      {/* Particle field */}
      <ParticleField count={800} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <MouseLight />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[-5, -5, 3]} intensity={0.5} color="#ff006e" />
          <pointLight position={[0, -3, 4]} intensity={0.3} color="#39ff14" />
          <Scene />
          <fog attach="fog" args={['#050510', 6, 22]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
