import { PRODUCTS } from './data.js';
import { Store } from './store.js';

const store = new Store(PRODUCTS);

document.addEventListener('DOMContentLoaded', () => {
  store.init();
});