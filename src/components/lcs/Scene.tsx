import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* Floating 3D language glyphs, in a golden-metallic material */
const GLYPHS: { char: string; pos: [number, number, number]; scale: number; color: string }[] = [
  { char: "é", pos: [-3.2, 1.6, -1.5], scale: 1.7, color: "#f4c26a" },
  { char: "ñ", pos: [3.4, 1.2, -2.0], scale: 1.6, color: "#e78a4a" },
  { char: "語", pos: [-2.6, -1.9, -1.2], scale: 1.9, color: "#7ee3c5" },
  { char: "ü", pos: [2.9, -1.6, -1.6], scale: 1.7, color: "#8db9ff" },
  { char: "&", pos: [0.0, 2.4, -2.4], scale: 1.4, color: "#ffb547" },
  { char: "¡", pos: [-4.1, -0.2, -2.6], scale: 1.2, color: "#f6a4c3" },
  { char: "の", pos: [4.0, -0.4, -2.3], scale: 1.3, color: "#a7f3d0" },
];

function Glyph({ char, pos, scale, color }: (typeof GLYPHS)[number]) {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.6}>
      <Text
        position={pos}
        fontSize={scale}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        outlineWidth={0.006}
        outlineColor="#0b0f1a"
      >
        {char}
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.18}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </Text>
    </Float>
  );
}

function Orb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
      ref.current.rotation.x += dt * 0.05;
    }
  });
  return (
    <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0, -1]}>
        <icosahedronGeometry args={[1.55, 12]} />
        <MeshDistortMaterial
          color="#1a2440"
          metalness={0.95}
          roughness={0.15}
          distort={0.42}
          speed={1.4}
          emissive="#2b1a5c"
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

function InnerCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= dt * 0.3;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <icosahedronGeometry args={[0.85, 2]} />
      <meshBasicMaterial color="#f4c26a" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function Particles({ count = 900 }: { count?: number }) {
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
    if (ref.current) ref.current.rotation.y += dt * 0.03;
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
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ParallaxCam() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#050814"]} />
      <fog attach="fog" args={["#050814", 5, 18]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#ffd08a" />
      <pointLight position={[-6, -3, 2]} intensity={2.2} color="#6b8dff" />
      <pointLight position={[4, -4, 3]} intensity={1.6} color="#f26b6b" />

      <Suspense fallback={null}>
        <Stars radius={40} depth={30} count={2400} factor={3} fade speed={0.6} />
        <Particles />
        <Orb />
        <InnerCore />
        {GLYPHS.map((g, i) => (
          <Glyph key={i} {...g} />
        ))}
        <Sparkles count={80} scale={[8, 5, 4]} size={2.4} speed={0.4} color="#ffd08a" />
        <Environment preset="night" />
      </Suspense>

      <ParallaxCam />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.4} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0012)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
