let cart = JSON.parse(localStorage.getItem('cart')) || [];


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


function generatePartsList() {
    const container = document.getElementById('parts-list');
    if (!container) {
        console.error("Container for parts list not found!");
        return;
    }

    console.log("Generating parts list...");
    container.innerHTML = '';

    gamingParts.forEach(part => {
        const partCard = document.createElement('div');
        partCard.className = 'part-card';
        
        partCard.innerHTML = `
            <img src="${part.image}" alt="${part.type}">
            <h3>${part.name}</h3>
            <div class="part-type">${part.type}</div>
            <div class="part-specs">${part.specs}</div>
            <div class="part-price">$${part.price.toFixed(2)}</div>
            <div class="quantity-selector">
                <button onclick="decreaseQuantity(${part.id})">-</button>
                <span id="quantity-${part.id}">1</span>
                <button onclick="increaseQuantity(${part.id})">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart(${part.id})">Add to Cart</button>
        `;
        
        container.appendChild(partCard);
    });
}

// Quantity Functions
function increaseQuantity(id) {
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (!quantityElement) {
        console.error(`Quantity element for ID ${id} not found!`);
        return;
    }
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(id) {
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (!quantityElement) {
        console.error(`Quantity element for ID ${id} not found!`);
        return;
    }
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

// Add item to cart
function addToCart(id) {
    const part = gamingParts.find(item => item.id === id);
    if (!part) {
        console.error(`Part with ID ${id} not found!`);
        return;
    }

    const quantity = parseInt(document.getElementById(`quantity-${id}`).textContent);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...part, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${part.name} (x${quantity}) added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        console.error("Cart count element not found!");
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification show';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log("Store page loaded!");
    generatePartsList();
    updateCartCount();
});