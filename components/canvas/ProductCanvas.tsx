"use client";

import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { Product } from "@/lib/products";
import { ProductSculpture } from "./ProductSculpture";

export default function ProductCanvas({ product, lowMotion = false, interactive = true }: { product: Product; lowMotion?: boolean; interactive?: boolean }) {
  return (
    <Canvas
      dpr={lowMotion ? 1 : [1, 1.5]}
      camera={{ position: [0, 0.4, 6.2], fov: 38 }}
      gl={{ antialias: !lowMotion, alpha: true, powerPreference: "high-performance" }}
      frameloop={lowMotion ? "demand" : "always"}
      shadows={!lowMotion}
    >
      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#fff0c8", "#163a29", 1.3]} />
      <directionalLight castShadow position={[3, 5, 4]} intensity={3.2} color="#fff0c8" />
      <directionalLight position={[-4, 2, 1]} intensity={1.6} color="#5d8d68" />
      <Suspense fallback={null}>
        <Float speed={lowMotion ? 0 : 1.1} rotationIntensity={lowMotion ? 0 : 0.12} floatIntensity={lowMotion ? 0 : 0.28}>
          <ProductSculpture product={product} lowMotion={lowMotion} />
        </Float>
        {!lowMotion && <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={8} blur={2.6} far={4.5} color="#11291e" />}
      </Suspense>
      {interactive && <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.7} maxPolarAngle={Math.PI / 1.7} />}
    </Canvas>
  );
}
