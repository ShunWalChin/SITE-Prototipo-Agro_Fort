"use client";

import { ArrowLeft, ArrowRight, Hand, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { products } from "@/lib/products";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";
import { useCatalogStore } from "@/store/catalog";
import { CanvasClient } from "@/components/canvas/CanvasClient";
import { FlavorRadar } from "./FlavorRadar";

export function CatalogExperience() {
  const activeProduct = useCatalogStore((state) => state.activeProduct);
  const setActiveProduct = useCatalogStore((state) => state.setActiveProduct);
  const lowMotion = useCatalogStore((state) => state.lowMotion);
  const setLowMotion = useCatalogStore((state) => state.setLowMotion);
  const product = products[activeProduct];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setLowMotion(motionQuery.matches);
    const frame = window.requestAnimationFrame(updateMotionPreference);
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => {
      window.cancelAnimationFrame(frame);
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, [setLowMotion]);

  const select = (index: number) => {
    const normalized = (index + products.length) % products.length;
    setActiveProduct(normalized);
    track("catalog_product_view", { product: products[normalized].slug });
  };

  return (
    <section className="catalog-experience">
      <div className="shell catalog-shell">
        <div className="catalog-stage" role="img" aria-label={`Visualização tridimensional interativa: ${product.name}`}>
          <div className="catalog-orbit" aria-hidden="true" />
          <div className="catalog-canvas">
            <CanvasClient product={product} lowMotion={lowMotion} />
          </div>
          <div className="catalog-stage__hint"><Hand size={16} aria-hidden="true" /> Arraste para explorar</div>
          <span className="catalog-stage__number">{String(activeProduct + 1).padStart(2, "0")}</span>
        </div>

        <div className="catalog-detail" aria-live="polite">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="catalog-description">{product.description}</p>
          <p className="catalog-meta">{product.detail}</p>
          <FlavorRadar product={product} />
          <a
            className="button"
            href={whatsappUrl(`Olá, Agrofort! Gostaria de saber a disponibilidade do ${product.name}.`)}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { placement: "catalog", product: product.slug })}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Pedir pelo WhatsApp
          </a>
          <div className="catalog-controls">
            <button type="button" onClick={() => select(activeProduct - 1)} aria-label="Produto anterior"><ArrowLeft aria-hidden="true" /></button>
            <span>{activeProduct + 1} / {products.length}</span>
            <button type="button" onClick={() => select(activeProduct + 1)} aria-label="Próximo produto"><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div className="shell product-tabs" role="group" aria-label="Escolha um produto">
        {products.map((item, index) => (
          <button
            type="button"
            aria-pressed={activeProduct === index}
            className={activeProduct === index ? "is-active" : ""}
            key={item.slug}
            onClick={() => select(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.shortName}
          </button>
        ))}
      </div>
    </section>
  );
}
