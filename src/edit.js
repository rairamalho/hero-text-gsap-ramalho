import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
	Notice,
	ColorPicker,
} from '@wordpress/components';

import { MediaBackground } from './components/MediaBackground';
import { OverlayLayer } from './components/OverlayLayer';
import { ContentLayer } from './components/ContentLayer';

const HEIGHT_OPTIONS = [
	{ label: '50vh', value: '50vh' },
	{ label: '75vh', value: '75vh' },
	{ label: '100vh', value: '100vh' },
	{ label: __( 'Custom', 'hero-text-gsap-ramalho' ), value: 'custom' },
];

const ALIGNMENT_H_OPTIONS = [
	{ label: __( 'Left', 'hero-text-gsap-ramalho' ), value: 'left' },
	{ label: __( 'Center', 'hero-text-gsap-ramalho' ), value: 'center' },
	{ label: __( 'Right', 'hero-text-gsap-ramalho' ), value: 'right' },
];

const ALIGNMENT_V_OPTIONS = [
	{ label: __( 'Top', 'hero-text-gsap-ramalho' ), value: 'top' },
	{ label: __( 'Center', 'hero-text-gsap-ramalho' ), value: 'center' },
	{ label: __( 'Bottom', 'hero-text-gsap-ramalho' ), value: 'bottom' },
];

const TITLE_TAG_OPTIONS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
];

const ANIMATION_OPTIONS = [
	{ label: __( 'None', 'hero-text-gsap-ramalho' ), value: 'none' },
	{
		label: __( 'Animate Text', 'hero-text-gsap-ramalho' ),
		value: 'animate-text',
	},
	{
		label: __( 'Text Scrambling', 'hero-text-gsap-ramalho' ),
		value: 'scramble',
	},
	{
		label: __( 'Revert After Animation', 'hero-text-gsap-ramalho' ),
		value: 'revert',
	},
	{
		label: __( 'Ignore Nested Elements', 'hero-text-gsap-ramalho' ),
		value: 'ignore-nested',
	},
];

const OVERLAY_TYPE_OPTIONS = [
	{ label: __( 'Solid Color', 'hero-text-gsap-ramalho' ), value: 'solid' },
	{
		label: __( 'Linear Gradient', 'hero-text-gsap-ramalho' ),
		value: 'gradient',
	},
];

const GRADIENT_DIRECTION_OPTIONS = [
	{
		label: __( 'Top to Bottom', 'hero-text-gsap-ramalho' ),
		value: 'to bottom',
	},
	{
		label: __( 'Bottom to Top', 'hero-text-gsap-ramalho' ),
		value: 'to top',
	},
	{
		label: __( 'Left to Right', 'hero-text-gsap-ramalho' ),
		value: 'to right',
	},
	{
		label: __( 'Right to Left', 'hero-text-gsap-ramalho' ),
		value: 'to left',
	},
	{
		label: __( 'Top Left to Bottom Right', 'hero-text-gsap-ramalho' ),
		value: 'to bottom right',
	},
	{
		label: __( 'Top Right to Bottom Left', 'hero-text-gsap-ramalho' ),
		value: 'to bottom left',
	},
];

/**
 * Edit component — renders the block inside the Gutenberg editor.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 */
export function Edit( { attributes, setAttributes } ) {
	const {
		backgroundType,
		backgroundImageUrl,
		backgroundImageId,
		backgroundVideoUrl,
		horizontalAlignment,
		verticalAlignment,
		heroHeight,
		heroHeightCustom,
		overlayEnabled,
		overlayType,
		overlayOpacity,
		overlayColor,
		gradientStartColor,
		gradientEndColor,
		gradientDirection,
		titleTag,
		titleAnimation,
		subtitleAnimation,
	} = attributes;

	const minHeight =
		heroHeight === 'custom' ? `${ heroHeightCustom }px` : heroHeight;

	const blockProps = useBlockProps( {
		className: `gsap-hero gsap-hero--v-${ verticalAlignment }`,
		style: { minHeight },
	} );

	return (
		<>
			<InspectorControls>
				{ /* ── Content ── */ }
				<PanelBody
					title={ __( 'Content', 'hero-text-gsap-ramalho' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Title Tag', 'hero-text-gsap-ramalho' ) }
						value={ titleTag }
						options={ TITLE_TAG_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { titleTag: value } )
						}
					/>
				</PanelBody>

				{ /* ── Layout ── */ }
				<PanelBody
					title={ __( 'Layout', 'hero-text-gsap-ramalho' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Horizontal Alignment',
							'hero-text-gsap-ramalho'
						) }
						value={ horizontalAlignment }
						options={ ALIGNMENT_H_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { horizontalAlignment: value } )
						}
					/>
					<SelectControl
						label={ __(
							'Vertical Alignment',
							'hero-text-gsap-ramalho'
						) }
						value={ verticalAlignment }
						options={ ALIGNMENT_V_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { verticalAlignment: value } )
						}
					/>
					<SelectControl
						label={ __( 'Height', 'hero-text-gsap-ramalho' ) }
						value={ heroHeight }
						options={ HEIGHT_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { heroHeight: value } )
						}
					/>
					{ heroHeight === 'custom' && (
						<RangeControl
							label={ __(
								'Custom Height (px)',
								'hero-text-gsap-ramalho'
							) }
							value={ heroHeightCustom }
							onChange={ ( value ) =>
								setAttributes( { heroHeightCustom: value } )
							}
							min={ 300 }
							max={ 2000 }
						/>
					) }
				</PanelBody>

				{ /* ── Background ── */ }
				<PanelBody
					title={ __( 'Background', 'hero-text-gsap-ramalho' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Background Type',
							'hero-text-gsap-ramalho'
						) }
						value={ backgroundType }
						options={ [
							{
								label: __(
									'Image',
									'hero-text-gsap-ramalho'
								),
								value: 'image',
							},
							{
								label: __(
									'Video',
									'hero-text-gsap-ramalho'
								),
								value: 'video',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { backgroundType: value } )
						}
					/>
					{ backgroundType === 'image' && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImageId: media.id,
										backgroundImageUrl: media.url,
										backgroundImageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ backgroundImageId }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant={
											backgroundImageUrl
												? 'secondary'
												: 'primary'
										}
									>
										{ backgroundImageUrl
											? __(
													'Replace Image',
													'hero-text-gsap-ramalho'
											  )
											: __(
													'Select Image',
													'hero-text-gsap-ramalho'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }
					{ backgroundType === 'video' && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundVideoId: media.id,
										backgroundVideoUrl: media.url,
									} )
								}
								allowedTypes={ [ 'video/mp4', 'video/webm' ] }
								value={ attributes.backgroundVideoId }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant={
											backgroundVideoUrl
												? 'secondary'
												: 'primary'
										}
									>
										{ backgroundVideoUrl
											? __(
													'Replace Video',
													'hero-text-gsap-ramalho'
											  )
											: __(
													'Select Video',
													'hero-text-gsap-ramalho'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }
				</PanelBody>

				{ /* ── Overlay ── */ }
				<PanelBody
					title={ __( 'Overlay', 'hero-text-gsap-ramalho' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Enable Overlay',
							'hero-text-gsap-ramalho'
						) }
						checked={ overlayEnabled }
						onChange={ ( value ) =>
							setAttributes( { overlayEnabled: value } )
						}
					/>
					{ overlayEnabled && (
						<>
							{ overlayOpacity < 0.2 && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Opacity below 0.2 — text may be unreadable over the background.',
										'hero-text-gsap-ramalho'
									) }
								</Notice>
							) }
							<RangeControl
								label={ __(
									'Opacity',
									'hero-text-gsap-ramalho'
								) }
								value={ overlayOpacity }
								onChange={ ( value ) =>
									setAttributes( { overlayOpacity: value } )
								}
								min={ 0 }
								max={ 1 }
								step={ 0.05 }
							/>
							<SelectControl
								label={ __(
									'Overlay Type',
									'hero-text-gsap-ramalho'
								) }
								value={ overlayType }
								options={ OVERLAY_TYPE_OPTIONS }
								onChange={ ( value ) =>
									setAttributes( { overlayType: value } )
								}
							/>
							{ overlayType === 'solid' && (
								<>
									<p>
										{ __(
											'Overlay Color',
											'hero-text-gsap-ramalho'
										) }
									</p>
									<ColorPicker
										color={ overlayColor }
										onChange={ ( value ) =>
											setAttributes( {
												overlayColor: value,
											} )
										}
										enableAlpha={ false }
									/>
								</>
							) }
							{ overlayType === 'gradient' && (
								<>
									<SelectControl
										label={ __(
											'Gradient Direction',
											'hero-text-gsap-ramalho'
										) }
										value={ gradientDirection }
										options={ GRADIENT_DIRECTION_OPTIONS }
										onChange={ ( value ) =>
											setAttributes( {
												gradientDirection: value,
											} )
										}
									/>
									<p>
										{ __(
											'Start Color',
											'hero-text-gsap-ramalho'
										) }
									</p>
									<ColorPicker
										color={ gradientStartColor }
										onChange={ ( value ) =>
											setAttributes( {
												gradientStartColor: value,
											} )
										}
										enableAlpha={ false }
									/>
									<p>
										{ __(
											'End Color',
											'hero-text-gsap-ramalho'
										) }
									</p>
									<ColorPicker
										color={ gradientEndColor }
										onChange={ ( value ) =>
											setAttributes( {
												gradientEndColor: value,
											} )
										}
										enableAlpha={ true }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>

				{ /* ── Animations ── */ }
				<PanelBody
					title={ __( 'Animations', 'hero-text-gsap-ramalho' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Title Animation',
							'hero-text-gsap-ramalho'
						) }
						value={ titleAnimation }
						options={ ANIMATION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { titleAnimation: value } )
						}
					/>
					<SelectControl
						label={ __(
							'Subtitle Animation',
							'hero-text-gsap-ramalho'
						) }
						value={ subtitleAnimation }
						options={ ANIMATION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { subtitleAnimation: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<MediaBackground
					backgroundType={ backgroundType }
					backgroundImageUrl={ backgroundImageUrl }
					backgroundImageAlt={ attributes.backgroundImageAlt }
					backgroundVideoUrl={ backgroundVideoUrl }
				/>
				<OverlayLayer
					overlayEnabled={ overlayEnabled }
					overlayType={ overlayType }
					overlayOpacity={ overlayOpacity }
					overlayColor={ overlayColor }
					gradientStartColor={ gradientStartColor }
					gradientEndColor={ gradientEndColor }
					gradientDirection={ gradientDirection }
				/>
				<ContentLayer
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</section>
		</>
	);
}
