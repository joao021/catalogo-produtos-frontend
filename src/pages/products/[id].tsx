import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Product } from "../../types/types";
import { fetchProducts, fetchProductById } from "../../utils/fetchProducts";
import {
  Container,
  Title,
  Description,
  Price,
  ImageCarousel,
  CarouselImage,
  AddToCartButton,
  PriceOption,
  ContentWrap,
} from "./ProductPage.styles";
import Slider from "react-slick";
import { useEffect, useState } from "react";

const setCache = (key: string, data: any, ttl: number) => {
  const now = new Date().getTime();
  const item = {
    data,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getCache = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts(1, 100); 
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const cacheKey = `product_${id}`;
  let product = null;

  if (typeof window !== "undefined") {
    product = getCache(cacheKey);
  }

  if (!product) {
    product = await fetchProductById(id);

    if (!product) {
      return { notFound: true };
    }

    if (typeof window !== "undefined") {
      setCache(cacheKey, product, 3600000); 
    }
  }

  return {
    props: { product },
    revalidate: 10,
  };
};

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = cart.find((item: Product) => item.id === product.id);
    setIsInCart(!!productInCart);
  }, [product.id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (isInCart) {
      const updatedCart = cart.filter(
        (item: Product) => item.id !== product.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(false);
      alert("Produto removido do carrinho!");
    } else {
      const updatedCart = [...cart, { ...product, selectedPrice }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(true);
      alert("Produto adicionado ao carrinho!");
    }
  };

  const handlePriceSelect = (price: string) => {
    setSelectedPrice(price);
  };

  return (
    <Container>
      <Title>{product.name}</Title>
      <ContentWrap>
        <ImageCarousel {...settings}>
          <CarouselImage
            src={product.imageUrlFront}
            alt={`${product.name} front`}
          />
          <CarouselImage
            src={product.imageUrlSide}
            alt={`${product.name} side`}
          />
          <CarouselImage
            src={product.imageUrlBack}
            alt={`${product.name} back`}
          />
        </ImageCarousel>
        <div>
          <Description>{product.description}</Description>
          <PriceOption
            isSelected={
              selectedPrice === `Preço 12 meses: R$ ${product.price12Months}`
            }
            onClick={() =>
              handlePriceSelect(`Preço 12 meses: R$ ${product.price12Months}`)
            }
          >
            Preço 12 meses: R$ {product.price12Months}
          </PriceOption>
          <PriceOption
            isSelected={
              selectedPrice === `Preço 6 meses: R$ ${product.price6Months}`
            }
            onClick={() =>
              handlePriceSelect(`Preço 6 meses: R$ ${product.price6Months}`)
            }
          >
            Preço 6 meses: R$ {product.price6Months}
          </PriceOption>
          <PriceOption
            isSelected={
              selectedPrice === `Preço 3 meses: R$ ${product.price3Months}`
            }
            onClick={() =>
              handlePriceSelect(`Preço 3 meses: R$ ${product.price3Months}`)
            }
          >
            Preço 3 meses: R$ {product.price3Months}
          </PriceOption>
          <AddToCartButton onClick={handleAddToCart} disabled={!selectedPrice}>
            {isInCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
          </AddToCartButton>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default ProductPage;
