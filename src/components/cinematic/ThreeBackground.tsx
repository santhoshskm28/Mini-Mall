"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const FloatingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          opacity={0.1}
          transparent
        />
      </Sphere>
    </Float>
  );
};

const LightTrails = () => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 20; i++) {
      p.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));
    }
    return p;
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingCore />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <LightTrails />
      </Canvas>
    </div>
  );
};
