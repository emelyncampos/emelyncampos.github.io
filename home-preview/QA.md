# Emelyn Campos — Editorial / Creative Journal V4

Branch: `home-editorial-v2`. Rota de trabalho: `/home-preview/`. Esta versão substitui a composição V3 somente na preview.

## Direção e comparação visual

A imagem anexada ao briefing V4 é a referência principal, usada para composição, escala, serifas, tons terrosos, proporções e ritmo vertical. Não foi tratada apenas como inspiração.

- Capa: mensagem grande à esquerda, destaque terroso em “coisas reais.”; quatro peças de Tenderness, O Grão, Bento e PARALLAX à direita, com bordas de papel e deslocamentos controlados. Mobile: mensagem, manifesto, CTA e quatro peças abaixo do texto.
- Tenderness: faixa vinho com logo oficial, texto, uma interface de consulta e fotografia oficial. A interface de memórias aparece na capa. No mobile, CTA depois da dupla imagem/interface.
- O Grão: faixa contemplativa com imagem à esquerda e texto à direita no desktop; mobile texto antes da paisagem.
- Outros projetos: cinco peças editoriais em uma única linha a partir de 768 px; abaixo de 700 px, lista vertical legível sem carrossel.
- Fechamento: pergunta de ideias, Sobre com retrato pessoal somente ali e quatro redes. O bloco conceitual separado da V3 foi retirado.

Primeira rodada de screenshots em `/workspace/artifacts/home-editorial-v4/round-1/`. Depois da comparação com a referência, a segunda rodada ajustou contraste do logo sobre o vinho, legibilidade das legendas, posição de legendas fora das sobreposições e enquadramento completo do Bento. Screenshots finais: `qa/screenshots/v4/home-preview-1440.png` e `home-preview-390.png`.

Os assets reais prevalecem sobre os ilustrados na referência. Bento é o personagem oficial existente, sem redesenho. PARALLAX usa seu still life oficial, não uma imagem de suspense inventada. O Grão mantém a paisagem canônica, sem substituir por fotografia genérica de Bíblia. O livro aparece somente uma vez, com um único mockup oficial.

## Tecnologia

HTML5 semântico, Tailwind CSS Browser 4.1.18 via jsDelivr CDN, CSS customizado para direção de arte e responsividade, JavaScript mínimo para o menu.

Google Fonts Cormorant Garamond (400/500/600) e Inter (400/500), distribuídas localmente via Fontsource 5.3.0, com licenças OFL em `assets/fonts/`. O subconjunto Latin contém os caracteres portugueses usados. O endpoint fonts.googleapis.com é bloqueado pelo proxy; servir as fontes localmente preserva a tipografia no ambiente e na preview.

Chromium possui uma base de CAs separada e inicialmente recusou o certificado do proxy ao acessar o CDN. O helper `qa/cdn_bridge.py` baixa os bytes autênticos do URL fixo usando urllib, proxy e TLS verificado, e entrega a resposta ao browser para QA. A página real continua usando o CDN. A inicialização real do Tailwind é verificada pelo script de QA; não é substituído por um mock, e TLS não foi desativado.

## Projetos e pendências

Os sete projetos estão presentes com headings únicos: Tenderness, O Grão, Histórias da Bíblia com Bento, Before You Read, PARALLAX, Até Que o Caos Nos Separe e E se você estiver fazendo a pergunta errada? (Lyn Campos).

**Asset oficial do logo de O Grão ainda necessário.** A página usa somente O Grão em tipografia editorial, sem símbolo improvisado.

Nenhum asset canônico de Até Que o Caos Nos Separe foi encontrado. A peça é tipográfica, sem embalagem ou cartas inventadas, e informa Em desenvolvimento. URLs de LinkedIn e X continuam pendentes, sem href falso. Instagram e TikTok usam as URLs confirmadas. O link de Bento é o fornecido no briefing anterior; a verificação externa foi bloqueada pelo proxy naquela rodada.

Nenhum arquivo ou imagem das páginas originais dos projetos foi editado.

## Validação

Executar `python3 -m http.server 8000 --bind 127.0.0.1` na raiz do repositório e, em outro terminal, `python3 home-preview/qa/check.py`.

O QA usa Chromium real e testa 320, 375, 390, 430, 768, 1024 e 1440 px: igualdade entre scrollWidth e clientWidth, imagens decodificadas, ausência de 404/erros de console, headings e âncoras, Tailwind inicializado e fonte carregada. Menu testado com Tab, Shift+Tab, ESC e foco na seção. Navegação disponível sem JS; movimento reduzido respeitado. Quatro destinos locais dos projetos retornam HTTP 200.

A checagem de texto distingue overflow visível dos glifos da serif de um corte real por overflow hidden/clip; a largura continua sendo verificada. A revisão visual examina também as legendas das peças sobrepostas.

Axe-core WCAG 2 A/AA e WCAG 2.1 A/AA: zero violações detectadas nas sete larguras; verificações incompletas de contraste/atributos são registradas no relatório. Contraste sobre fotografias e enquadramentos também são examinados visualmente. Não se trata de uma certificação de acessibilidade.

`python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-editorial-v4/preview.html`, com CSS produzido pelo Tailwind, fontes e imagens incorporados e JS do menu inline. A exportação foi testada em 390 e 1440 px com requisições externas bloqueadas: imagens, fontes, estilos, overflow e menu. É um arquivo de avaliação; não publica a página.

## Proteção da Home oficial

A comparação `git diff --exit-code 0178259 -- . ':(exclude)home-preview/**'` permanece vazia. `/index.html` mantém o SHA-256 original:

`c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`

Revisão independente final sem problemas bloqueantes; conferiu também legendas e exportação offline.

Nenhum merge ou publicação oficial. O push da branch de preview, autorizado anteriormente, apenas disponibiliza os arquivos e screenshots no GitHub para avaliação pelo celular; não altera `main` nem a publicação do GitHub Pages.
