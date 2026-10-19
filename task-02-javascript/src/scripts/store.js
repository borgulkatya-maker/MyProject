import { renderProductCard } from './product.js';

import {
  getFavoriteIds,
  toggleFavorite
} from './storage.js';

import {
  addToCart,
  getCartCount
} from './cart-storage.js';


export class Store {
  constructor(products) {
    this.products = products;

    this.searchQuery = '';
    this.selectedCategories = [];
    this.selectedPets = [];
    this.sortType = 'default';
  }

  init() {
    this.loadFavorites();

    this.setupSearch();
    this.setupFilters();
    this.setupSort();

    this.updateCartCount();

    this.ui();
  }


  loadFavorites() {
    const favoriteIds = getFavoriteIds();

    for (const product of this.products) {
      product.favorite =
        favoriteIds.includes(product.id);
    }
  }


  setupSearch() {
    const searchInput =
      document.getElementById('site-search');

    const searchForm =
      document.getElementById(
        'catalog-search-form'
      );


    if (searchInput) {
      searchInput.addEventListener(
        'input',
        (event) => {
          this.searchQuery =
            event.target.value
              .trim()
              .toLowerCase();

          this.ui();
        }
      );
    }


    if (searchForm) {
      searchForm.addEventListener(
        'submit',
        (event) => {
          event.preventDefault();
        }
      );
    }
  }


  setupFilters() {
    const categoryFilters =
      document.querySelectorAll(
        '.category-filter'
      );

    const petFilters =
      document.querySelectorAll(
        '.pet-filter'
      );


    for (const filter of categoryFilters) {
      filter.addEventListener(
        'change',
        () => {
          this.updateCategoryFilters();
          this.ui();
        }
      );
    }


    for (const filter of petFilters) {
      filter.addEventListener(
        'change',
        () => {
          this.updatePetFilters();
          this.ui();
        }
      );
    }
  }


  updateCategoryFilters() {
    const checkedCategories =
      document.querySelectorAll(
        '.category-filter:checked'
      );


    this.selectedCategories =
      Array.from(checkedCategories).map(
        (filter) => filter.value
      );
  }


  updatePetFilters() {
    const checkedPets =
      document.querySelectorAll(
        '.pet-filter:checked'
      );


    this.selectedPets =
      Array.from(checkedPets).map(
        (filter) => filter.value
      );
  }


  setupSort() {
    const sortSelect =
      document.getElementById(
        'sort-select'
      );


    if (!sortSelect) {
      return;
    }


    sortSelect.addEventListener(
      'change',
      (event) => {
        this.sortType =
          event.target.value;

        this.ui();
      }
    );
  }


  handleFavorite(productId) {
    const favoriteIds =
      toggleFavorite(productId);


    for (const product of this.products) {
      product.favorite =
        favoriteIds.includes(product.id);
    }


    this.ui();
  }


  handleAddToCart(productId) {
    addToCart(productId);

    this.updateCartCount();
  }


  updateCartCount() {
    const cartCount =
      document.getElementById(
        'cart-count'
      );


    if (!cartCount) {
      return;
    }


    cartCount.textContent =
      getCartCount();
  }


  getVisibleProducts() {
    let result = [...this.products];


    if (this.searchQuery) {
      result = result.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(this.searchQuery)
      );
    }


    if (
      this.selectedCategories.length > 0
    ) {
      result = result.filter(
        (product) =>
          this.selectedCategories.includes(
            product.category
          )
      );
    }



    if (
      this.selectedPets.length > 0
    ) {
      result = result.filter(
        (product) =>
          this.selectedPets.includes(
            product.pet
          )
      );
    }


    if (this.sortType === 'price-asc') {
      result.sort(
        (a, b) =>
          a.price - b.price
      );
    }


    if (this.sortType === 'price-desc') {
      result.sort(
        (a, b) =>
          b.price - a.price
      );
    }


    if (this.sortType === 'name') {
      result.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title,
            'ru'
          )
      );
    }


    return result;
  }


  ui() {
    const productGrid =
      document.getElementById(
        'product-grid'
      );

    const productCount =
      document.getElementById(
        'product-count'
      );


    if (!productGrid) {
      return;
    }


    const visibleProducts =
      this.getVisibleProducts();

    productGrid.replaceChildren();

    if (productCount) {
      productCount.textContent =
        `Найдено товаров: ${visibleProducts.length}`;
    }

    if (
      visibleProducts.length === 0
    ) {
      const message =
        document.createElement('p');

      message.className =
        'catalog__empty';

      message.textContent =
        'По вашему запросу товары не найдены';


      productGrid.appendChild(
        message
      );

      return;
    }

    for (
      const product of visibleProducts
    ) {
      const productCard =
        renderProductCard(

          product,

          (productId) =>
            this.handleFavorite(
              productId
            ),

          (productId) =>
            this.handleAddToCart(
              productId
            )

        );


      productGrid.appendChild(
        productCard
      );
    }
  }
}