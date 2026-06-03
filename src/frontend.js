import './style.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextAnimation } from './animations/text-animation';
import { initScrambleAnimation } from './animations/scramble-animation';
import { initRevertAnimation } from './animations/revert-animation';
import { initIgnoreNestedAnimation } from './animations/ignore-nested-animation';

gsap.registerPlugin( ScrollTrigger );

const ANIMATION_MAP = {
	'animate-text': initTextAnimation,
	scramble: initScrambleAnimation,
	revert: initRevertAnimation,
	'ignore-nested': initIgnoreNestedAnimation,
};

function initHeroAnimations() {
	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		return;
	}

	document.querySelectorAll( '[data-animation]' ).forEach( ( el ) => {
		const animType = el.dataset.animation;
		const initFn = ANIMATION_MAP[ animType ];
		if ( ! initFn ) return;

		ScrollTrigger.create( {
			trigger: el,
			start: 'top 85%',
			once: true,
			onEnter: () => initFn( el ),
		} );
	} );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initHeroAnimations );
} else {
	initHeroAnimations();
}
