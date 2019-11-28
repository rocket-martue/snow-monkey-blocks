<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/categories-list/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/categories-list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/editor.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/app.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/app.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/front.css' )
);

register_block_type(
	'snow-monkey-blocks/categories-list',
	[
		'script'          => ! is_admin() ? 'snow-monkey-blocks/categories-list' : null,
		'style'           => 'snow-monkey-blocks/categories-list',
		'editor_script'   => 'snow-monkey-blocks/categories-list/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'categories-list', $attributes );
		},
	]
);