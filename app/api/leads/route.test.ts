import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const endpoint = "https://agrofort.example/api/leads";
let clientSequence = 1;

function leadRequest(body: unknown, headers: Record<string, string> = {}) {
  clientSequence += 1;
  return new Request(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "agrofort.example",
      origin: "https://agrofort.example",
      "x-real-ip": `198.51.100.${clientSequence}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/leads", () => {
  it("rejects unsupported content types", async () => {
    const response = await POST(new Request(endpoint, {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "lead",
    }));
    expect(response.status).toBe(415);
  });

  it("rejects foreign origins", async () => {
    const response = await POST(leadRequest({}, { origin: "https://evil.example" }));
    expect(response.status).toBe(403);
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    expect((await POST(leadRequest("{invalid"))).status).toBe(400);
    expect((await POST(leadRequest("x".repeat(17 * 1024)))).status).toBe(413);
  });

  it("rejects JSON values that are not objects", async () => {
    const response = await POST(leadRequest("null"));
    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({ error: "invalid_fields" });
  });

  it("absorbs honeypot submissions without routing", async () => {
    const response = await POST(leadRequest({ company: "bot", name: "Spam" }));
    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("accepts a valid lead when the optional webhook is disabled", async () => {
    vi.stubEnv("N8N_WEBHOOK_URL", "");
    const response = await POST(leadRequest({
      name: "Ana",
      phone: "(38) 99999-9999",
      interest: "fazer um pedido",
      message: "Gostaria de consultar um lote.",
    }));
    const payload = await response.json();

    expect(response.status).toBe(202);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(payload.ok).toBe(true);
    expect(payload.eventId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("sends an idempotency key to n8n", async () => {
    vi.stubEnv("N8N_WEBHOOK_URL", "https://n8n.example/webhook/agrofort");
    vi.stubEnv("N8N_WEBHOOK_TOKEN", "test-token");
    const webhook = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", webhook);

    const response = await POST(leadRequest({
      name: "Ana",
      phone: "38999999999",
      interest: "revender Agrofort",
      message: "",
    }));

    expect(response.status).toBe(202);
    expect(webhook).toHaveBeenCalledOnce();
    const [, options] = webhook.mock.calls[0] as [string, RequestInit];
    const headers = new Headers(options.headers);
    expect(headers.get("authorization")).toBe("Bearer test-token");
    expect(headers.get("x-idempotency-key")).toMatch(/^[0-9a-f-]{36}$/);
  });
});
