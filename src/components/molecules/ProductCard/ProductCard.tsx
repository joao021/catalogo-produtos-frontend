import React from "react";
import {
  Card,
  Title,
  Description,
  Price,
  TextContainer,
} from "./ProductCard.styles";
import { Product } from "../../../types/types";
import { calculateInstallments } from "../../../utils/priceUtils";
import Image from "next/image";
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { installment12Months } = calculateInstallments(product.price12Months);

  return (
    <Card>
      <Image
        src={product.imageUrlFront}
        alt={product.name}
        width={500}
        height={500}
        layout="responsive"
      />
      <TextContainer>
        <Title>{product.name}</Title>
        <Description>{product.description}</Description>
        <Price>a partir de 12x R$ {installment12Months}</Price>
      </TextContainer>
    </Card>
  );
};

export default ProductCard;
