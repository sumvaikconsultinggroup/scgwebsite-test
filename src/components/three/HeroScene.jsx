'use client';
import { Suspense, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Float, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ================================================================
   CUSTOM HOLOGRAPHIC SHADER — Iridescent crystal material
   ================================================================ */
const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color('#00f0ff'),
    uColor2: new THREE.Color('#8b5cf6'),
    uColor3: new THREE.Color('#ff006e'),
  },
  // vertex
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;

      // Morph vertices with organic noise
      float displacement = sin(position.x * 3.0 + uTime * 0.8) *
                           cos(position.y * 4.0 + uTime * 0.6) *
                           sin(position.z * 2.0 + uTime * 1.0) * 0.15;
      vec3 newPosition = position + normal * displacement;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // fragment
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    void main() {
      // Fresnel effect for edge glow
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);

      // Iridescent color shifting
      float t = sin(vNormal.x * 2.0 + vNormal.y * 3.0 + uTime * 0.5) * 0.5 + 0.5;
      float t2 = cos(vNormal.z * 2.5 + uTime * 0.7) * 0.5 + 0.5;

      vec3 color = mix(uColor1, uColor2, t);
      color = mix(color, uColor3, t2 * 0.5);

      // Add fresnel glow
      color += fresnel * uColor1 * 1.5;

      // Holographic scanlines
      float scanline = sin(vPosition.y * 40.0 + uTime * 3.0) * 0.5 + 0.5;
      color += scanline * 0.08;

      // Mouse reactivity
      float mouseInfluence = smoothstep(2.0, 0.0, length(uMouse));
      color *= 1.0 + mouseInfluence * 0.3;

      float alpha = 0.6 + fresnel * 0.4;
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ HolographicMaterial });

/* ================================================================
   PORTAL RING SHADER — Spinning energy vortex
   ================================================================ */
const PortalRingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#00f0ff'),
    uSpeed: 1.0,
  },
  `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uSpeed;

    void main() {
      float angle = atan(vPos.y, vPos.x);
      float dist = length(vPos.xy);

      // Rotating energy pattern
      float pattern = sin(angle * 8.0 - uTime * uSpeed * 3.0) * 0.5 + 0.5;
      pattern *= sin(angle * 12.0 + uTime * uSpeed * 2.0) * 0.5 + 0.5;

      // Pulse
      float pulse = sin(uTime * uSpeed * 2.0) * 0.3 + 0.7;

      vec3 color = uColor * pattern * pulse * 1.5;
      float alpha = pattern * 0.3 * pulse;

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ PortalRingMaterial });

/* ================================================================
   CENTRAL MORPHING CRYSTAL — The hero centerpiece
   ================================================================ */
function MorphingCrystal() {
  const meshRef = useRef();
  const materialRef = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uTime = t;
      materialRef.current.uMouse.set(pointer.x, pointer.y);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      meshRef.current.rotation.z = Math.cos(t * 0.08) * 0.1;
      // Breathing scale
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 6]} />
      <holographicMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ================================================================
   WIREFRAME SHELL — Outer geometric cage
   ================================================================ */
function WireframeShell() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = -t * 0.08;
      meshRef.current.rotation.x = t * 0.05;
      meshRef.current.rotation.z = Math.sin(t * 0.12) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial
        wireframe
        color="#00f0ff"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ================================================================
   VORTEX PORTAL RINGS — Spinning dimensional gates
   ================================================================ */
function VortexRing({ radius = 3, color = '#00f0ff', speed = 1, tiltX = 0, tiltZ = 0, yOffset = 0 }) {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (matRef.current) matRef.current.uTime = t;
    if (meshRef.current) {
      meshRef.current.rotation.x = tiltX + Math.sin(t * speed * 0.3) * 0.1;
      meshRef.current.rotation.z = tiltZ + Math.cos(t * speed * 0.2) * 0.05;
      meshRef.current.rotation.y = t * speed * 0.2;
      meshRef.current.position.y = yOffset + Math.sin(t * speed * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <portalRingMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uColor={new THREE.Color(color)}
        uSpeed={speed}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ================================================================
   DNA HELIX DATA STREAMS — Orbiting double helix
   ================================================================ */
function DataHelix({ count = 120 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const pos = new Float32Array(count * 2 * 3); // 2 strands
    const col = new Float32Array(count * 2 * 3);
    const linePos = new Float32Array(count * 6); // connecting lines
    const lineCol = new Float32Array(count * 6);

    const c1 = new THREE.Color('#00f0ff');
    const c2 = new THREE.Color('#8b5cf6');
    const c3 = new THREE.Color('#ff006e');

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6; // 3 full twists
      const y = (i / count - 0.5) * 8;
      const r = 3.5;

      // Strand 1
      pos[i * 6] = Math.cos(t) * r;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = Math.sin(t) * r;

      // Strand 2 (offset by PI)
      pos[i * 6 + 3] = Math.cos(t + Math.PI) * r;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = Math.sin(t + Math.PI) * r;

      // Colors
      const lerpT = i / count;
      const mixed = c1.clone().lerp(c2, lerpT);
      col[i * 6] = mixed.r;
      col[i * 6 + 1] = mixed.g;
      col[i * 6 + 2] = mixed.b;

      const mixed2 = c2.clone().lerp(c3, lerpT);
      col[i * 6 + 3] = mixed2.r;
      col[i * 6 + 4] = mixed2.g;
      col[i * 6 + 5] = mixed2.b;

      // Connecting rungs (every 4th node)
      if (i % 4 === 0) {
        const idx = (i / 4) * 6;
        if (idx + 5 < linePos.length) {
          linePos[idx] = pos[i * 6];
          linePos[idx + 1] = pos[i * 6 + 1];
          linePos[idx + 2] = pos[i * 6 + 2];
          linePos[idx + 3] = pos[i * 6 + 3];
          linePos[idx + 4] = pos[i * 6 + 4];
          linePos[idx + 5] = pos[i * 6 + 5];

          lineCol[idx] = mixed.r;
          lineCol[idx + 1] = mixed.g;
          lineCol[idx + 2] = mixed.b;
          lineCol[idx + 3] = mixed2.r;
          lineCol[idx + 4] = mixed2.g;
          lineCol[idx + 5] = mixed2.b;
        }
      }
    }

    return { positions: pos, colors: col, linePositions: linePos, lineColors: lineCol };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.12;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count * 2} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count * 2} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ================================================================
   GRAVITATIONAL PARTICLE GALAXY
   ================================================================ */
function ParticleGalaxy({ count = 2000 }) {
  const pointsRef = useRef();

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ff006e'),
      new THREE.Color('#39ff14'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      // Galaxy spiral distribution
      const arm = Math.floor(Math.random() * 3); // 3 spiral arms
      const armAngle = (arm / 3) * Math.PI * 2;
      const dist = Math.pow(Math.random(), 0.5) * 12;
      const angle = armAngle + dist * 0.4 + (Math.random() - 0.5) * 0.8;

      pos[i * 3] = Math.cos(angle) * dist;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * Math.exp(-dist * 0.15);
      pos[i * 3 + 2] = Math.sin(angle) * dist;

      // Velocity for orbital motion
      vel[i * 3] = -Math.sin(angle) * 0.02;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = Math.cos(angle) * 0.02;

      // Color based on distance from center
      const colorIdx = dist < 2 ? 0 : dist < 5 ? 1 : dist < 8 ? 2 : Math.random() > 0.5 ? 3 : 4;
      const color = palette[colorIdx];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    const posAttr = pointsRef.current.geometry.getAttribute('position');
    for (let i = 0; i < count; i++) {
      const x = posAttr.array[i * 3];
      const z = posAttr.array[i * 3 + 2];
      const dist = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      // Orbital speed inversely proportional to distance
      const orbitalSpeed = 0.03 / Math.max(dist, 0.5);
      const newAngle = angle + orbitalSpeed;

      posAttr.array[i * 3] = Math.cos(newAngle) * dist;
      posAttr.array[i * 3 + 2] = Math.sin(newAngle) * dist;
      posAttr.array[i * 3 + 1] += Math.sin(t + i * 0.01) * 0.001;
    }
    posAttr.needsUpdate = true;

    pointsRef.current.rotation.x = Math.PI * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ================================================================
   LIGHT BEAMS — Volumetric god rays from center
   ================================================================ */
function LightBeams({ count = 6 }) {
  const groupRef = useRef();

  const beams = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      length: 4 + Math.random() * 3,
      color: ['#00f0ff', '#8b5cf6', '#ff006e'][i % 3],
      speed: 0.5 + Math.random() * 0.5,
      width: 0.02 + Math.random() * 0.03,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(beam.angle) * beam.length * 0.5,
            Math.sin(beam.angle) * beam.length * 0.5,
            -0.5,
          ]}
          rotation={[0, 0, beam.angle]}
        >
          <planeGeometry args={[beam.length, beam.width]} />
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ================================================================
   FLOATING GLYPHS — Orbiting holographic symbols
   ================================================================ */
function FloatingGlyph({ geometry, position, color, speed, scale = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * speed;
      meshRef.current.rotation.y = t * speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(t * speed * 2) * 0.3;
    }
  });

  const GeometryComponent = {
    octahedron: <octahedronGeometry args={[scale, 0]} />,
    tetrahedron: <tetrahedronGeometry args={[scale, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[scale, 0]} />,
    icosahedron: <icosahedronGeometry args={[scale, 0]} />,
    torusKnot: <torusKnotGeometry args={[scale * 0.6, scale * 0.2, 64, 8]} />,
  }[geometry] || <octahedronGeometry args={[scale, 0]} />;

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {GeometryComponent}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

/* ================================================================
   MOUSE-REACTIVE LIGHT
   ================================================================ */
function MouseLight() {
  const lightRef = useRef();
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2;
      lightRef.current.position.y = (pointer.y * viewport.height) / 2;
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={4} color="#00f0ff" distance={20} />;
}

/* ================================================================
   MAIN SCENE COMPOSITION
   ================================================================ */
function Scene() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.12 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-pointer.y * 0.08 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central morphing crystal */}
      <MorphingCrystal />

      {/* Outer wireframe cage */}
      <WireframeShell />

      {/* Vortex portal rings */}
      <VortexRing radius={3.2} color="#00f0ff" speed={1.2} tiltX={Math.PI / 2.5} tiltZ={0.2} />
      <VortexRing radius={4.0} color="#8b5cf6" speed={0.8} tiltX={Math.PI / 3} tiltZ={-0.3} yOffset={0.3} />
      <VortexRing radius={5.0} color="#ff006e" speed={0.6} tiltX={Math.PI / 2.8} tiltZ={0.15} yOffset={-0.2} />
      <VortexRing radius={6.2} color="#39ff14" speed={0.4} tiltX={Math.PI / 4} tiltZ={-0.1} yOffset={0.5} />

      {/* DNA data helix */}
      <DataHelix count={120} />

      {/* Particle galaxy */}
      <ParticleGalaxy count={1500} />

      {/* Light beams from center */}
      <LightBeams count={8} />

      {/* Floating orbital glyphs */}
      <FloatingGlyph geometry="octahedron" position={[-4.5, 2, -3]} color="#00f0ff" speed={0.4} scale={0.35} />
      <FloatingGlyph geometry="tetrahedron" position={[4, -1.5, -2]} color="#8b5cf6" speed={0.5} scale={0.4} />
      <FloatingGlyph geometry="dodecahedron" position={[-3, -2.5, -4]} color="#ff006e" speed={0.35} scale={0.3} />
      <FloatingGlyph geometry="torusKnot" position={[5, 1, -5]} color="#39ff14" speed={0.3} scale={0.35} />
      <FloatingGlyph geometry="icosahedron" position={[0, 3.5, -3]} color="#00f0ff" speed={0.45} scale={0.25} />
      <FloatingGlyph geometry="tetrahedron" position={[-5.5, 0, -4]} color="#8b5cf6" speed={0.55} scale={0.2} />
    </group>
  );
}

/* ================================================================
   EXPORTED CANVAS
   ================================================================ */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.08} />
          <MouseLight />
          <pointLight position={[6, 4, 6]} intensity={1.2} color="#8b5cf6" />
          <pointLight position={[-6, -4, 4]} intensity={0.8} color="#ff006e" />
          <pointLight position={[0, -5, 5]} intensity={0.4} color="#39ff14" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" distance={8} />
          <Scene />
          <fog attach="fog" args={['#050510', 8, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
