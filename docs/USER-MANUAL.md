# Manual do sistema

## Para visitantes

### Explorar produtos

Na página inicial, use “Explorar o catálogo” ou abra “Catálogo” no menu. Os cartões apresentam queijos, pão de queijo e biscoitos. Em dispositivos compatíveis, a peça 3D pode ser arrastada com mouse ou dedo.

No catálogo interativo:

- setas avançam ou retornam;
- a faixa inferior seleciona diretamente um produto;
- o gráfico apresenta aroma, intensidade, textura e maturação;
- “Pedir pelo WhatsApp” abre uma conversa já identificando o produto.

As notas sensoriais são comunicação visual do catálogo e não certificação laboratorial.

### Conhecer a marca

- “Premiações” apresenta uma medalha de ouro e duas de prata do VIII Prêmio Queijo Brasil 2025;
- “Nossa história” explica a origem na Fazenda Barra Funda;
- o carrossel de Adenilde pode ser pausado, avançado, arrastado e operado pelas setas do teclado.

### Falar com a Agrofort

Em “Contato”, preencha nome, telefone, interesse e mensagem. Ao enviar:

1. o site prepara a conversa no WhatsApp;
2. se habilitada, a automação registra a solicitação para atendimento;
3. nenhuma compra é concluída no site.

Canais:

- WhatsApp: `(38) 9 9940-2015`;
- e-mail: `contato@fazendaagrofort.com.br`;
- Instagram: `@fazendaagrofort`.

## Acessibilidade

- pressione Tab no início da página para usar “Ir para o conteúdo principal”;
- o foco visível indica o elemento ativo;
- Enter/Espaço acionam botões;
- Escape fecha o menu mobile;
- setas esquerda/direita controlam o carrossel quando ele está focado;
- a preferência “reduzir movimento” do dispositivo desativa animações contínuas.

## Para a equipe Agrofort

### Atualizar textos e contato

- dados institucionais: `lib/site.ts`;
- catálogo e perfis: `lib/products.ts`;
- páginas: `app/<rota>/page.tsx`;
- SEO global: `app/layout.tsx`;
- privacidade: `app/privacidade/page.tsx`.

Mudanças de telefone exigem atualizar `phoneDisplay`, `phoneE164`, textos visíveis e testes. Use somente dígitos com código do país em `phoneE164`.

### Atualizar produtos

Cada item de `lib/products.ts` contém slug, nome, categoria, descrição, detalhe, tipo visual, cores e quatro notas de 0 a 100. Preserve slugs existentes para analytics e links comerciais.

Novas fotografias devem:

- ter autorização de uso;
- evitar metadados sensíveis;
- usar nomes descritivos;
- ser otimizadas antes do commit;
- receber texto alternativo que descreva a imagem sem repetir a legenda.

### Atualizar premiações

Confirme ano, edição, categoria e resultado com documento oficial antes de publicar. Evite inferir qual produto recebeu cada medalha sem evidência do certificado.

### Publicar com segurança

1. crie uma branch;
2. faça uma mudança pequena;
3. rode `npm run check` e `npm run security:audit`;
4. revise o diff e confirme ausência de segredos;
5. abra PR;
6. publique por release imutável;
7. valide produção e registre o identificador no relatório.

Consulte [Operação](OPERATIONS.md) para comandos e rollback.

## Solução de problemas

| Sintoma | Ação |
| --- | --- |
| 3D não aparece | aguarde entrada na viewport, teste WebGL e desative bloqueadores; o conteúdo textual continua funcional |
| carrossel não avança | verifique se está pausado, fora da tela ou se “reduzir movimento” está ativo |
| WhatsApp não abre | permita nova aba ou use o botão flutuante |
| formulário mostra erro de registro | a conversa pode já estar aberta; verifique logs e n8n pelo horário/eventId |
| site retorna 502 | cheque saúde do contêiner e porta 4188 |
| TLS/headers falham | rode `nginx -t`, confira certificado e aplique a configuração versionada |
