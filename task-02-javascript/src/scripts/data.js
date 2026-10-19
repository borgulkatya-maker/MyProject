export const PRODUCTS = [
  {
    id: 1,
    title: 'Корм для кошек',
    price: 1500,
    category: 'food',
    pet: 'cat',
    image: new URL(
      '../assets/images/product-1.png',
      import.meta.url
    ).href,
    favorite: false
  },

  {
    id: 2,
    title: 'Корм для собак',
    price: 1300,
    category: 'food',
    pet: 'dog',
    image: new URL(
      '../assets/images/product-2.png',
      import.meta.url
    ).href,
    favorite: false
  },

  {
    id: 3,
    title: 'Игрушка для кошек',
    price: 700,
    category: 'toys',
    pet: 'cat',
    image: new URL(
      '../assets/images/product-3.png',
      import.meta.url
    ).href,
    favorite: false
  },

  {
    id: 4,
    title: 'Лежанка для собак',
    price: 2100,
    category: 'accessories',
    pet: 'dog',
    image: new URL(
      '../assets/images/product-4.png',
      import.meta.url
    ).href,
    favorite: false
  }
];