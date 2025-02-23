// Retrieve the cart from localStorage or start with an empty array if no cart exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// List of gaming parts available in the store
const gamingParts = [
    {
        id: 1,
        name: "GeForce RTX 3060",
        type: "GPU",
        specs: "12GB GDDR6, 192-bit, 3584 CUDA Cores",
        price: 199.99,
        image: "images/Store/rtx3060.jpg"
    },
    {
        id: 2,
        name: "Ryzen 5 5600X",
        type: "CPU",
        specs: "6-Core 12-Thread, 3.7GHz Base, 4.6GHz Boost",
        price: 129.99,
        image: "images/Store/ryzen5600x.jpg"
    },
    {
        id: 3,
        name: "16GB DDR4 RAM",
        type: "Memory",
        specs: "3200MHz, CL16, Dual Channel Kit",
        price: 39.99,
        image: "images/Store/ram.jpg"
    },
    {
        id: 4,
        name: "1TB NVMe SSD",
        type: "Storage",
        specs: "PCIe Gen3, 3500MB/s Read, 3000MB/s Write",
        price: 49.99,
        image: "images/Store/ssd.jpg"
    },
    {
        id: 5,
        name: "B550 Motherboard",
        type: "Motherboard",
        specs: "ATX, PCIe 4.0, DDR4, USB 3.2 Gen2",
        price: 89.99,
        image: "images/Store/motherboard.jpg"
    },
    {
        id: 6,
        name: "750W PSU",
        type: "Power Supply",
        specs: "80+ Gold, Fully Modular, Silent Fan",
        price: 69.99,
        image: "images/Store/psu.jpg"
    }
];

// Generates the list of gaming parts and displays them on the store page
function generatePartsList() {
    // Get the container where the parts list will be displayed
    const container = document.getElementById('parts-list');
    if (!container) {
        console.error("Container for parts list not found!"); // Log an error if the container is missing
        return;
    }

    console.log("Generating parts list..."); // Log a message to indicate the function is running
    container.innerHTML = ''; // Clear the container to prepare for new content

    // Loop through each part in the gamingParts array
    gamingParts.forEach(part => {
        // Create a new div element for the part card
        const partCard = document.createElement('div');
        partCard.className = 'part-card'; // Add a class for styling

        // Populate the part card with HTML content
        partCard.innerHTML = `
            <img src="${part.image}" alt="${part.type}"> <!-- Display the part image -->
            <h3>${part.name}</h3> <!-- Display the part name -->
            <div class="part-type">${part.type}</div> <!-- Display the part type -->
            <div class="part-specs">${part.specs}</div> <!-- Display the part specifications -->
            <div class="part-price">$${part.price.toFixed(2)}</div> <!-- Display the part price -->
            <div class="quantity-selector">
                <button onclick="decreaseQuantity(${part.id})">-</button> <!-- Button to decrease quantity -->
                <span id="quantity-${part.id}">1</span> <!-- Display the current quantity -->
                <button onclick="increaseQuantity(${part.id})">+</button> <!-- Button to increase quantity -->
            </div>
            <button class="add-to-cart" onclick="addToCart(${part.id})">Add to Cart</button> <!-- Button to add the part to the cart -->
        `;

        // Append the part card to the container
        container.appendChild(partCard);
    });
}

// Increases the quantity of a part when the "+" button is clicked
function increaseQuantity(id) {
    // Get the quantity element for the specified part
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (!quantityElement) {
        console.error(`Quantity element for ID ${id} not found!`); // Log an error if the element is missing
        return;
    }
    // Increase the quantity by 1
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

// Decreases the quantity of a part when the "-" button is clicked
function decreaseQuantity(id) {
    // Get the quantity element for the specified part
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (!quantityElement) {
        console.error(`Quantity element for ID ${id} not found!`); // Log an error if the element is missing
        return;
    }
    // Decrease the quantity by 1, but ensure it doesn't go below 1
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

// Adds a part to the cart when the "Add to Cart" button is clicked
function addToCart(id) {
    // Find the part in the gamingParts array using its ID
    const part = gamingParts.find(item => item.id === id);
    if (!part) {
        console.error(`Part with ID ${id} not found!`); // Log an error if the part is missing
        return;
    }

    // Get the selected quantity for the part
    const quantity = parseInt(document.getElementById(`quantity-${id}`).textContent);

    // Retrieve the cart from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the part already exists in the cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // If the part exists, increase its quantity
        existingItem.quantity += quantity;
    } else {
        // If the part doesn't exist, add it to the cart with the selected quantity
        cart.push({ ...part, quantity });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();

    // Show a notification to confirm the item was added to the cart
    showNotification(`${part.name} (x${quantity}) added to cart!`);
}

// Updates the cart count displayed in the header
function updateCartCount() {
    // Get the cart count element
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        console.error("Cart count element not found!"); // Log an error if the element is missing
        return;
    }

    // Retrieve the cart from localStorage or initialize it as an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total number of items in the cart
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Displays a notification when an item is added to the cart
function showNotification(message) {
    // Create a new div element for the notification
    const notification = document.createElement('div');
    notification.className = 'notification show'; // Add classes for styling and animation
    notification.textContent = message; // Set the notification message

    // Append the notification to the body
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => notification.remove(), 3000);
}

// Initializes the store page when it loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("Store page loaded!"); // Log a message to indicate the page has loaded
    generatePartsList(); // Generate the list of parts
    updateCartCount(); // Update the cart count in the header
});