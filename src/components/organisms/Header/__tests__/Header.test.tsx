import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Header from "../Header";
import { useRouter } from "next/router";
import { useCart } from "../../../../context/CartContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

const customRender = (ui, { ...renderOptions } = {}) => {
  return render(ui, renderOptions);
};

describe("Header", () => {
  const mockRouterPush = jest.fn();
  const mockCartItems = [
    { id: 1, name: "Product 1", imageUrlFront: "/product1.jpg" },
    { id: 2, name: "Product 2", imageUrlFront: "/product2.jpg" },
    { id: 3, name: "Product 3", imageUrlFront: "/product3.jpg" },
    { id: 4, name: "Product 4", imageUrlFront: "/product4.jpg" },
  ];
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: mockRemoveFromCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render logo", () => {
    customRender(<Header />);
    const logo = screen.getByAltText("alluLogo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
  });

  test("should render cart icon", () => {
    customRender(<Header />);
    const cartIcon = screen.getByRole("button");
    expect(cartIcon).toBeInTheDocument();
  });

  test("should navigate to /products on logo click", () => {
    customRender(<Header />);
    const logo = screen.getByAltText("alluLogo");
    fireEvent.click(logo);
    expect(mockRouterPush).toHaveBeenCalledWith("/products");
  });

  test("should toggle cart items display on cart icon click", () => {
    customRender(<Header />);
    const cartButton = screen.getByRole("button");

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();

    fireEvent.click(cartButton);
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    fireEvent.click(cartButton);
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  test("should display '3+' if cart item count is more than 3", () => {
    customRender(<Header />);
    const cartCounter = screen.getByText("3+");
    expect(cartCounter).toBeInTheDocument();
  });

  test("should remove item from cart on remove button click", () => {
    customRender(<Header />);
    const cartButton = screen.getByRole("button");

    fireEvent.click(cartButton);

    const removeButton = screen.getAllByText("X")[0];
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
  });
});
