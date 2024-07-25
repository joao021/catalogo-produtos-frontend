import { renderHook, act } from "@testing-library/react-hooks";
import { useCartProvider } from "../useCartProvider";

describe("useCartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCartProvider());

    act(() => {
      return result.current.addToCart(
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
      );
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe("Test Product");
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCartProvider());

    act(() => {
      return result.current.addToCart(
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
      );
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });
});
