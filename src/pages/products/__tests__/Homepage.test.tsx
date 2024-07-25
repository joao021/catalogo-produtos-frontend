import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import HomePage from "../index";

jest.mock("../../../components/organisms/ProductList/ProductList", () => () => (
  <div>ProductList Mock</div>
));

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }));
  });

  test("should render GlobalStyle", () => {
    const { container } = render(<HomePage />);
  });

  test("should render ProductList component", () => {
    const { getByText } = render(<HomePage />);
    const productList = getByText("ProductList Mock");
    expect(productList).toBeInTheDocument();
  });
});
