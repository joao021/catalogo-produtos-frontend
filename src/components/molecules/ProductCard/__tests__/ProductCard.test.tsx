import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { Product } from "../../../../types/types";
import ProductCard from "../ProductCard";
import { calculateInstallments } from "../../../../utils/priceUtils";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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
const { installment12Months } = calculateInstallments(product.price12Months);

describe("ProductCard", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render product name", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productName = getByText("Product Name");
    expect(productName).toBeInTheDocument();
  });


  
  test("should render product image with correct src and alt", () => {
    const { getByAltText } = render(<ProductCard product={product} />);
    const productImage = getByAltText("Product Name") as HTMLImageElement;
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toBe("https://example.com/imageFront.jpg");
  });


  test("should render product description", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productDescription = getByText("Product Description");
    expect(productDescription).toBeInTheDocument();
  });
  test("should render product price", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productPrice = getByText("a partir de R$ 200.00");
    expect(productPrice).toBeInTheDocument();
  });

  test("should navigate to product page on card click", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const productCard = getByText("Product Name").closest("div");
    fireEvent.click(productCard!);
    expect(mockRouterPush).toHaveBeenCalledWith("/products/1");
  });
});
