# Relatório técnico — revisão integral

Data: 23 de julho de 2026

Sistema: Agrofort — catálogo digital

Ambiente: produção em `agrofort.64.181.178.125.nip.io`

## Resumo executivo

A revisão cobriu experiência desktop/mobile, acessibilidade, desempenho, código morto, contratos, testes, dependências, API, webhook, contêiner, proxy e superfície HTTP. O sistema foi mantido como monólito modular Next.js e ganhou controles proporcionais ao seu domínio, sem introduzir banco ou serviços desnecessários.

## Mudanças principais

- UX mobile refinada: drawer, backdrop, Escape, foco, alvos de toque e formulários sem zoom;
- acessibilidade: skip link, foco consistente, landmarks, controles nomeados e estado anunciado;
- desempenho: WebGL sob demanda, modo gráfico adaptativo, pausa fora da viewport e menos preloads;
- conversão: WhatsApp aberto no gesto do usuário, independente da latência do webhook;
- API: contrato fechado, same-origin, limites, honeypot, dois rate limits e erros previsíveis;
- integração: event ID, idempotência, timeout, retry seletivo e logs sem PII;
- infraestrutura: headers em todas as respostas, anti-framing, versão oculta e rollback Nginx;
- governança: testes, CI, Dependabot, documentação, manual e política de segurança.

## Qualidade

| Verificação | Resultado |
| --- | --- |
| ESLint | aprovado |
| TypeScript | aprovado |
| Vitest | 17/17 aprovados |
| Next.js production build | aprovado |
| npm audit | 0 vulnerabilidades |
| código morto (Knip + inspeção) | exportação e seletor mortos removidos |
| rotas e healthcheck | 6 páginas, arquivos técnicos e contêiner aprovados |
| ZAP após correções | 149 URLs, 62 regras aprovadas, 0 falhas |

## Segurança antes das correções

O primeiro ZAP baseline percorreu 149 URLs, sem falha de risco alto e com dez grupos de alerta no resumo do scanner. Os achados materiais eram headers ausentes em assets estáticos, versão do servidor exposta, cache/content type e CSP com inline. A inspeção também encontrou confiança indevida na primeira entrada de X-Forwarded-For e endpoint de lead sem limites suficientes.

Após o hardening, a nova varredura percorreu as mesmas 149 URLs: 62 regras passaram, nenhuma falhou e restaram cinco grupos de aviso no resumo (sete tipos no JSON). Os avisos materiais remanescentes são o `unsafe-inline` de script/estilo e a ausência deliberada de COEP; cache de conteúdo público e um possível atributo controlável em `/contato` foram classificados como informacionais. A página não consome nem reflete esses parâmetros de query.

## Escopo e limitações do pentest

A execução foi automatizada, passiva e não destrutiva, complementada por probes dirigidos de método, CORS, arquivos sensíveis, SSRF de imagem, tamanho e tipo de payload. Não houve DDoS, exploração destrutiva, engenharia social, teste autenticado ou ataque a serviços de terceiros.

## Riscos residuais aceitos

- CSP ainda depende de `unsafe-inline`;
- rate limiter em processo pressupõe uma réplica;
- host é compartilhado e o hardening SSH global exige mudança coordenada;
- persistência do lead depende da configuração do n8n;
- pentest manual independente continua recomendado antes de funções transacionais.

## Artefatos

- arquitetura: `docs/ARCHITECTURE.md`;
- operação/rollback: `docs/OPERATIONS.md`;
- contrato n8n: `docs/N8N-WEBHOOK.md`;
- testes: `docs/TESTING.md`;
- segurança: `docs/SECURITY.md`;
- manual: `docs/USER-MANUAL.md`;
- evidência ZAP: `docs/security/raw/`.

## Publicação

- release final: `20260723-154852`;
- contêiner: `agrofort-web`, healthcheck aprovado;
- Nginx: configuração validada antes do reload e backup preservado;
- branch GitHub: `agent/full-system-audit`;
- PR: `https://github.com/ShunWalChin/SITE-Prototipo-Agro_Fort/pull/1`.
