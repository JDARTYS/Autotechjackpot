document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Recupera i dati dal localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let totalPrice = 0;

  cart.forEach(item => {
    // Crea un elemento per ogni articolo
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: €${item.price.toFixed(2)}</p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Aggiorna il totale
    totalPrice += item.price;
  });

  // Mostra il totale
  totalPriceElement.textContent = totalPrice.toFixed(2);
});

// Funzione di checkout (placeholder)
function checkout() {
  alert('Proceeding to checkout...');
}
