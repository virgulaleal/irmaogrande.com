const BODY_BG_X_SPEED = 0.125;
const BODY_BG_Y_SPEED = 0.125;
const SECTION_BG_X_SPEED = -0.5;
const SECTION_BG_Y_SPEED = -0.5;
const SECTION_SELECTOR = '.bg-scroll-reverse';
const DIVIDER_TOP_X_SPEED = -0.25;
const DIVIDER_BOTTOM_X_SPEED = -0.25;

const PAGES = {
	'': {
		bgColor: '#f8ff83',
		title: 'IRMÃO Grande & Brasileiro 2'
	},
	'manual': {
		bgColor: '#f0f0ff',
		title: 'Manual - IRMÃO Grande & Brasileiro 2'
	},
	'imprensa': {
		bgColor: '#79b6e5',
		title: 'Imprensa - IRMÃO Grande & Brasileiro 2'
	},
	'segredos': {
		bgColor: '#1c1c1c',
		title: 'Segredos - IRMÃO Grande & Brasileiro 2'
	}
};

let currentPage = '';

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
			if (lgContainer.lgModal) {
				lgContainer.lgModal.destroy();
			}

			const inlineGallery = lightGallery(lgContainer, {
				container: lgContainer,
				dynamic: true,
				hash: false,
				closable: false,
				showMaximizeIcon: false,
				appendSubHtmlTo: '.lg-item',
				slideDelay: 400,
				plugins: [lgZoom, lgThumbnail],
				licenseKey: '1B72741A-8ECE4F55-A8F7D92D-6DB8375D',
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
		if (segredosBtn.hasAttribute('data-fade-initialized')) return;
		segredosBtn.setAttribute('data-fade-initialized', 'true');

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

const audioEventHandlers = new WeakMap();

function initTutorialScreenshotZoom() {
	const tutorialScreenshots = document.querySelectorAll('.tutorial-screenshot');
	
	tutorialScreenshots.forEach(screenshot => {
		if (screenshot.hasAttribute('data-zoom-initialized')) return;
		
		screenshot.style.cursor = 'pointer';
		
		const clickHandler = () => {
			screenshot.classList.toggle('zoomed');
			playAudio('audio/click_01.wav');
		};

		const mouseenterHandler = () => {
			playRandomTypeAudio();
		};
		
		screenshot.addEventListener('click', clickHandler);
		screenshot.addEventListener('mouseenter', mouseenterHandler);
		screenshot.setAttribute('data-zoom-initialized', 'true');
	});
}

function initInteractiveAudio() {
	const interactiveElements = document.querySelectorAll('button, a, .casa-btn, iframe, .lg-image, .lg-thumb-item');

	interactiveElements.forEach(element => {
		if (element.hasAttribute('data-audio-initialized')) return;

		const mouseenterHandler = () => {
			playRandomTypeAudio();
		};

		const mousedownHandler = () => {
			playAudio('audio/click_01.wav');
		};

		audioEventHandlers.set(element, {
			mouseenter: mouseenterHandler,
			mousedown: mousedownHandler
		});

		element.addEventListener('mouseenter', mouseenterHandler);
		element.addEventListener('mousedown', mousedownHandler);

		element.setAttribute('data-audio-initialized', 'true');
	});

	const cuMorphElements = document.querySelectorAll('.cu-morph, .badge-item, .gallery-frame, .author-image');

	cuMorphElements.forEach(element => {
		if (element.hasAttribute('data-audio-initialized')) return;

		const mouseenterHandler = () => {
			playAudio('audio/grunt.wav');
		};

		audioEventHandlers.set(element, {
			mouseenter: mouseenterHandler,
			mousedown: null
		});

		element.addEventListener('mouseenter', mouseenterHandler);
		element.setAttribute('data-audio-initialized', 'true');
	});
}

function switchPage(pageName) {
	if (currentPage === pageName) return;

	const pageConfig = PAGES[pageName] || PAGES[''];

	// Update URL and title
	if (pageName) {
		history.pushState(null, null, '#' + pageName);
	} else {
		history.pushState(null, null, window.location.pathname);
	}
	document.title = pageConfig.title;

	// Hide all pages
	document.querySelectorAll('.page-content').forEach(page => {
		page.style.display = 'none';
	});

	// Show the target page
	const targetPageId = pageName ? `page-${pageName}` : 'page-home';
	const targetPage = document.getElementById(targetPageId);
	if (targetPage) {
		targetPage.style.display = 'flex';
	}

	// Update background color
	document.body.style.backgroundColor = pageConfig.bgColor;

	// Scroll to top
	window.scrollTo({ top: 0, behavior: 'smooth' });

	currentPage = pageName;
}

function loadPageContent(pageName) {
	// This function is now obsolete since content is already in HTML
	// Just call switchPage directly
	switchPage(pageName);
}

function reinitializePageFeatures() {
	// This function is now obsolete since we don't dynamically inject content
	// All event listeners are initialized once on page load
}

function initPageSwitching() {
	window.addEventListener('popstate', function () {
		const hash = window.location.hash.slice(1);
		switchPage(hash);
	});

	document.querySelectorAll('.main-nav button, .main-nav a').forEach(btn => {
		const onclick = btn.getAttribute('onclick');
		if (onclick && onclick.includes('window.location.href')) {
			const hash = onclick.match(/#(\w+)/);
			if (hash) {
				btn.setAttribute('onclick', `switchPage('${hash[1]}')`);
			} else if (onclick.includes('#')) {
				btn.setAttribute('onclick', `switchPage('')`);
			}
		}
	});

	const currentHash = window.location.hash.slice(1);
	if (currentHash && PAGES[currentHash]) {
		switchPage(currentHash);
	}
}

window.addEventListener('scroll', updateParallaxBackgrounds);
updateParallaxBackgrounds();

document.addEventListener('DOMContentLoaded', function () {
	initScrollToTopLink();
	initLightGallery();
	initSegredosFadeAnimation();
	initInteractiveAudio();
	initTutorialScreenshotZoom();
	initPageSwitching();
});
