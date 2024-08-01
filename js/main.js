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

  const span = document.createElement('span');
  const icon = document.createElement('img');
  const text = document.createElement('div');

  item.className = 'item'
  imgBox.className = 'img-box'
  description.className = 'item-description'
  add.className = 'add-to-cart'

  img.src = itemData.image.mobile;
  img.alt = item.name;

  icon.src = '/assets/images/icon-add-to-cart.svg';
  icon.alt = 'add-to-cart-icon';
  text.textContent = 'Add to Cart'

  span.appendChild(icon);
  add.appendChild(span);
  add.appendChild(text);


  imgBox.appendChild(img);
  imgBox.appendChild(add);

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
