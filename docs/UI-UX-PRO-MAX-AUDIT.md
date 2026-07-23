# Auditoria UI/UX Pro Max

Data: 23 de julho de 2026

## Referência utilizada

Foi utilizado o repositório
[`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
na revisão `1307d97`, como checklist de heurísticas para acessibilidade,
responsividade, movimento, tipografia, interação e performance.

A saída automática sugeria uma paleta editorial preta e rosa. Essa sugestão foi
rejeitada por conflito com a identidade existente. Os princípios de interação
foram adaptados à paleta Agrofort — floresta, creme, terracota e ouro — e às
fontes Fraunces e Manrope. A fonte de verdade resultante está em
`design-system/agrofort/MASTER.md`.

## Diagnóstico

| Área | Achado | Tratamento |
| --- | --- | --- |
| Legibilidade | rótulos essenciais chegavam a 7–10 px | tamanhos críticos elevados para 11,2–12 px ou mais |
| Contraste | texto secundário sobre papel abaixo de 4,5:1 | `--muted` ajustado para `#5f6c63` |
| Alvos de toque | paginação, scroll cue e skip link menores que 44 px | áreas interativas elevadas para no mínimo 44 px |
| Cards de produto | foco não entrava no mini card nem voltava ao gatilho | foco movido para fechar e restaurado ao cartão |
| Radar sensorial | valores existiam apenas visualmente | alternativa textual com quatro notas de 0 a 100 |
| Movimento | algumas preferências eram lidas apenas no carregamento | listeners reativos e GSAP `matchMedia` |
| Performance | medalhas continuavam flutuando fora da viewport | animações pausam e retomam por interseção |
| Página de prêmios | 212 px de overflow horizontal em 1280 px | composição convertida para grade editorial de uma coluna |
| Formulário | envio não expunha estado ocupado | `aria-busy` durante a captura |

## Direção aplicada

- composição editorial orgânica com densidade espaçosa;
- hierarquia por tipografia, fotografia e contraste, não por cartões genéricos;
- transições de interface entre 150 e 300 ms;
- entradas editoriais entre 500 e 850 ms;
- deslocamentos menores e escala máxima de imagem em 1,06;
- parallax apenas em desktop;
- WebGL e canvas subordinados a conteúdo, acessibilidade e desempenho;
- CTAs com verbo específico e estado active;
- mobile em uma coluna, drawer acessível e controles de 44 px.

## Verificação no navegador

O ambiente local foi inspecionado em viewport desktop de 1280 × 720:

- `/`, `/catalogo`, `/premiacoes`, `/sobre` e `/contato` sem overflow
  horizontal após as correções;
- nenhum botão, link ou campo visível abaixo de 44 × 44 px;
- todos os controles visíveis possuem nome acessível;
- mini card de produto abre com foco no botão de fechar;
- ao fechar, o foco retorna ao produto que iniciou a interação;
- página de premiações passou de 212 px de overflow para zero;
- hero, catálogo, premiações, história de Adenilde e contato foram revisados
  visualmente.

A camada responsiva mantém breakpoints em 600, 820 e 1050 px. As regras mobile
foram revisadas para uma coluna, ausência de parallax, modo gráfico econômico,
campos de 16 px, rodapé do carrossel quebrável e alvos mínimos de 44 px.

## Critérios permanentes

Antes de publicar novas dobras:

1. conferir a regra mestre e o arquivo da página no design system;
2. testar 360, 768, 1024 e 1440 px;
3. medir overflow e alvos de toque;
4. navegar somente por teclado;
5. alternar movimento reduzido durante a sessão;
6. executar `npm run check` e `npm run security:audit`;
7. validar a página publicada e o healthcheck do contêiner.
