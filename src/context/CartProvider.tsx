import React, { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { useCartProvider } from "./useCartProvider";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { cartItems, addToCart, removeFromCart } = useCartProvider();

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
