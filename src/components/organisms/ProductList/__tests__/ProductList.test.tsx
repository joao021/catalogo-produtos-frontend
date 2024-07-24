import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchProducts from "../../../../utils/fetchProducts";
import ProductList from "../ProductList";
import { Product } from "../../../../types/types";

jest.mock("../../../../utils/fetchProducts");

const mockFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;

describe("ProductList", () => {
  test("should render the title correctly", () => {
    render(<ProductList />);
    const titleElement = screen.getByText("Catálogo de Produtos");
    expect(titleElement).toBeInTheDocument();
  });

  test("should fetch and render products correctly", async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        price12Months: 10.0,
        price6Months: 20.0,
        price3Months: 30.0,
        imageUrlFront: "https://example.com/image1Front.jpg",
        imageUrlSide: "https://example.com/image1Side.jpg",
        imageUrlBack: "https://example.com/image1Back.jpg",
      },
      {
        id: 2,
        name: "Product 2",
        description: "Description 2",
        price12Months: 20.0,
        price6Months: 30.0,
        price3Months: 40.0,
        imageUrlFront: "https://example.com/image2Front.jpg",
        imageUrlSide: "https://example.com/image2Side.jpg",
        imageUrlBack: "https://example.com/image2Back.jpg",
      },
    ];

    mockFetchProducts.mockResolvedValue(mockProducts);

    await act(async () => {
      render(<ProductList />);
    });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
