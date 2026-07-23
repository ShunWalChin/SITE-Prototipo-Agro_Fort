# Pipeline de produção

O contrato executável está em `deploy/pipeline.production.json`. Ele adapta a
especificação FAT TECH aos limites reais do projeto e prioriza repetibilidade,
rollback e evidência.

## Gates obrigatórios

1. `npm run check`: lint, TypeScript, 17 testes e build;
2. `npx knip --production`: exports, arquivos e dependências ociosos no runtime;
3. `npm run security:audit`: bloqueia CVE alta ou crítica;
4. ZAP baseline contra a URL HTTPS publicada;
5. healthcheck do novo contêiner antes da troca do release ativo;
6. probes HTTP das rotas públicas depois da troca;
7. commit e PR com documentação e relatórios.

Qualquer falha nos três primeiros gates interrompe a publicação.

## Decisões de segurança

### ZAP

A imagem usada é `ghcr.io/zaproxy/zaproxy:stable`. O alvo deve ser
`$PUBLIC_URL`; `localhost:4188` dentro do contêiner ZAP apontaria para o próprio
scanner, não para a aplicação. A rotina é baseline passiva e não destrutiva.

### Documentação

TypeDoc não foi incluído porque o sistema não publica uma biblioteca TypeScript
nem possui a pasta `src/` indicada no comando original. Contratos e operação são
documentados em Markdown versionado, incluindo API de leads, webhook n8n,
arquitetura, segurança e manual do usuário.

### Deploy

`docker compose --force-recreate` não garante zero downtime nem rollback. O
procedimento oficial cria um diretório imutável por release, valida Compose,
constrói a imagem, sobe o contêiner, espera saúde e só então troca o symlink
`current`. O release anterior permanece disponível.

### GitHub

Produção é documentada na branch `agent/full-system-audit` e revisada pela PR
`#1`. O pipeline não envia diretamente para `main`; merge é uma decisão de
governança do mantenedor.

## Evidência esperada

- saída dos gates de qualidade;
- release e commit correspondentes;
- healthcheck, usuário, modo read-only e bind local do contêiner;
- status das rotas públicas;
- relatórios ZAP JSON, HTML e Markdown em `docs/security/raw/`;
- relatório final atualizado.
