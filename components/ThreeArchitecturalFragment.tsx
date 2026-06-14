"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { getAssetPath } from "@/lib/utils";

function ArchModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(getAssetPath("/Meshy_AI_Skybound_Retreat_0614093707_texture.glb"));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3 + 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={[1.8, 1.8, 1.8]} position={[2, -1, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export default function ThreeArchitecturalFragment() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 2, 8], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        {/* Fog */}
        <fog attach="fog" args={["#F5EFE4", 8, 25]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          color="#FFF8EE"
          castShadow
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.4}
          color="#C8A96A"
        />
        <pointLight position={[0, 3, 0]} intensity={0.6} color="#D8C3A5" />

        {/* Model */}
        <ArchModel />

        {/* Environment for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
