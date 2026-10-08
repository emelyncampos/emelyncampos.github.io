# Nova Home — adaptação do HTML fornecido

Branch `home-editorial-v2`, rota `/home-preview/`. Base de design e implementação: o HTML completo enviado pelo usuário, com conteúdo pessoal real em lugar do posicionamento fictício. Não é uma evolução da composição V3/V4.

## O que foi preservado

- Paleta original: pergaminho #F7F5F0, terroso #8C6D53, terrosoDark #664E3A, creme #EFECE6, cinzaTexto #5A5652 e suave #D8CEBF. Verde #28372D reservado a O Grão.
- Google Fonts Cormorant Garamond (300/400/500 e itálico 400) e Plus Jakarta Sans (300/400/500/600), mantendo a relação serif/sans do HTML-base.
- Cabeçalho fixo leve, menu desktop discreto, CTA contornado e menu fullscreen no mobile.
- Hero de duas colunas, retrato 4:5 com borda clara, título serifado grande com trecho itálico/terroso e dois CTAs. A foto real `assets/emelyn.webp` mantém a proporção original sem cortar o rosto. Não há mosaico ou texto sobre a fotografia.
- Bloco de conexão em duas colunas, com texto e fragmentos assimétricos; grid de projetos em 12 colunas, primeira linha 8/4 e segunda 4/8, continuando em 5/3/4. Mobile linear na ordem especificada.
- Ideias em quatro colunas, agora com números e linhas; Sobre com foto/texto; encerramento com fundo terrosoDark, redes e rodapé.

## Mudanças de conteúdo e comportamento

O conteúdo apresenta Emelyn como criadora dos próprios produtos, livros, jogos e experiências. Foram removidos métricas, etapas de serviço, depoimento, nomes fictícios, referências a clientes e CTAs comerciais. A busca automatizada no HTML final verifica todos os termos antigos especificados no briefing, além de Unsplash/placehold.

Os sete projetos aparecem uma vez como headings: Tenderness, O Grão, Histórias da Bíblia com Bento, Before You Read, PARALLAX, Até Que o Caos Nos Separe e E se você estiver fazendo a pergunta errada? (Lyn Campos). Tenderness mantém vinho e interfaces oficiais; O Grão tem composição contemplativa própria. O livro usa uma única imagem. Textos não dependem de hover para aparecer. Projetos com páginas reais usam links diretos; os demais preservam status/link fornecido, sem modais repetitivos.

O menu fullscreen do HTML-base usa `dialog` nativo: foco contido, ESC, botão de fechar, retorno ao acionador, seleção de âncora com foco na seção, bloqueio de rolagem e fechamento na mudança para desktop. Os links principais também ficam disponíveis sem JS.

## Assets e links pendentes

**Asset oficial do logo de O Grão ainda necessário.** Apenas o nome tipográfico é usado. Não foi encontrado asset canônico de Até Que o Caos Nos Separe; sua composição é tipográfica, sem embalagem ou cartas falsas, com status Em desenvolvimento.

LinkedIn e X permanecem sem href, preparados para receber URLs confirmadas. Instagram e TikTok usam as URLs fornecidas. Email atualizado para `contato@emelyncampos.com.br`. Bento mantém o link fornecido anteriormente; a confirmação externa desse destino foi bloqueada pelo proxy na rodada anterior.

Todos os assets dos projetos e o retrato permanecem intactos em suas páginas originais. As fontes Google são servidas localmente via Fontsource 5.3.0/OFL porque fonts.googleapis.com é bloqueado neste ambiente. Font Awesome 6.4.0 foi preservado, com CSS, webfonts e licença locais. A aplicação não ganhou dependências além das especificadas.

Tailwind continua via CDN (Browser 4.1.18/jsDelivr). A configuração do HTML-base foi transcrita para `@theme`, sem alterar seus tokens, para compatibilidade com esse CDN. O bridge de QA baixa os bytes reais com TLS verificado e o proxy configurado, pois a CA do ambiente não é reconhecida pelo Chromium. A página servida continua referenciando o CDN; não há mock nem desativação de TLS.

## Revisão visual e QA

Primeira rodada full-page em `/workspace/artifacts/home-html-base/round-1/`. Comparação com a estrutura do HTML fornecido verificou proporções, fotografia, tipografia, respiro, grid e encerramento. A rodada de refinamento corrigiu espaçamento duplicado no hero decorrente da diferença entre versões de Tailwind e manteve as distâncias do layout-base.

Screenshots finais: `qa/screenshots/html-base/home-preview-1440.png` e `home-preview-390.png`. Revisão independente confirmou fidelidade à família visual e não encontrou problemas bloqueantes. Um detalhe de ARIA no agrupamento de imagens foi corrigido.

QA em Chromium real: 320, 375, 390, 430, 768, 1024 e 1440 px. Verifica igualdade scrollWidth/clientWidth, imagens decodificadas, ausência de 404/erros JS, textos, headings, âncoras, sete projetos, uma imagem do livro, fonte carregada, Tailwind inicializado e conteúdo fictício ausente. Menu testado com Tab/Shift+Tab/ESC, âncoras, foco, bloqueio de rolagem e resize. Navegação sem JS e prefers-reduced-motion também testados. Quatro destinos locais dos projetos retornam HTTP 200.

Axe-core WCAG 2 A/AA e WCAG 2.1 A/AA registra violações e checks inconclusivos em `results.json`; zero violações detectadas nas sete larguras não equivale a certificação. Também houve revisão visual do contraste e dos enquadramentos.

Repetir: iniciar `python3 -m http.server 8000 --bind 127.0.0.1` na raiz do checkout e executar `python3 home-preview/qa/check.py`. Axe é aplicado quando o arquivo `/tmp/home-preview-tools/node_modules/axe-core/axe.min.js` existe; sua ausência significa auditoria adicional não executada.

`python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-html-base/preview.html`, com Tailwind compilado, Google Fonts, Font Awesome, imagens e menu incorporados. O arquivo foi validado offline em 390/1440, inclusive fontes, ícones e menu fullscreen. Não é uma publicação pública.

## Proteção da Home atual

Comparação `git diff --exit-code 0178259 -- . ':(exclude)home-preview/**'` sem mudanças. SHA-256 de `/index.html` preservado:

`c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`

Nenhum merge ou publicação oficial. O push já autorizado da branch permite acessar os screenshots pelo GitHub e não altera `main`. Uma URL pública navegável de preview ainda não está configurada; a entrega para aprovação usa os screenshots e a exportação autocontida.
