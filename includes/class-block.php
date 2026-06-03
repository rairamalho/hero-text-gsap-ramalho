<?php

namespace HeroTextGsapRamalho;

defined( 'ABSPATH' ) || exit;

final class Block {

	public static function register(): void {
		add_action( 'init', array( self::class, 'register_block_type' ) );
	}

	public static function register_block_type(): void {
		register_block_type( HERO_TEXT_GSAP_RAMALHO_PATH . 'build' );
	}
}
