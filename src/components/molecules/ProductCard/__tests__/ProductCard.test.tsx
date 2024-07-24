import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Product } from "../../../../types/types";
import ProductCard from "../ProductCard";

const product: Product = {
  id: 1,
  name: "Product Name",
  description: "Product Description",
  price12Months: 2400.0,
  price6Months: 1300.0,
  price3Months: 700.0,
  imageUrlFront: "https://example.com/imageFront.jpg",
  imageUrlSide: "https://example.com/imageSide.jpg",
  imageUrlBack: "https://example.com/imageBack.jpg",
};

describe("ProductCard", () => {
  test("should render product name", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productName = getByText("Product Name");
    expect(productName).toBeInTheDocument();
  });

  test("should render product description", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productDescription = getByText("Product Description");
    expect(productDescription).toBeInTheDocument();
  });

  test("should render product price", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productPrice = getByText("a partir de 12x R$ 200.00");
    expect(productPrice).toBeInTheDocument();
  });

  test("should render the right src", () => {
    const { getByAltText } = render(<ProductCard product={product} />);
    const productImage = getByAltText("Product Name") as HTMLImageElement;
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toBe("https://example.com/imageFront.jpg");
  });
});
