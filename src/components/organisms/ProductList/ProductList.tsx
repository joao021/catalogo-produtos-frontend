import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { Container, ListContainer, Title } from "./ProductList.styles";
import { Product } from "../../../types";
import { fetchProducts } from "../../../utils/fetchProducts";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const initialLoadPerformed = useRef(false);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadProducts = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const newProducts = await fetchProducts(page, 8);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products. Please try again.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!initialLoadPerformed.current) {
      loadProducts(1);
      initialLoadPerformed.current = true;
    }
  }, [loadProducts]);

  useEffect(() => {
    if (page > 1) {
      loadProducts(page);
    }
  }, [page, loadProducts]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <Container>
      <Title>Catálogo de Produtos</Title>
      <ListContainer>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </ListContainer>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasMore && <p>No more products to load</p>}
    </Container>
  );
};

export default ProductList;
