import { ArrowDown, ArrowRight, Award, Instagram, Leaf, Mail, MapPin, Phone, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ParticleField } from "@/components/animations/ParticleField";
import { SplitTitle } from "@/components/animations/SplitTitle";
import { CanvasClient } from "@/components/canvas/CanvasClient";
import { AwardsShowcase } from "@/components/dom/AwardsShowcase";
import { AdenildeStoryCarousel } from "@/components/dom/AdenildeStoryCarousel";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";
import { ProductPreviewGrid } from "@/components/dom/ProductPreviewGrid";
import { products } from "@/lib/products";
import { site, whatsappUrl } from "@/lib/site";

const pillars = [
  { number: "01", icon: Leaf, title: "Origem que se sente", copy: "Produção local, cuidado diário e respeito ao tempo da terra." },
  { number: "02", icon: Sparkles, title: "Feito de verdade", copy: "Pequenos lotes, mãos da família e sabor sem atalhos." },
  { number: "03", icon: Award, title: "Qualidade reconhecida", copy: "Ouro e duas pratas no VIII Prêmio Queijo Brasil 2025." },
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Fazenda Agrofort",
    description: "Produtora de queijos artesanais, biscoitos e pão de queijo em Januária, Minas Gerais.",
    telephone: "+55 38 99940-2015",
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Januária", addressRegion: "MG", addressCountry: "BR" },
    url: site.url,
    sameAs: [site.instagram],
  };

  return (
    <>
      <Header light />
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <ParticleField />
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">
                <MapPin size={14} />
                Fazenda Barra Funda · Januária, MG
              </div>
              <h1>
                <SplitTitle>Tradição viva.</SplitTitle>
                <span className="hero-title-line"><SplitTitle>Sabor do Norte.</SplitTitle></span>
              </h1>
              <p>Entre rios, grutas e toda a força do sertão mineiro, nasce um jeito honesto de fazer queijo — com tempo, cuidado e afeto.</p>
              <div className="hero-actions">
                <Link className="button button--cream" href="/catalogo">Explorar o catálogo <ArrowRight size={18} /></Link>
                <a className="text-link text-link--light" href={whatsappUrl()} target="_blank" rel="noreferrer">Pedir pelo WhatsApp</a>
              </div>
            </div>
            <div className="hero-product" data-parallax>
              <div className="hero-product__halo" aria-hidden="true" />
              <CanvasClient product={products[0]} interactive={false} eager />
              <div className="hero-product__label">
                <span>Em destaque</span>
                <strong>Meia Cura</strong>
                <small>Arraste para sentir a textura</small>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#essencia" aria-label="Conhecer a essência Agrofort">
            <span>Role para descobrir</span>
            <ArrowDown />
          </a>
        </section>

        <section className="section essence" id="essencia">
          <div className="shell">
            <div className="section-heading section-heading--split" data-reveal>
              <div>
                <p className="eyebrow">Do pasto à mesa</p>
                <h2>Cuidado que começa cedo e chega inteiro.</h2>
              </div>
              <p>“Aqui, o cuidado começa no pasto e termina na mesa.” Um ciclo de trabalho familiar que se renova a cada amanhecer no sertão.</p>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article className="pillar-card" data-reveal key={pillar.number}>
                  <span className="pillar-number">{pillar.number}</span>
                  <pillar.icon aria-hidden="true" />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-preview">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Nosso catálogo</p>
              <h2>Tem sabor para cada momento.</h2>
              <p>Do queijo que amadurece com o tempo ao pão de queijo que sai quente do forno.</p>
            </div>
          </div>
          <ProductPreviewGrid />
          <div className="center-action">
            <Link className="button button--outline" href="/catalogo">Ver catálogo interativo <ArrowRight size={18} /></Link>
          </div>
        </section>

        <section className="real-products" data-product-photos>
          <div className="shell real-products__layout">
            <figure className="real-products__hero" data-product-photo>
              <Image
                src="/images/products-real/mesa-agrofort.png"
                alt="Pão de queijo e diferentes queijos Agrofort servidos em uma mesa"
                fill
                quality={92}
                sizes="(max-width: 820px) 94vw, 58vw"
              />
              <figcaption>
                <span>Da Fazenda Barra Funda</span>
                <strong>Produtos reais. Sabor que chega inteiro.</strong>
              </figcaption>
            </figure>

            <div className="real-products__copy">
              <p className="eyebrow" data-product-copy>Na mesa, como eles são</p>
              <h2 data-product-copy>Textura, tempo e verdade em cada peça.</h2>
              <p data-product-copy>
                O catálogo imersivo aproxima você dos detalhes. As fotografias mostram o resultado: queijos com identidade, maturações diferentes e o pão de queijo pronto para compartilhar.
              </p>

              <div className="real-products__portraits">
                <figure data-product-photo>
                  <Image
                    src="/images/products-real/chico-flor-maturados.png"
                    alt="Queijos Chico Flor maturados por 30 e 60 dias"
                    fill
                    quality={90}
                    sizes="(max-width: 600px) 44vw, 220px"
                  />
                  <figcaption><span>30 e 60 dias</span><strong>Chico Flor</strong></figcaption>
                </figure>
                <figure data-product-photo>
                  <Image
                    src="/images/products-real/selecao-queijos-maturados.png"
                    alt="Seleção de queijos Chico Flor e Chico disposta em uma peça de madeira"
                    fill
                    quality={90}
                    sizes="(max-width: 600px) 44vw, 220px"
                  />
                  <figcaption><span>Seleção artesanal</span><strong>Nossos maturados</strong></figcaption>
                </figure>
              </div>

              <Link className="text-link real-products__link" href="/catalogo" data-product-copy>
                Explorar cada produto <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="award-band" data-award-section>
          <ParticleField tone="gold" />
          <div className="award-band__aurora" aria-hidden="true" />
          <div className="shell award-band__inner">
            <div className="award-band__topline">
              <p className="eyebrow eyebrow--light">Qualidade reconhecida</p>
              <span>Queijo artesanal · Januária, MG</span>
            </div>
            <div className="award-band__grid">
              <div className="award-band__copy">
                <h2>
                  <span className="award-line-mask"><span data-award-line>Três medalhas.</span></span>
                  <span className="award-line-mask"><em data-award-line>Uma só origem.</em></span>
                </h2>
                <p className="award-band__lede">Em 2025, a Agrofort levou Januária ao VIII Prêmio Queijo Brasil e voltou para casa com um ouro e duas pratas — reconhecimento para um cuidado que começa no pasto e termina na mesa.</p>
                <Link className="text-link text-link--light award-band__cta" href="/premiacoes">Conhecer essa conquista <ArrowRight size={17} /></Link>
              </div>
              <div className="award-band__stage" data-award-stage>
                <span className="award-band__stage-label">Reconhecimento nacional</span>
                <span className="award-band__year" aria-hidden="true">2025</span>
                <AwardsShowcase compact />
              </div>
            </div>
            <dl className="award-proof">
              <div className="award-proof__item"><dt>01</dt><dd>Medalha de ouro</dd></div>
              <div className="award-proof__item"><dt>02</dt><dd>Medalhas de prata</dd></div>
              <div className="award-proof__item"><dt>VIII</dt><dd>Prêmio Queijo Brasil</dd></div>
              <div className="award-proof__item"><dt>MG</dt><dd>Januária · Norte de Minas</dd></div>
            </dl>
          </div>
        </section>

        <section className="adenilde-story" data-adenilde-section>
          <div className="grain" aria-hidden="true" />
          <span className="adenilde-story__watermark" aria-hidden="true">Adenilde</span>
          <div className="shell adenilde-story__grid">
            <div className="adenilde-story__copy">
              <p className="eyebrow" data-adenilde-copy>Gente que faz a Agrofort</p>
              <h2 data-adenilde-title>
                <span>O cuidado</span>
                <em>tem nome.</em>
              </h2>
              <div className="adenilde-story__quote" data-adenilde-copy>
                <Quote aria-hidden="true" />
                <blockquote>“Aqui, o cuidado começa no pasto e termina na mesa.”</blockquote>
              </div>
              <p className="adenilde-story__lede" data-adenilde-copy>
                Da origem no campo às relações que levam a Agrofort cada vez mais longe, Adenilde conduz cada etapa com presença, afeto e visão.
              </p>
              <div className="adenilde-story__identity" data-adenilde-copy>
                <span>CEO · Fazenda Agrofort</span>
                <strong>Adenilde Aparecida Viera</strong>
              </div>
              <address className="adenilde-story__contacts" data-adenilde-copy>
                <a href={`mailto:${site.email}`}>
                  <Mail aria-hidden="true" />
                  <span><small>Email</small>{site.email}</span>
                </a>
                <a href="tel:+5538999402015">
                  <Phone aria-hidden="true" />
                  <span><small>Telefone</small>(38) 9 9940-2015</span>
                </a>
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  <Instagram aria-hidden="true" />
                  <span><small>Instagram</small>@fazendaagrofort</span>
                </a>
              </address>
              <Link className="button button--dark adenilde-story__cta" href="/sobre" data-adenilde-copy>
                Conhecer nossa história <ArrowRight size={18} />
              </Link>
            </div>

            <div className="adenilde-story__visual" data-adenilde-carousel>
              <AdenildeStoryCarousel />
            </div>
          </div>
          <div className="shell adenilde-story__closing" data-adenilde-copy>
            <span>Sinta o sabor e o amor de Januária em cada mordida.</span>
            <i aria-hidden="true" />
            <span>Fazenda Barra Funda · Norte de Minas</span>
          </div>
        </section>

        <section className="final-cta">
          <div className="grain" aria-hidden="true" />
          <div className="shell final-cta__inner" data-reveal>
            <p className="eyebrow">Direto da fazenda</p>
            <h2>Qualidade que o Norte sabe entregar. Sempre.</h2>
            <p>Fale com a Agrofort, consulte a disponibilidade e descubra onde encontrar nossos produtos.</p>
            <a className="button button--dark" href={whatsappUrl()} target="_blank" rel="noreferrer">Quero fazer um pedido <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>
      <Footer />
      <Script id="agrofort-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
