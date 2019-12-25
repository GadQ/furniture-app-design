(() => {
    document.addEventListener('click', (e) => {
        const element = e.target;
        if (element.matches('.js-product-add')) {
            element.classList.toggle('is-active');
        }
    });
})();