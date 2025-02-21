let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.type}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="part-type">${item.type}</div>
                <div class="item-quantity">Quantity: ${item.quantity}</div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});

// Listen for changes in localStorage
window.addEventListener('storage', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems();
    updateCartCount();
});