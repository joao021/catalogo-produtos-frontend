import { useState, useEffect } from "react";
import { Product } from "../types";

export const useCartProvider = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, selectedPrice: string) => {
    setCartItems((prevItems) => [...prevItems, { ...product, selectedPrice }]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
  };
};
