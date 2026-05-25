// Menu Data
const menuData = {
    drinks: [
        { id: 1, name: 'Salty Lassi', price: 3.58, description: 'Traditional yogurt drink with salt and spices', category: 'drinks' },
        { id: 2, name: 'Sweet Lassi', price: 3.58, description: 'Sweet yogurt drink', category: 'drinks' },
        { id: 3, name: 'Mango Lassi', price: 4.78, description: 'Refreshing yogurt and mango drink', category: 'drinks', popular: true },
        { id: 4, name: 'Masala Chai', price: 2.38, description: 'Traditional Indian spiced tea', category: 'drinks' },
        { id: 5, name: 'Soda Can', price: 1.18, description: 'Assorted soft drinks', category: 'drinks' },
        { id: 6, name: 'Water Bottle', price: 1.18, description: 'Bottled water', category: 'drinks' }
    ]
};

// Cart State
let cart = [];
let currentItem = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    setupEventListeners();
});

// Render Menu
function renderMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    let items = [];
    if (category === 'all') {
        Object.values(menuData).forEach(cat => items.push(...cat));
    } else {
        items = menuData[category] || [];
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.onclick = () => openItemModal(item);
        
        card.innerHTML = `
            <div class="menu-card-header">
                <h3>${item.name}</h3>
                <span class="price">$${item.price.toFixed(2)}</span>
            </div>
            <p class="description">${item.description}</p>
            <div class="badges">
                ${item.veg ? '<span class="badge veg">Vegetarian</span>' : ''}
                ${item.spicy ? '<span class="badge spicy">Spicy</span>' : ''}
                ${item.popular ? '<span class="badge popular">Popular</span>' : ''}
            </div>
        `;
        
        menuGrid.appendChild(card);
    });
}

// Open Item Modal
function openItemModal(item) {
    currentItem = { ...item, selectedOptions: {}, quantity: 1 };
    
    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalPrice').textContent = `$${item.price.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('qtyInput').value = 1;
    
    // Render options if any
    const optionsContainer = document.getElementById('modalOptions');
    optionsContainer.innerHTML = '';
    
    if (item.options) {
        item.options.forEach(option => {
            const optionGroup = document.createElement('div');
            optionGroup.className = 'option-group';
            
            optionGroup.innerHTML = `
                <h4>${option.name} ${option.required ? '<span style="color: var(--primary);">*</span>' : ''}</h4>
                <div class="option-buttons">
                    ${option.choices.map(choice => `
                        <button class="option-btn" onclick="selectOption('${option.name}', '${choice}')">
                            ${choice}
                        </button>
                    `).join('')}
                </div>
            `;
            
            optionsContainer.appendChild(optionGroup);
        });
    }
    
    updateItemTotal();
    document.getElementById('itemModal').classList.add('active');
}

// Select Option
function selectOption(optionName, choice) {
    currentItem.selectedOptions[optionName] = choice;
    
    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        if (btn.textContent.trim() === choice) {
            btn.classList.add('active');
        } else if (btn.parentElement.previousElementSibling.textContent.includes(optionName)) {
            btn.classList.remove('active');
        }
    });
    
    updateItemTotal();
}

// Update Item Total
function updateItemTotal() {
    const quantity = parseInt(document.getElementById('qtyInput').value);
    const total = currentItem.price * quantity;
    document.getElementById('itemTotal').textContent = `$${total.toFixed(2)}`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Category Navigation
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            renderMenu(e.target.dataset.category);
        });
    });
    
    // Cart Button
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('active');
    });
    
    // Cart Close
    document.getElementById('cartClose').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('active');
    });
    
    // Modal Close
    document.getElementById('modalClose').addEventListener('click', closeItemModal);
    document.getElementById('modalOverlay').addEventListener('click', closeItemModal);
    
    // Quantity Controls
    document.getElementById('qtyMinus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateItemTotal();
        }
    });
    
    document.getElementById('qtyPlus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        input.value = parseInt(input.value) + 1;
        updateItemTotal();
    });
    
    document.getElementById('qtyInput').addEventListener('change', updateItemTotal);
    
    // Add to Cart
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
    document.getElementById('checkoutOverlay').addEventListener('click', closeCheckout);
    
    // Payment Method
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const method = e.currentTarget.dataset.method;
            const cardSection = document.getElementById('cardInputSection');
            if (method === 'card') {
                cardSection.classList.remove('hidden');
            } else {
                cardSection.classList.add('hidden');
            }
        });
    });
    
    // Place Order
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
}

// Close Item Modal
function closeItemModal() {
    document.getElementById('itemModal').classList.remove('active');
    currentItem = null;
}

// Add to Cart
function addToCart() {
    if (!currentItem) return;
    
    const quantity = parseInt(document.getElementById('qtyInput').value);
    const cartItem = {
        ...currentItem,
        quantity: quantity,
        totalPrice: currentItem.price * quantity
    };
    
    cart.push(cartItem);
    updateCart();
    closeItemModal();
    
    // Show cart
    document.getElementById('cartSidebar').classList.add('active');
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        return;
    }
    
    cartCount.textContent = cart.length;
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-header">
                <h4>${item.name}</h4>
                <span class="cart-item-price">$${item.totalPrice.toFixed(2)}</span>
            </div>
            ${Object.keys(item.selectedOptions).length > 0 ? `
                <div class="cart-item-details">
                    ${Object.entries(item.selectedOptions).map(([key, value]) => 
                        `${key}: ${value}`
                    ).join(', ')}
                </div>
            ` : ''}
            <div class="cart-item-footer">
                <div class="cart-item-qty">
                    <button onclick="updateCartItemQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQty(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeCartItem(${index})">Remove</button>
            </div>
        </div>
    `).join('');
    
    updateCartTotals();
}

// Update Cart Item Quantity
function updateCartItemQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].totalPrice = cart[index].price * cart[index].quantity;
    }
    updateCart();
}

// Remove Cart Item
function removeCartItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// Open Checkout
function openCheckout() {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.07;
    const delivery = 3.99;
    const total = subtotal + tax + delivery;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${delivery.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
    
    document.getElementById('checkoutModal').classList.add('active');
}

// Close Checkout
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Place Order
function placeOrder() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('address').value;
    
    if (!name || !email || !phone || !address) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate order placement
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    
    // Reset
    cart = [];
    updateCart();
    closeCheckout();
    document.getElementById('cartSidebar').classList.remove('active');
    
    // Clear form
    document.querySelectorAll('.checkout-input').forEach(input => input.value = '');
}
