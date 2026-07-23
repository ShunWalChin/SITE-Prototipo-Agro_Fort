import type { Metadata } from "next";
import { ArrowRight, Heart, Sprout, Sun } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";
import { PageIntro } from "@/components/dom/PageIntro";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nossa história",
  description: "Conheça a Fazenda Agrofort, a família e a tradição que nasce na Fazenda Barra Funda, em Januária.",
  alternates: { canonical: "/sobre" },
};

export default function AboutPage() {
  return (
    <>
      <Header light />
      <main id="main-content" tabIndex={-1}>
        <PageIntro
          eyebrow="Fazenda Barra Funda · Januária, MG"
          title="Raiz forte. Trabalho de família."
          copy="No coração do Norte de Minas, a história da Agrofort é escrita todos os dias entre o pasto, a queijaria e a mesa."
        />
        <section className="section about-story">
          <div className="shell about-story__grid">
            <div className="about-image" data-reveal>
              <Image
                src="/images/products-real/mesa-agrofort.png"
                alt="Queijos e pão de queijo Agrofort servidos à mesa"
                width={766}
                height={505}
                quality={92}
              />
              <div className="about-image__caption"><span>Da fazenda</span><strong>para a mesa</strong></div>
            </div>
            <div className="about-copy" data-reveal>
              <p className="eyebrow">Nossa essência</p>
              <h2>Queijo é alimento, afeto e herança.</h2>
              <p>Com raízes fincadas na Fazenda Barra Funda, a Agrofort nasceu para levar o autêntico sabor mineiro às mesas, sem perder a proximidade de quem conhece cada etapa da produção.</p>
              <p>Do ordenhador ao consumidor, tudo é feito com o mesmo zelo. O leite ganha tempo, textura e identidade; a receita de família ganha novas mesas; Januária ganha voz.</p>
              <blockquote>“Aqui, o cuidado começa no pasto e termina na mesa.”<cite>Adenilde Aparecida Viera</cite></blockquote>
            </div>
          </div>
        </section>
        <section className="section values-section">
          <div className="shell values-grid">
            <article data-reveal><Sun /><span>01</span><h3>Respeito ao tempo</h3><p>Cada lote segue o seu ritmo. Maturar também é saber esperar.</p></article>
            <article data-reveal><Sprout /><span>02</span><h3>Respeito à terra</h3><p>Origem não é discurso: está no pasto, na família e em cada escolha.</p></article>
            <article data-reveal><Heart /><span>03</span><h3>Cuidado verdadeiro</h3><p>O que chega à mesa carrega a atenção de muitas mãos.</p></article>
          </div>
        </section>
        <section className="visit-band">
          <div className="shell visit-band__inner">
            <div><p className="eyebrow">Venha conhecer</p><h2>A fazenda fica em Januária.</h2><p>{site.address}</p></div>
            <a className="button button--cream" href={whatsappUrl("Olá, Agrofort! Gostaria de saber como posso visitar a Fazenda Barra Funda.")} target="_blank" rel="noreferrer">Agendar uma visita <ArrowRight /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
