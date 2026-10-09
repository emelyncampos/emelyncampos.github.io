# Home V8 — referência como composição

Branch `home-editorial-v2`; rota `/home-preview/`. Reconstrução da composição V7 usando a referência-mestre como wireframe visual. Conteúdo, links, fotografia pessoal e assets reais preservados.

## Composição e segunda rodada

Capa única com nome em grande escala (Cormorant Garamond 300), retrato real a 46% da largura direita sem card, manifesto pequeno e navegação discreta. Forma oliva parcial invade o fim da capa e termina antes da borda direita. Nenhum botânico no hero. Papel visível conecta as áreas.

Sete projetos em área compacta: primeira linha Tenderness, O Grão, Bento e PARALLAX; segunda Before You Read, Até Que o Caos Nos Separe e livro. Imagens próximas em tamanho, metadados pequenos, títulos serifados, uma linha e setas. Tenderness tem uma fotografia e um mockup; O Grão usa o asset canônico; jogo apenas tipográfico; livro uma única imagem. Sem grandes cards de produto ou seções protagonistas separadas.

Ideias em terracota e Sobre em sálvia formam uma faixa horizontal única. Encerramento compacto em papel, arco com paisagem real de O Grão, acompanhamento, redes e contato. Rodapé oliva profundo. Moldura suave somente no contêiner externo, sem arredondar cada seção.

Comparação literal lado a lado em `qa/screenshots/v8/reference-vs-v8.png`, após duas rodadas visuais. Na segunda rodada foram refinados o contorno oliva, a integração da borda esquerda da fotografia, o enquadramento mobile e a escala do nome em tablet. A revisão independente encontrou o link do hero encoberto pela forma oliva: removida frase redundante e adicionado teste de hit testing nas sete larguras. Revisão posterior confirmou cliques reais levando a #projetos em todas elas.

Desktop: contêiner 1280 × 2399 px, comparado aos cerca de 5500 px da V7. Projetos limitados a menos de 800 px, com 4+3 alinhamentos verificados. A referência foi comparada pela densidade, proporção foto/texto, quantidade de áreas coloridas, curvas e ritmo vertical. A fotografia disponível é a selfie real escolhida pela usuária; nenhuma pose ou cenário foi inventado para reproduzir a outra pessoa da referência.

## QA

`qa/results-v8.json`: Chromium em 320, 375, 390, 430, 768, 1024 e 1440 px. ScrollWidth/clientWidth iguais; nenhuma imagem quebrada, 404, erro JS, texto cortado, âncora inexistente ou projeto ausente. Headings, fontes, menu/Tab/Shift+Tab/ESC/foco/resize, navegação sem JS e prefers-reduced-motion aprovados. Axe WCAG 2 A/AA e 2.1 A/AA: zero violações detectadas; inconclusivos registrados, sem alegação de certificação. Quatro destinos locais retornam 200; o destino externo Bento não é tratado como verificado.

Safe area calculada pelo enquadramento real: cabeça/rosto dentro da imagem nas sete larguras e sem texto ou controles sobrepostos. Screenshots full-page finais em `qa/screenshots/v8/home-preview-1440.png` e `home-preview-390.png`, inspecionados por inteiro junto da referência.

Exportação autocontida testada offline em 390/1440, com fontes, imagens, estilos, menu e nenhum overflow. `qa/preview-v8.zip` contém apenas index.html, sem CNAME ou configuração de produção.

## Reprodução

Na raiz: `python3 -m http.server 8000 --bind 127.0.0.1`. Dependências: Python Playwright, Chromium e axe-core 4.10.3 instalado em `/tmp/home-preview-tools/node_modules/axe-core`. Rodar `python3 home-preview/qa/check.py`. A ausência de axe interrompe a execução. `python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-v8/preview.html` autocontido. Tailwind Browser 4.1.18 autêntico, fontes locais e Font Awesome com licenças existentes. Bridge de QA mantém verificação TLS e usa o proxy configurado.

## Pendências e proteção

Asset oficial do logo de O Grão ainda necessário; nome apenas tipográfico. Asset canônico de Até Que o Caos Nos Separe pendente; nenhum mockup inventado. LinkedIn e X visualmente presentes sem href. Instagram, TikTok e email usam os dados fornecidos.

Sem infraestrutura configurada para preview público navegável independente. Não foi improvisado túnel ou deploy, alterado GitHub Pages/DNS/main ou substituída a Home oficial. Screenshots públicos após push da branch e ZIP isolado disponíveis para avaliação; URL navegável requer hospedagem de preview separada.

Comparação `git diff --exit-code 0178259 -- . ':(exclude)home-preview/**'` sem mudanças. `/index.html` SHA-256 `c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`. Nenhum merge ou publicação em produção. Push apenas da branch de trabalho autorizado anteriormente.
