// ===== Робота з кукі =====
function getCartFromCookie() {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('cart='));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1])) || [];
  } catch {
    return [];
  }
}

function saveCartToCookie(cart) {
  // кукі на 7 днів
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))};expires=${expires.toUTCString()};path=/`;
  
}

// ===== Вивід кошика =====
const cartItemsElem = document.getElementById('cartItems');
const totalPriceElem = document.getElementById('totalPrice');

let cart = getCartFromCookie();

function renderCart() {
  if (!cartItemsElem) return;
  cartItemsElem.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} грн × ${item.quantity || 1}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Видалити';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCartToCookie(cart);
      renderCart();
    };


    li.appendChild(removeBtn);
    cartItemsElem.appendChild(li);

    total += item.price * (item.quantity || 1);
  });

  

  if (totalPriceElem) {
    totalPriceElem.textContent = `Загальна сума: ${total} грн`;
  }
}

// ===== Ініціалізація =====
renderCart();


document.getElementById('clearCartBtn').onclick = () => {
  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }

  // Тут можна додати логіку відправки замовлення на сервер
  alert("✅ Замовлення оформлено!");

  cart = [];
  saveCartToCookie(cart);
  renderCart();
};