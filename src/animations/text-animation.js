import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin( SplitText );

/**
 * Animate Text: character-by-character reveal with stagger.
 * Reference: https://codepen.io/GreenSock/pen/xxmaNYj
 *
 * @param {HTMLElement} element
 */
export function initTextAnimation( element ) {
	const split = new SplitText( element, { type: 'chars,words' } );

	gsap.fromTo(
		split.chars,
		{ opacity: 0, y: 20, rotateX: -40 },
		{
			opacity: 1,
			y: 0,
			rotateX: 0,
			stagger: 0.03,
			duration: 0.5,
			ease: 'power2.out',
		}
	);
}
