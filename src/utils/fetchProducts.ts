import { Product } from "../types/types";
import api from "./api";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export default fetchProducts;
