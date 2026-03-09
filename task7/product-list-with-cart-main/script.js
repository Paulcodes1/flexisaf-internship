// 1. Setup State & DOM Selectors
let products = [];
let cart = [];

const productListTag = document.getElementById('product-list');
const cartItemsTag = document.getElementById('cart-items');
const cartCountTag = document.getElementById('cart-count');
const orderTotalTag = document.getElementById('order-total');

// New selectors for the Modal
const confirmBtn = document.getElementById('confirm-order');
const modalOverlay = document.getElementById('modal-overlay');
const newOrderBtn = document.getElementById('new-order-btn');

// 2. Fetch Data from local JSON
async function loadProducts() {
    const response = await fetch('./data.json');
    products = await response.json();
    renderProducts();
}

// 3. Display Products on Screen
function renderProducts() {
    productListTag.innerHTML = products.map((item, index) => {
        const cartItem = cart.find(c => c.name === item.name);
        const quantity = cartItem ? cartItem.quantity : 0;

        return `
        <div class="product-card ${quantity > 0 ? 'selected' : ''}">
            <div class="image-container">
                <img src="${item.image.desktop}" alt="${item.name}" class="product-img">
                
                ${quantity === 0 ? `
                    <button onclick="addToCart(${index})" class="add-to-cart-btn">
                        <img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart
                    </button>
                ` : `
                    <div class="quantity-control-btn">
                        <button onclick="decrementCart(${index})">
                            <img src="./assets/images/icon-decrement-quantity.svg" alt="minus">
                        </button>
                        <span>${quantity}</span>
                        <button onclick="incrementCart(${index})">
                            <img src="./assets/images/icon-increment-quantity.svg" alt="plus">
                        </button>
                    </div>
                `}
            </div>
            <div class="product-info">
                <p class="category">${item.category}</p>
                <h3 class="name">${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
        </div>
    `}).join('');
}

// 4. Cart Logic
function addToCart(index) {
    const product = products[index];
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateUI();
    renderProducts(); // Refresh buttons
}

// Helper functions for the +/- buttons
function incrementCart(index) {
    addToCart(index);
}

function decrementCart(index) {
    const product = products[index];
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
            cart = cart.filter(item => item.name !== product.name);
        }
    }
    updateUI();
    renderProducts(); // Refresh buttons
}

function removeFromCart(index) {
    // Remove the specific item from the array using its index
    cart.splice(index, 1);
    
    // Update the UI and refresh product buttons
    updateUI();
    renderProducts();
}

function updateUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountTag.innerText = totalCount;

    if (cart.length === 0) {
        cartItemsTag.innerHTML = `<p>Your added items will appear here</p>`;
        document.getElementById('cart-total-container').classList.add('hidden');
    } else {
        cartItemsTag.innerHTML = cart.map((item, index) => `
          <div class="cart-item">
            <div class="cart-item-details">
              <p class="cart-item-name">${item.name}</p>
              <div class="cart-item-pricing">
                <span class="qty">${item.quantity}x</span>
                <span class="unit-price">@ $${item.price.toFixed(2)}</span>
                <span class="total-item-price">$${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})">
              <img src="./assets/images/icon-remove-item.svg" alt="Remove item">
            </button>
          </div>
        `).join('');
        
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderTotalTag.innerText = `$${totalAmount.toFixed(2)}`;
        document.getElementById('cart-total-container').classList.remove('hidden');
    }
}

// 5. Event Listeners for Order Confirmation
confirmBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open'); // Lock background scroll
    
    const modalItems = document.getElementById('modal-item-list');
    modalItems.innerHTML = cart.map(item => `
        <div class="modal-item">
            <div class="modal-item-left">
                <img src="${item.image.thumbnail}" class="modal-item-img" alt="">
                <div>
                    <p class="cart-item-name">${item.name}</p>
                    <div class="cart-item-pricing">
                        <span class="qty">${item.quantity}x</span>
                        <span class="unit-price">@ $${item.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <strong class="modal-item-total">$${(item.quantity * item.price).toFixed(2)}</strong>
        </div>
    `).join('');
    
    document.getElementById('modal-total-price').innerText = orderTotalTag.innerText;
});

newOrderBtn.addEventListener('click', () => {
    cart = [];
    updateUI();
    renderProducts();
    modalOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open'); // UNLOCK SCROLL
});

// Initialize
loadProducts();