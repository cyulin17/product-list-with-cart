document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => itemRender(item));
    })
})

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

    add.addEventListener('click', () => {
    add.style.display = 'none'; // Hide Add to Cart button
    itemSelected.style.display = 'flex'; // Show Item Selected section
    img.classList.add('selected');
    quantitySpan.textContent = '1';
  });

  let quantity = 0;
  decrementSpan.addEventListener('click', () => {
    if (quantity >= 1) {
      quantity--;
      quantitySpan.textContent = quantity;
    }

    if (quantity == 0) {
    add.style.display = 'flex';
    itemSelected.style.display = 'none';
    img.classList.remove('selected');
    }
  });

  incrementSpan.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
  });

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
}
