window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const container = document.querySelector('.container');
    setTimeout(() => {
        loader.style.display = 'none';
        container.classList.remove('hidden');
    }, 2500);
});
