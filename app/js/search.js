(() => {
    const search = document.querySelector('.js-search');
    const searchText = document.querySelector('.js-search-text');
    const searchSubmit = search.querySelector('.js-search-submit');

    searchSubmit.addEventListener('click', (e) => {
        if (!search.classList.contains('is-open')) {
            e.preventDefault();
            search.classList.add('is-open');
            searchText.focus();
            setTimeout(() => {
                searchText.setAttribute('placeholder', 'Search...');
            }, 500);
        }
    });


    document.addEventListener('click', () => {
        searchText.removeAttribute('placeholder');
        search.classList.remove('is-open');
    });

    search.addEventListener('click', (e) => {
            e.stopPropagation();
        }
    );
})();