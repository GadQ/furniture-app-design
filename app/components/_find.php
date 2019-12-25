<div class="app find">
    <header class="app__header find__header">
        <div class="find__header-wrapper">
            <button class="app__screen-title find__title h1 js-section-change" data-section="furniture">Furniture</button>
            <button class="app__screen-title find__title h1 js-section-change is-inactive" data-section="renovation">Renovation</button>
        </div>
    </header>
    <div class="app__body find__sections">
        <div class="find__body find__section is-active find__section--left js-section" data-section="furniture">
            <div class="categories">
                <ul class="categories__list js-categories-list">
                    <li class="categories__item">
                        <button class="categories__item-name js-category is-active" data-category="sofa" type="button">
                            Sofa
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="bed" type="button">Bed</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="cabinet" type="button">Cabinet
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="chair" type="button">Chair</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="table" type="button">Table</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="sofa" type="button">Sofa</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="bed" type="button">Bed</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="cabinet" type="button">Cabinet
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="chair" type="button">Chair</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="table" type="button">Table</button>
                    </li>
                </ul>
            </div>
            <div class="find__content">
                <div class="item-grid js-categories-content" data-side="back">
                    <?php for ($i = 0; $i < 6; $i++): ?>
                        <div class="item-grid__item js-grid-item">
                            <div class="item-grid__item-front js-grid-item-front"></div>
                            <div class="item-grid__item-back js-grid-item-back"></div>
                        </div>
                    <?php endfor; ?>
                </div>
            </div>

            <button class="find__cart-button" type="button">
                <span class="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon-cart" viewBox="0 0 30 30" width="30" height="30">
                    <path d="M25.38 25a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5zM14.4 25a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 019.4 25a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5zM6.48 6.4l-.44-1.7A3 3 0 003.12 2.5H1v1.96h2.12a1 1 0 011 .74l2.7 10.7.91 3.38a3 3 0 002.95 2.22h14.98v-1.95H10.68a1 1 0 01-1-.74L9 16.4l15.88-.63a2.97 2.97 0 002.24-2.14L29 6.4zm18.74 6.75a1 1 0 01-.75.71l-15.92.63-1.57-6.13h19.5z"/>
                </svg>
            </button>
        </div>

        <div class="find__body find__section find__section--right js-section is-inactive" data-section="renovation">
            <div class="categories">
                <ul class="categories__list js-categories-list">
                    <li class="categories__item">
                        <button class="categories__item-name js-category is-active" data-category="sofa" type="button">
                            Sofa
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="bed" type="button">Bed</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="cabinet" type="button">Cabinet
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="chair" type="button">Chair</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="table" type="button">Table</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="sofa" type="button">Sofa</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="bed" type="button">Bed</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="cabinet" type="button">Cabinet
                        </button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="chair" type="button">Chair</button>
                    </li>
                    <li class="categories__item">
                        <button class="categories__item-name js-category" data-category="table" type="button">Table</button>
                    </li>
                </ul>
            </div>
            <div class="find__content">
                <div class="item-grid js-categories-content" data-side="back">
                    <?php for ($i = 0; $i < 6; $i++): ?>
                        <div class="item-grid__item js-grid-item">
                            <div class="item-grid__item-front js-grid-item-front"></div>
                            <div class="item-grid__item-back js-grid-item-back"></div>
                        </div>
                    <?php endfor; ?>
                </div>
            </div>

            <button class="find__cart-button" type="button">
                <span class="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon-cart" viewBox="0 0 30 30" width="30" height="30">
                    <path d="M25.38 25a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5zM14.4 25a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 019.4 25a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5zM6.48 6.4l-.44-1.7A3 3 0 003.12 2.5H1v1.96h2.12a1 1 0 011 .74l2.7 10.7.91 3.38a3 3 0 002.95 2.22h14.98v-1.95H10.68a1 1 0 01-1-.74L9 16.4l15.88-.63a2.97 2.97 0 002.24-2.14L29 6.4zm18.74 6.75a1 1 0 01-.75.71l-15.92.63-1.57-6.13h19.5z"/>
                </svg>
            </button>
        </div>
    </div>
    <div class="app__footer">
        <?php include('_menu-main.php'); ?>
    </div>
</div>
