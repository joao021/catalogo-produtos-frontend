import { createContext, useContext } from "react";
import { Product } from "../types";

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product, selectedPrice: string) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
