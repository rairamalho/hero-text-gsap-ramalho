/**
 * MediaBackground — renders the background image or video layer.
 * Used in both edit.js and save.js — no editor-only WP imports here.
 *
 * @param {Object} props
 * @param {string} props.backgroundType        'image' | 'video'
 * @param {string} props.backgroundImageUrl
 * @param {string} props.backgroundImageAlt
 * @param {string} props.backgroundVideoUrl
 */
export function MediaBackground( {
	backgroundType,
	backgroundImageUrl,
	backgroundImageAlt,
	backgroundVideoUrl,
} ) {
	if ( backgroundType === 'video' && backgroundVideoUrl ) {
		return (
			<div className="gsap-hero__media">
				<video
					autoPlay
					muted
					loop
					playsInline
					preload="none"
					aria-hidden="true"
				>
					<source src={ backgroundVideoUrl } type="video/mp4" />
				</video>
			</div>
		);
	}

	if ( backgroundImageUrl ) {
		return (
			<div className="gsap-hero__media">
				<img
					src={ backgroundImageUrl }
					alt={ backgroundImageAlt || '' }
					loading="lazy"
				/>
			</div>
		);
	}

	return <div className="gsap-hero__media gsap-hero__media--empty" />;
}
