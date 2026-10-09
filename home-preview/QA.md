# Home V7 — reconstrução editorial completa

Branch `home-editorial-v2`; rota isolada `/home-preview/`. Referência-mestre: pôster editorial feminino em papel, oliva, terracota e sálvia enviado pelo usuário. A V7 substitui a composição anterior; não é um conjunto de ornamentos acrescentados à V5.

## Direção e arquitetura

Capa com “Construindo ideias em coisas reais.” em Cormorant Garamond de grande escala, fotografia pessoal sem borda ou sombra, nome em duas linhas e navegação discreta sobre o papel. Foto protagonista integrada ao limite da página. Mobile redesenhado com navegação, fotografia limpa, headline, manifesto e link editorial. Não há botânicos, símbolos ou texto sobre a fotografia.

A curva oliva nasce da área de papel e leva ao bloco de conexão. Uma curva clara retorna aos projetos. Tenderness ocupa área vinho assimétrica integrada ao papel, com logo oficial, uma fotografia e um único mockup. O Grão contrapõe paisagem oficial e tipografia contemplativa. Selected Work tem cinco peças distintas: Bento vertical/arco, Before You Read paisagem, PARALLAX largo e cinematográfico, jogo tipográfico orgânico e livro vertical com um único mockup. Sem cinco cards iguais, bordas decorativas ou sombras repetidas.

Ideias em terracota e Sobre em sálvia formam uma faixa conjunta. Encerramento em papel com quatro redes e rodapé oliva profundo. Fontes Cormorant Garamond e Plus Jakarta Sans; paleta solicitada preservada. Textura de papel muito discreta em CSS, sem efeitos ou novas bibliotecas.

Todos os sete projetos presentes: Tenderness; O Grão; Histórias da Bíblia com Bento; Before You Read; PARALLAX; Até Que o Caos Nos Separe; E se você estiver fazendo a pergunta errada? (Lyn Campos).

## Assets reais e pendências

Foto escolhida pelo usuário em `assets/emelyn-retrato.webp`, otimizada a partir do JPEG original sem mudança de identidade/composição (70.664 bytes contra 132.805). JPEG original preservado. Bento usa o WebP lossless já existente: dimensões e pixels RGBA comparados com PNG oficial, sem diferenças. Demais imagens são assets canônicos das páginas dos projetos. Nenhuma pessoa, interface, embalagem, carta ou logo foi inventado.

**Asset oficial do logo de O Grão ainda necessário.** Seu nome é apenas tipográfico. Não existe asset canônico confirmado do jogo; composição tipográfica com status Em desenvolvimento. LinkedIn e X sem href até receber URLs oficiais. Instagram/TikTok usam os links fornecidos. Bento conserva seu destino externo fornecido; esse destino não foi validado externamente pelo proxy. Quatro páginas locais dos projetos retornam 200.

## QA visual, refinamento e revisão

Primeira rodada full-page em `/workspace/artifacts/home-v7/round-1/`; comparada com a referência-mestre: fotografia dominante, serif editorial, equilíbrio papel/oliva/terracota, peças Selected Work com pesos próprios e ausência de ornamentos arbitrários. Na segunda rodada, a curva de transição foi limitada à área de papel para não atravessar fotografia/ombros e houve ajuste de respiro da capa. A auditoria completa corrigiu o contraste da legenda Sobre, passando a oliva profundo sobre sálvia. Screenshots finais `qa/screenshots/v7/home-preview-1440.png` e `home-preview-390.png`, revisados por inteiro. Revisão independente de código e imagens sem problemas bloqueantes.

Critérios visuais revisados: mesma família editorial da referência; fotografia protagonista; contraste de projetos respeitado; Selected Work sem grade uniforme; ornamentos removidos por não acrescentarem direção de arte; composição contínua com curvas e faixas compartilhadas. A V7 usa a foto real disponível, não reproduz a pose/cena de outra pessoa da referência.

`qa/results-v7.json`: QA Chromium em 320, 375, 390, 430, 768, 1024 e 1440 px. ScrollWidth/clientWidth iguais; nenhuma imagem quebrada, 404, erro JS, texto cortado, âncora inexistente ou projeto ausente. Menu fullscreen/Tab/Shift+Tab/ESC/foco/resize, navegação sem JS e prefers-reduced-motion aprovados. Headings e fontes validados. Axe WCAG 2 A/AA e 2.1 A/AA: zero violações detectadas; inconclusivos registrados, sem alegação de certificação.

Safe area calculada a partir do enquadramento real da foto, incluindo posição e escala object-fit: face/cabeça inteira dentro da imagem nas sete larguras; nenhum título, parágrafo, link ou controle de navegação a cruza. Inspeção visual confirmou cabelo, olhos, pescoço e ombros livres. Nenhum SVG ou botânico no hero.

## Reprodução e entrega isolada

Iniciar na raiz: `python3 -m http.server 8000 --bind 127.0.0.1`. Instalar a ferramenta de auditoria: `npm install --prefix /tmp/home-preview-tools --cache /tmp/home-preview-npm-cache --no-audit --no-fund --save-exact axe-core@4.10.3`. Rodar `python3 home-preview/qa/check.py`; a ausência do axe agora interrompe a execução em vez de pular silenciosamente a auditoria. `python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-v7/preview.html` autocontido. Exportação validada offline em 390/1440, com imagens, fontes, estilos, menu e zero overflow. `qa/preview-v7.zip` contém apenas esse HTML como index.html, sem CNAME/DNS/configuração do site oficial, pronto para deploy em hospedagem de preview separada.

Tailwind Browser 4.1.18 via CDN; fontes Google e Font Awesome locais com licenças existentes. Bridge de QA baixa bytes autênticos do CDN usando TLS verificado e proxy configurado; não altera a aplicação nem desativa validação TLS.

## Publicação e proteção do site

Nenhuma infraestrutura de preview público independente configurada no checkout/ambiente: sem workflow de deploy, serviço de hospedagem, segredo ou identidade correspondente. Não foi criado túnel, alterado GitHub Pages, DNS ou `main`. Conforme instrução anterior de não improvisar publicação, a entrega usa screenshots públicos no GitHub e pacote isolado. URL pública navegável permanece pendente de hospedagem separada; opção segura é publicar o ZIP em um site de preview separado no Netlify/Cloudflare Pages, sem vincular o domínio oficial.

Comparação `git diff --exit-code 0178259 -- . ':(exclude)home-preview/**'` sem mudanças. `/index.html` SHA-256 `c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`. Nenhum merge ou publicação em produção. Push apenas da branch de trabalho já autorizado para disponibilizar a entrega visual.
