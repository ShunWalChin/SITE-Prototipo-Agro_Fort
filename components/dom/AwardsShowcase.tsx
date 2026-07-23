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
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const showcase = root.current;
    const medals = showcase.querySelectorAll(".award-medal-float");
    let entrance: ReturnType<typeof animate> | undefined;
    let floating: ReturnType<typeof animate> | undefined;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting || started) return;
      started = true;
      observer.disconnect();

      entrance = animate(medals, {
        opacity: [0, 1],
        y: [56, 0],
        scale: [0.78, 1],
        delay: stagger(145, { from: "center" }),
        duration: 1050,
        ease: "outExpo",
        onComplete: () => {
          floating = animate(medals, {
            y: [0, -10],
            rotate: (_, index) => ((index ?? 0) - 1) * 1.2,
            delay: stagger(160),
            duration: 2100,
            ease: "inOutSine",
            alternate: true,
            loop: true,
          });
        },
      });
    }, { threshold: 0.32 });

    observer.observe(showcase);

    return () => {
      observer.disconnect();
      entrance?.cancel();
      floating?.cancel();
    };
  }, []);

  return (
    <div className={`awards-showcase ${compact ? "awards-showcase--compact" : ""}`} ref={root}>
      <div className="award-medals">
        {awards.map((award, index) => (
          <div className="award-medal-float" key={`${award.medal}-${index}`}>
            <article className={`award-medal award-medal--${award.tone}`}>
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
