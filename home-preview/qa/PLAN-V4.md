# V4 — plano de reconstrução

O briefing e a imagem fornecidos pelo usuário são a especificação desta tarefa. Reconstruir a preview na branch existente, sem alterar nenhum arquivo fora de `home-preview/`, sem merge e sem publicação oficial.

1. `index.html`: capa tipográfica terrosa à esquerda, quatro peças reais sobrepostas à direita; navegação discreta. Tenderness vinho com texto, interface e foto; mobile CTA após visual. O Grão com paisagem canônica à esquerda e texto à direita; mobile texto antes da imagem. Cinco projetos em uma linha desktop, lista vertical mobile. Ideias, Sobre e redes fecham a página. Sem bloco conceitual extra da V3.
2. `assets/home.css`: Google Fonts Cormorant Garamond/Inter, papel #F3EFE6, carvão #1C1A17, acento terroso. Tailwind via CDN para utilitários gerais; CSS customizado para composição, textura, deslocamentos e breakpoints. Fontes Google distribuídas localmente via Fontsource porque o proxy bloqueia fonts.googleapis.com; incluir licenças e subconjuntos português.
3. Preservar `assets/home.js` e seu menu acessível. Preservar assets dos projetos; Bento oficial, sem redesenho. Sem logo improvisado de O Grão ou embalagem falsa de Caos.
4. `qa/check.py`: validar quatro peças na capa, cinco entradas, sete headings, somente uma imagem do livro, sete larguras, overflow, cortes, imagens, console, axe, teclado, no-JS e movimento reduzido. Capturar full-page 1440/390.
5. Comparar primeira captura com referência, refinar escala/ritmo/proporções e repetir QA. `qa/export_preview.py`: exportar CSS, fontes e imagens autocontidos, incorporando também o CSS produzido pelo Tailwind para visualizador offline. Guardar evidências V4 sem substituir screenshots V3.
6. Atualizar `QA.md`, gerar screenshots finais, confirmar diff externo vazio e hash da raiz intacto. Entregar para aprovação; sem merge ou publicação oficial. O push da branch de preview, já autorizado na conversa, permite entregar screenshots acessíveis pelo GitHub.
