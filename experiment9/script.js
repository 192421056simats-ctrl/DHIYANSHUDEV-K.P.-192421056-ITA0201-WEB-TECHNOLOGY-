/**
 * Experiment 9: Shopping Cart & Billing System Engine
 * State Management, Financial Tax Computation, Discount Voucher, & Printable Invoices
 */

const productCatalog = [
    { id: 'p1', name: 'UltraBook Pro Laptop 15"', icon: '💻', price: 1299, spec: 'Intel i7, 16GB RAM, 512GB SSD' },
    { id: 'p2', name: 'RGB Mechanical Keyboard', icon: '⌨️', price: 119, spec: 'Tactile Switches, Per-key RGB' },
    { id: 'p3', name: 'Precision Wireless Mouse', icon: '🖱️', price: 59, spec: 'Ergonomic 16,000 DPI Sensor' },
    { id: 'p4', name: '4K IPS Gaming Monitor 27"', icon: '🖥️', price: 449, spec: '144Hz, 1ms, HDR 400 Color' },
    { id: 'p5', name: 'ANC Wireless Headphones', icon: '🎧', price: 199, spec: 'Active Noise Canceling, 30h Battery' },
    { id: 'p6', name: 'Flagship Tech Phone 5G', icon: '📱', price: 899, spec: 'OLED Display, Triple Lens Camera' }
];

class ShoppingStore {
    constructor() {
        this.cart = []; // [{ product, quantity }]
        this.discountPercent = 0;
        this.gstRate = 0.18; // 18% GST Tax

        this.initDOM();
        this.bindEvents();
        this.renderCatalog();
        this.updateCartUI();
    }

    initDOM() {
        this.productGrid = document.getElementById('productGrid');
        this.cartItemsList = document.getElementById('cartItemsList');
        this.cartCountBadge = document.getElementById('cartCountBadge');

        this.subtotalVal = document.getElementById('subtotalVal');
        this.discountPercentEl = document.getElementById('discountPercent');
        this.discountVal = document.getElementById('discountVal');
        this.taxVal = document.getElementById('taxVal');
        this.grandTotalVal = document.getElementById('grandTotalVal');

        this.promoInput = document.getElementById('promoInput');
        this.applyPromoBtn = document.getElementById('applyPromoBtn');
        this.promoMsg = document.getElementById('promoMsg');

        this.checkoutBtn = document.getElementById('checkoutBtn');
        this.invoiceModal = document.getElementById('invoiceModal');
        this.closeInvoiceBtn = document.getElementById('closeInvoiceBtn');
        this.printBillBtn = document.getElementById('printBillBtn');
        this.invoiceItemsTable = document.getElementById('invoiceItemsTable');
        this.invoiceDate = document.getElementById('invoiceDate');
    }

    bindEvents() {
        this.applyPromoBtn.addEventListener('click', () => this.applyPromoCode());

        this.checkoutBtn.addEventListener('click', () => this.generateInvoice());
        this.closeInvoiceBtn.addEventListener('click', () => this.invoiceModal.classList.remove('active'));
        this.printBillBtn.addEventListener('click', () => window.print());

        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }

    renderCatalog() {
        this.productGrid.innerHTML = productCatalog.map(p => `
            <div class="product-card">
                <div class="prod-icon">${p.icon}</div>
                <h3>${p.name}</h3>
                <p class="prod-spec">${p.spec}</p>
                <div class="prod-price">$${p.price.toFixed(2)}</div>
                <button class="btn primary-btn" onclick="store.addToCart('${p.id}')">+ Add to Cart</button>
            </div>
        `).join('');
    }

    addToCart(productId) {
        const prod = productCatalog.find(p => p.id === productId);
        if (!prod) return;

        const existingItem = this.cart.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ product: prod, quantity: 1 });
        }
        this.updateCartUI();
    }

    updateQuantity(productId, delta) {
        const item = this.cart.find(i => i.product.id === productId);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.updateCartUI();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(i => i.product.id !== productId);
        this.updateCartUI();
    }

    applyPromoCode() {
        const code = this.promoInput.value.trim().toUpperCase();
        if (code === 'STUDENT10') {
            this.discountPercent = 10; // 10% Off
            this.promoMsg.textContent = '✓ Promo STUDENT10 Applied (10% OFF)';
            this.promoMsg.style.color = '#10b981';
        } else if (code === 'WEBTECH20') {
            this.discountPercent = 20; // 20% Off
            this.promoMsg.textContent = '✓ Promo WEBTECH20 Applied (20% OFF)';
            this.promoMsg.style.color = '#10b981';
        } else {
            this.discountPercent = 0;
            this.promoMsg.textContent = '✕ Invalid Promo Code';
            this.promoMsg.style.color = '#ef4444';
        }
        this.updateCartUI();
    }

    updateCartUI() {
        const totalItemsCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCountBadge.textContent = `${totalItemsCount} items`;

        if (this.cart.length === 0) {
            this.cartItemsList.innerHTML = '<p class="empty-cart-msg">Your shopping cart is empty.</p>';
            this.checkoutBtn.disabled = true;
        } else {
            this.checkoutBtn.disabled = false;
            this.cartItemsList.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div>
                        <div class="ci-title">${item.product.name}</div>
                        <div class="ci-price">$${item.product.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="store.updateQuantity('${item.product.id}', -1)">-</button>
                        <span class="qty-num">${item.quantity}</span>
                        <button class="qty-btn" onclick="store.updateQuantity('${item.product.id}', 1)">+</button>
                        <button class="del-btn" onclick="store.removeFromCart('${item.product.id}')" title="Remove Item">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        // Financial Calculations
        const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const discountAmount = (subtotal * this.discountPercent) / 100;
        const subtotalAfterDiscount = subtotal - discountAmount;
        const taxAmount = subtotalAfterDiscount * this.gstRate;
        const grandTotal = subtotalAfterDiscount + taxAmount;

        this.subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
        this.discountPercentEl.textContent = `${this.discountPercent}%`;
        this.discountVal.textContent = `-$${discountAmount.toFixed(2)}`;
        this.taxVal.textContent = `$${taxAmount.toFixed(2)}`;
        this.grandTotalVal.textContent = `$${grandTotal.toFixed(2)}`;
    }

    generateInvoice() {
        const now = new Date();
        this.invoiceDate.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const discountAmount = (subtotal * this.discountPercent) / 100;
        const subtotalAfterDiscount = subtotal - discountAmount;
        const taxAmount = subtotalAfterDiscount * this.gstRate;
        const grandTotal = subtotalAfterDiscount + taxAmount;

        this.invoiceItemsTable.innerHTML = `
            <div style="margin-bottom: 1rem; font-size: 0.85rem; color: var(--text-muted);">
                <p><strong>Customer Name:</strong> Dhiyanshu Dev K.P.</p>
                <p><strong>Reg Number:</strong> 192421056 | B.Tech IT</p>
                <p><strong>Institution:</strong> SIMATS University, Chennai</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.cart.map(i => `
                        <tr>
                            <td>${i.product.name}</td>
                            <td>${i.quantity}</td>
                            <td>$${i.product.price.toFixed(2)}</td>
                            <td>$${(i.product.price * i.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right"><strong>Subtotal:</strong></td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                    ${this.discountPercent > 0 ? `
                        <tr>
                            <td colspan="3" class="text-right"><strong>Discount (${this.discountPercent}%):</strong></td>
                            <td class="text-success">-$${discountAmount.toFixed(2)}</td>
                        </tr>
                    ` : ''}
                    <tr>
                        <td colspan="3" class="text-right"><strong>GST Tax (18%):</strong></td>
                        <td>$${taxAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right"><strong>Grand Total:</strong></td>
                        <td><strong>$${grandTotal.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
        `;

        this.invoiceModal.classList.add('active');
    }
}

let store;
document.addEventListener('DOMContentLoaded', () => {
    store = new ShoppingStore();
});
