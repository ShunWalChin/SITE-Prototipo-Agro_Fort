# Contrato n8n / webhook

## Gatilho

`POST /api/leads` recebe JSON do formulário do site. Após validação, o servidor envia o evento ao `N8N_WEBHOOK_URL`. A URL e o token nunca chegam ao navegador.

## Evento enviado

```json
{
  "name": "Ana",
  "phone": "(38) 99999-9999",
  "interest": "fazer um pedido",
  "message": "Gostaria de consultar disponibilidade.",
  "source": "agrofort_catalog",
  "receivedAt": "2026-07-23T18:00:00.000Z",
  "eventId": "5e3bdfe1-f9af-4b0f-a4a9-a4ce5b2c1a2d",
  "schemaVersion": "1.0"
}
```

Cabeçalhos:

```text
Content-Type: application/json
Authorization: Bearer <N8N_WEBHOOK_TOKEN>
X-Agrofort-Event: agrofort.lead.created
X-Idempotency-Key: <eventId>
User-Agent: Agrofort-Web/1.0
```

O token é opcional na aplicação, mas obrigatório como política de produção sempre que o endpoint n8n estiver exposto à internet.

## Interesses aceitos

- `conhecer os produtos`
- `fazer um pedido`
- `revender Agrofort`
- `visitar a fazenda`
- `falar sobre uma parceria`

Qualquer outro valor é rejeitado com 422.

## Workflow recomendado

```text
01 — Receber lead Agrofort (Webhook)
02 — Validar Bearer token
03 — Validar schemaVersion e campos
04 — Deduplicar por eventId
05 — Normalizar telefone
06 — Registrar no CRM/planilha
07 — Notificar atendimento
08 — Registrar sucesso técnico
09 — Error Trigger → fila de falhas/alerta
```

### Idempotência

Persista `eventId` em Data Store, banco ou CRM antes do efeito final. Se ele já existir, responda 200 sem reenviar mensagens nem duplicar linhas.

### Resposta e tempo

Responda 2xx rapidamente. A aplicação aguarda 3,5 segundos por tentativa e faz no máximo duas tentativas apenas para timeout, erro de rede, 408, 425, 429 e 5xx. Status 4xx não são repetidos.

### Segurança

- credenciais no recurso Credentials/variáveis do n8n, nunca em nós Set;
- HTTPS na entrada;
- compare o Bearer token em tempo constante quando possível;
- não registre o payload completo em execução de produção;
- limite retenção de execuções que contenham PII;
- restrinja o acesso administrativo do n8n;
- faça rotação do token e teste o novo segredo antes de revogar o anterior.

## Respostas do endpoint público

| Status | Significado |
| --- | --- |
| 202 | lead válido ou honeypot absorvido; conversa pode prosseguir |
| 400 | JSON inválido |
| 403 | origem de navegador divergente |
| 413 | corpo acima de 16 KiB na aplicação/20 KiB no proxy |
| 415 | conteúdo não JSON |
| 422 | campos inválidos |
| 429 | limite por IP excedido |

Para não transformar a integração em dependência da conversão, falhas internas do webhook não são expostas ao visitante. Elas aparecem somente no log técnico pelo `eventId`.

## Teste seguro

Use uma instância de homologação do n8n e um telefone fictício:

```bash
curl -i https://<HOMOLOGACAO>/api/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://<HOMOLOGACAO>' \
  --data '{"name":"Teste QA","phone":"38999999999","interest":"conhecer os produtos","message":"Teste controlado","company":""}'
```

Não use o endpoint de produção para testes de carga: isso pode acionar atendimento e consumir o rate limit.
