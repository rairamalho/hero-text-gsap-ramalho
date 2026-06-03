import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin( SplitText );

/**
 * Ignore Nested Elements: splits text while preserving nested HTML tags.
 * Reference: https://codepen.io/GreenSock/pen/JojaebV
 *
 * @param {HTMLElement} element
 */
export function initIgnoreNestedAnimation( element ) {
	const split = new SplitText( element, {
		type: 'chars,words',
		ignoreDeepOrphanedChars: true,
	} );

	gsap.fromTo(
		split.chars,
		{ opacity: 0, rotateY: 90 },
		{
			opacity: 1,
			rotateY: 0,
			stagger: 0.02,
			duration: 0.45,
			ease: 'power3.out',
			transformOrigin: '50% 50% -30px',
		}
	);
}
