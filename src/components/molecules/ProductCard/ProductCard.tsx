import React from "react";
import { useRouter } from "next/router";
import { Product } from "../../../types";
import { Card, Image, Title, Price, Description } from "./ProductCard.styles";
import { calculateInstallments } from "../../../utils/priceUtils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { installment12Months } = calculateInstallments(product.price12Months);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={product.imageUrlFront} alt={product.name} />
      <Description>{product.description}</Description>

      <Title>{product.name}</Title>
      <Price>{`a partir de R$ ${installment12Months}`}</Price>
    </Card>
  );
};

export default ProductCard;
