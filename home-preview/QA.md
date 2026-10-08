# Home V5.2 — refinamento visual

Refinamento da V5, sem reconstruir o HTML ou mudar o posicionamento. Branch `home-editorial-v2`, escopo exclusivo de `/home-preview/`.

## O que mudou abaixo do hero

- Tenderness: base vinho com cantos variados e fotografia em arco; uma interface oficial permanece sobreposta apenas na área visual.
- O Grão: recorte paisagístico com curvas opostas e separação por linha fina no texto.
- Selected Work: composição em 12 colunas com pesos distintos. Bento vertical em arco; Before You Read menor, horizontal e deslocado; PARALLAX em faixa ampla escura com imagem cinematográfica e texto; jogo tipográfico em terracota com curva; livro com imagem vertical em moldura arqueada e texto separado.
- Mobile preserva a ordem dos cinco projetos, variando largura, proporção, altura e enquadramento. Não há carrossel nem peças cortadas na lateral.
- Ideias e encerramento ganharam uma curva discreta na transição; Sobre ganhou linha fina e respiro. Paleta, fontes, textos, sete projetos, assets e URLs permanecem.

## QA da V5.2

Screenshots full-page finais: `qa/screenshots/v5-2/home-preview-1440.png` e `home-preview-390.png`. Revisão de página completa e inspeção ampliada de Selected Work confirmaram hierarquia, variação de proporções e continuidade dos arcos/curvas. A área deixou de usar três thumbnails de mesma altura/peso visual. Não foram criadas imagens ou embalagens fictícias.

Header e hero foram preservados integralmente: comparação pixel a pixel dos screenshots antes/depois em 1440 e 390 px não encontrou diferenças até o fim do hero. Evidência em `qa/visual-check-v5-2.json`. O HTML e o JS não foram alterados nesta rodada.

QA técnico passou em 320, 375, 390, 430, 768, 1024 e 1440 px: scrollWidth/clientWidth iguais; nenhuma imagem quebrada, erro HTTP, erro JS, texto truncado ou projeto ausente; menu com teclado/ESC/foco, navegação sem JS e reduced-motion preservados. Axe detectou zero violações em todas as larguras; checks inconclusivos estão registrados em `qa/results-v5-2.json` e não equivalem a certificação de acessibilidade.

A exportação autocontida foi validada offline em 390/1440, incluindo imagens, fontes, estilos, ícones e menu. Comandos atuais: `python3 home-preview/qa/check.py` e `python3 home-preview/qa/export_preview.py`, após servidor HTTP local na raiz. Saídas em `/workspace/artifacts/home-v5-2/`.

Pendências mantidas: logo oficial de O Grão, asset canônico do jogo, URLs confirmadas de LinkedIn e X. Não há nova dependência, asset externo ou alteração na fotografia.

`/index.html` intacto; SHA-256 `c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`. Nenhum merge ou publicação em produção. O push da branch de preview permite acessar os screenshots públicos no GitHub.

---

## Registro da V5 anterior

# Home V5 — sistema visual oficial

Branch `home-editorial-v2`; rota `/home-preview/`. Reconstrução baseada na estrutura HTML fornecida e nas três referências de portfólio editorial orgânico enviadas pelo usuário. A fotografia escolhida pelo usuário foi preservada sem edição em `assets/emelyn-retrato.jpg`.

## Composição

Cormorant Garamond + Plus Jakarta Sans, pergaminho #F7F5F0 e creme #EFECE6, terracota #A86F55/#7B5341 e oliva #66705C/#414B3D. Hero em duas colunas com retrato em arco, contorno fino, texto separado da foto e dois CTAs. Mobile usa fotografia seguida da mensagem. O bloco de conexão tem silhueta oliva curva e elemento botânico linear discreto; não há métricas ou conteúdo comercial.

Tenderness e O Grão têm região própria: vinho com logo, uma fotografia e uma interface no primeiro; paisagem oficial, curva e texto contemplativo no segundo. Selected Work usa três colunas no desktop, com imagens e texto separados por linhas; a segunda linha combina composição tipográfica do jogo e livro em proporção assimétrica. No mobile, os cinco projetos formam uma sequência vertical. Ideias usa duas colunas no desktop e uma no mobile. Sobre é tipográfico para evitar repetir o retrato. Encerramento terracota inclui redes e rodapé de 2026.

Projetos presentes, uma vez como headings: Tenderness; O Grão; Histórias da Bíblia com Bento; Before You Read; PARALLAX; Até Que o Caos Nos Separe; E se você estiver fazendo a pergunta errada? (Lyn Campos). Não há imagens inventadas, placeholders, pessoas fictícias, embalagens ou cartas falsas. Bento preserva o personagem oficial. O livro usa uma única imagem.

## Assets e links pendentes

**Asset oficial do logo de O Grão ainda necessário.** Apenas seu nome tipográfico é usado. Não foi encontrado asset canônico de Até Que o Caos Nos Separe; a peça é tipográfica com status Em desenvolvimento.

LinkedIn e X permanecem visíveis sem href, aguardando URLs confirmadas. Instagram, TikTok e email usam os destinos fornecidos. Bento mantém o link fornecido; sua validação externa foi bloqueada pelo proxy na rodada anterior. Quatro páginas locais dos projetos retornaram HTTP 200.

## QA e segunda rodada

Página real aberta em Chromium; screenshots full-page de primeira rodada em `/workspace/artifacts/home-v5/round-1/`. Comparação visual com as três referências verificou arco, curvas, paleta, ritmo editorial e hierarquia dos projetos. A segunda rodada corrigiu a ordem do Tenderness no mobile (texto/CTA antes das imagens), refinou a curva oliva e acrescentou um desenho botânico discreto. Também aumentou o contraste de duas legendas no rodapé.

Screenshots finais em `qa/screenshots/v5/home-preview-1440.png` e `home-preview-390.png`. Revisão independente de código e screenshots sem problemas bloqueantes.

`qa/results-v5.json` contém os resultados: 320, 375, 390, 430, 768, 1024 e 1440 px; igualdade scrollWidth/clientWidth em todas; nenhuma imagem quebrada, HTTP 404, erro JS, texto truncado, âncora inexistente ou projeto ausente. Fontes e Tailwind carregados. Menu nativo fullscreen testado com Tab, Shift+Tab, ESC, retorno de foco, seleção de âncora, bloqueio de rolagem e resize. Navegação sem JS e prefers-reduced-motion também passaram.

Axe-core WCAG 2 A/AA e 2.1 A/AA: zero violações detectadas nas sete larguras; checks inconclusivos registrados no JSON. Isso não equivale a certificação. Revisão visual complementou contraste e enquadramentos.

Repetir: iniciar `python3 -m http.server 8000 --bind 127.0.0.1` na raiz e executar `python3 home-preview/qa/check.py`. Axe depende do pacote já instalado em `/tmp/home-preview-tools/node_modules/axe-core/axe.min.js`; se ausente, essa auditoria adicional não é executada.

Tailwind Browser 4.1.18 continua via CDN, com tokens @theme. Google Fonts são servidas localmente com licenças OFL porque fonts.googleapis.com é bloqueado no ambiente. Font Awesome 6.4.0 e suas licenças locais permanecem. O bridge de QA recebe bytes autênticos do CDN através do proxy/TLS verificado, sem desligar verificação de certificados.

`python3 home-preview/qa/export_preview.py` gera `/workspace/artifacts/home-v5/preview.html` autocontido. Exportação validada offline em 390/1440 com estilos, fontes, imagens, ícones e menu; não é uma publicação pública.

## Proteção da Home oficial

`git diff --exit-code 0178259 -- . ':(exclude)home-preview/**'` sem alterações. SHA-256 de `/index.html` preservado: `c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`.

Nenhum merge, substituição da Home ou publicação em produção. Push da branch de preview já autorizado permite acessar os screenshots no GitHub. Não há infraestrutura configurada para URL pública navegável de uma branch isolada; não foi improvisado deploy.
