"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";

const ProductCanvas = dynamic(() => import("./ProductCanvas"), {
  ssr: false,
  loading: () => <div className="canvas-loading"><span /></div>,
});

type CanvasClientProps = {
  product: Product;
  lowMotion?: boolean;
  interactive?: boolean;
  /** Use only for the hero canvas, which is visible during the first render. */
  eager?: boolean;
};

/**
 * Defers WebGL initialization until the scene is close to the viewport. This
 * keeps below-the-fold catalog cards from competing with the hero on mobile.
 */
export function CanvasClient({ eager = false, lowMotion = false, ...props }: CanvasClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(eager);
  const [devicePrefersLowMotion, setDevicePrefersLowMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 600px)");
    const updateMotionPreference = () => setDevicePrefersLowMotion(motionQuery.matches);
    const frame = window.requestAnimationFrame(updateMotionPreference);
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.cancelAnimationFrame(frame);
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (eager || isNearViewport || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "280px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [eager, isNearViewport]);

  return (
    <div className="canvas-client" ref={rootRef}>
      {isNearViewport ? (
        <ProductCanvas {...props} lowMotion={lowMotion || devicePrefersLowMotion} />
      ) : (
        <div className="canvas-loading" aria-hidden="true"><span /></div>
      )}
    </div>
  );
}
