# Agrofort — catálogo digital

Experiência web/mobile da Fazenda Agrofort, em Januária (MG). O produto combina catálogo interativo, produtos reais, premiações, história da fundadora e conversão assistida pelo WhatsApp.

Produção: [agrofort.64.181.178.125.nip.io](https://agrofort.64.181.178.125.nip.io/)

## Stack

- Next.js 16, React 19 e TypeScript;
- CSS responsivo com Tailwind CSS 4 como toolchain;
- Three.js, React Three Fiber e Drei para as esculturas 3D;
- GSAP, Anime.js e canvas 2D para movimento;
- D3 para o perfil sensorial;
- Zustand para o estado da vitrine;
- Docker, Nginx, Let's Encrypt e release imutável no servidor;
- endpoint server-side para n8n com validação, idempotência e limitação de requisições.

## Início rápido

Requisitos: Node.js 22 e npm 10+.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Antes de publicar uma mudança:

```bash
npm run check
npm run security:audit
```

`npm run check` executa lint, verificação de tipos, testes e build de produção.

## Configuração

Copie `.env.example` para `.env`. Nunca versione valores reais.

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | não | URL canônica; já possui o domínio de produção como padrão |
| `NEXT_PUBLIC_GTM_ID` | não | contêiner do Google Tag Manager |
| `N8N_WEBHOOK_URL` | não | destino server-side da captação de leads |
| `N8N_WEBHOOK_TOKEN` | recomendada com n8n | token Bearer enviado apenas pelo servidor |

Sem n8n, o formulário continua abrindo o WhatsApp e responde com sucesso; apenas a automação de retaguarda fica desativada.

## Arquitetura do repositório

```text
app/                    rotas, metadata e endpoint /api/leads
components/animations/ animações globais e efeitos ambientais
components/canvas/     cenas e objetos Three.js
components/dom/        componentes de interface e conversão
lib/                   domínio de produtos, leads, analytics e site
store/                 estado cliente do catálogo
public/                imagens, marca e security.txt
deploy/                release remoto e políticas Nginx
docs/                  arquitetura, operação, testes, segurança e manual
design-system/         identidade, interação e regras responsivas por página
```

O WebGL abaixo da dobra é inicializado por proximidade da viewport. Em telas pequenas ou com movimento reduzido, a renderização reduz DPR, sombras e animação contínua.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Operação e deploy](docs/OPERATIONS.md)
- [Contrato n8n/webhook](docs/N8N-WEBHOOK.md)
- [Estratégia de testes](docs/TESTING.md)
- [Segurança e pentest](docs/SECURITY.md)
- [Manual do sistema](docs/USER-MANUAL.md)
- [Relatório técnico da revisão](docs/FINAL-REPORT.md)
- [Auditoria e refinamento UI/UX Pro Max](docs/UI-UX-PRO-MAX-AUDIT.md)
- [Design system Agrofort](design-system/agrofort/MASTER.md)
- [Política de segurança](SECURITY.md)
- [Histórico de mudanças](CHANGELOG.md)

## Produção em contêiner

```bash
docker compose up -d --build
```

O serviço publica somente em `127.0.0.1:4188`. A borda HTTPS e os cabeçalhos de proteção ficam no Nginx. Consulte o procedimento de release e rollback em [Operação](docs/OPERATIONS.md).

## Licença e conteúdo

Código e ativos são propriedade da Fazenda Agrofort/FAT TECH. Fotografias, marca e textos não devem ser reutilizados sem autorização.
