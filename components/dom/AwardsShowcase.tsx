"use client";

import { animate, stagger } from "animejs";
import Image from "next/image";
import { useEffect, useRef } from "react";

const awards = [
  { tone: "gold", medal: "Ouro", year: "2025", note: "VIII Prêmio Queijo Brasil" },
  { tone: "silver", medal: "Prata", year: "2025", note: "VIII Prêmio Queijo Brasil" },
  { tone: "silver", medal: "Prata", year: "2025", note: "VIII Prêmio Queijo Brasil" },
];

export function AwardsShowcase({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const showcase = root.current;
    const medals = showcase.querySelectorAll(".award-medal-float");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let entrance: ReturnType<typeof animate> | undefined;
    let floating: ReturnType<typeof animate> | undefined;
    let isInView = false;
    let started = false;

    const stopAnimations = () => {
      entrance?.cancel();
      floating?.cancel();
      entrance = undefined;
      floating = undefined;
    };

    const showStatic = () => {
      medals.forEach((medal) => {
        const element = medal as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    };

    const startAnimations = () => {
      if (!isInView || motionQuery.matches || started) return;
      started = true;

      entrance = animate(medals, {
        opacity: [0, 1],
        y: [36, 0],
        scale: [0.88, 1],
        delay: stagger(110, { from: "center" }),
        duration: 760,
        ease: "outExpo",
        onComplete: () => {
          if (!isInView || motionQuery.matches) return;
          floating = animate(medals, {
            y: [0, -6],
            rotate: (_, index) => ((index ?? 0) - 1) * 0.8,
            delay: stagger(180),
            duration: 2600,
            ease: "inOutSine",
            alternate: true,
            loop: true,
          });
        },
      });
    };

    const handleMotionPreference = () => {
      stopAnimations();
      started = false;
      if (motionQuery.matches) showStatic();
      else startAnimations();
    };

    const observer = new IntersectionObserver((entries) => {
      isInView = Boolean(entries[0]?.isIntersecting);
      if (!isInView) {
        stopAnimations();
        started = false;
        return;
      }
      startAnimations();
    }, { threshold: 0.32 });

    if (motionQuery.matches) showStatic();
    observer.observe(showcase);
    motionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreference);
      stopAnimations();
    };
  }, []);

  return (
    <div className={`awards-showcase ${compact ? "awards-showcase--compact" : ""}`} ref={root}>
      <div className="award-medals">
        {awards.map((award, index) => (
          <div className="award-medal-float" key={`${award.medal}-${index}`}>
            <article className={`award-medal award-medal--${award.tone}`} aria-label={`${award.medal}, ${award.note}, ${award.year}`}>
              <span className="award-medal__rim" />
              <span className="award-medal__flower" aria-hidden="true">✤</span>
              <small>{award.note}</small>
              <strong>{award.medal}</strong>
              <b>{award.year}</b>
            </article>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="award-reference" data-reveal>
          <Image src="/brand/catalogo-premiacoes-reference.png" alt="Catálogo Agrofort com as medalhas Ouro e Prata de 2025" width={644} height={847} sizes="(max-width: 700px) 82vw, 320px" />
          <span>Referência do catálogo oficial</span>
        </div>
      )}
    </div>
  );
}
