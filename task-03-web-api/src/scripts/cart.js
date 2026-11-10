import { PRODUCTS } from './data.js';

import {
  getCart,
  changeCartQuantity,
  removeFromCart
} from './cart-storage.js';


const renderCart = () => {
  const cartContainer =
    document.getElementById('cart-items');

  const cartTotal =
    document.getElementById('cart-total');

  const cartCount =
    document.getElementById(
      'cart-items-count'
    );


  if (!cartContainer) {
    console.error(
      'Элемент #cart-items не найден'
    );

    return;
  }


  const cart = getCart();

  cartContainer.replaceChildren();


  if (cart.length === 0) {
    const message =
      document.createElement('p');

    message.className =
      'cart__empty';

    message.textContent =
      'Корзина пока пуста';

    cartContainer.appendChild(
      message
    );


    if (cartTotal) {
      cartTotal.textContent = '0 ₽';
    }

    if (cartCount) {
      cartCount.textContent =
        '0 товаров';
    }

    return;
  }


  let totalPrice = 0;
  let totalQuantity = 0;


  for (const cartItem of cart) {
    const product =
      PRODUCTS.find(
        (item) =>
          item.id === cartItem.productId
      );


    if (!product) {
      console.error(
        'Товар не найден:',
        cartItem.productId
      );

      continue;
    }


    const itemTotal =
      product.price *
      cartItem.quantity;


    totalPrice += itemTotal;
    totalQuantity +=
      cartItem.quantity;


    const item =
      document.createElement(
        'article'
      );

    item.className =
      'cart-item';


    const image =
      document.createElement('img');

    image.className =
      'cart-item__image';

    image.src =
      product.image;

    image.alt =
      product.title;


    const info =
      document.createElement('div');

    info.className =
      'cart-item__info';


    const title =
      document.createElement('h2');

    title.className =
      'cart-item__title';

    title.textContent =
      product.title;


    const price =
      document.createElement('p');

    price.className =
      'cart-item__price';

    price.textContent =
      `${product.price} ₽`;


    info.append(
      title,
      price
    );


    const quantity =
      document.createElement('div');

    quantity.className =
      'cart-item__quantity';


    const minusButton =
      document.createElement('button');

    minusButton.type = 'button';

    minusButton.className =
      'cart-item__quantity-button';

    minusButton.textContent = '−';


    const quantityValue =
      document.createElement('span');

    quantityValue.className =
      'cart-item__quantity-value';

    quantityValue.textContent =
      cartItem.quantity;


    const plusButton =
      document.createElement('button');

    plusButton.type = 'button';

    plusButton.className =
      'cart-item__quantity-button';

    plusButton.textContent = '+';


    minusButton.addEventListener(
      'click',
      () => {
        changeCartQuantity(
          product.id,
          -1
        );

        renderCart();
      }
    );


    plusButton.addEventListener(
      'click',
      () => {
        changeCartQuantity(
          product.id,
          1
        );

        renderCart();
      }
    );


    quantity.append(
      minusButton,
      quantityValue,
      plusButton
    );


    const total =
      document.createElement('p');

    total.className =
      'cart-item__total';

    total.textContent =
      `${itemTotal} ₽`;


    const removeButton =
      document.createElement('button');

    removeButton.className =
      'cart-item__remove';

    removeButton.type = 'button';

    removeButton.textContent =
      'Удалить';


    removeButton.addEventListener(
      'click',
      () => {
        removeFromCart(
          product.id
        );

        renderCart();
      }
    );


    item.append(
      image,
      info,
      quantity,
      total,
      removeButton
    );


    cartContainer.appendChild(
      item
    );
  }


  if (cartTotal) {
    cartTotal.textContent =
      `${totalPrice} ₽`;
  }


  if (cartCount) {
    cartCount.textContent =
      `${totalQuantity} шт.`;
  }
};


document.addEventListener(
  'DOMContentLoaded',
  () => {
    renderCart();
  }
);