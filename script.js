window.onload = () => {
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('main-menu').classList.remove('hidden');
  }, 4000);
};

// Navigation
const buttons = document.querySelectorAll('.menu-btn, #hireBtn, #aboutBtn');
const sections = document.querySelectorAll('.section');
const mainMenu = document.getElementById('main-menu');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target || btn.id.replace('Btn', '');
    mainMenu.style.display = 'none';
    document.getElementById(target).classList.add('active');
  });
});

// Back Buttons
const backButtons = document.querySelectorAll('.back-btn');
backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sections.forEach(sec => sec.classList.remove('active'));
    mainMenu.style.display = 'block';
  });
});
