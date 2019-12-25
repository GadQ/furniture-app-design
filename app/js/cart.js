(() => {
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
})();
