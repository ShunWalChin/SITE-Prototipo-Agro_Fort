import type { Metadata } from "next";
import { Footer } from "@/components/dom/Footer";
import { Header } from "@/components/dom/Header";

export const metadata: Metadata = { title: "Privacidade", robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page" id="main-content" tabIndex={-1}>
        <article className="shell">
          <p className="eyebrow">Privacidade</p>
          <h1>Seus dados, com respeito.</h1>
          <p>O catálogo Agrofort usa apenas os dados que você envia voluntariamente no formulário de contato para preparar e encaminhar sua conversa. Nome, telefone, interesse e mensagem são usados para responder à sua solicitação.</p>
          <h2>Contato e atendimento</h2>
          <p>Ao enviar o formulário, uma conversa é aberta no WhatsApp. A partir desse momento, o tratamento também segue as políticas da plataforma. Se a automação de atendimento estiver habilitada, os dados podem ser encaminhados ao sistema interno da Agrofort.</p>
          <h2>Métricas</h2>
          <p>O site pode registrar métricas agregadas de navegação e cliques para melhorar a experiência, sem vender informações pessoais.</p>
          <h2>Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão de seus dados pelo e-mail contato@fazendaagrofort.com.br.</p>
          <p className="legal-updated">Atualizado em julho de 2026.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
