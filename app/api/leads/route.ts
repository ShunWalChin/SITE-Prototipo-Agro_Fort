import { NextResponse } from "next/server";
import {
  FixedWindowRateLimiter,
  getClientAddress,
  isHoneypotFilled,
  isSameOriginRequest,
  type Lead,
  type LeadPayload,
  validateLeadPayload,
} from "@/lib/leads";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 8;
const MAX_BODY_BYTES = 16 * 1024;
const WEBHOOK_TIMEOUT_MS = 3_500;
const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const rateLimiter = new FixedWindowRateLimiter(RATE_LIMIT, RATE_WINDOW_MS);

type ErrorCode =
  | "invalid_content_type"
  | "invalid_origin"
  | "payload_too_large"
  | "rate_limited"
  | "invalid_json"
  | "invalid_fields";

function json(payload: Record<string, unknown>, status = 200, headers: HeadersInit = {}) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function logDelivery(eventId: string, delivered: boolean, attempts: number, reason?: string) {
  // Logs deliberadamente não contêm nome, telefone ou mensagem do lead.
  console.info(JSON.stringify({
    event: "agrofort.lead.delivery",
    eventId,
    delivered,
    attempts,
    reason,
    timestamp: new Date().toISOString(),
  }));
}

async function deliverToWebhook(webhook: string, token: string | undefined, lead: Lead, eventId: string) {
  let attempts = 0;

  while (attempts < 2) {
    attempts += 1;
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Agrofort-Web/1.0",
          "X-Agrofort-Event": "agrofort.lead.created",
          "X-Idempotency-Key": eventId,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...lead,
          eventId,
          schemaVersion: "1.0",
        }),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
        redirect: "error",
        cache: "no-store",
      });

      if (response.ok) {
        logDelivery(eventId, true, attempts);
        return;
      }

      if (!RETRYABLE_STATUS.has(response.status)) {
        logDelivery(eventId, false, attempts, `http_${response.status}`);
        return;
      }
    } catch (error) {
      if (attempts >= 2) {
        logDelivery(eventId, false, attempts, error instanceof Error ? error.name : "network_error");
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 250 * attempts));
  }
}

function error(code: ErrorCode, status: number, headers?: HeadersInit) {
  return json({ ok: false, error: code }, status, headers);
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return error("invalid_content_type", 415);
  }

  if (!isSameOriginRequest(request)) {
    return error("invalid_origin", 403);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return error("payload_too_large", 413);
  }

  const client = getClientAddress(request.headers);
  const rate = rateLimiter.consume(client);
  if (!rate.allowed) {
    return error("rate_limited", 429, { "Retry-After": String(rate.retryAfterSeconds) });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return error("invalid_json", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return error("payload_too_large", 413);
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody) as unknown;
  } catch {
    return error("invalid_json", 400);
  }

  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return error("invalid_fields", 422);
  }
  const body = parsedBody as LeadPayload;

  if (isHoneypotFilled(body)) {
    return json({ ok: true }, 202);
  }

  const validation = validateLeadPayload(body, new Date().toISOString());
  if (!validation.ok) return error(validation.error, 422);

  const eventId = crypto.randomUUID();
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    logDelivery(eventId, false, 0, "webhook_not_configured");
    return json({ ok: true, eventId }, 202);
  }

  await deliverToWebhook(webhook, process.env.N8N_WEBHOOK_TOKEN, validation.lead, eventId);
  return json({ ok: true, eventId }, 202);
}
