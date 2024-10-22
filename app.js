// สร้างอาร์เรย์เก็บสินค้าที่เพิ่ม และสินค้าในตะกร้า
let products = [];
let cart = [];

// เมื่อกดปุ่ม Add Product
document.getElementById('createProduct').addEventListener('click', () => {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;

    // ตรวจสอบว่ามีการกรอกข้อมูลครบ
    if (name && !isNaN(price) && image) {
        const product = { name, price, image };
        products.push(product);  // เพิ่มสินค้าในอาร์เรย์ products[]
        displayProducts();  // เรียกแสดงสินค้า
        clearInputs();  // ล้าง input เมื่อเพิ่มเสร็จ
    } else {
        alert('Please fill out all fields!');
    }
});

// ฟังก์ชันแสดงสินค้าในหน้าเว็บ
function displayProducts() {
    const productList = document.getElementById('products');
    productList.innerHTML = '';  // ล้างรายการก่อนแสดงใหม่

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <strong>${product.name}</strong>, Price: $${product.price.toFixed(2)}
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(li);
    });
}

// ฟังก์ชันเพิ่มสินค้าในตะกร้า
function addToCart(index) {
    const product = products[index];
    cart.push(product);
    displayCart();  // อัปเดตการแสดงผลตะกร้า
}

// ฟังก์ชันแสดงสินค้าในตะกร้า
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';  // ล้างตะกร้าก่อนแสดงใหม่

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            ${item.name}, Price: $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    calculateTotal();  // คำนวณราคารวม
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1);  // ลบสินค้าออกจากตะกร้า
    displayCart();  // อัปเดตตะกร้าหลังการลบ
}

// ฟังก์ชันคำนวณราคารวมของสินค้าในตะกร้า
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// ฟังก์ชันล้าง input หลังจากเพิ่มสินค้า
function clearInputs() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
}

// เคลียร์ตะกร้า
document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    displayCart();  // อัปเดตตะกร้า
});

// แสดงราคารวมเมื่อกดปุ่ม Check Out
document.getElementById('checkout').addEventListener('click', () => {
    alert(`Total: $${document.getElementById('totalPrice').textContent}`);
});
