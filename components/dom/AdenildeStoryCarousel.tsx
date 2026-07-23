"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import gsap from "gsap";

const AUTOPLAY_DELAY = 5200;

const moments = [
  {
    src: "/images/adenilde/reconhecimento-e-conexoes.png",
    alt: "Adenilde ao lado de um parceiro, apresentando uma caixa com queijos premiados da Agrofort",
    chapter: "Conexões",
    title: "Reconhecimento que se compartilha",
    position: "50% 42%",
  },
  {
    src: "/images/adenilde/equipe-de-producao.png",
    alt: "Adenilde reunida com três integrantes da equipe de produção da Agrofort",
    chapter: "Pessoas",
    title: "Quem faz acontecer todos os dias",
    position: "50% 34%",
  },
  {
    src: "/images/adenilde/parcerias-no-varejo.png",
    alt: "Adenilde reunida com uma equipe parceira em um ponto de venda",
    chapter: "Parcerias",
    title: "Presença perto de quem escolhe qualidade",
    position: "50% 35%",
  },
  {
    src: "/images/adenilde/agrofort-presente.png",
    alt: "Adenilde e parceiros em uma apresentação pública dos produtos Agrofort",
    chapter: "Território",
    title: "Uma marca feita para encontrar pessoas",
    position: "50% 50%",
  },
  {
    src: "/images/adenilde/origem-no-campo.png",
    alt: "Adenilde em uma lavoura, acompanhando de perto a produção no campo",
    chapter: "Origem",
    title: "Da terra para a mesa, com propósito",
    position: "50% 38%",
  },
  {
    src: "/images/adenilde/conquistas-compartilhadas.png",
    alt: "Adenilde ao lado de um parceiro, segurando medalhas conquistadas pela Agrofort",
    chapter: "Conquistas",
    title: "O trabalho ganha novos caminhos",
    position: "50% 32%",
  },
];

export function AdenildeStoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);

  const showMoment = useCallback((index: number) => {
    setActiveIndex((index + moments.length) % moments.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + moments.length) % moments.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % moments.length);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => {
      if (reducedMotion.matches) setIsPlaying(false);
    };
    const frame = window.requestAnimationFrame(stopForReducedMotion);
    reducedMotion.addEventListener("change", stopForReducedMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", stopForReducedMotion);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovering || !isInView) return;
    const interval = window.setInterval(showNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(interval);
  }, [isHovering, isInView, isPlaying, showNext]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const positionTrack = (immediate = false) => {
      const activeSlide = track.children.item(activeIndex) as HTMLElement | null;
      if (!activeSlide) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const maximumOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const targetOffset = Math.min(activeSlide.offsetLeft, maximumOffset);

      gsap.to(track, {
        x: -targetOffset,
        duration: immediate || reduceMotion ? 0 : 0.72,
        ease: "power4.inOut",
        overwrite: true,
      });

      if (!immediate && !reduceMotion) {
        const image = activeSlide.querySelector(".adenilde-carousel__image");
        const caption = activeSlide.querySelector(".adenilde-carousel__caption");
        gsap.fromTo(image, { scale: 1.055 }, { scale: 1, duration: 0.85, ease: "power3.out", overwrite: true });
        gsap.fromTo(
          caption,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: 0.12, ease: "power3.out", overwrite: true },
        );
      }
    };

    const frame = window.requestAnimationFrame(() => positionTrack(false));
    const handleResize = () => positionTrack(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf(track);
    };
  }, [activeIndex]);

  const finishSwipe = (clientX: number) => {
    if (pointerStart.current === null) return;
    const distance = clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <div
      className="adenilde-carousel"
      ref={rootRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Momentos da trajetória de Adenilde à frente da Agrofort"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocusCapture={() => setIsHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsHovering(false);
      }}
    >
      <div className="adenilde-carousel__header">
        <div>
          <span>Álbum vivo</span>
          <strong>Momentos que contam nossa história</strong>
        </div>
        <span className="adenilde-carousel__counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")}
          <i />
          {String(moments.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className="adenilde-carousel__viewport"
        ref={viewportRef}
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          finishSwipe(event.clientX);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <div className="adenilde-carousel__track" ref={trackRef}>
          {moments.map((moment, index) => (
            <figure
              className={`adenilde-carousel__slide${index === activeIndex ? " is-active" : ""}`}
              aria-hidden={index !== activeIndex}
              key={moment.src}
            >
              <Image
                className="adenilde-carousel__image"
                src={moment.src}
                alt={moment.alt}
                fill
                quality={90}
                sizes="(max-width: 820px) 85vw, (max-width: 1200px) 52vw, 650px"
                draggable={false}
                style={{ objectPosition: moment.position }}
              />
              <figcaption className="adenilde-carousel__caption">
                <span>{moment.chapter}</span>
                <strong>{moment.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="adenilde-carousel__footer">
        <div className="adenilde-carousel__pagination" aria-label="Escolher fotografia">
          {moments.map((moment, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => showMoment(index)}
              aria-label={`Ver momento ${index + 1}: ${moment.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              key={moment.src}
            >
              <span
                key={`${activeIndex}-${isPlaying}-${isInView}`}
                style={{
                  animationDuration: `${AUTOPLAY_DELAY}ms`,
                  animationPlayState: isPlaying && !isHovering && isInView ? "running" : "paused",
                }}
              />
            </button>
          ))}
        </div>

        <div className="adenilde-carousel__controls">
          <button type="button" onClick={() => setIsPlaying((current) => !current)} aria-label={isPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}>
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
          <button type="button" onClick={showPrevious} aria-label="Fotografia anterior">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={showNext} aria-label="Próxima fotografia">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Fotografia {activeIndex + 1} de {moments.length}: {moments[activeIndex].title}.
      </p>
    </div>
  );
}
