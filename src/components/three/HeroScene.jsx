'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
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

  return <pointLight ref={lightRef} position={[0, 0, 4]} intensity={2} color="#00f0ff" distance={12} />;
}

function Particles({ count = 200 }) {
  const meshRef = useRef();
  const positions = useRef(
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 20)
  ).current;

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00f0ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.1 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-pointer.y * 0.1 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <FloatingObject geometry="torusKnot" position={[-3, 1, -2]} color="#00f0ff" wireframe scale={0.6} speed={0.3} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <FloatingObject geometry="octahedron" position={[3, -0.5, -1]} color="#8b5cf6" wireframe scale={0.8} speed={0.4} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <FloatingObject geometry="icosahedron" position={[0, 2, -3]} color="#ff006e" wireframe={false} scale={0.5} speed={0.5} />
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <FloatingObject geometry="dodecahedron" position={[-2, -1.5, -2]} color="#39ff14" wireframe scale={0.4} speed={0.6} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
        <FloatingObject geometry="torus" position={[2.5, 1.5, -4]} color="#00f0ff" wireframe scale={0.7} speed={0.2} />
      </Float>
      <Particles count={300} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <MouseLight />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-5, -5, 3]} intensity={0.3} color="#ff006e" />
          <Scene />
          <fog attach="fog" args={['#050510', 5, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
