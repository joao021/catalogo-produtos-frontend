import MockAdapter from "axios-mock-adapter";
import api from "../api";
import {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  productCache,
  productListCache,
} from "../fetchProducts";
import { Product } from "../../types";

const mock = new MockAdapter(api);

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "",
    price12Months: 100,
    price6Months: 50,
    price3Months: 25,
    imageUrlFront: "",
    imageUrlSide: "",
    imageUrlBack: "",
  },
  {
    id: 2,
    name: "Product 2",
    description: "",
    price12Months: 200,
    price6Months: 100,
    price3Months: 50,
    imageUrlFront: "",
    imageUrlSide: "",
    imageUrlBack: "",
  },
];

describe("fetchProducts", () => {
  afterEach(() => {
    mock.reset();
    Object.keys(productCache).forEach((key) => delete productCache[+key]);
    Object.keys(productListCache).forEach(
      (key) => delete productListCache[key]
    );
  });

  it("should return cached products if available", async () => {
    productListCache["1-2-"] = mockProducts;

    const cachedProducts = await fetchProducts(1, 2);

    expect(cachedProducts).toEqual(mockProducts);
  });
});

describe("fetchProductById", () => {
  afterEach(() => {
    mock.reset();
    Object.keys(productCache).forEach((key) => delete productCache[+key]);
  });

  it("should fetch product by ID and cache it", async () => {
    const product = mockProducts[0];

    mock.onGet(`/products/${product.id}`).reply(200, product);

    const fetchedProduct = await fetchProductById(product.id);

    expect(fetchedProduct).toEqual(product);

    expect(productCache[product.id]).toEqual(product);
  });

  it("should return cached product if available", async () => {
    productCache[mockProducts[0].id] = mockProducts[0];

    const cachedProduct = await fetchProductById(mockProducts[0].id);

    expect(cachedProduct).toEqual(mockProducts[0]);
  });
});

describe("fetchAllProducts", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch all products", async () => {
    mock
      .onGet("/products", { params: { limit: 8 } })
      .reply(200, mockProducts);

    const fetchedProducts = await fetchAllProducts();

    expect(fetchedProducts).toEqual(mockProducts);
  });
});
