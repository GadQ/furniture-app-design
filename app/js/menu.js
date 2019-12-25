(() => {
    const menuButtons = document.querySelectorAll('.js-menu-main-button');


    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            menuButtons.forEach(buttonEl => buttonEl.classList.remove('is-active'));
            button.classList.add('is-active');
        });
    });
})();