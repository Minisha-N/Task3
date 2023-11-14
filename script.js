
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-0px)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});


document.addEventListener('DOMContentLoaded', function () {
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.listCart');
    const cartTotal = document.querySelector('.cart-total');

    let cart = [];


function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.dataset.index = index; 

        cartItem.innerHTML = `
            <img src="${item.image}">
            <div class="content">
                <div class="name">
                    ${item.name}
                </div>
                <div class="price">
                    ₹${item.price}/1 product
                </div>
            </div>
            <div class="button-container">
                <div class="quantity">
                    <button class="decrease" onclick="decreaseQuantity(${index})">-</button>
                    <span class="value">${item.quantity}</span>
                    <button class="increase" onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove" onclick="removeItem(${index})">&times;</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    const cartTotalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₹${cartTotalAmount.toFixed(2)}`;
}



    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const menuItem = button.closest('.products__card');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('p').textContent.split('₹')[1]);
            const itemImage = menuItem.querySelector('img').src;

            
            addToCart(itemName, itemPrice, itemImage);
        });
    });

   
    document.querySelector('.listCart').addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('decrease')) {
            const cartItem = target.closest('.item');
            const index = cartItem.dataset.index;
            decreaseQuantity(index);
        } else if (target.classList.contains('increase')) {
            const cartItem = target.closest('.item');
            const index = cartItem.dataset.index;
            increaseQuantity(index);
        } else if (target.classList.contains('remove')) {
            const cartItem = target.closest('.item');
            const index = cartItem.dataset.index;
            removeItem(index);
        }
    });

    function addToCart(itemName, itemPrice, itemImage) {
        const existingItem = cart.find((item) => item.name === itemName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
        }

        updateCartDisplay();
    }

    
    function decreaseQuantity(index) {
        if (cart[index] && cart[index].quantity > 1) {
            cart[index].quantity--;
        }

        updateCartDisplay();
    }

    function increaseQuantity(index) {
        if (cart[index]) {
            cart[index].quantity++;
        }

        updateCartDisplay();
    }

    function removeItem(index) {
        if (cart[index]) {
            cart.splice(index, 1);
        }

        updateCartDisplay();
    }
});
