# Home pessoal — direção editorial V3

Branch de trabalho: `home-editorial-v2`. Rota: `/home-preview/`.

## Arquitetura e direção

Capa tipográfica com três fragmentos reais: Tenderness, Bento e PARALLAX. A fotografia de mesa foi retirada. Tenderness é uma mini-landing vinho, com logo oficial, fotografia e uma interface; O Grão tem seção clara própria, nome tipográfico e paisagem canônica. O índice apresenta exatamente cinco entradas: Bento, Before You Read, PARALLAX, Até Que o Caos Nos Separe e o livro de Lyn Campos, com uma única imagem. Seguem conexão entre projetos, ideias, Sobre com a foto pessoal e quatro redes.

As composições preservam identidades diferentes. Não há carrossel, colagem de livros, seção Escritas & identidade, mockups novos, framework ou dependências de aplicação. No mobile o índice vira uma sequência vertical de número, imagem e texto. LinkedIn e X aparecem sem links enquanto suas URLs estão pendentes.

## Assets

Assets oficiais das páginas dos projetos foram reutilizados sem alteração. Bento usa `assets/bento-editorial.webp`: conversão lossless do PNG oficial, com igualdade de pixels RGBA verificada, reduzindo o arquivo de 664.506 para 396.824 bytes.

**Asset oficial do logo de O Grão ainda necessário.** Até seu fornecimento, a página usa somente o nome tipográfico, sem símbolo inventado. A paisagem oficial de O Grão tem resolução original de 1000 × 585; não foi substituída por imagem genérica.

Não foi encontrado asset canônico de Até Que o Caos Nos Separe; sua entrada é tipográfica e informa Em desenvolvimento. URLs de LinkedIn e X também permanecem pendentes. Instagram e TikTok usam exatamente as URLs fornecidas. O link de Bento foi preservado; sua verificação externa em rodada anterior foi bloqueada pelo proxy, portanto o destino externo não foi confirmado.

Assets antigos de hero permanecem nos arquivos, mas não são utilizados. Nenhuma página original dos projetos foi editada.

## QA

Validação em Chromium real nas larguras 320, 375, 390, 430, 768, 1024 e 1440 px:

- `document.documentElement.scrollWidth === document.documentElement.clientWidth` nas sete larguras.
- Imagens decodificadas, sem 404; sem textos cortados, âncoras inexistentes ou erros de console.
- Sete projetos com headings únicos, índice com cinco entradas e livro com somente uma imagem.
- Menu com teclado, ESC e retorno de foco; âncoras movem foco à seção. Navegação disponível sem JavaScript.
- `prefers-reduced-motion` respeitado.
- Axe-core WCAG 2 A/AA e WCAG 2.1 A/AA: zero violações detectadas nas sete larguras.
- Quatro destinos locais dos projetos retornaram HTTP 200.

Screenshots de página inteira: `/workspace/artifacts/home-editorial-v3/home-preview-1440.png` e `home-preview-390.png`; resultados em `results.json` no mesmo diretório. Revisão visual examinou capa, ritmo, hierarquia, índice, seção pessoal e fechamento. A quebra do título mobile foi refinada para evitar uma palavra isolada. Após revisão independente sem problemas importantes, legendas de 7–8 px foram ampliadas para 9 px e os testes foram repetidos. A exportação autocontida também passou em 390 e 1440 px com rede bloqueada, imagens decodificadas, estilos, menu e ausência de overflow. No teste de template, as identidades reais na abertura e as composições distintas de Tenderness, O Grão e índice sustentam a direção de journal.

## Repetir

Na raiz do repositório, servir com `python3 -m http.server 8000 --bind 127.0.0.1`. Com Python Playwright e Chromium disponíveis, executar `python3 home-preview/qa/check.py`. Axe é aplicado quando `/tmp/home-preview-tools/node_modules/axe-core/axe.min.js` existe; sem esse arquivo, a auditoria adicional não é executada.

`python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-editorial-v3/preview.html`, exportação autocontida para visualizadores de arquivos que não resolvem CSS e assets externos. A exportação incorpora imagens, CSS e JavaScript e aponta links de projetos para as páginas oficiais; não publica o site.

## Escopo protegido

A home oficial `/index.html` foi preservada. SHA-256 antes e depois:

`c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`

A comparação com o commit original `0178259`, excluindo `home-preview/**`, deve permanecer vazia. Todos os arquivos de aplicação alterados estão em `home-preview/`. Nenhum merge, push ou publicação em produção foi realizado. Entrega visual para aprovação.
