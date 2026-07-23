# Estratégia de testes

## Pirâmide proporcional

O risco principal está no funil de contato, contratos públicos e entrega. A cobertura automatizada concentra-se nessas regras, enquanto visual, WebGL e responsividade exigem inspeção real de navegador/dispositivo.

| Camada | Ferramenta | Cobertura |
| --- | --- | --- |
| estática | ESLint + TypeScript | contratos, imports, hooks e tipos |
| unidade | Vitest | normalização, validação, URL e rate limiter |
| integração leve | Vitest + `Request` | contrato de `/api/leads` e webhook |
| build | Next production build | SSR, assets, rotas e standalone |
| segurança | npm audit + ZAP baseline + HTTP probes | dependências, headers e superfície pública |
| UX manual | navegador desktop/mobile | foco, toque, drawer, carrossel, formulário e WebGL |

## Comandos

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check
npm run security:audit
```

## Casos protegidos

- campos e interesses permitidos do lead;
- normalização de texto e limites;
- telefone e honeypot;
- rate limit de janela fixa;
- origem, content type, JSON e tamanho;
- operação sem webhook;
- envio de Bearer token e chave idempotente;
- geração segura da URL do WhatsApp;
- URL canônica e dados de contato.

## Checklist visual

Execute em 360×800, 390×844, 768×1024, 1280×720 e 1440×900:

1. navegue somente com Tab, Shift+Tab, Enter, Espaço e Escape;
2. confirme link “Ir para o conteúdo principal”;
3. abra/feche o menu e valide bloqueio da página ao fundo;
4. percorra produtos e carrossel com toque e teclado;
5. ative “reduzir movimento” no sistema;
6. simule CPU/rede lenta e confirme que HTML/CTAs aparecem antes do 3D;
7. envie o formulário com dados de QA em homologação;
8. valide rotação, zoom bloqueado e fallback mobile;
9. confira que nenhum texto, cartão ou endereço estoura a largura;
10. rode Lighthouse/axe no ambiente apropriado, se disponível.

## Critério de aceite da release

- lint, tipos, testes e build sem erro;
- `npm audit` sem vulnerabilidade conhecida;
- contêiner saudável;
- todas as rotas públicas 200;
- métodos não suportados em `/api/leads` rejeitados;
- headers presentes em HTML e static assets;
- nenhum segredo ou chave no diff;
- ZAP baseline sem alerta de risco alto;
- smoke test mobile e desktop concluído.

## O que não está coberto

- aparência pixel a pixel;
- disponibilidade de WhatsApp, Instagram, Google ou n8n;
- exatidão comercial dos textos e disponibilidade de produtos;
- exploração manual autenticada (o sistema não possui autenticação);
- comportamento em navegadores muito antigos.
