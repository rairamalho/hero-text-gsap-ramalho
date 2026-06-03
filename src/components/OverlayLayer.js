/**
 * OverlayLayer — renders the optional colour/gradient overlay.
 * Sits at z-index 2, above media and below content.
 * No editor-only WP imports — used in save.js too.
 *
 * @param {Object}  props
 * @param {boolean} props.overlayEnabled
 * @param {string}  props.overlayType          'solid' | 'gradient'
 * @param {number}  props.overlayOpacity       0–1
 * @param {string}  props.overlayColor         hex color
 * @param {string}  props.gradientStartColor
 * @param {string}  props.gradientEndColor
 * @param {string}  props.gradientDirection    CSS gradient direction
 */
export function OverlayLayer( {
	overlayEnabled,
	overlayType,
	overlayOpacity,
	overlayColor,
	gradientStartColor,
	gradientEndColor,
	gradientDirection,
} ) {
	if ( ! overlayEnabled ) return null;

	const background =
		overlayType === 'gradient'
			? `linear-gradient(${ gradientDirection }, ${ gradientStartColor }, ${ gradientEndColor })`
			: overlayColor;

	return (
		<div
			className="gsap-hero__overlay"
			style={ { background, opacity: overlayOpacity } }
			aria-hidden="true"
		/>
	);
}
