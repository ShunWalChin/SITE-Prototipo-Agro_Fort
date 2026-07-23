import type { Metadata } from "next";
import { Award, BadgeCheck, HeartHandshake } from "lucide-react";
import { AwardsShowcase } from "@/components/dom/AwardsShowcase";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";
import { PageIntro } from "@/components/dom/PageIntro";

export const metadata: Metadata = {
  title: "Premiações",
  description: "Conheça o reconhecimento da Agrofort no VIII Prêmio Queijo Brasil 2025.",
  alternates: { canonical: "/premiacoes" },
};

export default function AwardsPage() {
  return (
    <>
      <Header light />
      <main id="main-content" tabIndex={-1}>
        <PageIntro
          eyebrow="VIII Prêmio Queijo Brasil · 2025"
          title="O sertão subiu ao pódio."
          copy="Uma medalha de ouro e duas de prata traduzem em reconhecimento aquilo que a família Agrofort pratica todos os dias."
        />
        <section className="section awards-page">
          <div className="shell awards-page__grid">
            <AwardsShowcase />
            <div className="awards-copy">
              <p className="eyebrow">Mais que medalhas</p>
              <h2>É o cuidado da fazenda reconhecido em todo o Brasil.</h2>
              <p>O prêmio celebra a qualidade dos queijos brasileiros e fortalece quem transforma leite, território e conhecimento em cultura alimentar.</p>
              <div className="award-values">
                <article><Award /><div><strong>Excelência</strong><span>Qualidade percebida em cada detalhe.</span></div></article>
                <article><BadgeCheck /><div><strong>Consistência</strong><span>O mesmo zelo do pasto à maturação.</span></div></article>
                <article><HeartHandshake /><div><strong>Origem</strong><span>Uma conquista dividida com Januária.</span></div></article>
              </div>
            </div>
          </div>
        </section>
        <section className="award-statement">
          <div className="shell" data-reveal>
            <span>2025</span>
            <blockquote>“Tradição bem feita não precisa de exagero. Precisa de verdade.”</blockquote>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
