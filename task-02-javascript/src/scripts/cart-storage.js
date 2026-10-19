const CART_KEY = 'lapka-cart';


export const getCart = () => {
  const savedCart = localStorage.getItem(CART_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
};


export const saveCart = (cart) => {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );
};


export const addToCart = (productId) => {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  saveCart(cart);

  return cart;
};


export const removeFromCart = (productId) => {
  const updatedCart = getCart().filter(
    (item) => item.productId !== productId
  );

  saveCart(updatedCart);

  return updatedCart;
};


export const changeCartQuantity = (
  productId,
  change
) => {
  const cart = getCart();

  const item = cart.find(
    (cartItem) =>
      cartItem.productId === productId
  );

  if (!item) {
    return cart;
  }

  item.quantity += change;

  const updatedCart = cart.filter(
    (cartItem) =>
      cartItem.quantity > 0
  );

  saveCart(updatedCart);

  return updatedCart;
};


export const getCartCount = () => {
  return getCart().reduce(
    (total, item) =>
      total + item.quantity,
    0
  );
};


export const isProductInCart = (productId) => {
  return getCart().some(
    (item) =>
      item.productId === productId
  );
};