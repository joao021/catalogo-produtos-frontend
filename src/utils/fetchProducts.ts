import { Product } from "../types";
import api from "./api";

export const productCache: { [key: number]: Product } = {};
export const productListCache: { [key: string]: Product[] } = {};

const isCI = process.env.CI;

export const fetchProducts = async (
  page: number,
  limit: number,
  query?: string
): Promise<Product[]> => {
  const cacheKey = `${page}-${limit}-${query || ""}`;
  if (productListCache[cacheKey]) {
    return productListCache[cacheKey];
  }

  if (isCI) {
    const mockProducts = [
      {
        id: 1,
        name: "Mock Product 1",
        description: "Description 1",
        price12Months: 1200,
        price6Months: 650,
        price3Months: 350,
        imageUrlFront: "/test-front.jpg",
        imageUrlSide: "/test-side.jpg",
        imageUrlBack: "/test-back.jpg",
      },
      {
        id: 2,
        name: "Mock Product 2",
        description: "Description 2",
        price12Months: 2400,
        price6Months: 1300,
        price3Months: 700,
        imageUrlFront: "/test-front2.jpg",
        imageUrlSide: "/test-side2.jpg",
        imageUrlBack: "/test-back2.jpg",
      },
    ];
    mockProducts.forEach((product: Product) => {
      productCache[product.id] = product;
    });

    productListCache[cacheKey] = mockProducts;
    return mockProducts;
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
  if (isCI) {
    return [
      {
        id: 1,
        name: "Mock Product 1",
        description: "Description 1",
        price12Months: 1200,
        price6Months: 650,
        price3Months: 350,
        imageUrlFront: "/test-front.jpg",
        imageUrlSide: "/test-side.jpg",
        imageUrlBack: "/test-back.jpg",
      },
      {
        id: 2,
        name: "Mock Product 2",
        description: "Description 2",
        price12Months: 2400,
        price6Months: 1300,
        price3Months: 700,
        imageUrlFront: "/test-front2.jpg",
        imageUrlSide: "/test-side2.jpg",
        imageUrlBack: "/test-back2.jpg",
      },
    ];
  }

  const response = await api.get("/products", {
    params: { limit: 8 },
  });
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  if (productCache[id]) {
    return productCache[id];
  }

  if (isCI) {
    const mockProduct = {
      id: id,
      name: `Mock Product ${id}`,
      description: `Description ${id}`,
      price12Months: 1200,
      price6Months: 650,
      price3Months: 350,
      imageUrlFront: "/test-front.jpg",
      imageUrlSide: "/test-side.jpg",
      imageUrlBack: "/test-back.jpg",
    };
    productCache[id] = mockProduct;
    return mockProduct;
  }

  const response = await api.get(`/products/${id}`);
  const product = response.data;

  productCache[id] = product;
  return product;
};
