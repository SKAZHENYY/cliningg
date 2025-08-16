// Тепер кнопки корзини — посилання, JS для alert видаляємо або залишаємо для картки

// Якщо хочеш, щоб при кліку на саму картку (крім корзини) було повідомлення
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Щоб не спрацьовувало при кліку по кнопці корзини
      if (e.target.closest('.add-cart-btn')) return;
  
      const name = card.querySelector('h3').textContent;
      alert(`Ви обрали послугу: ${name}`);
    });
  });


const cartItemsElem = document.getElementById('cartItems');
const totalPriceElem = document.getElementById('totalPrice');

// Завантажуємо кошик з localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartItemsElem.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} грн`;
    cartItemsElem.appendChild(li);
    total += item.price;
  });
  totalPriceElem.textContent = `Загальна сума: ${total} грн`;
}

// Додаємо події на кнопки купівлі
const buttons = document.querySelectorAll('.buy-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    cart.push({name, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    alert(`${name} додано до кошика!`);
  });
});

renderCart();
