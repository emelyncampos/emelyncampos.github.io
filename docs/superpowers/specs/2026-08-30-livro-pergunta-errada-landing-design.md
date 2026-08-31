# Landing — E se você estiver fazendo a pergunta errada? — Design

## Objetivo
Criar uma landing pública, editorial e contemplativa para o livro “E se você estiver fazendo a pergunta errada?”, de Lyn Campos, sem alterar a home principal do site.

## URL
`/e-se-voce-estiver-fazendo-a-pergunta-errada/`

## Princípio narrativo
A landing não responde à pergunta do título. Ela conduz o visitante a perceber por que talvez exista uma pergunta anterior às respostas que procura.

O eixo narrativo parte da pergunta presente no manuscrito — “Senhor, o que o Senhor quer de mim?” — e desloca o foco para “Quem é o Deus que me chama?”. O livro será apresentado como jornada bíblica, intelectual e espiritual, não como autoajuda, método, fórmula ou promessa de respostas rápidas.

## Arquitetura de conteúdo
1. Hero: coleção Conhecendo Deus, título, subtítulo e Lyn Campos.
2. A pergunta que parece certa: propósito, chamado, futuro e direção.
3. E se houver uma pergunta anterior?: virada para “Quem é o Deus que me chama?”.
4. O que o livro não promete: sem fórmulas, mapas ou técnicas para obter respostas de Deus.
5. Jornada pelas Escrituras: oito semanas do manuscrito.
6. Pausa editorial: algumas perguntas podem continuar sem resposta.
7. Ritmo da jornada: Escrituras, oração, reflexão, escrita e contemplação.
8. Perguntas que atravessam a obra.
9. Trechos curtos do manuscrito aprovado.
10. Coleção Conhecendo Deus e Casa Editorial E se...?.
11. Sobre Lyn Campos.
12. Estado editorial: manuscrito concluído; primeira edição em preparação em 2026; sem inventar disponibilidade, vendas, ISBN ou lançamento.
13. CTA final: acompanhar a publicação.

## Direção visual
A página deve parecer uma extensão material do livro: papel, margens, tipografia, fios editoriais, numeração e silêncio visual.

Paleta oficial:
- marfim `#F8F5EE`
- oliva `#556B4F`
- sálvia `#AEB9A2`
- dourado fosco `#C8A86A`, apenas como detalhe
- grafite `#3D3D3D`

Tipografia:
- títulos: Playfair Display, com fallback serifado
- corpo: Source Sans 3, com fallback sans-serif

Evitar estética cristã genérica, banco de imagem com Bíblia/café, flores decorativas, dourado religioso, cards de SaaS, ícones aleatórios e visual motivacional.

O mockup oficial VIS-009 pode orientar materialidade e composição visual, mas textos antigos presentes nele não são fonte editorial vigente.

## Interação
Animação discreta e opcional: entradas suaves no scroll e microtransições tipográficas, sempre respeitando `prefers-reduced-motion`. Nada deve competir com a leitura.

## Responsividade
Desktop e mobile devem preservar hierarquia editorial, comprimento confortável de linha, margens generosas e legibilidade. No mobile, evitar miniaturizar o desktop: blocos passam a uma coluna e o ritmo vertical permanece deliberado.

## CTA
Estado atual: “Acompanhar a publicação”. O CTA não deve alegar pré-venda ou disponibilidade. A implementação inicial pode apontar para uma âncora de status/contato existente apenas se houver destino público confirmado; caso contrário, deve funcionar como orientação de estado sem inventar cadastro.

## SEO e social share
- título SEO específico do livro + Lyn Campos
- description que comunique obra cristã de não ficção reflexiva e jornada pelas Escrituras
- canonical da rota final
- Open Graph e Twitter/X summary_large_image
- social share próprio da obra, baseado na identidade oficial
- dados estruturados `Book` apenas com informações confirmadas

## Restrições
- Não modificar `index.html` da home principal.
- Não criar depoimentos, vendas, avaliações, números de leitores, ISBN, disponibilidade ou data de lançamento inexistentes.
- Autoria pública: Lyn Campos.
- Casa Editorial E se...? e coleção Conhecendo Deus aparecem como contexto editorial.
- IA não deve ser posicionada como autora.

## Critérios de conclusão
Landing publicada na rota definida, copy final baseada nos materiais oficiais, identidade visual respeitada, SEO/social metadata implementados, desktop/mobile revisados e QA técnico/visual concluído.