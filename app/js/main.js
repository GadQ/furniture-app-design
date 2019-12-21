'use strict';

const menuButtons = document.querySelectorAll('.js-menu-main-button');

menuButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        menuButtons.forEach(buttonEl => buttonEl.classList.remove('is-active'));
        button.classList.add('is-active');
    });
});

const tabs = document.querySelectorAll('.js-tab');
const tabWrapper = document.querySelector('.js-tab-wrapper');

const gridItems = document.querySelectorAll('.js-grid-item');

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

const cart = {
    products: [
        {
            id: 1,
            price: 299,
            amount: 1
        },
        {
            id: 2,
            price: 320,
            amount: 1
        },
        {
            id: 3,
            price: 1299,
            amount: 1
        },
        {
            id: 4,
            price: 400,
            amount: 1
        }
    ],
    total: 2318
};

const cartItems = document.querySelectorAll('.js-cart-item');
const cartTotalPrice = document.querySelector('.js-cart-total-price');

const totalPriceCounter = new CountUp(cartTotalPrice, cart.total, {
    startVal: cart.total,
    useGrouping: false,
    duration: 0.5
});

const updateTotalPrice = () => {
    cart.total = cart.products.reduce((total, item) => {
        return total + item.price * item.amount;
    }, 0);

    totalPriceCounter.update(cart.total);
};

const removeItem = (id) => {
    cart.products = cart.products.filter(item => item.id !== id);
    updateTotalPrice();
};

cartItems.forEach(cartItem => {
    const cartItemId = parseInt(cartItem.dataset.item);
    const cartItemWrapper = cartItem.querySelector('.js-cart-item-wrapper');
    const cartItemRemove = cartItem.querySelector('.js-cart-item-remove');
    const cartItemQuantity = cartItem.querySelector('.js-quantity');

    cartItem.addEventListener('click', (e) => {
        if (e.target.matches('.js-cart-item-remove')) {
            cartItemRemove.classList.add('is-removed');
        }

        if (e.target.matches('.js-quantity-up, .js-quantity-down')) {
            const item = cart.products.find(product => {
                return product.id === cartItemId;
            });

            if (e.target.matches('.js-quantity-up')) {
                item.amount++;
            } else {
                if (item.amount <= 1) {
                    return;
                }
                item.amount--;
            }

            cartItemQuantity.dataset.quantity = item.amount;
            cartItemQuantity.classList.add('has-changed');
            cartItemQuantity.textContent = item.amount;
            updateTotalPrice();
        }
    });

    cartItem.addEventListener('transitionend', (e) => {
        if (e.target.matches('.js-cart-item-wrapper')) {
            cartItem.classList.add('is-removed');
        }

        if (e.target.matches('.js-cart-item')) {
            cartItem.parentElement.remove();
        }
    });

    cartItem.addEventListener('animationend', (e) => {
        if (e.target.matches('.js-cart-item-remove')) {
            cartItemWrapper.classList.add('is-removed');
            removeItem(cartItemId);
        }
        if (e.target.matches('.js-quantity')) {
            cartItemQuantity.classList.remove('has-changed');
        }
    });
});

const categories = document.querySelectorAll('.js-category');
const categoriesList = document.querySelector('.js-categories-list');

const categoriesClear = () => {
    categories.forEach(category => {
        category.classList.remove('is-active');
    });
};

categories.forEach(category => {
    category.addEventListener('click', () => {
        categoriesClear();
        category.classList.add('is-active');
        categoriesList.scrollTo({
            behavior: 'smooth',
            left: category.offsetLeft - categoriesList.offsetLeft
        });

    });
});

