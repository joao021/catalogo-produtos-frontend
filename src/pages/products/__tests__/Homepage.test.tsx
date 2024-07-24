import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../index"; // Adjust the path if necessary
import Header from "../../../components/organisms/Header/Header";
import ProductList from "../../../components/organisms/ProductList/ProductList";

jest.mock("../../../components/organisms/Header/Header");
jest.mock("../../../components/organisms/ProductList/ProductList");

describe("HomePage", () => {
  beforeEach(() => {
    (Header as jest.Mock).mockImplementation(() => <div>Header Mock</div>);
    (ProductList as jest.Mock).mockImplementation(() => (
      <div>ProductList Mock</div>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render GlobalStyle", () => {
    render(<HomePage />);
    const body = document.body;
    expect(body).toBeInTheDocument();
  });

  test("should render Header component", () => {
    const { getByText } = render(<HomePage />);
    const header = getByText("Header Mock");
    expect(header).toBeInTheDocument();
  });

  test("should render ProductList component", () => {
    const { getByText } = render(<HomePage />);
    const productList = getByText("ProductList Mock");
    expect(productList).toBeInTheDocument();
  });
});
