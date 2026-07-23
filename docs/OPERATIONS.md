# Operação e deploy

## Topologia de produção

- domínio: `agrofort.64.181.178.125.nip.io`;
- host: Oracle Linux, compartilhado com outros serviços;
- aplicação: contêiner `agrofort-web`;
- porta do host: `127.0.0.1:4188`;
- proxy: Nginx em 80/443;
- TLS: Let's Encrypt;
- rede Docker: `agrofort_internal`;
- releases: `/home/opc/apps/agrofort/releases/<AAAAMMDD-HHMMSS>`;
- release ativo: link `/home/opc/apps/agrofort/current`.

O contêiner usa filesystem somente leitura, usuário não privilegiado, capabilities removidas, `no-new-privileges`, limites de CPU, memória e processos, além de `tmpfs` apenas para temporários e cache.

## Validação local

```bash
npm ci
npm run check
npm run security:audit
docker compose -p agrofort config --quiet
docker compose -p agrofort build
```

## Criar e publicar um release

Não coloque `.env`, `.git`, chaves SSH, `node_modules` ou `.next` no pacote.

```bash
tar -czf agrofort-AAAAMMDD-HHMMSS.tar.gz \
  --exclude=.git --exclude=.next --exclude=node_modules --exclude=.env .

scp -i <SSH_KEY_PATH> agrofort-AAAAMMDD-HHMMSS.tar.gz \
  opc@64.181.178.125:/home/opc/apps/agrofort/incoming/

ssh -i <SSH_KEY_PATH> opc@64.181.178.125 \
  "bash /home/opc/apps/agrofort/current/deploy/deploy-remote.sh \
  AAAAMMDD-HHMMSS /home/opc/apps/agrofort/incoming/agrofort-AAAAMMDD-HHMMSS.tar.gz"
```

O script valida o Compose, constrói, inicia, espera o healthcheck, troca o symlink apenas depois da saúde confirmada e remove o arquivo recebido.

Depois de uma alteração de proxy:

```bash
ssh -i <SSH_KEY_PATH> opc@64.181.178.125 \
  "bash /home/opc/apps/agrofort/current/deploy/apply-nginx-hardening.sh"
```

O script cria backup, executa `nginx -t`, recarrega somente em configuração válida e restaura o arquivo anterior em caso de erro.

## Verificação pós-deploy

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://agrofort.64.181.178.125.nip.io/
curl -fsSI https://agrofort.64.181.178.125.nip.io/
curl -fsS https://agrofort.64.181.178.125.nip.io/.well-known/security.txt
docker inspect --format '{{.State.Health.Status}}' agrofort-web
docker logs --since 10m agrofort-web
sudo nginx -t
```

Verifique também `/catalogo`, `/premiacoes`, `/sobre`, `/contato`, `/privacidade`, `robots.txt`, `sitemap.xml` e um asset em `/_next/static/`.

## Rollback

1. Identifique o release anterior em `/home/opc/apps/agrofort/releases`.
2. Valide que ele contém `docker-compose.yml`.
3. Troque o symlink `current` para o release escolhido.
4. Execute `docker compose -p agrofort up -d --build` dentro desse release.
5. Aguarde o healthcheck e valide HTTP/HTTPS.
6. Se o proxy também mudou, restaure o backup específico de `/home/opc/apps/agrofort/backups/` e rode `sudo nginx -t` antes de recarregar.

Nunca remova releases durante uma resposta a incidente. Preserve evidências e garanta primeiro o serviço.

## Observabilidade

- acesso Nginx: `/var/log/nginx/agrofort.access.log`;
- erros Nginx: `/var/log/nginx/agrofort.error.log`;
- aplicação: `docker logs agrofort-web`;
- entrega de lead: evento JSON `agrofort.lead.delivery`, sem PII;
- saúde: `docker inspect` e endpoint raiz interno.

Alertas futuros recomendados: disponibilidade externa, validade do certificado, taxa de 4xx/5xx, rejeições 429, falha de webhook e uso de memória.

## Rotina

- semanal: Dependabot, `npm audit` e revisão de logs;
- mensal: rebuild da imagem base, restore/rollback simulado e varredura ZAP baseline;
- trimestral: revisão de acessibilidade, Core Web Vitals e jornada mobile real;
- anual: renovar evidências de pentest manual e revisar contatos/política de privacidade.
