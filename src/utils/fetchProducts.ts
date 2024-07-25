import { Product } from "../types";
import api from "./api";

const productCache: { [key: number]: Product } = {};
const productListCache: { [key: string]: Product[] } = {};

export const fetchProducts = async (
  page: number,
  limit: number
): Promise<Product[]> => {
  const cacheKey = `${page}-${limit}`;
  if (productListCache[cacheKey]) {
    return productListCache[cacheKey];
  }

  const response = await api.get("/products", {
    params: { page, limit },
  });
  const products = response.data;
  products.forEach((product: Product) => {
    productCache[product.id] = product;
  });

  productListCache[cacheKey] = products;
  return products;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  if (productCache[id]) {
    return productCache[id];
  }

  const response = await api.get(`/products/${id}`);
  const product = response.data;

  productCache[id] = product;
  return product;
};
