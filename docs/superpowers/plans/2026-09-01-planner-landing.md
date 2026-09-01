# Planner Landing Implementation Plan

**Goal:** Criar a landing pública `/planner/` como apresentação, demonstração e porta de entrada comercial do Planner, sem conectar ao Planner pessoal ou implementar auth, trial ou billing.

**Architecture:** Página estática autocontida em `planner/index.html`, seguindo o padrão das demais landings do site. A demonstração usa apenas HTML/CSS/JS local e dados fictícios, reproduzindo a linguagem visual confirmada do produto. CTAs comerciais ficam centralizados em uma configuração JS com estado inicial `commercialReady: false`.

**Tech Stack:** HTML5, CSS nativo, JavaScript sem dependências, GitHub Pages.

## Global Constraints

- Não alterar o repositório do Planner pessoal.
- Não conectar banco de dados, autenticação, Stripe ou billing.
- Não fazer claims técnicos de privacidade/segurança ainda não validados.
- Mobile é requisito central.
- Não usar banco de imagens, mockups SaaS genéricos ou bibliotecas pesadas.
- CTA principal: `Experimentar grátis`.
- CTA secundário: `Ver como funciona`.
- Trial narrativo: 7 dias completos, sem cartão.
- Ambiente comercial permanece desativado até receber URL própria segura.

### Task 1 — Estrutura, SEO e sistema visual
- Criar `planner/index.html` com metadados, canonical, favicon e semântica.
- Herdar linguagem editorial do site e tokens visuais reais do Planner.
- Criar header, hero e manifesto responsivos.

### Task 2 — Demonstração e prova de produto
- Construir visual estático fiel da tela Hoje com dados fictícios.
- Construir demo local `Nota → transformar em...` sem persistência.
- Criar seções Rotinas, Aguardando e Hoje usando padrões reais da interface.

### Task 3 — Conversão e confiança
- Implementar PWA/mobile, origem, trial, FAQ e CTA final.
- Centralizar destino dos CTAs em `COMMERCIAL_CONFIG` e manter `commercialReady: false`.
- Preparar bloco de pricing oculto para ativação posterior.

### Task 4 — QA
- Validar HTML, links internos e ausência de dependências externas desnecessárias.
- Renderizar em Chromium em viewport desktop e mobile.
- Corrigir overflow, legibilidade e comportamento da demo.
- Só depois abrir PR para revisão/publicação.
