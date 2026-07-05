"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { MeshPhysicalMaterial, MeshStandardMaterial, type Group, type Mesh } from "three";

function FunkoPlaceholder({ accentColor }: { accentColor: string }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshStandardMaterial color="#f8f8f6" roughness={0.35} />
      </mesh>
      <mesh position={[-0.32, 1.05, 0.82]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.1} />
      </mesh>
      <mesh position={[0.32, 1.05, 0.82]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.55, 0.5, 8, 24]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.06, 32]} />
        <meshStandardMaterial color="#e5e5e5" roughness={0.5} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function FunkoModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<Group>(null);

  useEffect(() => {
    scene.traverse((node) => {
      const mesh = node as Mesh;
      if (!mesh.isMesh) return;
      const source = mesh.material as MeshStandardMaterial;
      if (!source || source instanceof MeshPhysicalMaterial) return;
      mesh.material = new MeshPhysicalMaterial({
        map: source.map,
        normalMap: source.normalMap,
        roughnessMap: source.roughnessMap,
        metalnessMap: source.metalnessMap,
        color: source.color,
        roughness: Math.min(source.roughness, 0.45),
        metalness: 0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      });
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export function FunkoViewer3D({
  accentColor,
  modelUrl,
}: {
  accentColor: string;
  modelUrl?: string;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#0d0c0a]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accentColor}2e, transparent 65%)`,
        }}
      />
      <Canvas camera={{ position: [0, 0.5, 6], fov: 30 }} shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 2]} intensity={1.5} castShadow />
          <hemisphereLight args={["#ffffff", "#1a1a1a", 0.3]} />
          <Environment preset="apartment" environmentIntensity={0.6} />
          <Bounds fit clip observe margin={1.3}>
            {modelUrl ? (
              <FunkoModel url={modelUrl} />
            ) : (
              <FunkoPlaceholder accentColor={accentColor} />
            )}
          </Bounds>
          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.4}
            scale={4}
            blur={2.4}
          />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} minDistance={1} maxDistance={20} />
      </Canvas>
      {!modelUrl && (
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-[#c9a25c]/25 bg-[#141210]/90 px-3 py-1 text-xs text-[#e8e3d8]/70">
          Vista 3D preliminar (placeholder)
        </div>
      )}
    </div>
  );
}
