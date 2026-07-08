import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text } from "@react-three/drei";
import * as THREE from "three";

/* Floating 3D language glyphs with randomized positions, speeds, and depths */
const GLYPHS: {
  char: string;
  pos: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  floatIntensity: number;
  rotationIntensity: number;
}[] = [
    { char: "é", pos: [-3.5, 1.8, -1.0], scale: 1.6, color: "#f2be5d", speed: 1.2, floatIntensity: 1.5, rotationIntensity: 0.8 },
    { char: "ñ", pos: [2.5, 2.0, -2.5], scale: 1.4, color: "#bf75ff", speed: 1.8, floatIntensity: 1.2, rotationIntensity: 1.4 },
    { char: "語", pos: [-1.8, -2.2, -0.8], scale: 1.8, color: "#ee664d", speed: 0.9, floatIntensity: 1.9, rotationIntensity: 0.5 },
    { char: "ü", pos: [3.2, -2.0, -1.8], scale: 1.5, color: "#bf75ff", speed: 2.1, floatIntensity: 1.6, rotationIntensity: 1.7 },
    { char: "&", pos: [-0.8, 2.6, -2.2], scale: 1.3, color: "#f2be5d", speed: 1.5, floatIntensity: 1.4, rotationIntensity: 1.1 },
    { char: "¡", pos: [-3.8, -0.4, -2.0], scale: 1.2, color: "#ee664d", speed: 2.5, floatIntensity: 1.1, rotationIntensity: 2.0 },
    { char: "の", pos: [1.8, 0.4, -1.2], scale: 1.5, color: "#f2be5d", speed: 1.3, floatIntensity: 1.7, rotationIntensity: 0.9 },
    { char: "A", pos: [0.8, -1.4, -2.8], scale: 1.4, color: "#bf75ff", speed: 1.6, floatIntensity: 1.5, rotationIntensity: 1.2 },
    { char: "あ", pos: [-1.2, 0.8, -1.5], scale: 1.6, color: "#ee664d", speed: 1.1, floatIntensity: 1.3, rotationIntensity: 0.7 },
  ];

function Glyph({
  char,
  pos,
  scale,
  color,
  speed,
  floatIntensity,
  rotationIntensity,
}: (typeof GLYPHS)[number]) {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <Text
        position={pos}
        fontSize={scale}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        outlineWidth={0.006}
        outlineColor="#fbfaf7"
      >
        {char}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.16}
          metalness={0.1}
          roughness={0.9}
        />
      </Text>
    </Float>
  );
}

function Particles({ count = 500 }: { count?: number }) {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      a[i * 3 + 0] = r * Math.sin(p) * Math.cos(t);
      a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      a[i * 3 + 2] = r * Math.cos(p) - 3;
    }
    return a;
  }, [count]);
  const ref = useRef<THREE.Points>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f4c26a"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ParallaxCam() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#fbfaf7", 6, 15]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#e28743" />
      <pointLight position={[-6, -3, 2]} intensity={1.5} color="#c084fc" />
      <pointLight position={[4, -4, 3]} intensity={1.2} color="#f26b6b" />

      <Suspense fallback={null}>
        <Particles />
        {GLYPHS.map((g, i) => (
          <Glyph key={i} {...g} />
        ))}
        <Sparkles count={40} scale={[8, 5, 4]} size={2.0} speed={0.3} color="#ffd08a" />
      </Suspense>

      <ParallaxCam />
    </Canvas>
  );
}
