import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render logo", () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText("alluLogo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
  });

  test("should render cart icon", () => {
    const { container } = render(<Header />);
    const cartIcon = container.querySelector("svg");
    expect(cartIcon).toBeInTheDocument();
  });

  test("should navigate to /products on logo click", () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText("alluLogo");
    fireEvent.click(logo);
    expect(mockRouterPush).toHaveBeenCalledWith("/products");
  });
});
