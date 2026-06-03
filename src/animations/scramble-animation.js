import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin( ScrambleTextPlugin );

/**
 * Text Scrambling: reveals final text via randomised character scramble.
 * Reference: https://codepen.io/GreenSock/pen/QWzZwxR
 *
 * @param {HTMLElement} element
 */
export function initScrambleAnimation( element ) {
	const originalText = element.textContent;

	gsap.fromTo(
		element,
		{ opacity: 0 },
		{
			opacity: 1,
			duration: 0.1,
			onComplete() {
				gsap.to( element, {
					duration: 1.8,
					scrambleText: {
						text: originalText,
						chars: 'upperCase',
						revealDelay: 0.3,
						speed: 0.4,
					},
					ease: 'none',
				} );
			},
		}
	);
}
