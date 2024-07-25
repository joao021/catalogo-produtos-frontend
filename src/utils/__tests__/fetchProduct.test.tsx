import MockAdapter from 'axios-mock-adapter';
import api from '../api';
import { fetchProducts, fetchProductById } from '../fetchProducts';
import { Product } from '../../types';

const mock = new MockAdapter(api); 

describe('fetchProducts', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch products and cache them', async () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', description: '', price12Months: 0, price6Months: 0, price3Months: 0, imageUrlFront: '', imageUrlSide: '', imageUrlBack: '' },
      { id: 2, name: 'Product 2', description: '', price12Months: 0, price6Months: 0, price3Months: 0, imageUrlFront: '', imageUrlSide: '', imageUrlBack: '' }
    ];

    mock.onGet('/products', { params: { page: 1, limit: 2 } }).reply(200, products);

    const fetchedProducts = await fetchProducts(1, 2);

    expect(fetchedProducts).toEqual(products);
  });

  it('should return cached products if available', async () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', description: '', price12Months: 0, price6Months: 0, price3Months: 0, imageUrlFront: '', imageUrlSide: '', imageUrlBack: '' },
      { id: 2, name: 'Product 2', description: '', price12Months: 0, price6Months: 0, price3Months: 0, imageUrlFront: '', imageUrlSide: '', imageUrlBack: '' }
    ];

    mock.onGet('/products', { params: { page: 1, limit: 2 } }).reply(200, products);

    await fetchProducts(1, 2);
    const cachedProducts = await fetchProducts(1, 2); 

    expect(cachedProducts).toEqual(products);
  });
});

describe('fetchProductById', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch product by ID and cache it', async () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      description: '',
      price12Months: 0,
      price6Months: 0,
      price3Months: 0,
      imageUrlFront: '',
      imageUrlSide: '',
      imageUrlBack: ''
    };

    mock.onGet('/products/1').reply(200, product);

    const fetchedProduct = await fetchProductById(1);

    expect(fetchedProduct).toEqual(product);
  });

  it('should return cached product if available', async () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      description: '',
      price12Months: 0,
      price6Months: 0,
      price3Months: 0,
      imageUrlFront: '',
      imageUrlSide: '',
      imageUrlBack: ''
    };

    mock.onGet('/products/1').reply(200, product);

    await fetchProductById(1);
    const cachedProduct = await fetchProductById(1); 

    expect(cachedProduct).toEqual(product);
  });
});
