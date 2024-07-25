import axios from "axios";
import { Product } from "../types/types";
import api from "./api";
export const fetchProducts = async (
  page: number,
  limit: number
): Promise<Product[]> => {
  const response = await api.get("/products", {
    params: { page, limit },
  });
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
