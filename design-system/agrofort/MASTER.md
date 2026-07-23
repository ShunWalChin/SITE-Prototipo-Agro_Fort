# Agrofort — design system mestre

Data de consolidação: 23 de julho de 2026

Direção: editorial orgânico, artesanal, premium e imersivo

Dials: variação 7/10, movimento 6/10, densidade 3/10

Este arquivo é a fonte de verdade visual do site. Regras específicas em
`design-system/agrofort/pages/` podem especializar este documento sem alterar a
identidade global.

## Princípios

1. O produto real e as pessoas vêm antes do efeito.
2. A experiência deve remeter ao Norte de Minas sem recorrer a clichês rurais.
3. O 3D enriquece a descoberta, mas nunca bloqueia conteúdo, navegação ou CTA.
4. Movimento comunica hierarquia e continuidade; não compete com a leitura.
5. Todo fluxo funciona com teclado, toque, leitor de tela e movimento reduzido.
6. Mobile é uma composição própria, não uma versão comprimida do desktop.

## Identidade

### Cores

| Papel | Token | Valor | Uso |
| --- | --- | --- | --- |
| Floresta | `--forest` | `#073e2a` | marca, fundos e ações principais |
| Floresta profunda | `--forest-deep` | `#03291c` | hero, rodapé e superfícies imersivas |
| Creme | `--cream` | `#f4eddf` | texto sobre verde e fundos quentes |
| Papel | `--paper` | `#fbf7ee` | superfície editorial |
| Terracota | `--terracotta` | `#a84423` | ação, destaque e origem |
| Ouro | `--gold` | `#d4a849` | premiações e acentos seletivos |
| Tinta | `--ink` | `#15372a` | texto principal |
| Texto secundário | `--muted` | `#5f6c63` | texto de apoio sobre papel |

`--muted` sobre `--paper` mantém contraste superior a 4,5:1. Ouro não deve ser
usado como texto pequeno sobre creme. Rosa, roxo e gradientes genéricos não
pertencem à identidade Agrofort.

### Tipografia

- Display: Fraunces, serifada, para títulos e falas de marca.
- Interface e leitura: Manrope, sem serifa, para texto, navegação e controles.
- Corpo: mínimo de `16px`; texto auxiliar essencial: mínimo de `12px`.
- Títulos usam quebra editorial intencional, nunca uma coluna de palavras soltas.
- Caixa alta exige espaçamento entre letras e frases curtas.
- Comprimento ideal de parágrafo: 45–72 caracteres por linha.

### Espaçamento e forma

| Token | Valor |
| --- | --- |
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `24px` |
| `--space-lg` | `32px` |
| `--space-xl` | `48px` |
| `--space-2xl` | `64px` |
| `--space-3xl` | `96px` |

- Densidade espaçosa; seções devem respirar.
- Raios discretos em UI e assimétricos apenas em elementos orgânicos.
- Sombras são quentes e suaves. Profundidade principal vem de composição,
  contraste e sobreposição, não de cartões genéricos.

## Componentes

### Ações

- Altura mínima clicável: `44px`.
- CTA principal: fundo sólido, alto contraste e verbo específico.
- CTA secundário: contorno ou link sublinhado; não imita a ação principal.
- Estados obrigatórios: repouso, hover, active, focus-visible, disabled e busy.
- Ícones são Lucide, decorativos quando o rótulo já comunica a ação.

### Cartões e vitrines

- A imagem ou modelo é o foco; metadados ficam em segundo plano.
- Cartão clicável tem um único alvo semântico e feedback no hover/active.
- Detalhes expansíveis movem foco para o painel e devolvem foco ao gatilho.
- Produto real e ilustração 3D devem ser identificáveis sem depender de cor.

### Formulários

- Rótulo sempre visível; placeholder é exemplo, não substitui o rótulo.
- Inputs usam `16px` no mobile para evitar zoom automático.
- Erro e sucesso são anunciados em região viva.
- Durante envio, o formulário expõe estado busy e impede duplo envio.

### Carrossel

- Controle manual sempre disponível.
- Autoplay pausa fora da viewport, no hover, no foco e com movimento reduzido.
- Estado atual é anunciado e navegação por setas funciona pelo teclado.
- Paginação e botões mantêm área de toque mínima de `44px`.

## Movimento

| Tipo | Duração | Uso |
| --- | --- | --- |
| Feedback | 150–200ms | active, hover e foco |
| Transição de UI | 220–300ms | menus, popovers e estados |
| Entrada editorial | 500–850ms | títulos, imagens e seções |

- Curva padrão: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Revelações percorrem no máximo 24–48px.
- Escala de imagem começa no máximo em `1.06`.
- Parallax com scrub existe apenas acima de 820px.
- Animações pausam fora da viewport e reagem a mudanças de
  `prefers-reduced-motion` durante a sessão.
- Em movimento reduzido, conteúdo aparece estático e imediatamente.

## Responsividade

### 360–600px

- Uma coluna, títulos fluidos e zonas clicáveis de `44px`.
- Sem parallax; WebGL usa DPR e efeitos reduzidos.
- Carrossel mostra a imagem ativa e uma sugestão controlada da próxima.
- CTAs principais ocupam largura suficiente para toque, sem criar overflow.

### 601–820px

- Composição híbrida; grades podem usar duas colunas quando houver espaço real.
- Navegação continua no drawer.
- Galerias priorizam imagem e legenda, sem sobreposição apertada.

### 821–1199px

- Layout editorial em duas colunas.
- Parallax sutil permitido.
- Títulos usam `clamp()` e largura máxima para preservar ritmo.

### 1200px ou mais

- Shell máximo controla comprimento de linha e evita conteúdo disperso.
- Áreas vazias são intencionais e equilibradas pelo produto ou fotografia.

## Desempenho

- `next/image` define `sizes`; apenas imagens críticas usam prioridade.
- Canvas/WebGL inicializa por proximidade da viewport.
- Mobile e movimento reduzido usam modo gráfico econômico.
- Loops de canvas e Anime.js param quando invisíveis.
- Layout não pode mudar durante carregamento de imagem, fonte ou modelo.

## Acessibilidade

- Contraste WCAG AA: 4,5:1 para texto normal e 3:1 para texto grande/UI.
- Ordem de foco segue a ordem visual.
- `focus-visible` nunca é removido sem substituto equivalente.
- Gráficos possuem alternativa textual com os valores completos.
- SVG decorativo usa `aria-hidden`.
- Conteúdo nunca depende exclusivamente de hover.
- Navegação é testada em 360, 768, 1024 e 1440px.

## Checklist de entrega

- [ ] Sem overflow horizontal entre 320 e 1440px.
- [ ] Controles com nome acessível e alvo mínimo de 44px.
- [ ] Contraste AA nas combinações utilizadas.
- [ ] Foco visível e restaurado em menus/popovers.
- [ ] Movimento reduzido aplicado de forma reativa.
- [ ] Imagens com dimensões, `sizes` e texto alternativo útil.
- [ ] Sem autoplay ativo fora da viewport.
- [ ] Formulários com busy, feedback e prevenção de reenvio.
- [ ] Lint, TypeScript, testes, build e auditoria aprovados.
- [ ] Verificação visual desktop e mobile concluída.
