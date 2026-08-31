# Livro “E se você estiver fazendo a pergunta errada?” Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar uma landing editorial, contemplativa, responsiva e tecnicamente completa para o livro de Lyn Campos na rota própria do domínio emelyncampos.com.br.

**Architecture:** A landing será uma página estática isolada em diretório próprio dentro do GitHub Pages existente, sem modificar a home. HTML semântico e CSS focado na experiência editorial serão mantidos juntos na página por coerência com a arquitetura atual do site; ativos próprios da landing ficarão em subdiretório `assets/`. JavaScript será mínimo e progressivo, apenas para detalhes de interação que não sejam essenciais ao conteúdo.

**Tech Stack:** GitHub Pages, HTML5, CSS3, JavaScript vanilla mínimo, JSON-LD, Open Graph.

**Spec:** `docs/superpowers/specs/2026-08-30-livro-pergunta-errada-landing-design.md`

## Global Constraints
- Não modificar `index.html` da home principal.
- Rota final: `/e-se-voce-estiver-fazendo-a-pergunta-errada/`.
- Autoria pública: Lyn Campos.
- Paleta: `#F8F5EE`, `#556B4F`, `#AEB9A2`, `#C8A86A`, `#3D3D3D`.
- Títulos: Playfair Display com fallback serifado; corpo: Source Sans 3 com fallback sans-serif.
- Não inventar depoimentos, vendas, avaliações, leitores, ISBN, disponibilidade, pré-venda ou data de lançamento.
- Estado editorial público: manuscrito concluído; primeira edição em preparação editorial em 2026.
- CTA vigente: “Acompanhar a publicação”.
- Respeitar `prefers-reduced-motion`.

---

### Task 1: Construir a página editorial completa

**Files:**
- Create: `e-se-voce-estiver-fazendo-a-pergunta-errada/index.html`

**Interfaces:**
- Consumes: conteúdo e restrições definidos no design spec.
- Produces: rota HTML pública completa com todas as seções, metadata, JSON-LD e estilos responsivos.

- [ ] **Step 1: Criar a estrutura semântica e metadata**

Criar `index.html` com `lang="pt-BR"`, viewport, canonical absoluto, title, description, Open Graph, Twitter/X e JSON-LD `Book`, incluindo somente `name`, `author`, `inLanguage`, `bookEdition` quando confirmável e descrição editorial sem ISBN/oferta.

- [ ] **Step 2: Implementar a narrativa aprovada**

Incluir hero, pergunta inicial, virada narrativa, seção “não promete”, oito semanas, pausa editorial, ritmo da jornada, perguntas, excertos, coleção/editora, bio de Lyn, status 2026 e CTA final. Preservar trechos do manuscrito apenas em citações curtas e identificadas como excertos.

- [ ] **Step 3: Implementar o sistema visual**

Definir CSS variables exatamente para a paleta oficial, tipografia editorial, largura máxima confortável de leitura, regras finas, numeração, fundos marfim/oliva e detalhes dourado fosco discretos. Não usar cards genéricos nem ornamentos sem função.

- [ ] **Step 4: Implementar responsividade e acessibilidade**

Adicionar breakpoints para mobile, foco visível, contraste adequado, landmarks semânticos, heading hierarchy correta, links com estados claros e `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 5: Validar HTML e conteúdo localmente por inspeção**

Verificar que não existem claims de venda, pré-venda, ISBN, avaliações ou lançamento; verificar que todos os 13 blocos narrativos do spec estão representados.

- [ ] **Step 6: Commit**

```bash
git add e-se-voce-estiver-fazendo-a-pergunta-errada/index.html
git commit -m "feat: add Lyn Campos book landing"
```

### Task 2: Criar o social share próprio

**Files:**
- Create: `e-se-voce-estiver-fazendo-a-pergunta-errada/assets/social-share.svg`
- Modify: `e-se-voce-estiver-fazendo-a-pergunta-errada/index.html`

**Interfaces:**
- Consumes: paleta, título, autoria e coleção da landing.
- Produces: arte 1200×630 referenciada por Open Graph/Twitter metadata.

- [ ] **Step 1: Criar SVG editorial 1200×630**

Compor fundo marfim, tipografia serifada, título do livro, `Lyn Campos`, `Coleção Conhecendo Deus` e detalhe oliva/dourado mínimo. Não reproduzir capas antigas com copy desatualizada.

- [ ] **Step 2: Apontar metadata para o ativo**

Usar URL absoluta `https://emelyncampos.com.br/e-se-voce-estiver-fazendo-a-pergunta-errada/assets/social-share.svg` em `og:image` e `twitter:image`, com width/height e alt descritivo.

- [ ] **Step 3: Commit**

```bash
git add e-se-voce-estiver-fazendo-a-pergunta-errada
git commit -m "feat: add book social share artwork"
```

### Task 3: Publicação e QA

**Files:**
- Verify: `e-se-voce-estiver-fazendo-a-pergunta-errada/index.html`
- Verify: `e-se-voce-estiver-fazendo-a-pergunta-errada/assets/social-share.svg`
- Do not modify: `index.html`

**Interfaces:**
- Consumes: arquivos publicados pela branch `main` do GitHub Pages.
- Produces: URL pública validada em desktop e mobile.

- [ ] **Step 1: Confirmar integridade do commit**

Comparar a branch antes/depois e confirmar que `index.html` da raiz não foi alterado.

- [ ] **Step 2: Verificar resposta pública**

Abrir `https://emelyncampos.com.br/e-se-voce-estiver-fazendo-a-pergunta-errada/` e confirmar HTTP útil, title, conteúdo principal e carregamento de assets.

- [ ] **Step 3: QA desktop**

Validar em viewport aproximado 1440×900: hero, hierarquia, comprimentos de linha, oito semanas, citações, status e CTA; checar console e links.

- [ ] **Step 4: QA mobile**

Validar em viewport aproximado 390×844: ausência de overflow horizontal, títulos sem corte, leitura confortável, seções em coluna, CTA acessível e nenhuma colisão tipográfica.

- [ ] **Step 5: QA SEO/social**

Confirmar canonical, description, `og:*`, `twitter:*`, JSON-LD válido e imagem social acessível.

- [ ] **Step 6: Entregar handoff final**

Entregar: Nome do projeto; URL final; CTA recomendado; Texto do botão; descrição curta para o card do site principal; resumo de QA. Não alterar a home nesta etapa.