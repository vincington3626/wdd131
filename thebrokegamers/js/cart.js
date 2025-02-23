// Retrieve the cart from localStorage or initialize it as an empty array if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get references to the cart items container and the cart total element
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Function to display the cart items
function displayCartItems() {
    // Clear the current contents of the cart items container
    cartItems.innerHTML = '';
    let total = 0; // Initialize the total price of the cart

    // Loop through each item in the cart
    cart.forEach((item, index) => {
        // Create a new div element for the cart item
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item'; // Add a class for styling

        // Populate the cart item with HTML content
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.type}"> <!-- Display the item image -->
            <div class="cart-item-info">
                <h3>${item.name}</h3> <!-- Display the item name -->
                <div class="part-type">${item.type}</div> <!-- Display the item type -->
                <div class="item-quantity">Quantity: ${item.quantity}</div> <!-- Display the item quantity -->
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div> <!-- Display the item price -->
            <button class="remove-item" onclick="removeItem(${index})">Remove</button> <!-- Add a remove button -->
        `;

        // Append the cart item to the cart items container
        cartItems.appendChild(cartItem);

        // Add the item's total price (price * quantity) to the cart total
        total += item.price * item.quantity;
    });

    // Update the cart total display with the calculated total price
    cartTotal.textContent = total.toFixed(2);

    // Update the cart count in the header
    updateCartCount();
}

// Function to remove an item from the cart
function removeItem(index) {
    // Remove the item at the specified index from the cart array
    cart.splice(index, 1);

    // Update the cart in localStorage with the modified cart array
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-display the cart items to reflect the changes
    displayCartItems();

    // Update the cart count in the header
    updateCartCount();
}

// Function to update the cart count in the header
function updateCartCount() {
    // Get the cart count element
    const cartCount = document.getElementById('cart-count');

    // If the cart count element exists, update its text content
    if (cartCount) {
        // Calculate the total quantity of items in the cart
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Function to add an item to the cart
function addToCart(item) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        cart.push({ ...item, quantity: 1 });
    }

    // Update the cart in localStorage with the modified cart array
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();
}

// Initialize the cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // If the cart items container exists, display the cart items
    if (cartItems) {
        displayCartItems();
    }

    // Always update the cart count in the header
    updateCartCount();
});

// Listen for changes in localStorage (e.g., when the cart is updated from another tab or window)
window.addEventListener('storage', () => {
    // Retrieve the updated cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    // If the cart items container exists, re-display the cart items
    if (cartItems) {
        displayCartItems();
    }

    // Always update the cart count in the header
    updateCartCount();
});