# Home editorial v2 — preview

Branch: `home-editorial-v2`. Rota: `/home-preview/`.

Reconstrução estática em HTML, CSS e JavaScript mínimo. Não há framework, instalação de dependências do site ou etapa de build. O menu é uma navegação expansível, não uma janela modal: ESC devolve foco ao botão, selecionar uma âncora move foco para a seção, e sair do cabeçalho fecha o menu.

## Escopo e proteção

Todos os arquivos de aplicação alterados ou adicionados estão em `home-preview/`. A home oficial e as páginas e identidades dos projetos foram preservadas. Nenhum merge ou push foi realizado.

SHA-256 de `/index.html` antes e depois da reconstrução:

`c2efb7669125cd06189c978a9d3c42a4862420be8b54edd73a3e5076e5b02b0c`

Projetos presentes:

- Tenderness
- O Grão
- Histórias da Bíblia com Bento
- Before You Read
- PARALLAX
- Até Que o Caos Nos Separe
- E se você estiver fazendo a pergunta errada?

## Referência e refinamento visual

A referência desktop/mobile enviada na conversa orientou o hero fotográfico com texto à esquerda, as serifas e o itálico, o papel quente com bordas irregulares, a proporção entre os dois destaques, a faixa compacta de outros projetos, a pausa com paisagem e o encerramento pessoal.

O briefing escrito prevaleceu sobre itens desatualizados na imagem: os cinco projetos secundários exigidos foram preservados, sem Planner, e o mobile usa uma lista sem carrossel ou itens parcialmente visíveis. As interfaces de Tenderness são assets oficiais em uma área separada do texto. O Grão usa sua fotografia canônica; o tablet da referência não foi recriado, pois o briefing proíbe interfaces e mockups inventados.

Foram capturadas e examinadas páginas completas em 1440 px e 390 px antes e depois do refinamento. A rodada adicional ajustou a escala do hero, ampliou as interfaces oficiais, retirou o painel de identidade que ficava pequeno demais para leitura, aumentou a legibilidade dos textos e criou uma composição fotográfica mobile própria. O título e a linha editorial ficam na região livre da foto, acima da pessoa. A seção Lyn Campos permanece tipográfica, sem colagem ou miniaturas de materiais editoriais.

## Assets e lacunas

- `assets/hero-workspace.webp`, já presente no repositório, não é decodificável como imagem. Foi preservado, mas não é usado pela nova página.
- `assets/hero-reference.webp` é uma reconstrução **gerada por IA** da cena fotográfica da referência aprovada, não a fotografia original nem um retrato real de Emelyn. `assets/hero-mobile.webp` é uma edição dessa reconstrução para o mobile. A pessoa aparece de costas. A fotografia original aprovada continua sendo a substituição ideal se estiver disponível.
- `assets/thoughts-landscape.webp` é uma paisagem **gerada por IA** para a pausa de ideias, seguindo a atmosfera da referência. Não é um asset oficial de nenhum projeto.
- O Grão mantém o arquivo oficial `/o-grao/assets/ograo-editorial-manifesto.webp`; sua definição original é limitada. Não houve alteração dessa fotografia, criação de telas ou invenção de identidade.
- Não foi encontrado um asset canônico de Até Que o Caos Nos Separe. A apresentação é temporária e tipográfica, com status “Em desenvolvimento”, sem inventar embalagem ou cartas. PARALLAX mantém sua imagem própria e aparece separado.
- Bento, Before You Read, Tenderness, o livro e o retrato pessoal usam os arquivos existentes, sem modificar os originais.
- Não foi encontrada uma URL confirmada para X. O link foi omitido. Substack aparece como “Em breve”, sem link fictício.

## QA executado

Larguras: **320, 375, 390, 430, 768, 1024 e 1440 px**.

Em todas: sete projetos visíveis; um único h1 e hierarquia de headings sem saltos; imagens decodificáveis; recursos locais sem respostas HTTP de erro; âncoras existentes; textos sem corte; conteúdo dentro da tela; `document.documentElement.scrollWidth === document.documentElement.clientWidth`; console sem erros.

Menu: abertura, fechamento, ESC, retorno de foco, Tab/Shift+Tab, foco na seção selecionada. Navegação disponível com JavaScript desativado. `prefers-reduced-motion` respeitado.

Auditoria axe-core 4.10.3 para WCAG 2 A/AA e WCAG 2.1 A/AA: **zero violações detectadas nas sete larguras**. Isso não equivale a uma certificação de acessibilidade; leitura sobre fotografias e fidelidade visual foram examinadas manualmente.

Destinos locais verificados com HTTP 200:

- `/tenderness/pt/`
- `/o-grao/`
- `/before-you-read/pt-br/`
- `/e-se-voce-estiver-fazendo-a-pergunta-errada/`

O link de Bento foi preservado exatamente como indicado: `https://share.google/jYHuJXqDNkUQ7qqxu`. A tentativa de acessá-lo retornou um bloqueio do proxy de saída (`CONNECT tunnel failed`, HTTP 403), portanto o destino externo não pôde ser confirmado neste ambiente. Não foi substituído por uma URL inventada. Instagram e TikTok usam as URLs confirmadas no briefing.

Checagens adicionais: sintaxe de `assets/home.js`, `git diff --check`, hash da home oficial e revisão independente do código sem problemas críticos ou importantes.

## Repetir a validação

Na raiz do checkout, inicie um servidor em um terminal:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Em outro terminal, com Python Playwright e Chromium disponíveis:

```sh
python3 home-preview/qa/check.py
node --check home-preview/assets/home.js
git diff --check
```

O script grava screenshots completos e `results.json` em `/workspace/artifacts/home-editorial-v2/`. Esses arquivos são evidências de QA fora do checkout, não arquivos servidos pela aplicação.

A auditoria axe é executada quando `/tmp/home-preview-tools/node_modules/axe-core/axe.min.js` existe. Para prepará-la sem adicionar dependências ao site:

```sh
npm install --prefix /tmp/home-preview-tools --cache /tmp/home-preview-npm-cache --no-package-lock --ignore-scripts --no-audit --no-fund axe-core@4.10.3
```

Se axe não estiver disponível, o relatório contém uma lista vazia em `accessibility`; isso significa que essa auditoria adicional não foi executada, não que ela passou.

## Publicação

Esta entrega é uma preview na branch de trabalho. Não substitui a home oficial, não foi mesclada a `main` e não foi publicada no site. Publicar um ambiente Codex também não publica automaticamente alterações no GitHub Pages.
