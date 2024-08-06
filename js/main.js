document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => itemRender(item));
    })
})

const cartItems = {};

function itemRender(itemData) {
  const list = document.querySelector('.list');

  const item = document.createElement('div');
  const imgBox = document.createElement('div');
  const description = document.createElement('div');

  const img = document.createElement('img');
  const add = document.createElement('div');
  const itemSelected = document.createElement('div');

  const span = document.createElement('span');
  const icon = document.createElement('img');
  const text = document.createElement('div');

  item.className = 'item';
  imgBox.className = 'img-box';
  description.className = 'item-description';
  add.className = 'add-to-cart';
  itemSelected.className = 'item-selected';
  itemSelected.style.display = 'none'; // Hide initially

  img.src = itemData.image.mobile;
  img.alt = itemData.name;

  icon.src = '/assets/images/icon-add-to-cart.svg';
  icon.alt = 'add-to-cart-icon';
  text.textContent = 'Add to Cart';

  span.appendChild(icon);
  add.appendChild(span);
  add.appendChild(text);

  // Set up item selected section
  const decrementSpan = document.createElement('span');
  const incrementSpan = document.createElement('span');
  const quantitySpan = document.createElement('span');

  const decrementIcon = document.createElement('img');
  decrementIcon.src = '/assets/images/icon-decrement-quantity.svg';
  decrementIcon.alt = 'decrement';

  const incrementIcon = document.createElement('img');
  incrementIcon.src = '/assets/images/icon-increment-quantity.svg';
  incrementIcon.alt = 'increment';

  decrementSpan.appendChild(decrementIcon);
  incrementSpan.appendChild(incrementIcon);

  itemSelected.appendChild(decrementSpan);
  itemSelected.appendChild(quantitySpan);
  itemSelected.appendChild(incrementSpan);

  imgBox.appendChild(img);
  imgBox.appendChild(add);
  imgBox.appendChild(itemSelected);

  const category = document.createElement('div');
  category.className = 'item-category';
  category.textContent = itemData.category;

  const itemName = document.createElement('div');
  itemName.className = 'item-name';
  itemName.textContent = itemData.name;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = `$${itemData.price.toFixed(2)}`;

  description.appendChild(category);
  description.appendChild(itemName);
  description.appendChild(price);

  item.appendChild(imgBox);
  item.appendChild(description);

  list.appendChild(item);


  let quantity = 1;
  add.addEventListener('click', () => {
    add.style.display = 'none';
    itemSelected.style.display = 'flex';
    img.classList.add('selected');

    quantitySpan.textContent = quantity;

    updateCart(itemData.name, quantity, itemData.price);
  });

  decrementSpan.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateCart(itemData.name, quantity, itemData.price);
    } else if (quantity == 1) {
      add.style.display = 'flex';
      itemSelected.style.display = 'none';
      img.classList.remove('selected');
      removeFromCart(itemData.name);
    }
  });

  incrementSpan.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
    updateCart(itemData.name, quantity, itemData.price);
  });
}

function updateCart(name, quantity, price) {
  cartItems[name] = { quantity, price };
  renderCart();
}

function removeFromCart(name) {
  delete cartItems[name];
  renderCart();
}

function renderCart() {

  const cart = document.querySelector('.cart');
  cart.innerHTML = '<h2>Your Cart <span>(0)</span></h2>';

  const cartTitle = cart.querySelector('h2 span');
  let totalItems = 0;
  let totalPrice = 0;

  for (const [name, { quantity, price }] of Object.entries(cartItems)) {
    if (quantity > 0) {
      totalItems += quantity;
      const orderSummary = document.createElement('div');
      orderSummary.className = 'order-summary';
      orderSummary.dataset.itemName = name;

      const item1 = document.createElement('div');
      item1.className = 'item1';
      item1.textContent = name;

      const item2 = document.createElement('div');
      item2.className = 'item2';
      const removeIcon = document.createElement('img');
      removeIcon.src = '/assets/images/icon-remove-item.svg';
      removeIcon.alt = 'remove';
      removeIcon.addEventListener('click', () => {
        removeFromCart(name);
      });
      item2.appendChild(removeIcon);

      const item3 = document.createElement('div');
      item3.className = 'item3';
      const quantitySpan = document.createElement('span');
      quantitySpan.className = 'quantity-span';
      quantitySpan.textContent = `${quantity}x`;
      const priceSpan = document.createElement('span');
      priceSpan.className = 'price-span';
      priceSpan.textContent = `@$${price.toFixed(2)}`;
      const totalSpan = document.createElement('span');
      totalSpan.className = 'total-span';
      totalSpan.textContent = `$${(quantity * price).toFixed(2)}`;
      totalPrice += (quantity * price);
      item3.appendChild(quantitySpan);
      item3.appendChild(priceSpan);
      item3.appendChild(totalSpan);

      orderSummary.appendChild(item1);
      orderSummary.appendChild(item2);
      orderSummary.appendChild(item3);

      cart.appendChild(orderSummary);
       console.log(cartItems);
    }
  }

  cartTitle.textContent = `(${totalItems})`;

  if (totalItems > 0) {

  const confirmOrder = document.createElement('div');
  confirmOrder.className = 'confirm-order';

  const orderTotal = document.createElement('div');
  orderTotal.className = 'order-total';
  const orderTotalText = document.createElement('span');
  orderTotalText.textContent = 'Order Total';
  const orderTotalAmount = document.createElement('span');
  orderTotalAmount.textContent = `$${totalPrice.toFixed(2)}`;
  orderTotal.appendChild(orderTotalText);
  orderTotal.appendChild(orderTotalAmount);

  const delivery = document.createElement('div');
  delivery.className = 'delivery';
  const deliveryIcon = document.createElement('img');
  deliveryIcon.src = './assets/images/icon-carbon-neutral.svg';
  deliveryIcon.alt = '';
  const deliveryText = document.createElement('span');
  deliveryText.textContent = 'This is a carbon-neutral delivery';
  delivery.appendChild(deliveryIcon);
  delivery.appendChild(deliveryText);

  const confirmationButton = document.createElement('div');
  confirmationButton.className = 'confirmation-button';
  confirmationButton.textContent = 'Confirm Order';

  confirmOrder.appendChild(orderTotal);
  confirmOrder.appendChild(delivery);
  confirmOrder.appendChild(confirmationButton);

  cart.appendChild(confirmOrder);
}

}
