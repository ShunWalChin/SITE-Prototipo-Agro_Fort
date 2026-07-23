# Segurança e pentest

## Escopo da revisão

Foram revisados código fonte, dependências npm, imagem/aplicação, API pública, Nginx, portas expostas, métodos HTTP, CORS, arquivos sensíveis, otimização de imagem e rotas públicas. O ZAP foi executado em modo baseline passivo, sem exploração destrutiva e sem disparar leads válidos.

Esse trabalho reduz risco e produz evidência repetível, mas não substitui pentest manual independente com autorização formal, janela, origem permitida e plano de resposta.

## Controles implementados

- aplicação isolada em contêiner sem privilégios, capabilities ou filesystem gravável;
- porta da aplicação somente em loopback;
- firewall público limitado a HTTP, HTTPS e SSH;
- TLS e HSTS;
- CSP, anti-framing, `nosniff`, política de referência, Permissions Policy, COOP e CORP;
- versão do Nginx ocultada;
- dependências sem vulnerabilidades conhecidas no audit;
- API same-origin com limite de corpo, esquema fechado, sanitização e honeypot;
- rate limit duplo: Nginx e processo;
- IP confiável definido pelo proxy, sem aceitar XFF do cliente;
- webhook server-side com segredo opcional, timeout, retry seletivo e idempotência;
- logs técnicos sem PII;
- `security.txt` para divulgação responsável;
- validação automatizada local e Dependabot.

## Evidências automatizadas

Os relatórios brutos ficam em `docs/security/raw/`:

- `zap-baseline-before.*`: estado anterior ao hardening;
- `zap-baseline-after.*`: estado após o deploy e correções;
- `zap-ui-ux-20260723-161843.*`: revalidação da release refinada, com 149 URLs,
  62 regras aprovadas, zero falhas e cinco grupos de aviso residual.

Os probes complementares verificam:

- 404 para `/.env`, `/.git/config` e `/server-status`;
- 405 para métodos não suportados;
- ausência de CORS permissivo;
- bloqueio de origem externa;
- proteção de tamanho/tipo do corpo;
- tentativa de SSRF pelo otimizador de imagem;
- headers em HTML, assets e erros.

## Modelo de ameaça resumido

| Ativo | Ameaça | Controle |
| --- | --- | --- |
| contato do cliente | vazamento em log | log somente de `eventId` e estado |
| atendimento/n8n | lead duplicado ou forjado | same-origin, token, idempotência e allowlist |
| disponibilidade | spam e corpo excessivo | dois rate limits e limites de tamanho |
| navegador | XSS/clickjacking | React escaping, CSP, `frame-ancestors none`, XFO DENY |
| host compartilhado | movimento lateral | porta loopback, rede dedicada, contêiner sem privilégios |
| cadeia de dependências | pacote vulnerável | lockfile, audit e Dependabot |

## Riscos residuais

1. **CSP com `unsafe-inline`:** necessário pela integração atual de scripts/estilos. Migrar para nonce por requisição e rever GTM.
2. **Rate limit em memória:** correto para uma réplica; usar Redis antes de escalar horizontalmente.
3. **Host compartilhado:** SSH permite encaminhamento e acesso root por chave conforme política global. Qualquer alteração exige janela e avaliação dos demais serviços.
4. **n8n opcional:** quando desativado, o lead não é persistido, embora o WhatsApp continue.
5. **Dependências externas:** analytics e WhatsApp têm disponibilidade e políticas próprias.
6. **Pentest passivo:** não houve exploração destrutiva, DDoS, engenharia social ou ataque ao n8n/WhatsApp.

## Resposta a incidente

1. preserve logs e release ativo;
2. identifique `eventId`, horário, IP de borda e rota;
3. bloqueie temporariamente na borda sem desligar outros serviços;
4. faça rollback se a causa for uma release;
5. rotacione `N8N_WEBHOOK_TOKEN` se houver suspeita de exposição;
6. comunique dados pessoais conforme a política e legislação aplicável;
7. registre linha do tempo, impacto, causa raiz e ação preventiva.

## Divulgação responsável

Envie detalhes para `contato@fazendaagrofort.com.br`. Não acesse dados de terceiros, não degrade o serviço e aguarde autorização antes de realizar exploração ativa.
