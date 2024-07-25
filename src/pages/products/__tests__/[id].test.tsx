import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import ProductPage from "../[id]";
import { Product } from "../../../types/types";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  description: "This is a test product",
  price12Months: 1200,
  price6Months: 650,
  price3Months: 350,
  imageUrlFront: "/test-front.jpg",
  imageUrlSide: "/test-side.jpg",
  imageUrlBack: "/test-back.jpg",
};

describe("ProductPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ isFallback: false });
    localStorage.clear();
  });

  test("renders ProductPage with product details", () => {
    render(<ProductPage product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("Preço 12 meses: R$ 1200")).toBeInTheDocument();
    expect(screen.getByText("Preço 6 meses: R$ 650")).toBeInTheDocument();
    expect(screen.getByText("Preço 3 meses: R$ 350")).toBeInTheDocument();
  });

  test("allows selecting a price option", () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = screen.getByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    expect(priceOption).toHaveStyle("background-color: #f0f0f0");
  });

  test("disables Add to Cart button if no price is selected", () => {
    render(<ProductPage product={mockProduct} />);

    const addToCartButton = screen.getByText("Adicionar ao Carrinho");
    expect(addToCartButton).toBeDisabled();
  });

  test("enables Add to Cart button when a price is selected", () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = screen.getByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    const addToCartButton = screen.getByText("Adicionar ao Carrinho");
    expect(addToCartButton).toBeEnabled();
  });

  test("adds product to cart and updates button text", () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = screen.getByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    const addToCartButton = screen.getByText("Adicionar ao Carrinho");
    fireEvent.click(addToCartButton);

    expect(addToCartButton).toHaveTextContent("Remover do Carrinho");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe(mockProduct.id);
  });

  test("removes product from cart and updates button text", () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = screen.getByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    const addToCartButton = screen.getByText("Adicionar ao Carrinho");
    fireEvent.click(addToCartButton);

    expect(addToCartButton).toHaveTextContent("Remover do Carrinho");

    fireEvent.click(addToCartButton);

    expect(addToCartButton).toHaveTextContent("Adicionar ao Carrinho");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cart).toHaveLength(0);
  });
});
