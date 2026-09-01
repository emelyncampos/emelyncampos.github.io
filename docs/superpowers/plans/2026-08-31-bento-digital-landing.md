# Bento Digital Landing Implementation Plan

**Goal:** Publish a standalone Bento Digital landing page at `/bento-digital/` without changing the main site homepage.

**Architecture:** Static responsive HTML/CSS/JS inside `bento-digital/`, using canonical Bento assets and real Bento Histórias screenshots/assets. Keep all Bento-specific assets scoped under `bento-digital/assets/`. SEO/Open Graph metadata lives in the page head.

**Tech Stack:** GitHub Pages, semantic HTML5, CSS, small vanilla JS only for progressive reveal/navigation behavior.

**Global Constraints**
- Do not modify the main site homepage.
- Preserve Bento's official character identity; do not redraw Bento.
- Use the approved warm editorial/storybook direction, not SaaS styling.
- Distinguish live prototype, current product, paused exploration, and future vision.
- Primary hero CTA: `Conheça o Bento`.
- Secondary CTA: `Explorar o Bento Histórias`.
- Public route: `https://emelyncampos.com.br/bento-digital/`.

### Task 1: Audit references and production assets
- Confirm official Bento logo/character assets from Drive.
- Confirm current Bento Histórias prototype URL and usable screenshots/assets.
- Reuse the approved landing copy from the conversation.

### Task 2: Build the landing
- Create `bento-digital/index.html`.
- Create `bento-digital/assets/` for official character/logo/prototype visuals.
- Implement responsive desktop/mobile layout matching the approved visual direction.

### Task 3: SEO and social share
- Add title, description, canonical, Open Graph and Twitter card metadata.
- Add a dedicated social-share image.

### Task 4: Verification and publish
- Check all internal anchors and external links.
- Verify mobile responsive rules and accessibility basics.
- Merge the isolated branch only after review/verification.
- Verify the public URL after GitHub Pages deploys.
