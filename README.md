# GSAP Hero Block

![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4?logo=php&logoColor=white)
![WordPress](https://img.shields.io/badge/WordPress-6.5%2B-21759B?logo=wordpress&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-GPL%20v2-blue)

A production-ready WordPress Gutenberg block that renders animated hero sections with **GSAP SplitText** and **ScrollTrigger**, configurable image/video backgrounds, solid/gradient overlays, flexible layout controls, and four distinct animation modes — all managed entirely from the Block Editor sidebar.

---

## Features

- **Four GSAP animation modes** — Animate Text, Text Scrambling (ScrambleTextPlugin), Revert After Animation, and Ignore Nested Elements (SplitText)
- **ScrollTrigger** — animations fire once on viewport entry; `prefers-reduced-motion` is respected
- **Background** — static image or autoplay `<video>` (lazy-loaded, mp4/webm)
- **Overlay** — solid colour or linear gradient, configurable opacity with low-contrast warning below 0.2
- **Layout** — horizontal alignment (left/center/right), vertical alignment (top/center/bottom), height presets (50vh/75vh/100vh) or custom slider 300–2000 px
- **Title tag** — H1–H6 selector preserving semantic heading hierarchy
- **Static block** — `save.js` serialises clean HTML with `data-animation` attributes; no PHP render callback
- **Accessible** — `aria-hidden` on decorative layers, WCAG contrast warning in editor

---

## Block: `gsap/hero`

### Animation Modes

| Mode | `data-animation` | Effect |
|------|-----------------|--------|
| Animate Text | `animate-text` | Character-by-character reveal with `rotateX` stagger (SplitText) |
| Text Scrambling | `scramble` | ScrambleTextPlugin — randomised characters resolve to final text |
| Revert After Animation | `revert` | Animate chars then revert the split DOM back to the original markup |
| Ignore Nested Elements | `ignore-nested` | Animate text nodes only, preserving inner HTML tags intact |

Animations are dispatched by `frontend.js` (registered as `viewScript` — only loads when the block is on the page):

```js
ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => ANIMATION_MAP[ el.dataset.animation ]( el ),
} );
```

### Inspector Panels

| Panel | Controls |
|-------|---------|
| **Content** | Title (RichText), Subtitle (RichText), Title Tag (H1–H6) |
| **Layout** | Horizontal alignment, Vertical alignment, Height preset / custom slider |
| **Background** | Background type (Image/Video), MediaUpload picker |
| **Overlay** | Enable toggle, Opacity, Type (solid/gradient), ColorPicker, Gradient direction |
| **Animations** | Title animation mode, Subtitle animation mode |

### Generated HTML

```html
<section class="gsap-hero gsap-hero--v-center wp-block-gsap-hero" style="min-height:100vh">
    <div class="gsap-hero__media">
        <img src="..." alt="..." loading="lazy" />
    </div>
    <div class="gsap-hero__overlay" style="background:#000;opacity:0.4" aria-hidden="true"></div>
    <div class="gsap-hero__content gsap-hero__content--h-center">
        <h1 class="hero-title" data-animation="animate-text">Hero Title</h1>
        <p class="hero-subtitle" data-animation="scramble">Hero subtitle</p>
    </div>
</section>
```

---

## Requirements

| Requirement | Version |
|-------------|---------|
| PHP | 8.2+ |
| WordPress | 6.5+ |
| Node.js | 18+ |
| npm | 9+ |

---

## Installation

1. Clone or download into `wp-content/plugins/`:
   ```bash
   git clone https://github.com/rairamalho/hero-text-gsap-ramalho.git
   ```
2. Install JS dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Install PHP dependencies:
   ```bash
   composer install
   ```
4. Activate **GSAP Hero Block** in WP Admin → Plugins.
5. In the Block Editor, search for **"GSAP Hero"** to insert the block.

---

## Development

```bash
# Install PHP dev dependencies (WPCS, PHPUnit)
composer install

# Install JS dependencies (GSAP, @wordpress/scripts)
npm install

# Build for production  (src/ → build/)
npm run build

# Watch mode
npm run start

# Lint JS
npm run lint:js

# Lint CSS
npm run lint:css

# Lint PHP (WordPress Coding Standards)
composer run phpcs

# Auto-fix PHP
composer run phpcbf

# Run PHPUnit tests
composer run test
```

---

## Project Structure

```
hero-text-gsap-ramalho/
├── hero-text-gsap-ramalho.php    # Plugin bootstrap — constants, autoloader, hooks
├── includes/
│   ├── class-plugin.php           # Plugin singleton — textdomain, block init
│   └── class-block.php            # register_block_type() from build/
├── src/
│   ├── block.json                 # Block manifest — name, attributes, script/style refs
│   ├── index.js                   # registerBlockType entry (editor)
│   ├── edit.js                    # Gutenberg Edit component + 5 InspectorControl panels
│   ├── save.js                    # Static HTML serializer
│   ├── frontend.js                # GSAP ScrollTrigger init (viewScript — frontend only)
│   ├── style.scss                 # Frontend BEM CSS (mobile-first, responsive)
│   ├── editor.scss                # Editor-only overrides + empty-media placeholder
│   ├── components/
│   │   ├── MediaBackground.js     # Image/video background layer (z-index 1)
│   │   ├── OverlayLayer.js        # Solid/gradient overlay layer (z-index 2)
│   │   └── ContentLayer.js        # Title + subtitle — editor (RichText) and save versions
│   └── animations/
│       ├── text-animation.js      # Char-by-char reveal — SplitText + stagger
│       ├── scramble-animation.js  # ScrambleTextPlugin
│       ├── revert-animation.js    # SplitText animate + revert DOM
│       └── ignore-nested-animation.js  # SplitText ignoreDeepOrphanedChars
└── build/                         # Compiled output (git-ignored, generated by npm run build)
```

---

## Architecture Notes

- **Static block** (`save.js`) — no PHP render callback. The saved HTML contains `data-animation` attributes consumed by `frontend.js` at runtime.
- **viewScript** in `block.json` — `frontend.js` (GSAP bundle ~130 KB) only enqueues on pages where the block is present, never in the editor.
- **CSS split** — `style.scss` (frontend styles) → `build/style-frontend.css` (loads editor + frontend via `style`). `editor.scss` (editor overrides) → `build/index.css` (loads editor only via `editorStyle`).
- **GSAP 3.12** npm package includes SplitText, ScrambleTextPlugin, and ScrollTrigger at no extra cost.

---

## License

GPL v2 or later — see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html).

## Author

**Raimundo Ramalho** — [github.com/rairamalho](https://github.com/rairamalho)
