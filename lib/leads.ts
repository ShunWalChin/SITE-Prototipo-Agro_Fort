import { isIP } from "node:net";

const LEAD_INTERESTS = [
  "conhecer os produtos",
  "fazer um pedido",
  "revender Agrofort",
  "visitar a fazenda",
  "falar sobre uma parceria",
] as const;

export type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  company?: unknown;
};

export type Lead = {
  name: string;
  phone: string;
  interest: (typeof LEAD_INTERESTS)[number];
  message: string;
  source: "agrofort_catalog";
  receivedAt: string;
};

export type LeadValidation =
  | { ok: true; lead: Lead }
  | { ok: false; error: "invalid_fields" };

const controlCharacters = /[\u0000-\u001f\u007f]/g;

/**
 * Normaliza texto vindo da borda HTTP sem tentar “corrigir” dados de negócio.
 * O limite também protege o webhook contra payloads excessivos.
 */
export function cleanLeadText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(controlCharacters, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function isHoneypotFilled(payload: LeadPayload): boolean {
  return Boolean(cleanLeadText(payload.company, 80));
}

/**
 * Converte o contrato público em um Lead válido e com conjunto fechado de
 * interesses. A função é pura para permitir testes de caracterização.
 */
export function validateLeadPayload(payload: LeadPayload, receivedAt: string): LeadValidation {
  const name = cleanLeadText(payload.name, 80);
  const phone = cleanLeadText(payload.phone, 22);
  const interest = cleanLeadText(payload.interest, 120);
  const message = cleanLeadText(payload.message, 500);
  const phoneDigits = phone.replace(/\D/g, "");
  const knownInterest = LEAD_INTERESTS.find((candidate) => candidate === interest);

  if (name.length < 2 || phoneDigits.length < 8 || phoneDigits.length > 15 || !knownInterest) {
    return { ok: false, error: "invalid_fields" };
  }

  return {
    ok: true,
    lead: {
      name,
      phone,
      interest: knownInterest,
      message,
      source: "agrofort_catalog",
      receivedAt,
    },
  };
}

/**
 * O proxy define X-Real-IP com o endereço da conexão. X-Forwarded-For existe
 * apenas como fallback para desenvolvimento e nunca é aceito sem validação.
 */
export function getClientAddress(headers: Headers): string {
  const candidate = headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0] ?? "";
  const normalized = candidate.trim().replace(/^::ffff:/, "").slice(0, 64);
  return isIP(normalized) ? normalized : "unknown";
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type RateLimitEntry = { count: number; resetAt: number };

/**
 * Limitador em memória adequado ao único processo atual. A borda Nginx aplica
 * uma segunda proteção; se o sistema escalar horizontalmente, este adapter
 * deverá ser substituído por Redis ou outro armazenamento compartilhado.
 */
export class FixedWindowRateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly maximumEntries = 2_000,
  ) {}

  consume(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
    this.prune(now);
    const current = this.entries.get(key);

    if (!current || current.resetAt <= now) {
      this.entries.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (current.count >= this.limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
      };
    }

    current.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  private prune(now: number) {
    if (this.entries.size < this.maximumEntries) return;
    for (const [key, entry] of this.entries) {
      if (entry.resetAt <= now) this.entries.delete(key);
    }

    // Evita crescimento sem limite mesmo durante um ataque distribuído.
    while (this.entries.size >= this.maximumEntries) {
      const oldestKey = this.entries.keys().next().value as string | undefined;
      if (!oldestKey) break;
      this.entries.delete(oldestKey);
    }
  }
}
