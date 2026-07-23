# Histórico de mudanças

Este projeto segue versionamento semântico para releases planejadas. As datas usam o fuso de Brasília.

## [Não publicado]

### Adicionado

- design system Agrofort com regras globais e especializações para home,
  catálogo e contato;
- auditoria UI/UX baseada nas heurísticas do UI UX Pro Max;
- alternativa textual acessível para o radar sensorial;
- testes unitários e de contrato para domínio, site e endpoint de leads;
- scripts unificados para lint, tipos, testes, build e auditoria de dependências;
- documentação completa de arquitetura, operação, webhook, testes, segurança e uso;
- `security.txt` para divulgação responsável;
- configuração Nginx de produção versionada e script transacional de aplicação;
- relatórios brutos do ZAP antes e depois do hardening.

### Alterado

- tipografia auxiliar, contraste, alvos de toque e feedback active refinados;
- mini cards de produto agora movem e restauram o foco;
- animações GSAP, Anime.js, canvas e carrossel reagem a movimento reduzido e
  pausam quando não estão visíveis;
- página de premiações reorganizada para eliminar overflow horizontal;
- formulário expõe estado ocupado durante o envio;
- carregamento WebGL por proximidade da viewport;
- modo gráfico adaptativo em mobile e para preferência de movimento reduzido;
- partículas e carrossel pausam fora da viewport;
- menu mobile transformado em drawer acessível com backdrop, Escape e bloqueio de rolagem;
- alvos de toque, foco visível, navegação por teclado e link de salto refinados;
- formulário abre o WhatsApp dentro do gesto do usuário e captura o lead em paralelo;
- imagens abaixo da dobra deixaram de ser pré-carregadas;
- cabeçalhos de segurança movidos para o escopo completo do servidor Nginx.

### Segurança

- PostCSS e Sharp atualizados por overrides auditados;
- endpoint de leads agora valida tipo, origem, tamanho, JSON, campos e honeypot;
- rate limiting em aplicação e Nginx;
- webhook com timeout, retry seletivo, idempotência e logs sem PII;
- IP do cliente passa a vir de cabeçalho controlado pelo proxy;
- versão do Nginx ocultada e acesso público restrito a HTTP, HTTPS e SSH pelo firewall.

### Removido

- exportação TypeScript sem consumidor e seletor CSS morto.
