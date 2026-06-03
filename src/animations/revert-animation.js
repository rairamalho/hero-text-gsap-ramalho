import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin( SplitText );

/**
 * Revert After Animation: animate chars then restore original DOM.
 * Reference: https://codepen.io/GreenSock/pen/poZaJQa
 *
 * @param {HTMLElement} element
 */
export function initRevertAnimation( element ) {
	const split = new SplitText( element, { type: 'chars' } );

	gsap.timeline( { onComplete: () => split.revert() } ).fromTo(
		split.chars,
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			stagger: 0.04,
			duration: 0.6,
			ease: 'back.out(1.7)',
		}
	);
}
