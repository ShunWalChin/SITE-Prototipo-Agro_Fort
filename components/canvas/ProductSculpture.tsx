"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils } from "three";
import type { Product } from "@/lib/products";

const breadPositions = [
  [-1.15, 0.22, 0.1],
  [-0.45, 0.42, 0.3],
  [0.32, 0.3, 0.48],
  [1.05, 0.2, 0.12],
  [-0.78, -0.38, 0.52],
  [0.02, -0.34, 0.64],
  [0.82, -0.42, 0.42],
] as const;

function CheeseWheel({ product }: { product: Product }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.72, 1.72, 0.72, 80, 2]} />
        <meshStandardMaterial color={product.color} roughness={0.72} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[1.38, 1.38, 0.02, 80]} />
        <meshStandardMaterial color={product.accent} roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.405, 0]}>
        <torusGeometry args={[0.72, 0.035, 12, 64]} />
        <meshStandardMaterial color="#7d431f" roughness={0.8} />
      </mesh>
      {product.kind === "floral" &&
        Array.from({ length: 20 }).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 1.52, 0.42, Math.sin(angle) * 1.52]} scale={0.65 + (index % 3) * 0.12}>
              <sphereGeometry args={[0.055, 10, 10]} />
              <meshStandardMaterial color="#faf1cf" roughness={1} />
            </mesh>
          );
        })}
    </group>
  );
}

function BreadCluster({ product }: { product: Product }) {
  if (product.kind === "crumb") {
    return (
      <group>
        {Array.from({ length: 42 }).map((_, index) => {
          const ring = Math.floor(index / 12);
          const angle = index * 2.399;
          const radius = 0.2 + ring * 0.36;
          return (
            <mesh key={index} position={[Math.cos(angle) * radius, -0.55 + (index % 5) * 0.1, Math.sin(angle) * radius]} scale={0.55 + (index % 4) * 0.12}>
              <dodecahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color={index % 3 ? product.color : product.accent} roughness={0.9} />
            </mesh>
          );
        })}
      </group>
    );
  }

  return (
    <group>
      {breadPositions.map((position, index) => (
        <mesh key={index} castShadow position={position} scale={[1, 0.8, 1]}>
          {product.kind === "biscuit" ? <torusGeometry args={[0.44, 0.17, 18, 48]} /> : <sphereGeometry args={[0.62, 48, 48]} />}
          <meshStandardMaterial
            attach="material"
            color={index % 3 === 0 ? product.accent : product.color}
            roughness={0.86}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ProductSculpture({ product, lowMotion = false }: { product: Product; lowMotion?: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = lowMotion ? 0.18 : state.pointer.x * 0.3 + state.clock.elapsedTime * 0.08;
    const targetX = lowMotion ? 0 : state.pointer.y * 0.12;
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, Math.min(1, delta * 2.4));
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, targetX, Math.min(1, delta * 2.4));
  });

  return (
    <group ref={group} position={[0, product.kind === "cheese" || product.kind === "floral" ? 0.15 : 0.35, 0]}>
      {product.kind === "cheese" || product.kind === "floral" ? <CheeseWheel product={product} /> : <BreadCluster product={product} />}
    </group>
  );
}
