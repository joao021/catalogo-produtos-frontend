import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { Container, ListContainer, Title } from "./ProductList.styles";
import { Product } from "../../../types";
import { fetchProducts, fetchAllProducts } from "../../../utils/fetchProducts";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { isApproximateMatch } from "../../../utils/MatchUtils";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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
      setProducts((prevProducts) =>
        page === 1 ? newProducts : [...prevProducts, ...newProducts]
      );
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products. Please try again.");
    }
    setLoading(false);
  }, []);

  const loadAllProducts = useCallback(async () => {
    try {
      const allProds = await fetchAllProducts();
      setAllProducts(allProds);
      setProducts(allProds);
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  }, []);

  useEffect(() => {
    if (!initialLoadPerformed.current) {
      loadProducts(1);
      loadAllProducts();
      initialLoadPerformed.current = true;
    }
  }, [loadProducts, loadAllProducts]);

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

  const handleSearch = (query: string) => {
    if (query.length >= 2) {
      const filteredProducts = allProducts.filter(
        (product) =>
          isApproximateMatch(query, product.name) ||
          isApproximateMatch(query, product.description)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  };


  return (
    <Container>
      <Title>Catálogo de Produtos</Title>
      <SearchBar onSearch={handleSearch} allProducts={allProducts} />
      <ListContainer>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div
                ref={lastProductElementRef}
                key={product.id}
              >
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
