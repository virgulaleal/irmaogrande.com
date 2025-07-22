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

function initInteractiveAudio() {
	const allPossibleElements = document.querySelectorAll('[data-audio-initialized]');
	allPossibleElements.forEach(element => {
		const handlers = audioEventHandlers.get(element);
		if (handlers) {
			element.removeEventListener('mouseenter', handlers.mouseenter);
			element.removeEventListener('mousedown', handlers.mousedown);
			audioEventHandlers.delete(element);
		}
		element.removeAttribute('data-audio-initialized');
	});

	const interactiveElements = document.querySelectorAll('button, a, .casa-btn, iframe, .lg-image, .lg-thumb-item');

	interactiveElements.forEach(element => {
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

	const cuMorphElements = document.querySelectorAll('.cu-morph, .badge-item, .gallery-frame');

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

	const mainContent = document.querySelector('main');
	const pageConfig = PAGES[pageName] || PAGES[''];

	if (pageName) {
		history.pushState(null, null, '#' + pageName);
	} else {
		history.pushState(null, null, window.location.pathname);
	}

	document.title = pageConfig.title;

	mainContent.classList.add('page-transition-out');

	setTimeout(() => {
		document.body.style.backgroundColor = pageConfig.bgColor;

		loadPageContent(pageName);

		window.scrollTo({ top: 0, behavior: 'smooth' });

		mainContent.classList.remove('page-transition-out');
		mainContent.classList.add('page-transition-in');

		setTimeout(() => {
			mainContent.classList.remove('page-transition-in');
		}, 300);

		currentPage = pageName;
	}, 300);
}

function loadPageContent(pageName) {
	const mainContent = document.querySelector('main');

	switch (pageName) {
		case 'manual':
			mainContent.innerHTML = getManualContent();
			break;
		case 'imprensa':
			mainContent.innerHTML = getImprensaContent();
			break;
		case 'segredos':
			mainContent.innerHTML = getSegredosContent();
			break;
		default:
			mainContent.innerHTML = getHomeContent();
			break;
	}

	reinitializePageFeatures();
}

function reinitializePageFeatures() {
	initLightGallery();

	initInteractiveAudio();

	initSegredosFadeAnimation();

}

function getHomeContent() {
	return `
		<section>
			<div class="video-embed-wrapper">
				<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yFzVBpqwzF0?si=IOtki8Oqk3siEPLD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>

			<nav class="main-nav">
				<div class="button-container"><button type="button" onclick="document.getElementById('continuar').scrollIntoView({behavior: 'smooth'})" class="casa-btn patrick-hand-sc-regular">Continuar</button></div>
				<div class="button-container"><a href="https://store.steampowered.com/app/1569520/IRMO_Grande__Brasileiro_2/" class="casa-btn casa-btn-yellow patrick-hand-sc-regular" target="_blank" rel="noopener">Comprar</a></div>
			</nav>
		</section>

		<section id="continuar" class="divider-top divider-bottom-flip bg-scroll-reverse full-width-section bg-blue">
			<div class="section-content">
				<h2>É de cair o <span class="cu-morph" data-alt="🍥" tabindex="0"><span class="cu-morph-text">cu</span></span> da <span class="cu-morph" data-alt="🍑" tabindex="0"><span class="cu-morph-text">bunda</span></span></h2>
				<div class="content-chunk">
					<h3 class="text-center">O simulador de reality show compatível com seus amigos</h3>
					<div class="festival-chunk-layout">
						<div class="festival-content">
							<p>
								<b>Você monta um elenco</b> formado pelos seus amigos, personagens ou celebridades favoritas, enfia todo mundo numa casa, e assiste o circo pegar fogo até sobrar um só.
							</p>
						</div>
						<div class="festival-gallery">
							<div class="gallery-frame">
								<img src="img/miguel.png" alt="Miguel" class="gallery-image">
							</div>
							<div class="gallery-frame">
								<img src="img/fofinho.png" alt="Fofinho" class="gallery-image">
							</div>
							<div class="gallery-frame">
								<img src="img/popai.png" alt="Popai" class="gallery-image">
							</div>
							<p style="text-align: center; font-size: 12pt;"><i>Finge que são os seus amigos aqui, não tenho foto de vocês.</i></p>
						</div>
					</div>
				</div>

				<div class="iframe-embed-outer">
					<div class="iframe-embed-inner">
						<iframe src="https://store.steampowered.com/widget/1569520/" class="iframe-embed"></iframe>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="section-content">
				<h2><span class="cu-morph" data-alt="🍆👂" tabindex="0"><span class="cu-morph-text">Duvido</span></span>u? Eu tenho fotos</h2>
				<div id="inline-gallery-container" class="inline-gallery-container"></div>
				<p><b>Quer mais fotos? Inacreditável!!!</b> Dá uma espiadinha na página de <a href="#" onclick="switchPage('imprensa')">imprensa</a>.</p>
			</div>
		</section>

		<div class="spacer-small"></div>

		<section id="continuar" class="divider-top divider-bottom-flip bg-scroll-reverse full-width-section bg-blue">
			<div class="section-content">
				<h2>Festival de in<span class="cu-morph" data-alt="💩" tabindex="0"><span class="cu-morph-text">cu</span></span>mbências</h2>
				<div class="content-chunk">
					<h3 class="text-center">O mais Grande e mais Brasileiro simulador de cárcere privado competitivo que o dinheiro pode comprar!</h3>
					<p>
					<ul class="two-column-list">
						<li><b>Milhares</b> de situações inusitadas que eu fiquei muito tempo escrevendo!</li>
						<li><b>Escolha</b> participantes, eventos, e até a própria casa!</li>
						<li><b>Compartilhe</b> suas terríveis criações pela <a href="https://steamcommunity.com/app/1569520/workshop/" target="_blank" rel="noopener">oficina Steam</a>!</li>
						<li><b>Confronte</b> os horrores da humanidade com 32 combinações de natureza!</li>
					</ul>
					</p>
				</div>
				<div class="badge-container">
					<div class="badge-item">
						<img src="img/badges/brasil2.png" alt="Brasil 2" class="badge-icon">
					</div>
					<div class="badge-item">
						<img src="img/badges/eliminado.png" alt="Eliminado" class="badge-icon">
					</div>
					<div class="badge-item">
						<img src="img/badges/hierofante.png" alt="Hierofante" class="badge-icon">
					</div>
					<div class="badge-item">
						<img src="img/badges/imune.png" alt="Imune" class="badge-icon">
					</div>
					<div class="badge-item">
						<img src="img/badges/monarca.png" alt="Monarca" class="badge-icon">
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="section-content">
				<h3 class="patrick-hand-heading">Você quer saber mais?</h3>
				<h2><span class="cu-morph" data-alt="👶" tabindex="0"><span class="cu-morph-text">Você</span></span> não cansa?!</h2>
			</div>
			<div class="video-embed-wrapper">
				<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QpZu6KWxWq8?si=IOtki8Oqk3siEPLD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
			<div class="content-chunk">
				<h3 class="text-center">Você é quem manda!</h3>
				<p>
				<ul class="two-column-list vertical-flow">
					<li><b>ESCOLHA</b> as suas pessoas favoritas para confinar na casa mais vigiada do Brasil</li>
					<li><b>CONFRONTE</b> os horrores da psique e do ego, defina os atributos da personalidade dos seus amigos, e encontre as 32 combinações diferentes da Natureza humana</li>
					<li><b>VOCÊ DECIDE</b> se os votos dos participantes e do Brasil são simulados pelo jogo, ou se você toma as rédeas do destino, dita o resultado de cada votação, e prova de uma vez por todas que a democracia seria muito melhor se obedecesse à sua vontade</li>
					<li><b>SUBMETA</b> os participantes a milhares de situações absurdas e inusitadas que eu fiquei muito tempo escrevendo</li>
					<li><b>PERSONALIZE</b> cada pessoinha que você escolheu aprisionar em seu computador, os acontecimentos gerados pelo jogo, e até a própria casa em que tudo acontece</li>
					<li><b>TESTEMUNHE</b> os seus confinados competindo pela Coroa do Monarca e pela Ascensão do Hierofante. Quem não provar do leite da imunidade, corre o risco de acabar no PAREDÃO</li>
					<li><b>APRECIE</b> as nove ou mais faixas de trilha sonora original em glorioso chiptune, e o design de interface em que cada botão e caixa de texto contém vestígios de autêntica carne viva!</li>
				</ul>
				</p>
			</div>
			<div class="video-embed-wrapper">
				<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yixCzrpEhvY?si=IOtki8Oqk3siEPLD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
			<div class="content-chunk">
				<h3 class="text-center">IRMÃO Grande & Brasileiro 2</h3>
				<p><b>Em IG&B2 você forma um elenco das suas pessoas favoritas.</b> Seus amigos, os personagens daquele desenho que você jura que nunca assistiu, e até os figurões da política e do entretenimento. As possibilidades são infinitas (as possibilidades podem não ser infinitas)!</b></p>
				<p><b>Você trancafia todos dentro de uma casa</b> (dentro de um jogo) e lá eles vivem as situações mais absurdas e inusitadas que o cérebro humano pôde conceber. Aos moldes dos grandes cárceres competitivos da história, os participantes competem todas as semanas em uma prova, de onde apenas um sai triunfante. Depois da prova da semana, todos que não provaram do leite da imunidade votam para condenar dois participantes ao paredão, sob o risco da penalidade máxima: o DESPEJO.</p>
				<p><b>Aproveite as opções de customização</b> para construir a sua própria casa, manipular a velocidade do jogo, salvar e compartilhar os seus participantes pela internet, e até mesmo personalizar o baralho de eventos que é usado para gerar os acontecimentos de cada semana.</p>
			</div>
		</section>

		<section id="continuar" class="divider-top divider-bottom-flip bg-scroll-reverse full-width-section bg-blue">
			<div class="section-content">
				<h2>Socialize-se</h2>
				<div class="two-column-layout" style="margin-top: 1.5em;">
					<div class="content-chunk">
						<h3><span class="cu-morph" data-alt="🍄🍄‍🟫🍄🍄‍🟫🍄🍄‍🟫" tabindex="0"><span class="cu-morph-text">Junte-se a nós no Discord!</span></span></h3>
						<p>Compartilhe as suas criações, conheça nossa comunidade, vislumbre o futuro do jogo, e faça ouvida a sua voz — tome as rédeas do destino!</p>
						<div class="button-container full-width-button-container"><a href="https://discord.com/invite/Psw69KBkKV" class="casa-btn casa-btn-yellow patrick-hand-sc-regular full-width-button" target="_blank" rel="noopener">Socializar</a></div>
					</div>
					<div class="iframe-column">
						<iframe src="https://discord.com/widget?id=1095055033248256193&theme=dark" width="100%" height="100%" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="section-content section-height-675">
				<div class="section-centered-content">
					<h3 class="patrick-hand-heading-large" style="margin-bottom: 0.5em;">Agora é com você.</h3>
					<div class="button-container full-width-button-container"><button type="button" onclick="switchPage('segredos')" class="casa-btn patrick-hand-sc-regular segredos-fade full-width-button">Segredos</button></div>
				</div>
			</div>
		</section>
	`;
}

function getManualContent() {
	return `
		<section>
			<div class="section-content">
				<h2>Dicas e Truques IG&B2</h2>
				<div class="content-chunk">
					<h3 class="text-center">Índice</h3>
					<ul class="two-column-list">
						<li><a href="#" onclick="document.getElementById('manual-twitch').scrollIntoView({behavior: 'smooth'}); return false;">Modo Twitch.tv</a></li>
					</ul>
					<p><b>Ah... é só isso.</b> Pelo menos por enquanto. Não dá pra saber o que o futuro nos reserva.</p>
				</div>
			</div>
		</section>

		<section id="manual-twitch">
			<div class="section-content">
				<div class="content-chunk">
					<h3 class="text-center">Modo Twitch.tv!</h3>
					<p><b>Conecte o jogo ao seu canal Twitch.tv!</b> Usando esta integração, você terá acesso à <b>URNA</b>, uma janela que pode ser aberta durante escolhas manuais, permitindo que seus espectadores votem enviando números no chat.</p>
					
					<p>Para cadastrar um aplicativo no Developer Console e usar o modo Twitch.tv, sua conta Twitch deve ter a <a href="https://help.twitch.tv/s/article/two-factor-authentication?language=pt_BR" target="_blank" rel="noopener">autenticação de dois fatores</a> ativada.</p>
					
					<p>O modo Twitch.tv não está disponível para dispositivos móveis (Android).</p>

					<h3 class="text-center">Como configurar o modo Twitch.tv</h3>
					
					<p><b>Obtenha as suas credenciais.</b> Para usar o modo Twitch.tv, você vai precisar cadastrar um aplicativo usando o <a href="https://dev.twitch.tv/" target="_blank" rel="noopener">Twitch.tv Developer Console</a>, e usar as credenciais deste aplicativo no jogo para se conectar ao chat do seu canal. Calma, é fácil!</p>

					<img src="img/tutorial_twitch/tutorial_twitch_thumb.png">
					
					<p><b>1.</b> Acesse <a href="https://dev.twitch.tv/" target="_blank" rel="noopener">dev.twitch.tv</a> com a sua conta twitch.tv, e então localize o seu <b>Console</b>.</p>
					
					<img src="img/tutorial_twitch/tutorial_twitch_00.png">

					<p><b>2.</b> Do lado direito, no console, pressione o botão para registrar um <b>novo aplicativo</b>.</p>

					<img src="img/tutorial_twitch/tutorial_twitch_01.png">
					
					<p><b>3.</b> Preencha o nome que quiser para o seu aplicativo, mas <em><b>não use acentos</b></em> nem outros caracteres especiais.</p>
					<p>Para o campo <b>OAuth Redirect URLs</b>, preencha com <code>http://localhost:18297</code>, e escolha a categoria <b>Game Integration</b>. Verifique o captcha e crie seu novo aplicativo.</p>

					<img src="img/tutorial_twitch/tutorial_twitch_02.png">
					
					<p><b>4.</b> Pressione <b>New Secret</b>, tome nota do <b>Client ID</b> e <b>Client Secret</b>. Cuidado! Não deixe ninguém ver o seu Client Secret. Se você acredita que este possa ter sido comprometido, você pode revogá-lo aqui, também.</p>

					<img src="img/tutorial_twitch/tutorial_twitch_03.png">
					
					<p><b>5.</b> Abra o jogo e ative o <b>Modo Twitch.tv</b> nas configurações. Preencha o nome do seu canal, com o Client ID, Client Secret, e pode conectar!</p>

					<img src="img/tutorial_twitch/tutorial_twitch_04.png">
					
					<p><b>7.</b> Ao conectar, a página de autenticação da Twitch.tv vai abrir no seu navegador. Autorize o aplicativo para que ele possa acessar seu chat.</p>

					<img src="img/tutorial_twitch/tutorial_twitch_06.png">
					
					<p><b>8.</b> <b>Parabéns! Você venceu!</b> Para encontrar <b>A URNA</b> durante o jogo e permitir que o chat vote enviando números, certifique-se de ativar <b>votações manuais</b> ao criar sua temporada — as simuladas funcionam como sempre.</p>

					<img src="img/tutorial_twitch/tutorial_twitch_07.png">
				</div>
			</div>
		</section>
	`;
}

function getImprensaContent() {
	return `
		<section>
			<div class="section-content">
				<h2>Fala, galera do jornal!</h2>
				<div class="content-chunk">
					<h3 class="text-center">Ficha Técnica</h3>
					<ul>
						<li><b>Título:</b> IRMÃO Grande & Brasileiro 2</li>
						<li><b>Preço:</b> R$19,99 (<a href="https://store.steampowered.com/app/1569520/IRMO_Grande__Brasileiro_2/" target="_blank" rel="noopener">Steam</a>), R$14,99 (<a href="https://play.google.com/store/apps/details?id=org.godotengine.igeb2" target="_blank" rel="noopener">Android</a>)</li>
						<li><b>Autoria:</b> Virgula Leal<sup style="color: rgb(32, 33, 34); font-size: 14px; text-emphasis-position: auto"><a href="https://bsky.app/profile/virgula.jogojoia.com" target="_blank" rel="noopener" style="border-radius: 2px"><span style="cursor: pointer">[</span>@<span style="cursor: pointer">]</span></a></sup> et. al.</li>
						<li><b>Classificação indicativa:</b> 14 anos</li>
						<li><b>Lançamento:</b> 15 de Outubro, 2021</li>
						<li><b>Contato:</b> <a href="mailto:virgula@jogojoia.com">virgula@jogojoia.com</a></li>

					</ul>

					<p><b>Materiais oficiais</b> para jornalistas, influenciadores e criadores de conteúdo interessados em IRMÃO Grande & Brasileiro 2.</p>
					
					<h4>Screenshots do Jogo</h4>
					<div id="inline-gallery-container" class="inline-gallery-container"></div>
					
					<h4>Informações do Desenvolvedor</h4>
					<p><b>Desenvolvedor:</b> Virgula Leal / Jogo Joia<br>
					<b>Data de Lançamento:</b> 2024<br>
					<b>Plataformas:</b> PC (Steam, itch.io)<br>
					<b>Gênero:</b> Simulação, Estratégia, Comédia</p>
					
					<h4>Contato para Imprensa</h4>
					<p>Para mais informações, entrevistas ou materiais adicionais, entre em contato através do nosso Discord ou redes sociais.</p>
				</div>
			</div>
		</section>
	`;
}

function getSegredosContent() {
	return `
		<section>
			<div class="section-content section-height-675">
				<div class="section-centered-content">
					<h2 style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Área Secreta</h2>
					<div class="content-chunk" style="background: rgba(0,0,0,0.8); color: #fff; border-color: #fff;">
						<h3 class="text-center" style="background: rgba(131, 131, 255, 0.3); color: #fff;">🔒 Conteúdo Classificado 🔒</h3>
						<p style="text-align: center; font-size: 1.2em;"><b>Você descobriu a área secreta!</b></p>
						<p>Aqui ficam os Easter eggs, conteúdos extras e surpresas especiais para os jogadores mais curiosos...</p>
						
						<div style="text-align: center; margin: 2em 0;">
							<p style="font-family: 'Patrick Hand SC', monospace; font-size: 1.5em; color: #8383ff;">🎭 Em desenvolvimento... 🎭</p>
						</div>
						
						<p style="text-align: center;"><small>Volte mais tarde para descobrir novos segredos!</small></p>
					</div>
				</div>
			</div>
		</section>
	`;
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
	initPageSwitching();
});
