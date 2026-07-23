"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; radius: number; speed: number; drift: number; alpha: number };

export function ParticleField({ tone = "light" }: { tone?: "light" | "gold" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let frame = 0;
    let isVisible = false;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, width * ratio);
      canvas.height = Math.max(1, height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const mobile = window.matchMedia("(max-width: 600px)").matches;
      const count = mobile ? 16 : Math.min(48, Math.max(18, Math.floor((width * height) / 25000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.5,
        speed: Math.random() * 0.28 + 0.08,
        drift: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.38 + 0.12,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const dot of dots) {
        if (!reduced) {
          dot.y -= dot.speed;
          dot.x += dot.drift;
          if (dot.y < -8) dot.y = height + 8;
          if (dot.x < -8) dot.x = width + 8;
          if (dot.x > width + 8) dot.x = -8;
        }
        context.beginPath();
        context.fillStyle = tone === "gold" ? `rgba(213,166,73,${dot.alpha})` : `rgba(255,247,222,${dot.alpha})`;
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fill();
      }
      if (!reduced && isVisible && document.visibilityState === "visible") {
        frame = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(frame);
      draw();
    };
    const handleVisibility = () => {
      if (isVisible && document.visibilityState === "visible") start();
      else cancelAnimationFrame(frame);
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      handleVisibility();
    };
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        handleVisibility();
      },
      { rootMargin: "100px 0px" },
    );
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionPreference);
    resize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionPreference);
      cancelAnimationFrame(frame);
    };
  }, [tone]);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}
