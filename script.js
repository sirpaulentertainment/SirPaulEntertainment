window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const container = document.querySelector('.container');
    setTimeout(() => {
        loader.style.display = 'none';
        container.classList.remove('hidden');
    }, 2500);
});
// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});
