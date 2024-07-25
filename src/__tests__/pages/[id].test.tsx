import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import MockAdapter from "axios-mock-adapter";
import ProductPage from "../../pages/products/[id]";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../context/CartContext", () => ({
  useCart: jest.fn(),
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

const mock = new MockAdapter(api);

describe("ProductPage", () => {
  const addToCartMock = jest.fn((product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  const removeFromCartMock = jest.fn((id) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  });

  const cartMock = [];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ isFallback: false });
    (useCart as jest.Mock).mockReturnValue({
      cartItems: cartMock,
      addToCart: addToCartMock,
      removeFromCart: removeFromCartMock,
    });

    mock.onGet(`/products/${mockProduct.id}`).reply(200, mockProduct);

    localStorage.clear();
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  test("renders ProductPage with product details", async () => {
    render(<ProductPage product={mockProduct} />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
    expect(screen.getByText("Preço 12 meses: R$ 1200")).toBeInTheDocument();
    expect(screen.getByText("Preço 6 meses: R$ 650")).toBeInTheDocument();
    expect(screen.getByText("Preço 3 meses: R$ 350")).toBeInTheDocument();
  });

  test("allows selecting a price option", async () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = await screen.findByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    expect(priceOption).toHaveStyle("background-color: #f0f0f0");
  });

  test("disables Add to Cart button if no price is selected", async () => {
    render(<ProductPage product={mockProduct} />);

    const addToCartButton = await screen.findByText("Adicionar ao Carrinho");
    expect(addToCartButton).toBeDisabled();
  });

  test("enables Add to Cart button when a price is selected", async () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = await screen.findByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    const addToCartButton = await screen.findByText("Adicionar ao Carrinho");
    expect(addToCartButton).toBeEnabled();
  });

  test("adds product to cart without updating button text", async () => {
    render(<ProductPage product={mockProduct} />);

    const priceOption = await screen.findByText("Preço 12 meses: R$ 1200");
    fireEvent.click(priceOption);

    const addToCartButton = await screen.findByText("Adicionar ao Carrinho");
    fireEvent.click(addToCartButton);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe(mockProduct.id);
  });
});
