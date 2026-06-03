import { RichText } from '@wordpress/block-editor';

/**
 * ContentLayer — editor version with mutable RichText.
 * Only used in edit.js — imports @wordpress/block-editor.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 */
export function ContentLayer( { attributes, setAttributes } ) {
	const {
		title,
		subtitle,
		titleTag,
		titleAnimation,
		subtitleAnimation,
		horizontalAlignment,
	} = attributes;
	const TitleTag = titleTag;

	return (
		<div
			className={ `gsap-hero__content gsap-hero__content--h-${ horizontalAlignment }` }
		>
			<RichText
				tagName={ TitleTag }
				className="hero-title"
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder="Hero Title"
				data-animation={
					titleAnimation !== 'none' ? titleAnimation : undefined
				}
			/>
			<RichText
				tagName="p"
				className="hero-subtitle"
				value={ subtitle }
				onChange={ ( value ) => setAttributes( { subtitle: value } ) }
				placeholder="Hero subtitle"
				data-animation={
					subtitleAnimation !== 'none' ? subtitleAnimation : undefined
				}
			/>
		</div>
	);
}

/**
 * ContentLayerSave — save version with static RichText.Content.
 * Used only in save.js.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 */
export function ContentLayerSave( { attributes } ) {
	const {
		title,
		subtitle,
		titleTag,
		titleAnimation,
		subtitleAnimation,
		horizontalAlignment,
	} = attributes;

	return (
		<div
			className={ `gsap-hero__content gsap-hero__content--h-${ horizontalAlignment }` }
		>
			<RichText.Content
				tagName={ titleTag }
				className="hero-title"
				value={ title }
				data-animation={
					titleAnimation !== 'none' ? titleAnimation : undefined
				}
			/>
			<RichText.Content
				tagName="p"
				className="hero-subtitle"
				value={ subtitle }
				data-animation={
					subtitleAnimation !== 'none' ? subtitleAnimation : undefined
				}
			/>
		</div>
	);
}
