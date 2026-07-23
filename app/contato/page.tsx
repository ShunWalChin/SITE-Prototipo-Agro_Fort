import type { Metadata } from "next";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { ParticleField } from "@/components/animations/ParticleField";
import { ContactForm } from "@/components/dom/ContactForm";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";
import { PageIntro } from "@/components/dom/PageIntro";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Fazenda Agrofort, consulte produtos, revenda ou agende uma visita à Fazenda Barra Funda.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <>
      <Header light />
      <main id="main-content" tabIndex={-1}>
        <PageIntro
          eyebrow="Fale com a fazenda"
          title="A prosa começa por aqui."
          copy="Pedidos, revenda, parcerias ou uma visita à Fazenda Barra Funda: conte o que você procura."
        />
        <section className="section contact-page">
          <div className="shell contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">Contato direto</p>
              <h2>Estamos em Januária. E a conversa é sem distância.</h2>
              <p>O WhatsApp é o canal mais rápido para consultar produtos, lotes disponíveis e pontos de venda.</p>
              <div className="contact-links">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><small>WhatsApp</small>{site.phoneDisplay}</span></a>
                <a href={`mailto:${site.email}`}><Mail aria-hidden="true" /><span><small>E-mail</small>{site.email}</span></a>
                <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /><span><small>Instagram</small>@fazendaagrofort</span></a>
                <a href={site.maps} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>Endereço</small>Fazenda Barra Funda · Januária, MG</span></a>
              </div>
            </div>
            <div className="contact-card" data-reveal>
              <ParticleField tone="gold" />
              <div className="contact-card__content">
                <p className="eyebrow eyebrow--light">Conte para a gente</p>
                <h2>Como podemos ajudar?</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
