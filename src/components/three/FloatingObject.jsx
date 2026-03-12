'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingObject({ geometry = 'torus', position = [0, 0, 0], color = '#00f0ff', wireframe = false, scale = 1, speed = 1, floatIntensity = 0.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t) * floatIntensity;
  });

  const geometryMap = {
    torus: <torusGeometry args={[1, 0.4, 32, 64]} />,
    torusKnot: <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />,
    icosahedron: <icosahedronGeometry args={[1, 1]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    sphere: <sphereGeometry args={[1, 32, 32]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryMap[geometry] || geometryMap.torus}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        emissive={color}
        emissiveIntensity={wireframe ? 0.5 : 0.1}
        transparent
        opacity={wireframe ? 0.6 : 0.8}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}
