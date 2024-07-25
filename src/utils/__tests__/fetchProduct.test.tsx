import { fetchProducts, fetchAllProducts, fetchProductById, productCache, productListCache } from '../fetchProducts';
import api from '../api';
import { Product } from '../../types';

jest.mock('../api');

describe('Product API methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(productCache).forEach(key => delete productCache[Number(key)]);
    Object.keys(productListCache).forEach(key => delete productListCache[key]);
  });

  it('should fetch products and cache them', async () => {
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price12Months: 120,
        price6Months: 60,
        price3Months: 30,
        imageUrlFront: 'front1.jpg',
        imageUrlSide: 'side1.jpg',
        imageUrlBack: 'back1.jpg'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price12Months: 240,
        price6Months: 120,
        price3Months: 60,
        imageUrlFront: 'front2.jpg',
        imageUrlSide: 'side2.jpg',
        imageUrlBack: 'back2.jpg'
      }
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: products });

    const result = await fetchProducts(1, 2);

    expect(api.get).toHaveBeenCalledWith('/products', {
      params: { page: 1, limit: 2, query: undefined },
    });
    expect(result).toEqual(products);
    expect(productCache[1]).toEqual(products[0]);
    expect(productCache[2]).toEqual(products[1]);
  });

  it('should return cached products if available', async () => {
    productListCache['1-2-'] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price12Months: 120,
        price6Months: 60,
        price3Months: 30,
        imageUrlFront: 'front1.jpg',
        imageUrlSide: 'side1.jpg',
        imageUrlBack: 'back1.jpg'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price12Months: 240,
        price6Months: 120,
        price3Months: 60,
        imageUrlFront: 'front2.jpg',
        imageUrlSide: 'side2.jpg',
        imageUrlBack: 'back2.jpg'
      }
    ];

    const result = await fetchProducts(1, 2);

    expect(api.get).not.toHaveBeenCalled();
    expect(result).toEqual(productListCache['1-2-']);
  });

  it('should fetch all products', async () => {
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price12Months: 120,
        price6Months: 60,
        price3Months: 30,
        imageUrlFront: 'front1.jpg',
        imageUrlSide: 'side1.jpg',
        imageUrlBack: 'back1.jpg'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price12Months: 240,
        price6Months: 120,
        price3Months: 60,
        imageUrlFront: 'front2.jpg',
        imageUrlSide: 'side2.jpg',
        imageUrlBack: 'back2.jpg'
      }
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: products });

    const result = await fetchAllProducts();

    expect(api.get).toHaveBeenCalledWith('/products', { params: { limit: 8 } });
    expect(result).toEqual(products);
  });

  it('should fetch a product by id and cache it', async () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price12Months: 120,
      price6Months: 60,
      price3Months: 30,
      imageUrlFront: 'front1.jpg',
      imageUrlSide: 'side1.jpg',
      imageUrlBack: 'back1.jpg'
    };

    (api.get as jest.Mock).mockResolvedValue({ data: product });

    const result = await fetchProductById(1);

    expect(api.get).toHaveBeenCalledWith('/products/1');
    expect(result).toEqual(product);
    expect(productCache[1]).toEqual(product);
  });

  it('should return cached product by id if available', async () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price12Months: 120,
      price6Months: 60,
      price3Months: 30,
      imageUrlFront: 'front1.jpg',
      imageUrlSide: 'side1.jpg',
      imageUrlBack: 'back1.jpg'
    };
    productCache[1] = product;

    const result = await fetchProductById(1);

    expect(api.get).not.toHaveBeenCalled();
    expect(result).toEqual(product);
  });
});
