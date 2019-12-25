(() => {
    const tabs = document.querySelectorAll('.js-tab');
    const tabWrapper = document.querySelector('.js-tab-wrapper');

    const gridItems = document.querySelectorAll('.js-tabs-content .js-grid-item');

    const removeActiveTabs = () => {
        tabs.forEach(tab => tab.classList.remove('is-active'));
    };


    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            removeActiveTabs();
            tab.classList.add('is-active');
            const tabIndex = parseInt(tab.dataset.tab);
            tabWrapper.classList.toggle('tabs__wrapper--second', tabIndex !== 1);
            gridItems.forEach(gridItem => gridItem.classList.toggle('is-fliped', tabIndex !== 1));
        });
    });
})();