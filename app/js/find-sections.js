(() => {
    const findSectionButtons = document.querySelectorAll('.js-section-change');
    const findSections = [...document.querySelectorAll('.js-section')];
    const inactivateButtons = () => {
        findSectionButtons.forEach(button => {
            button.classList.add('is-inactive');
        });
    };

    const inactivateSections = () => {
        findSections.forEach(section => {
            section.classList.add('is-inactive');
        });
    };

    findSectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            inactivateSections();
            inactivateButtons();

            findSections.find(section => section.dataset.section === sectionId).classList.remove('is-inactive');
            button.classList.remove('is-inactive');
        });
    });
})();