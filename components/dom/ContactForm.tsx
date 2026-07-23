"use client";

import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "capture-error" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      interest: String(form.get("interest") ?? ""),
      message: String(form.get("message") ?? ""),
      company: String(form.get("company") ?? ""),
    };
    const text = `Olá, Agrofort! Meu nome é ${payload.name}. Tenho interesse em ${payload.interest}. ${payload.message}`.trim();
    const targetUrl = whatsappUrl(text);

    try {
      // Open during the user's submit gesture so mobile browsers do not block it
      // as a delayed popup while the lead capture runs in the background.
      const captureRequest = fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const conversation = window.open(targetUrl, "_blank", "noopener,noreferrer");
      const response = await captureRequest;

      if (!conversation) window.location.assign(targetUrl);
      if (response.ok) {
        setState("sent");
        track("lead_submit", { interest: payload.interest });
      } else {
        setState("capture-error");
      }
      formElement.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={state === "sending"}>
      <div className="form-grid">
        <label>
          Seu nome
          <input name="name" required minLength={2} maxLength={80} placeholder="Como podemos chamar você?" autoComplete="name" />
        </label>
        <label>
          WhatsApp
          <input name="phone" required minLength={8} maxLength={22} placeholder="(38) 9 9999-9999" inputMode="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        Tenho interesse em
        <select name="interest" defaultValue="conhecer os produtos">
          <option value="conhecer os produtos">Conhecer os produtos</option>
          <option value="fazer um pedido">Fazer um pedido</option>
          <option value="revender Agrofort">Revender Agrofort</option>
          <option value="visitar a fazenda">Visitar a fazenda</option>
          <option value="falar sobre uma parceria">Falar sobre uma parceria</option>
        </select>
      </label>
      <label>
        Sua mensagem <span>(opcional)</span>
        <textarea name="message" maxLength={500} rows={4} placeholder="Conte um pouco do que você procura." />
      </label>
      <label className="honeypot" aria-hidden="true" inert>
        Empresa
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="form-privacy">Ao enviar, você concorda em iniciar uma conversa com a Agrofort pelo WhatsApp.</p>
      <button className="button button--full" type="submit" disabled={state === "sending"}>
        {state === "sending" ? <Loader2 className="spin" aria-hidden="true" /> : state === "sent" ? <CheckCircle2 aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
        {state === "sending" ? "Preparando conversa…" : state === "sent" ? "Conversa preparada" : "Falar com a Agrofort"}
      </button>
      <div className="form-feedback" role="status" aria-live="polite">
        {state === "sent" && <p className="form-success">Pronto: abrimos sua conversa com a Agrofort no WhatsApp.</p>}
        {state === "capture-error" && <p className="form-error">A conversa foi aberta, mas não conseguimos registrar sua solicitação no site.</p>}
        {state === "error" && <p className="form-error">Não foi possível preparar a conversa. Tente novamente ou use o botão flutuante do WhatsApp.</p>}
      </div>
    </form>
  );
}
