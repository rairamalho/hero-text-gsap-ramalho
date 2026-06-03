<?php
/**
 * Plugin Name:       GSAP Hero Block
 * Plugin URI:        https://github.com/rairamalho/hero-text-gsap-ramalho
 * Description:       Animated hero section Gutenberg block with GSAP SplitText, ScrollTrigger and multiple animation modes.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      8.2
 * Author:            Raimundo Ramalho
 * Author URI:        https://github.com/rairamalho
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hero-text-gsap-ramalho
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'HERO_TEXT_GSAP_RAMALHO_VERSION', '1.0.0' );
define( 'HERO_TEXT_GSAP_RAMALHO_PATH', plugin_dir_path( __FILE__ ) );
define( 'HERO_TEXT_GSAP_RAMALHO_URL', plugin_dir_url( __FILE__ ) );

require_once HERO_TEXT_GSAP_RAMALHO_PATH . 'vendor/autoload.php';

add_action( 'plugins_loaded', array( 'HeroTextGsapRamalho\\Plugin', 'get_instance' ) );
