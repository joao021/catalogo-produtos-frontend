import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";
import React from "react";
import { fetchProducts } from "../../../../utils/fetchProducts";

jest.mock("../../../../utils/fetchProducts");

const mockProducts = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

describe("ProductList", () => {
  beforeEach(() => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  test("displays an error message if fetching products fails", async () => {
    (fetchProducts as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch products")
    );
    render(<ProductList />);
    const errorMessage = await waitFor(() =>
      screen.getByText("Failed to load products. Please try again.")
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
