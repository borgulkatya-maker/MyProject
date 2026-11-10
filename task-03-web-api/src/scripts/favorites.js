import { PRODUCTS } from './data.js';

import {
  getFavoriteIds,
  toggleFavorite
} from './storage.js';

import {
  addToCart
} from './cart-storage.js';

import {
  renderProductCard
} from './product.js';


const updateCartCount = () => {
  const cartCount =
    document.getElementById('cart-count');

  if (!cartCount) {
    return;
  }

  const cart =
    JSON.parse(
      localStorage.getItem('lapka-cart')
    ) || [];

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  cartCount.textContent = count;
};


const renderFavorites = () => {
  const productGrid =
    document.getElementById(
      'favorites-grid'
    );

  const count =
    document.getElementById(
      'favorites-count'
    );


  if (!productGrid) {
    return;
  }


  const favoriteIds =
    getFavoriteIds();


  const favoriteProducts =
    PRODUCTS.filter(
      (product) =>
        favoriteIds.includes(
          product.id
        )
    );


  for (const product of PRODUCTS) {
    product.favorite =
      favoriteIds.includes(
        product.id
      );
  }


  productGrid.replaceChildren();


  if (count) {
    count.textContent =
      `В избранном: ${favoriteProducts.length}`;
  }


  if (
    favoriteProducts.length === 0
  ) {
    const emptyMessage =
      document.createElement('p');

    emptyMessage.className =
      'favorites__empty';

    emptyMessage.textContent =
      'В избранном пока нет товаров.';


    productGrid.appendChild(
      emptyMessage
    );

    return;
  }


  for (
    const product of favoriteProducts
  ) {
    const productCard =
      renderProductCard(

        product,

        (productId) => {
          toggleFavorite(
            productId
          );

          renderFavorites();
        },

        (productId) => {
          addToCart(
            productId
          );

          updateCartCount();
        }

      );


    productGrid.appendChild(
      productCard
    );
  }
};


document.addEventListener(
  'DOMContentLoaded',
  () => {
    updateCartCount();
    renderFavorites();
  }
);