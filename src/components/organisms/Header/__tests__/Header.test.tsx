import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { useRouter } from "next/router";
import { useCart } from "../../../../context/CartContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Header component", () => {
  const mockPush = jest.fn();
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Produto 1",
          price: "$10",
          imageUrlFront: "/image1.png",
        },
        {
          id: 2,
          name: "Produto 2",
          price: "$20",
          imageUrlFront: "/image2.png",
        },
        {
          id: 3,
          name: "Produto 3",
          price: "$30",
          imageUrlFront: "/image3.png",
        },
        {
          id: 4,
          name: "Produto 4",
          price: "$40",
          imageUrlFront: "/image4.png",
        },
        {
          id: 5,
          name: "Produto 5",
          price: "$50",
          imageUrlFront: "/image5.png",
        },
      ],
      removeFromCart: mockRemoveFromCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders logo and cart button", () => {
    render(<Header />);

    const logo = screen.getByAltText("alluLogo");
    const cartButton = screen.getByRole("button");

    expect(logo).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });

  test("redirects to /products when logo is clicked", () => {
    render(<Header />);

    const logo = screen.getByAltText("alluLogo");
    fireEvent.click(logo);

    expect(mockPush).toHaveBeenCalledWith("/products");
  });

  test("toggles cart visibility when cart button is clicked", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    expect(
      screen.getByText("Produtos Adicionados Recentemente")
    ).toBeInTheDocument();

    fireEvent.click(cartButton);

    expect(
      screen.queryByText("Produtos Adicionados Recentemente")
    ).not.toBeInTheDocument();
  });

  test("displays cart items and handles item removal", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    const cartItems = screen.getAllByRole("img");
    expect(cartItems).toHaveLength(5);

    const removeButtons = screen.getAllByText("X");
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test("displays message for additional items in the cart", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    expect(screen.getByText("1 mais produtos no carrinho")).toBeInTheDocument();
  });

  test("closes cart when clicking outside", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    const cartItemsBox = screen.getByText(
      "Produtos Adicionados Recentemente"
    ).parentElement;
    fireEvent.mouseDown(document);

    expect(cartItemsBox).not.toBeInTheDocument();
  });

  test("displays the correct cart item count", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button");
    const cartCounter = screen.getByText("3+");

    expect(cartCounter).toBeInTheDocument();

    fireEvent.click(cartButton);

    expect(
      screen.getByText("Produtos Adicionados Recentemente")
    ).toBeInTheDocument();

    fireEvent.click(cartButton);
    (useCart as jest.Mock).mockReturnValueOnce({
      cartItems: [
        {
          id: 1,
          name: "Produto 1",
          price: "$10",
          imageUrlFront: "/image1.png",
        },
      ],
      removeFromCart: mockRemoveFromCart,
    });

    fireEvent.click(cartButton);
    const updatedCartCounter = screen.getByText("1");
    expect(updatedCartCounter).toBeInTheDocument();
  });
});
