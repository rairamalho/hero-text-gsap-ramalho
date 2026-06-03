=== GSAP Hero Block ===
Contributors: rairamalho
Tags: gutenberg, block, hero, gsap, animation
Requires at least: 6.6
Tested up to: 6.8
Requires PHP: 8.2
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Animated hero section Gutenberg block with GSAP SplitText, ScrollTrigger and multiple animation modes.

== Description ==

GSAP Hero Block registers a custom Gutenberg block (`gsap/hero`) for building animated hero sections directly inside the WordPress Block Editor.

= Features =

* Four GSAP animation modes: Animate Text, Text Scrambling, Revert After Animation, Ignore Nested Elements
* Background: image or video (lazy-loaded)
* Overlay: solid color or linear gradient with opacity control
* Flexible layout: horizontal + vertical alignment, height presets or custom px
* ScrollTrigger-powered viewport detection (runs once)
* Respects prefers-reduced-motion
* Title tag selector (H1–H6)
* WCAG-friendly: aria-hidden on decorative layers, accessibility warning for low overlay opacity

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin in WP Admin → Plugins
3. In the block editor, search for "GSAP Hero" to insert the block

== Changelog ==

= 1.0.0 =
* Initial release
