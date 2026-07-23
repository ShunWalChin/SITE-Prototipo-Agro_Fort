import { describe, expect, it } from "vitest";
import {
  FixedWindowRateLimiter,
  getClientAddress,
  isHoneypotFilled,
  isSameOriginRequest,
  validateLeadPayload,
} from "./leads";

describe("lead contract", () => {
  it("accepts and normalizes a valid catalog lead", () => {
    const result = validateLeadPayload({
      name: "  Adenilde\u0000  Viera ",
      phone: "(38) 9 9940-2015",
      interest: "conhecer os produtos",
      message: " Quero   conhecer os lotes. ",
    }, "2026-07-23T18:00:00.000Z");

    expect(result).toEqual({
      ok: true,
      lead: {
        name: "Adenilde Viera",
        phone: "(38) 9 9940-2015",
        interest: "conhecer os produtos",
        message: "Quero conhecer os lotes.",
        source: "agrofort_catalog",
        receivedAt: "2026-07-23T18:00:00.000Z",
      },
    });
  });

  it("enforces text limits at the public contract", () => {
    const result = validateLeadPayload({
      name: "A".repeat(90),
      phone: "38999402015",
      interest: "conhecer os produtos",
      message: "M".repeat(620),
    }, "2026-07-23T18:00:00.000Z");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.name).toHaveLength(80);
      expect(result.lead.message).toHaveLength(500);
    }
  });

  it("rejects unknown interests and malformed phones", () => {
    expect(validateLeadPayload({
      name: "Ana",
      phone: "123",
      interest: "administrador",
    }, "2026-07-23T18:00:00.000Z")).toEqual({ ok: false, error: "invalid_fields" });

    expect(validateLeadPayload({
      name: { value: "Ana" },
      phone: "38999402015",
      interest: "conhecer os produtos",
    }, "2026-07-23T18:00:00.000Z")).toEqual({ ok: false, error: "invalid_fields" });
  });

  it("detects the honeypot without exposing its implementation", () => {
    expect(isHoneypotFilled({ company: "spam bot" })).toBe(true);
    expect(isHoneypotFilled({ company: "" })).toBe(false);
  });
});

describe("request boundary", () => {
  it("trusts X-Real-IP before a spoofed forwarding chain", () => {
    const headers = new Headers({
      "x-real-ip": "203.0.113.8",
      "x-forwarded-for": "198.51.100.9, 203.0.113.8",
    });
    expect(getClientAddress(headers)).toBe("203.0.113.8");
  });

  it("rejects invalid addresses", () => {
    expect(getClientAddress(new Headers({ "x-real-ip": "attacker" }))).toBe("unknown");
  });

  it("accepts same-origin requests and rejects foreign origins", () => {
    const sameOrigin = new Request("https://agrofort.example/api/leads", {
      headers: { host: "agrofort.example", origin: "https://agrofort.example" },
    });
    const foreignOrigin = new Request("https://agrofort.example/api/leads", {
      headers: { host: "agrofort.example", origin: "https://evil.example" },
    });

    expect(isSameOriginRequest(sameOrigin)).toBe(true);
    expect(isSameOriginRequest(foreignOrigin)).toBe(false);
  });
});

describe("fixed-window limiter", () => {
  it("blocks requests above the limit and returns the retry window", () => {
    const limiter = new FixedWindowRateLimiter(2, 10_000);
    expect(limiter.consume("client", 1_000).allowed).toBe(true);
    expect(limiter.consume("client", 1_001).allowed).toBe(true);
    expect(limiter.consume("client", 1_002)).toEqual({ allowed: false, retryAfterSeconds: 10 });
    expect(limiter.consume("client", 11_001).allowed).toBe(true);
  });
});
