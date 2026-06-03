<?php

namespace HeroTextGsapRamalho;

defined( 'ABSPATH' ) || exit;

final class Plugin {

	private static ?self $instance = null;

	public static function get_instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'load_textdomain' ) );
		Block::register();
	}

	public function load_textdomain(): void {
		load_plugin_textdomain(
			'hero-text-gsap-ramalho',
			false,
			dirname( plugin_basename( HERO_TEXT_GSAP_RAMALHO_PATH . 'hero-text-gsap-ramalho.php' ) ) . '/languages'
		);
	}
}
