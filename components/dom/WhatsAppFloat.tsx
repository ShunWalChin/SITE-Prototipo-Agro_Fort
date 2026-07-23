"use client";

import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar com a Agrofort no WhatsApp"
      onClick={() => track("whatsapp_click", { placement: "floating_button" })}
    >
      <MessageCircle aria-hidden="true" />
      <span>Peça agora</span>
    </a>
  );
}
