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
  
  // Update divider backgrounds using CSS custom properties
  document.documentElement.style.setProperty('--divider-top-x', `${scrollY * DIVIDER_TOP_X_SPEED}px`);
  document.documentElement.style.setProperty('--divider-bottom-x', `${scrollY * DIVIDER_BOTTOM_X_SPEED}px`);
}

window.addEventListener('scroll', updateParallaxBackgrounds);

updateParallaxBackgrounds();

// === Audio for buttons and links ===
function playAudio(src) {
  const audio = new Audio(src);
  audio.volume = 0.3;
  audio.play().catch(() => {}); // Ignore errors if audio can't play
}

function playRandomTypeAudio() {
  const randomNum = Math.floor(Math.random() * 7) + 1; // Random number 1-7
  const audioSrc = `audio/type_0${randomNum}.wav`;
  playAudio(audioSrc);
}

// Add hover and click sounds to all buttons and links
document.addEventListener('DOMContentLoaded', function() {
  const interactiveElements = document.querySelectorAll('button, a, .casa-btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      playRandomTypeAudio();
    });
    
    element.addEventListener('mousedown', () => {
      playAudio('audio/click_01.wav');
    });
  });

  // Add grunt sound to cu-morph elements
  const cuMorphElements = document.querySelectorAll('.cu-morph');
  
  cuMorphElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      playAudio('audio/grunt.wav');
    });
  });
});

// === Scroll to Top Link ===
document.addEventListener('DOMContentLoaded', function() {
  var scrollLink = document.querySelector('.scroll-to-top-link');
  if (scrollLink) {
    function toggleScrollToTopLink() {
      if (window.scrollY > 0) {
        scrollLink.classList.add('visible');
      } else {
        scrollLink.classList.remove('visible');
      }
    }
    // Initial state
    toggleScrollToTopLink();
    window.addEventListener('scroll', toggleScrollToTopLink);
    scrollLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
