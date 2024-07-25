import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Product } from "../../types";
import { fetchProducts, fetchProductById } from "../../utils/fetchProducts";
import {
  Container,
  Title,
  Description,
  ImageCarousel,
  CarouselImage,
  AddToCartButton,
  PriceOption,
  ContentWrap,
  ShowMoreButton,
} from "./ProductPage.styles";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import useMemoryCache from "../../hooks/UserMemoryCache";

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts(1, 100);
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const product = await fetchProductById(parseInt(id));

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 10,
  };
};

interface ProductPageProps {
  product: Product;
}

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const { cartItems, addToCart } = useCart();
  const cachedProduct = useMemoryCache<Product>(
    product.id,
    () => fetchProductById(product.id),
    3600000
  );

  useEffect(() => {
    if (cachedProduct) {
      const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
      setIsInCart(cart.some((item) => item.id === cachedProduct.id));
    }
  }, [cachedProduct]);

  if (router.isFallback || !cachedProduct) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (cachedProduct && selectedPrice) {
      if (cartItems.some((item) => item.id === cachedProduct.id)) {
        return;
      }
      addToCart(cachedProduct, selectedPrice);
      setIsInCart(true);
    }
  };

  const renderPriceOption = (priceLabel: string, priceValue: number) => (
    <PriceOption
      isSelected={selectedPrice === `${priceLabel}: R$ ${priceValue}`}
      onClick={() => setSelectedPrice(`${priceLabel}: R$ ${priceValue}`)}
    >
      {priceLabel}: R$ {priceValue}
    </PriceOption>
  );

  return (
    <Container>
      <Title>{cachedProduct.name}</Title>
      <ContentWrap>
        <ImageCarousel {...carouselSettings}>
          <CarouselImage
            src={cachedProduct.imageUrlFront}
            alt={`${cachedProduct.name} front`}
          />
          <CarouselImage
            src={cachedProduct.imageUrlSide}
            alt={`${cachedProduct.name} side`}
          />
          <CarouselImage
            src={cachedProduct.imageUrlBack}
            alt={`${cachedProduct.name} back`}
          />
        </ImageCarousel>
        <div>
          <Description>
            {showFullDescription
              ? cachedProduct.description
              : `${cachedProduct.description.substring(0, 150)}...`}
            <ShowMoreButton
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Ver menos" : "Ver mais"}
            </ShowMoreButton>
          </Description>
          {renderPriceOption("Preço 12 meses", cachedProduct.price12Months)}
          {renderPriceOption("Preço 6 meses", cachedProduct.price6Months)}
          {renderPriceOption("Preço 3 meses", cachedProduct.price3Months)}
          <AddToCartButton onClick={handleAddToCart} disabled={!selectedPrice}>
            Adicionar ao Carrinho
          </AddToCartButton>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default ProductPage;
