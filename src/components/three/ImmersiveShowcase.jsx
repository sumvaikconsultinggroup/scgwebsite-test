'use client';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Float, shaderMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

/* ================================================================
   WARP TUNNEL SHADER — Infinite tunnel zoom effect
   ================================================================ */
const WarpTunnelMaterial = shaderMaterial(
  { uTime: 0, uSpeed: 1.0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uSpeed;

    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float angle = atan(center.y, center.x);

      // Tunnel effect
      float tunnel = 0.1 / dist;
      float pattern = sin(tunnel * 3.0 - uTime * uSpeed * 2.0 + angle * 4.0) * 0.5 + 0.5;
      pattern *= sin(tunnel * 5.0 + uTime * uSpeed * 1.5 - angle * 6.0) * 0.5 + 0.5;

      // Color gradient
      vec3 cyan = vec3(0.0, 0.94, 1.0);
      vec3 purple = vec3(0.545, 0.361, 0.965);
      vec3 pink = vec3(1.0, 0.0, 0.431);

      vec3 color = mix(cyan, purple, sin(angle * 2.0 + uTime) * 0.5 + 0.5);
      color = mix(color, pink, pattern * 0.3);
      color *= pattern;

      // Fade edges
      float fade = smoothstep(0.0, 0.15, dist) * smoothstep(0.5, 0.35, dist);
      float alpha = pattern * fade * 0.25;

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ WarpTunnelMaterial });

/* ================================================================
   NEURAL NETWORK — Connected nodes visualization
   ================================================================ */
function NeuralNetwork({ nodeCount = 40 }) {
  const groupRef = useRef();
  const nodesRef = useRef();
  const linesRef = useRef();

  const { nodes, connections, nodeColors } = useMemo(() => {
    const n = [];
    const c = [];
    const cols = new Float32Array(nodeCount * 3);
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ff006e'),
    ];

    // Generate nodes in layers
    const layers = 4;
    const nodesPerLayer = Math.floor(nodeCount / layers);

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < nodesPerLayer; i++) {
        const idx = layer * nodesPerLayer + i;
        const x = (layer - layers / 2 + 0.5) * 2.5;
        const y = (i - nodesPerLayer / 2 + 0.5) * 1.2 + (Math.random() - 0.5) * 0.5;
        const z = (Math.random() - 0.5) * 2;

        n.push(new THREE.Vector3(x, y, z));

        const color = palette[layer % 3];
        cols[idx * 3] = color.r;
        cols[idx * 3 + 1] = color.g;
        cols[idx * 3 + 2] = color.b;
      }
    }

    // Connect adjacent layers
    for (let layer = 0; layer < layers - 1; layer++) {
      for (let i = 0; i < nodesPerLayer; i++) {
        const fromIdx = layer * nodesPerLayer + i;
        // Connect to 2-3 nodes in next layer
        const connectCount = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < connectCount; j++) {
          const toIdx = (layer + 1) * nodesPerLayer + Math.floor(Math.random() * nodesPerLayer);
          if (toIdx < n.length) {
            c.push([fromIdx, toIdx]);
          }
        }
      }
    }

    return { nodes: n, connections: c, nodeColors: cols };
  }, [nodeCount]);

  const linePositions = useMemo(() => {
    const pos = new Float32Array(connections.length * 6);
    connections.forEach((conn, i) => {
      const from = nodes[conn[0]];
      const to = nodes[conn[1]];
      pos[i * 6] = from.x;
      pos[i * 6 + 1] = from.y;
      pos[i * 6 + 2] = from.z;
      pos[i * 6 + 3] = to.x;
      pos[i * 6 + 4] = to.y;
      pos[i * 6 + 5] = to.z;
    });
    return pos;
  }, [nodes, connections]);

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;
    });
    return pos;
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.1;
    }

    // Pulse node positions
    if (nodesRef.current) {
      const posAttr = nodesRef.current.geometry.getAttribute('position');
      for (let i = 0; i < nodes.length; i++) {
        posAttr.array[i * 3 + 1] = nodes[i].y + Math.sin(t * 2 + i * 0.5) * 0.08;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodes.length} array={nodePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={nodes.length} array={nodeColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Pulsing signal orbs traveling along connections */}
      {connections.slice(0, 15).map((conn, i) => (
        <SignalOrb key={i} from={nodes[conn[0]]} to={nodes[conn[1]]} speed={0.5 + i * 0.1} delay={i * 0.3} />
      ))}
    </group>
  );
}

function SignalOrb({ from, to, speed = 1, delay = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = ((t * speed + delay) % 2) / 2; // 0 to 1 loop
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(from, to, progress);
      const scale = Math.sin(progress * Math.PI) * 0.8;
      meshRef.current.scale.setScalar(Math.max(0.01, scale));
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ================================================================
   FLOATING DATA CUBES — Holographic data blocks
   ================================================================ */
function DataCube({ position, color = '#00f0ff', size = 0.4, speed = 1 }) {
  const meshRef = useRef();
  const edgesRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * speed * 0.5;
      meshRef.current.rotation.y = t * speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group ref={meshRef} position={position}>
        {/* Solid face with low opacity */}
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Wireframe edges */}
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Inner glow */}
        <pointLight color={color} intensity={0.5} distance={2} />
      </group>
    </Float>
  );
}

/* ================================================================
   SCENE COMPOSITION
   ================================================================ */
function ShowcaseScene() {
  const { pointer } = useThree();
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.1 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-pointer.y * 0.05 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <NeuralNetwork nodeCount={48} />

      {/* Warp tunnel backdrop */}
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[20, 20]} />
        <warpTunnelMaterial transparent depthWrite={false} />
      </mesh>

      {/* Floating data cubes */}
      <DataCube position={[-4, 2, -2]} color="#00f0ff" size={0.5} speed={0.8} />
      <DataCube position={[4.5, -1, -3]} color="#8b5cf6" size={0.4} speed={1.0} />
      <DataCube position={[-3, -2, -1]} color="#ff006e" size={0.35} speed={0.6} />
      <DataCube position={[3, 2.5, -2]} color="#39ff14" size={0.3} speed={1.2} />
      <DataCube position={[0, -3, -4]} color="#00f0ff" size={0.45} speed={0.5} />
    </group>
  );
}

/* ================================================================
   EXPORTED COMPONENT
   ================================================================ */
export default function ImmersiveShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Section heading */}
      <div className="relative z-10 text-center mb-4 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5 backdrop-blur-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          Powered by Intelligence
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          <span className="gradient-text">Neural</span>{' '}
          <span className="stroke-text-thick">Architecture</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto tracking-wide">
          Our AI-driven strategies create interconnected growth networks that amplify your brand across every digital touchpoint.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[70vh] w-full">
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.05} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
              <pointLight position={[-5, -5, 3]} intensity={0.6} color="#ff006e" />
              <pointLight position={[0, 0, 5]} intensity={0.8} color="#00f0ff" distance={15} />
              <ShowcaseScene />
              <fog attach="fog" args={['#050510', 8, 22]} />
            </Suspense>
          </Canvas>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background z-10" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/30 via-transparent to-background/30 z-10" />
      </div>

      {/* Bottom stats */}
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-3 gap-8 px-4 -mt-16">
        {[
          { value: '10x', label: 'Growth Multiplier' },
          { value: '360°', label: 'Brand Coverage' },
          { value: '∞', label: 'Possibilities' },
        ].map((stat, i) => (
          <div key={i} className="text-center glass rounded-2xl p-6 glass-hover">
            <div className={`text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] ${i === 0 ? 'text-cyan' : i === 1 ? 'text-purple' : 'text-pink'}`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
