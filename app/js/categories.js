(() => {
    const adjectives = [
        'ellegant',
        'cheap',
        'affordable',
        'pretty',
        'hard wood',
        'romantic',
        'light',
        'smooth',
        'comfy',
        'silky',
        'sparkling',
        'awesome',
        'blurry',
        'charming',
        'dusky',
        'engraved',
        'feisty',
        'godlike',
        'handmade',
        'insane',
        'jazzy',
        'kinky',
        'lively',
        'mighty',
        'nicest',
        'olden',
        'practic',
        'quiet',
        'rugged',
        'sexy',
        'stunning',
        'tasty',
        'useful',
        'vivid',
        'wheezy',
        'zippy'
    ];
    const nouns = [
        'amusement',
        'body',
        'case',
        'candy',
        'design',
        'diamond',
        'element',
        'energy',
        'experience',
        'feeling',
        'furniture',
        'geometry',
        'grade',
        'hope',
        'idea',
        'island',
        'jewel',
        'kick',
        'land',
        'melody',
        'mind',
        'motion',
        'offer',
        'option',
        'package',
        'point',
        'profit',
        'queen',
        'sail',
        'sand',
        'scene',
        'season',
        'space',
        'signature',
        'temper',
        'temple',
        'treatment',
        'visitor',
        'wealth',
        'wood',
        'zephyr'

    ];

    const sections = document.querySelectorAll('.js-section');
    const sides = ['front', 'back'];

    const categoriesClear = (section) => {
        const categories = section.querySelectorAll('.js-category');
        categories.forEach(category => {
            category.classList.remove('is-active');
        });
    };

    function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const generatePrice = () => {
        let basePrice = getRandomInt(100, 1400);
        basePrice = Math.floor(basePrice / 100) * 100;
        return Math.random() > 0.75 ? basePrice : basePrice - 1;
    };

    const generateName = (noun) => {
        return `${capFirst(adjectives[getRandomInt(0, adjectives.length - 1)])} ${capFirst(noun)}`;
    };

    const generateDescription = () => {
        return `${capFirst(adjectives[getRandomInt(0, adjectives.length - 1)])} ${nouns[getRandomInt(0, nouns.length - 1)]}`;
    };

    const fillProducts = (category, count = 6) => {
        const products = new Array(count).fill(null).map((item, index) => ({
            name: generateName(category),
            img: `./images/${category}${++index}.jpg`,
            price: `$ ${generatePrice()}`,
            description: generateDescription()
        }));

        return products;
    };

    const categoriesProducts = {
        sofa: fillProducts('sofa'),
        cabinet: fillProducts('cabinet'),
        chair: fillProducts('chair'),
        table: fillProducts('table'),
        bed: fillProducts('bed'),
    };

    const getProductHTML = (product) => `
    <div class="product-card product-card--find">
        <div class="product-card__image">
            <img src="${product.img}" alt="">
        </div>

        <div class="product-card__description">
            <div class="product-card__name">${product.name}</div>
            <div class="product-card__text">${product.description}</div>
            <div class="product-card__price price">${product.price}</div>

            <button class="product-card__add js-product-add">
                <span class="sr-only">Add</span>
            </button>
        </div>
    </div>
`;

    const fillCategoryCards = (category, section) => {
        const categoriesContent = section.querySelector('.js-categories-content');
        const categoryGridItems = [...categoriesContent.querySelectorAll('.js-grid-item')];
        const currentSide = categoriesContent.dataset.side;

        categoriesProducts[category].forEach((product, index) => {
            const gridItem = categoryGridItems[index];
            const itemCard = gridItem.querySelector(currentSide === 'front' ? '.js-grid-item-back' : '.js-grid-item-front');
            itemCard.innerHTML = getProductHTML(product);
        });
    };

    const flipCategoriesCards = (section) => {
        const categoriesContent = section.querySelector('.js-categories-content');
        const currentSide = categoriesContent.dataset.side;
        const categoryGridItems = [...categoriesContent.querySelectorAll('.js-grid-item')];
        categoryGridItems.forEach(gridItem => gridItem.classList.toggle('is-fliped', currentSide === 'front'));
        categoriesContent.dataset.side = sides[(sides.indexOf(currentSide) + 1) % sides.length];
    };



    sections.forEach(section => {
        fillCategoryCards('sofa', section);
        const categoriesContent = section.querySelector('.js-categories-content');
        categoriesContent.dataset.side = sides[(sides.indexOf(categoriesContent.dataset.side) + 1) % sides.length];

        section.addEventListener('click',(e)=>{
            const element = e.target;

            if( element.matches('.js-category:not(.is-active)')) {
                const category = element;
                categoriesClear(section);

                const categoriesList = section.querySelector('.js-categories-list');
                const categoryOffset = category.offsetLeft - categoriesList.offsetLeft;
                if (categoriesList.scrollLeft !== categoryOffset) {
                    setTimeout(() => {
                        category.classList.add('is-active');
                    }, 250);
                } else {
                    category.classList.add('is-active');
                }

                categoriesList.scrollTo({
                    behavior: 'smooth',
                    left: categoryOffset
                });


                const categoryName = category.dataset.category;
                fillCategoryCards(categoryName, section);
                flipCategoriesCards(section);
            }
        });
    });

    // categories.forEach(category => {
    //     category.addEventListener('click', () => {
    //         if (category.matches('.is-active')) {
    //             return;
    //         }
    //
    //         categoriesClear();
    //         const categoryOffset = category.offsetLeft - categoriesList.offsetLeft;
    //         if (categoriesList.scrollLeft !== categoryOffset) {
    //             setTimeout(() => {
    //                 category.classList.add('is-active');
    //             }, 250);
    //         } else {
    //             category.classList.add('is-active');
    //         }
    //
    //         categoriesList.scrollTo({
    //             behavior: 'smooth',
    //             left: categoryOffset
    //         });
    //
    //         const categoryName = category.dataset.category;
    //         fillCategoryCards(categoryName);
    //         flipCategoriesCards();
    //
    //     });
    // });
})();