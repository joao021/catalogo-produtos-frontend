import React, { useEffect, useState } from "react";
import fetchProducts from "../../../utils/fetchProducts";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { Container, ListContainer, Title } from "./ProductList.styles";
import { Product } from "../../../types/types";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <Container>
      <Title>Catálogo de Produtos</Title>
      <ListContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ListContainer>
    </Container>
  );
};

export default ProductList;
