const BODY_BG_X_SPEED = 0.125;
const BODY_BG_Y_SPEED = 0.125;
const SECTION_BG_X_SPEED = -0.5;
const SECTION_BG_Y_SPEED = -0.5;
const SECTION_SELECTOR = '.bg-scroll-reverse';
const DIVIDER_TOP_X_SPEED = -0.25;
const DIVIDER_BOTTOM_X_SPEED = -0.25;

function updateParallaxBackgrounds() {
	const scrollY = window.scrollY || window.pageYOffset;
	document.body.style.backgroundPosition = `${scrollY * BODY_BG_X_SPEED}px ${scrollY * BODY_BG_Y_SPEED}px`;
	document.querySelectorAll(SECTION_SELECTOR).forEach(section => {
		section.style.backgroundPosition = `${scrollY * SECTION_BG_X_SPEED}px ${scrollY * SECTION_BG_Y_SPEED}px`;
	});

	document.documentElement.style.setProperty('--divider-top-x', `${scrollY * DIVIDER_TOP_X_SPEED}px`);
	document.documentElement.style.setProperty('--divider-bottom-x', `${scrollY * DIVIDER_BOTTOM_X_SPEED}px`);
}

function playAudio(src) {
	const audio = new Audio(src);
	audio.volume = 0.3;
	audio.play().catch(() => { });
}

function playRandomTypeAudio() {
	const randomNum = Math.floor(Math.random() * 7) + 1;
	const audioSrc = `audio/type_0${randomNum}.wav`;
	playAudio(audioSrc);
}

function initScrollToTopLink() {
	var scrollLink = document.querySelector('.scroll-to-top-link');
	if (scrollLink) {
		function toggleScrollToTopLink() {
			if (window.scrollY > 0) {
				scrollLink.classList.add('visible');
			} else {
				scrollLink.classList.remove('visible');
			}
		}
		toggleScrollToTopLink();
		window.addEventListener('scroll', toggleScrollToTopLink);
		scrollLink.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
}

function initLightGallery() {
	if (window.lightGallery) {
		const lgContainer = document.getElementById('inline-gallery-container');
		if (lgContainer) {
			const inlineGallery = lightGallery(lgContainer, {
				container: lgContainer,
				dynamic: true,
				hash: false,
				closable: false,
				showMaximizeIcon: false,
				appendSubHtmlTo: '.lg-item',
				slideDelay: 400,
				plugins: [lgZoom, lgThumbnail],
				thumbnail: true,
				zoom: true,
				fullScreen: false,
				download: true,
				share: false,
				rotate: false,
				flipHorizontal: false,
				flipVertical: false,
				autoplayFirstVideo: false,
				pager: false,
				galleryId: 1,
				width: '100%',
				height: '100%',
				dynamicEl: [
					{
						src: 'img/screenshots/1741958972.png',
						thumb: 'img/screenshots/1741958972.png'
					},
					{
						src: 'img/screenshots/1741959116.png',
						thumb: 'img/screenshots/1741959116.png'
					},
					{
						src: 'img/screenshots/1745107477.png',
						thumb: 'img/screenshots/1745107477.png'
					},
					{
						src: 'img/screenshots/1745417588.png',
						thumb: 'img/screenshots/1745417588.png'
					},
					{
						src: 'img/screenshots/1746453986.png',
						thumb: 'img/screenshots/1746453986.png'
					},
					{
						src: 'img/screenshots/1746757248.png',
						thumb: 'img/screenshots/1746757248.png'
					},
					{
						src: 'img/screenshots/1752945580.png',
						thumb: 'img/screenshots/1752945580.png'
					}
				]
			});

			inlineGallery.openGallery();
		}
	}
}

function initSegredosFadeAnimation() {
	var segredosBtn = document.querySelector('.button-container button.casa-btn.patrick-hand-sc-regular.segredos-fade');
	if (segredosBtn) {
		let fadeTimeout = null;
		function checkSegredosInView() {
			const rect = segredosBtn.getBoundingClientRect();
			const inView = rect.top < window.innerHeight && rect.bottom > 0;
			if (inView && !segredosBtn.classList.contains('visible')) {
				if (!fadeTimeout) {
					fadeTimeout = setTimeout(() => {
						segredosBtn.classList.add('visible');
					}, 1400);
				}
			} else if (!inView) {
				segredosBtn.classList.remove('visible');
				if (fadeTimeout) {
					clearTimeout(fadeTimeout);
					fadeTimeout = null;
				}
			}
		}
		window.addEventListener('scroll', checkSegredosInView);
		window.addEventListener('resize', checkSegredosInView);
		checkSegredosInView();
	}
}

function initInteractiveAudio() {
	const interactiveElements = document.querySelectorAll('button, a, .casa-btn, iframe, .lg-image, .lg-thumb-item');

	interactiveElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			playRandomTypeAudio();
		});

		element.addEventListener('mousedown', () => {
			playAudio('audio/click_01.wav');
		});
	});

	const cuMorphElements = document.querySelectorAll('.cu-morph, .badge-item, .gallery-frame');

	cuMorphElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			playAudio('audio/grunt.wav');
		});
	});
}

window.addEventListener('scroll', updateParallaxBackgrounds);
updateParallaxBackgrounds();

document.addEventListener('DOMContentLoaded', function () {
	initScrollToTopLink();
	initLightGallery();
	initSegredosFadeAnimation();
	initInteractiveAudio();
});
