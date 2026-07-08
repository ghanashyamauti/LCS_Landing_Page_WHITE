import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const R = 1.95; // Globe radius

function latLngToVec3(lat: number, lng: number, radius = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const LOCATIONS = [
  { name: "Pune", lat: 18.52, lng: 73.85, color: "#ffb547", code: "in", hub: true },
  { name: "France", lat: 48.85, lng: 2.35, color: "#7aa8ff", code: "fr" },
  { name: "Spain", lat: 40.42, lng: -3.7, color: "#ff7a7a", code: "es" },
  { name: "Japan", lat: 35.68, lng: 139.69, color: "#ff8dd6", code: "jp" },
  { name: "Germany", lat: 51.16, lng: 10.45, color: "#ffe27a", code: "de" },
];

function GlobeLocation({
  position,
  color,
  code,
}: {
  position: THREE.Vector3;
  color: string;
  code: string;
  name: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  
  // Load flag texture inside WebGL context
  const texture = useLoader(THREE.TextureLoader, `https://flagcdn.com/w40/${code}.png`);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.25 * Math.sin(clock.elapsedTime * 2 + position.x);
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position}>
      {/* Base glowing core dot */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>

      {/* 3D WebGL Sprite Flag (faces camera automatically, rotates with globe in 3D space) */}
      <sprite scale={[0.42, 0.28, 1]} position={[0, 0.22, 0]}>
        <spriteMaterial map={texture} depthWrite={false} depthTest={true} />
      </sprite>
    </group>
  );
}

export function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe globe */}
      <Sphere args={[R, 48, 48]}>
        <meshBasicMaterial color="#b59073" wireframe transparent opacity={0.3} />
      </Sphere>
      {/* Inner subtle sphere */}
      <Sphere args={[R * 0.995, 48, 48]}>
        <meshBasicMaterial color="#f4ecdc" transparent opacity={0.9} />
      </Sphere>
      {LOCATIONS.map((l) => (
        <GlobeLocation
          key={l.name}
          position={latLngToVec3(l.lat, l.lng)}
          color={l.color}
          code={l.code}
          name={l.name}
        />
      ))}
    </group>
  );
}

export default function Globe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div
        className="aspect-square w-full max-w-[620px] mx-auto rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, var(--brand-1), transparent 70%)" }}
      />
    );
  }
  return (
    <div className="relative aspect-square w-full max-w-[620px] mx-auto">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c76a4a" />
        <pointLight position={[-5, -3, -3]} intensity={0.8} color="#7a9a6a" />
        <Suspense fallback={null}>
          <GlobeMesh />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
