"use client";

import { animate } from "animejs";
import { ArrowUpRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CanvasClient } from "@/components/canvas/CanvasClient";
import { track } from "@/lib/analytics";
import { products } from "@/lib/products";

const featuredProducts = products.slice(0, 4);

export function ProductPreviewGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const closeCard = useCallback(() => {
    if (!openSlug || !rootRef.current) return;
    const panel = rootRef.current.querySelector<HTMLElement>(`[data-preview-panel="${openSlug}"]`);

    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpenSlug(null);
      return;
    }

    animate(panel, {
      opacity: 0,
      y: 22,
      scale: 0.97,
      duration: 220,
      ease: "inQuad",
      onComplete: () => setOpenSlug(null),
    });
  }, [openSlug]);

  useEffect(() => {
    if (!openSlug || !rootRef.current) return;
    const panel = rootRef.current.querySelector<HTMLElement>(`[data-preview-panel="${openSlug}"]`);
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const entrance = animate(panel, {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.95, 1],
      duration: 520,
      ease: "outExpo",
    });

    return () => {
      entrance.cancel();
    };
  }, [openSlug]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openSlug) closeCard();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeCard, openSlug]);

  const toggleCard = (slug: string) => {
    if (openSlug === slug) {
      closeCard();
      return;
    }

    setOpenSlug(slug);
    track("product_preview_open", { product: slug });
  };

  return (
    <div className="product-marquee" ref={rootRef}>
      {featuredProducts.map((product, index) => {
        const isOpen = openSlug === product.slug;
        const panelId = `preview-panel-${product.slug}`;

        return (
          <article className={`preview-card ${isOpen ? "is-open" : ""}`} key={product.slug}>
            <span className="preview-card__number">{String(index + 1).padStart(2, "0")}</span>
            <div className="preview-card__model">
              <CanvasClient product={product} interactive={false} lowMotion />
            </div>
            <div className="preview-card__title">
              <p>{product.category}</p>
              <h3>{product.shortName}</h3>
            </div>

            <button
              className="preview-card__open"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={`${isOpen ? "Fechar detalhes de" : "Conhecer"} ${product.name}`}
              onClick={() => toggleCard(product.slug)}
            >
              <span className="preview-card__action" aria-hidden="true">
                {isOpen ? "Fechar" : "Conhecer"}
                <Plus />
              </span>
            </button>

            {isOpen && (
              <div className="preview-popover" id={panelId} data-preview-panel={product.slug} role="region" aria-label={`Detalhes de ${product.name}`}>
                <button className="preview-popover__close" type="button" onClick={closeCard} aria-label={`Fechar detalhes de ${product.name}`}>
                  <X />
                </button>
                <span className="preview-popover__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="preview-popover__category">{product.category}</p>
                <h4>{product.name}</h4>
                <p className="preview-popover__description">{product.description}</p>
                <ul aria-label="Características">
                  {product.detail.split("•").map((item) => <li key={item}>{item.trim()}</li>)}
                </ul>
                <Link href="/catalogo" className="preview-popover__link">
                  Ver no catálogo <ArrowUpRight />
                </Link>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
