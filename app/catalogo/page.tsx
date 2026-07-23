import type { Metadata } from "next";
import Image from "next/image";
import { CatalogExperience } from "@/components/dom/CatalogExperience";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";
import { PageIntro } from "@/components/dom/PageIntro";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explore os queijos, pães de queijo e biscoitos artesanais Agrofort em uma vitrine interativa.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogPage() {
  return (
    <>
      <Header light />
      <main id="main-content" tabIndex={-1}>
        <PageIntro
          eyebrow="Vitrine interativa"
          title="Gire, aproxime, descubra."
          copy="Cada produto guarda uma textura, um tempo e um jeito de fazer. Escolha uma peça e explore seu perfil."
        />
        <section className="catalog-photo-proof" data-product-photos>
          <div className="shell catalog-photo-proof__grid">
            <div className="catalog-photo-proof__copy">
              <p className="eyebrow" data-product-copy>Do real para o digital</p>
              <h2 data-product-copy>Antes de girar, veja de perto.</h2>
              <p data-product-copy>
                A experiência 3D ajuda a descobrir cada perfil. Aqui estão algumas das peças reais que inspiram essa vitrine — produzidas, embaladas e apresentadas pela Agrofort.
              </p>
              <dl data-product-copy>
                <div><dt>30</dt><dd>dias de maturação</dd></div>
                <div><dt>60</dt><dd>dias de maturação</dd></div>
                <div><dt>01</dt><dd>origem: Januária</dd></div>
              </dl>
            </div>

            <div className="catalog-photo-proof__gallery">
              <figure className="catalog-photo-proof__portrait" data-product-photo>
                <Image
                  src="/images/products-real/chico-flor-maturados.png"
                  alt="Embalagens dos queijos Chico Flor maturados por 30 e 60 dias"
                  fill
                  quality={92}
                  sizes="(max-width: 600px) 82vw, 330px"
                />
                <figcaption><span>Chico Flor</span><strong>O tempo revela o sabor.</strong></figcaption>
              </figure>
              <figure className="catalog-photo-proof__wide" data-product-photo>
                <Image
                  src="/images/products-real/selecao-queijos-maturados.png"
                  alt="Seleção real de queijos artesanais Agrofort em uma peça de madeira"
                  fill
                  quality={92}
                  sizes="(max-width: 820px) 82vw, 540px"
                />
                <figcaption><span>Seleção Agrofort</span><strong>Queijos artesanais de Januária.</strong></figcaption>
              </figure>
            </div>
          </div>
        </section>
        <CatalogExperience />
        <section className="catalog-note">
          <div className="shell">
            <p>Disponibilidade e formatos podem variar conforme o lote.</p>
            <span>Consulte a fazenda antes de fazer seu pedido.</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
