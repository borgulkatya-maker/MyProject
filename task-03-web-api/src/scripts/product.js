import {
  isProductInCart
} from './cart-storage.js';


export const renderProductCard = (
  product,
  onFavorite,
  onAddToCart
) => {
  const card =
    document.createElement('article');

  card.className = 'product-card';


  const favoriteButton =
    document.createElement('button');

  favoriteButton.className =
    'product-card__favorite';

  favoriteButton.type = 'button';

  favoriteButton.textContent =
    product.favorite ? '♥' : '♡';

  favoriteButton.addEventListener(
    'click',
    () => {
      onFavorite(product.id);
    }
  );


  const image =
    document.createElement('img');

  image.className =
    'product-card__image';

  image.src = product.image;
  image.alt = product.title;


  const title =
    document.createElement('h3');

  title.className =
    'product-card__title';

  title.textContent =
    product.title;


  const price =
    document.createElement('p');

  price.className =
    'product-card__price';

  price.textContent =
    `${product.price} ₽`;


  const actions =
    document.createElement('div');

  actions.className =
    'product-card__actions';


  const detailsLink =
    document.createElement('a');

  detailsLink.className =
    'product-card__button';

  detailsLink.href =
    './product.html';

  detailsLink.textContent =
    'Подробнее';


  const cartButton =
    document.createElement('button');

  cartButton.className =
    'product-card__cart-button';

  cartButton.type = 'button';


  const updateButtonText = () => {
    cartButton.textContent =
      isProductInCart(product.id)
        ? 'В корзине'
        : 'В корзину';
  };


  updateButtonText();


  cartButton.addEventListener(
    'click',
    () => {
      onAddToCart(product.id);

      updateButtonText();
    }
  );


  actions.append(
    detailsLink,
    cartButton
  );


  card.append(
    favoriteButton,
    image,
    title,
    price,
    actions
  );


  return card;
};