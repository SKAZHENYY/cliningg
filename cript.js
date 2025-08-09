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
  