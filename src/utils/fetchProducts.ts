import { Product } from "../types";
import api from "./api";

export const productCache: { [key: number]: Product } = {};
export const productListCache: { [key: string]: Product[] } = {};

export const fetchProducts = async (
  page: number,
  limit: number,
  query?: string
): Promise<Product[]> => {
  const cacheKey = `${page}-${limit}-${query || ""}`;
  if (productListCache[cacheKey]) {
    return productListCache[cacheKey];
  }

  const response = await api.get("/products", {
    params: { page, limit, query },
  });
  const products = response.data;
  products.forEach((product: Product) => {
    productCache[product.id] = product;
  });

  productListCache[cacheKey] = products;
  return products;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products", {
    params: { limit: 8 },
  });
  return response.data;
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
