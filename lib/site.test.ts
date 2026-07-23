import { describe, expect, it } from "vitest";
import { site, whatsappUrl } from "./site";

describe("site links", () => {
  it("builds a WhatsApp URL with the canonical phone", () => {
    const url = new URL(whatsappUrl("Olá, quero conhecer o queijo!"));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${site.phoneE164}`);
    expect(url.searchParams.get("text")).toBe("Olá, quero conhecer o queijo!");
  });

  it("uses a product-oriented default message", () => {
    expect(new URL(whatsappUrl()).searchParams.get("text")).toContain("produtos disponíveis");
  });
});
