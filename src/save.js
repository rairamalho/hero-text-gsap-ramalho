import { useBlockProps } from '@wordpress/block-editor';
import { MediaBackground } from './components/MediaBackground';
import { OverlayLayer } from './components/OverlayLayer';
import { ContentLayerSave } from './components/ContentLayer';

/**
 * Save component — serializes the block to static HTML.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 */
export function Save( { attributes } ) {
	const { verticalAlignment, heroHeight, heroHeightCustom } = attributes;

	const minHeight =
		heroHeight === 'custom' ? `${ heroHeightCustom }px` : heroHeight;

	const blockProps = useBlockProps.save( {
		className: `gsap-hero gsap-hero--v-${ verticalAlignment }`,
		style: { minHeight },
	} );

	return (
		<section { ...blockProps }>
			<MediaBackground { ...attributes } />
			<OverlayLayer { ...attributes } />
			<ContentLayerSave attributes={ attributes } />
		</section>
	);
}
