window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.main-content').classList.remove('hidden');
  }, 3000);
});

const buttons = document.querySelectorAll('[data-target]');
const views = document.querySelectorAll('.view');
const backBtns = document.querySelectorAll('.back-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.main-content').classList.add('hidden');
    const target = btn.getAttribute('data-target');
    document.getElementById(target).classList.remove('hidden');
  });
});

backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.view').classList.add('hidden');
    document.querySelector('.main-content').classList.remove('hidden');
  });
});
