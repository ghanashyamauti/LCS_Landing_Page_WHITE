import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

const R = 2;

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
  { name: "Pune", lat: 18.52, lng: 73.85, color: "#ffb547", hub: true },
  { name: "France", lat: 48.85, lng: 2.35, color: "#7aa8ff" },
  { name: "Spain", lat: 40.42, lng: -3.7, color: "#ff7a7a" },
  { name: "Japan", lat: 35.68, lng: 139.69, color: "#ff8dd6" },
  { name: "Germany", lat: 51.16, lng: 10.45, color: "#ffe27a" },
];

function GlowDot({ position, color }: { position: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.25 * Math.sin(clock.elapsedTime * 2 + position.x);
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Arc({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const dist = from.distanceTo(to);
    mid.normalize().multiplyScalar(R + dist * 0.4);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return curve.getPoints(64);
  }, [from, to]);
  return <Line points={points} color={color} lineWidth={1.2} transparent opacity={0.7} />;
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  const puneVec = useMemo(() => latLngToVec3(18.52, 73.85), []);

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
        <GlowDot key={l.name} position={latLngToVec3(l.lat, l.lng)} color={l.color} />
      ))}
      {LOCATIONS.filter((l) => !l.hub).map((l) => (
        <Arc key={"arc-" + l.name} from={puneVec} to={latLngToVec3(l.lat, l.lng)} color={l.color} />
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
        className="aspect-square w-full max-w-[560px] mx-auto rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, var(--brand-1), transparent 70%)" }}
      />
    );
  }
  return (
    <div className="aspect-square w-full max-w-[560px] mx-auto">
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
