"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      const heroChars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");
      if (heroChars.length) {
        gsap.fromTo(
          heroChars,
          { yPercent: 115, rotate: 3, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 0.85, stagger: 0.022, delay: 0.15, ease: "power4.out" },
        );
      }

      const awardSection = document.querySelector<HTMLElement>("[data-award-section]");
      if (awardSection) {
        const awardTimeline = gsap.timeline({
          scrollTrigger: { trigger: awardSection, start: "top 72%", once: true },
        });

        awardTimeline
          .fromTo(
            awardSection.querySelectorAll("[data-award-line]"),
            { yPercent: 118, rotate: 2, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: "power4.out" },
          )
          .fromTo(
            awardSection.querySelector(".award-band__lede"),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
            "-=0.55",
          )
          .fromTo(
            awardSection.querySelector(".award-band__cta"),
            { x: -18, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
            "-=0.4",
          )
          .fromTo(
            awardSection.querySelector("[data-award-stage]"),
            { x: 58, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.9",
          );

        gsap.fromTo(
          awardSection.querySelectorAll(".award-proof__item"),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: awardSection.querySelector(".award-proof"), start: "top 92%", once: true },
          },
        );
      }

      const adenildeSection = document.querySelector<HTMLElement>("[data-adenilde-section]");
      if (adenildeSection) {
        const adenildeTimeline = gsap.timeline({
          scrollTrigger: { trigger: adenildeSection, start: "top 76%", once: true },
        });

        adenildeTimeline
          .fromTo(
            adenildeSection.querySelectorAll("[data-adenilde-title] > *"),
            { yPercent: 115, rotate: 2.5, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" },
          )
          .fromTo(
            adenildeSection.querySelectorAll("[data-adenilde-copy]"),
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: "power3.out" },
            "-=0.55",
          )
          .fromTo(
            adenildeSection.querySelector("[data-adenilde-carousel]"),
            { x: 70, scale: 0.97, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power4.out" },
            "-=1",
          );
      }

      gsap.utils.toArray<HTMLElement>("[data-product-photos]").forEach((section) => {
        const photoTimeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });

        photoTimeline
          .fromTo(
            section.querySelectorAll("[data-product-copy]"),
            { y: 34, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.78, stagger: 0.09, ease: "power3.out" },
          )
          .fromTo(
            section.querySelectorAll("[data-product-photo]"),
            { clipPath: "inset(0 100% 0 0)", opacity: 0.35 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.05, stagger: 0.13, ease: "power4.inOut" },
            "-=0.56",
          )
          .fromTo(
            section.querySelectorAll("[data-product-photo] img"),
            { scale: 1.12 },
            { scale: 1, duration: 1.35, stagger: 0.1, ease: "power3.out" },
            "-=0.85",
          );
      });

      // Scrubbed parallax is reserved for larger screens; touch devices keep
      // the same composition without paying for animation on every scroll.
      if (window.matchMedia("(min-width: 821px)").matches) {
        gsap.to("[data-parallax]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: "[data-parallax]", start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
