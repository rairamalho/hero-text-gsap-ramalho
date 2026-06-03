<?php

defined( 'ABSPATH' ) || define( 'ABSPATH', __DIR__ . '/../../../../' );

require_once __DIR__ . '/../../vendor/autoload.php';

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( "$_tests_dir/includes/functions.php" ) ) {
	echo "Could not find $_tests_dir/includes/functions.php\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

require_once "$_tests_dir/includes/functions.php";

function _manually_load_plugin(): void {
	require __DIR__ . '/../../hero-text-gsap-ramalho.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require "$_tests_dir/includes/bootstrap.php";
