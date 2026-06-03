# CLAUDE.md — hero-text-gsap-ramalho

> Plugin individual. As convenções gerais estão no CLAUDE.md do repositório wp-lab.

## Identidade do plugin

- **Slug / text domain:** `hero-text-gsap-ramalho`
- **Block name:** `gsap/hero`
- **Namespace PHP:** `HeroTextGsapRamalho`
- **Prefixo de funções/constantes:** `htgr_` / `HERO_TEXT_GSAP_RAMALHO_`
- **Autoload:** `includes/` → `HeroTextGsapRamalho\`

## Comandos

- `npm run build` — compilar JS/CSS (`src/` → `build/`)
- `npm run start` — watch mode para desenvolvimento
- `composer run phpcs` — verificar coding standards (rodar antes de concluir)
- `composer run phpcbf` — corrigir automaticamente
- `composer run test` — rodar PHPUnit

## Arquitetura JS

- **`src/block.json`** — manifest com todos os atributos e entry points
- **`src/index.js`** — registra o bloco no editor (`registerBlockType`)
- **`src/edit.js`** — componente de edição + InspectorControls (5 painéis)
- **`src/save.js`** — serialização estática (bloco estático, sem PHP render_callback)
- **`src/frontend.js`** — inicializa GSAP + ScrollTrigger no frontend via `viewScript`
- **`src/animations/`** — 4 módulos de animação GSAP independentes
- **`src/components/`** — MediaBackground, OverlayLayer, ContentLayer (compartilhados entre edit e save)

## Regras específicas

- Todo arquivo PHP: `defined( 'ABSPATH' ) || exit;` após o `<?php`.
- Nunca editar `vendor/`, `build/` ou `node_modules/`.
- `MediaBackground` e `OverlayLayer` não podem importar `@wordpress/block-editor` (são usados em `save.js`).
- Commits: Conventional Commits. Sem push sem pedido explícito.
