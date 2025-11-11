// script.js
// Plays the intro animation once per visit (session storage).
// After intro completes, show main site and allow normal navigation.

// Adjust durations to match CSS timing
const INTRO_DURATION_MS = 2600; // total time intro stays before fade (tweak if needed)
const INTRO_FADE_MS = 900;

function showMainAfterIntro(){
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');

  // Hide intro visually -> fade then remove from flow
  intro.classList.add('intro-hide');

  // After fade finishes, fully hide and show site
  setTimeout(() => {
    intro.style.display = 'none';
    site.classList.remove('hidden');
  }, INTRO_FADE_MS + 80);
}

// If user already saw intro this session, skip it
const seen = sessionStorage.getItem('sirpaul_seen_intro');
if(seen){
  // skip intro
  document.getElementById('intro').style.display = 'none';
  document.getElementById('site').classList.remove('hidden');
} else {
  // show intro then remove
  // Play intro timeline (intro CSS animations run automatically)
  window.addEventListener('load', () => {
    // set flag so it won't show again in same session
    sessionStorage.setItem('sirpaul_seen_intro','1');

    // wait for the intro visible animation to finish then fade
    setTimeout(showMainAfterIntro, INTRO_DURATION_MS);
  });
}

// Accessibility: allow skip intro if user presses Escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    sessionStorage.setItem('sirpaul_seen_intro','1');
    const intro = document.getElementById('intro');
    const site  = document.getElementById('site');
    intro.style.display = 'none';
    site.classList.remove('hidden');
  }
});
