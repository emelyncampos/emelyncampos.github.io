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
