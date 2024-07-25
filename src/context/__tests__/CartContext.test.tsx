import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "../CartProvider";
import { useCart } from "../CartContext";

const TestComponent: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  return (
    <div>
      <div data-testid="cart-length">{cartItems.length}</div>
      <button
        onClick={() =>
          addToCart(
            {
              id: 1,
              name: "Test Product",
              description: "",
              price12Months: 0,
              price6Months: 0,
              price3Months: 0,
              imageUrlFront: "",
              imageUrlSide: "",
              imageUrlBack: "",
            },
            "10.00"
          )
        }
      >
        Add to Cart
      </button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
    </div>
  );
};

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add item to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    const cartLength = screen.getByTestId("cart-length");

    expect(cartLength.textContent).toBe("0");
    fireEvent.click(addButton);
    expect(cartLength.textContent).toBe("1");
  });

  it("should remove item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    const removeButton = screen.getByText("Remove from Cart");
    const cartLength = screen.getByTestId("cart-length");

    fireEvent.click(addButton);
    expect(cartLength.textContent).toBe("1");
    fireEvent.click(removeButton);
    expect(cartLength.textContent).toBe("0");
  });
});
