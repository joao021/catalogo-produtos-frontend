import api from "../api";
import MockAdapter from "axios-mock-adapter";
import { Product } from "../../types/types";
import { fetchProducts, fetchProductById } from "../fetchProducts";

describe("fetchProducts and fetchProductById", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe("fetchProducts", () => {
    it("should fetch products successfully", async () => {
      const products: Product[] = [
        {
          id: 1,
          name: "Product 1",
          description: "Description 1",
          price12Months: 100,
          price6Months: 90,
          price3Months: 80,
          imageUrlFront: "front1.jpg",
          imageUrlSide: "side1.jpg",
          imageUrlBack: "back1.jpg",
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          price12Months: 200,
          price6Months: 180,
          price3Months: 160,
          imageUrlFront: "front2.jpg",
          imageUrlSide: "side2.jpg",
          imageUrlBack: "back2.jpg",
        },
      ];

      mock
        .onGet("/products", { params: { page: 1, limit: 2 } })
        .reply(200, products);

      const result = await fetchProducts(1, 2);

      expect(result).toEqual(products);
    });

    it("should throw an error if fetching products fails", async () => {
      mock.onGet("/products", { params: { page: 1, limit: 2 } }).reply(500);

      await expect(fetchProducts(1, 2)).rejects.toThrow();
    });
  });

  describe("fetchProductById", () => {
    it("should fetch a product by ID successfully", async () => {
      const product: Product = {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        price12Months: 100,
        price6Months: 90,
        price3Months: 80,
        imageUrlFront: "front1.jpg",
        imageUrlSide: "side1.jpg",
        imageUrlBack: "back1.jpg",
      };

      mock.onGet("/products/1").reply(200, product);

      const result = await fetchProductById("1");

      expect(result).toEqual(product);
    });

    it("should throw an error if fetching a product by ID fails", async () => {
      mock.onGet("/products/1").reply(500);

      await expect(fetchProductById("1")).rejects.toThrow();
    });
  });
});
