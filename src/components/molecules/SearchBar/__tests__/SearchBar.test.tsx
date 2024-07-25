import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Product } from "../../../../types";
import SearchBar from "../SearchBar";
import { isApproximateMatch } from "../../../../utils/MatchUtils";

jest.mock("../../../../utils/MatchUtils");

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price12Months: 0,
    price6Months: 0,
    price3Months: 0,
    imageUrlFront: "",
    imageUrlSide: "",
    imageUrlBack: "",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    price12Months: 0,
    price6Months: 0,
    price3Months: 0,
    imageUrlFront: "",
    imageUrlSide: "",
    imageUrlBack: "",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3",
    price12Months: 0,
    price6Months: 0,
    price3Months: 0,
    imageUrlFront: "",
    imageUrlSide: "",
    imageUrlBack: "",
  },
];

const onSearchMock = jest.fn();

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field", () => {
    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    expect(
      screen.getByPlaceholderText("Search for products...")
    ).toBeInTheDocument();
  });

  test("calls onSearch when input changes", () => {
    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(input, { target: { value: "Product" } });
    expect(onSearchMock).toHaveBeenCalledWith("Product");
  });

  test("shows suggestions based on query", () => {
    (isApproximateMatch as jest.Mock).mockImplementation((query, text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );

    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(input, { target: { value: "Product" } });

    const suggestions = screen.getAllByRole("listitem");
    expect(suggestions).toHaveLength(3);
    expect(suggestions[0]).toHaveTextContent("Product 1");
    expect(suggestions[1]).toHaveTextContent("Product 2");
    expect(suggestions[2]).toHaveTextContent("Product 3");
  });

  test("hides suggestions when input is cleared", () => {
    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(input, { target: { value: "Product" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("shows suggestions on input focus and hides on blur", () => {
    (isApproximateMatch as jest.Mock).mockImplementation((query, text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );

    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");

    fireEvent.change(input, { target: { value: "Product" } });
    fireEvent.focus(input);
    expect(screen.getByRole("list")).toBeInTheDocument();

    fireEvent.blur(input);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test.skip("updates input value and calls onSearch when suggestion is clicked", () => {
    (isApproximateMatch as jest.Mock).mockImplementation((query, text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );

    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(input, { target: { value: "Product" } });

    const suggestionItem = screen.getByText("Product 1");
    fireEvent.mouseDown(suggestionItem);

    expect(input).toHaveValue("Product 1");
    expect(onSearchMock).toHaveBeenCalledWith("Product 1");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("suggestions update correctly with different queries", () => {
    (isApproximateMatch as jest.Mock).mockImplementation((query, text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );

    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");

    fireEvent.change(input, { target: { value: "Product 1" } });
    let suggestions = screen.getAllByRole("listitem");
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toHaveTextContent("Product 1");

    fireEvent.change(input, { target: { value: "Description 2" } });
    suggestions = screen.getAllByRole("listitem");
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toHaveTextContent("Product 2");
  });

  test("hides suggestions when input is blurred after selecting a suggestion", () => {
    (isApproximateMatch as jest.Mock).mockImplementation((query, text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );

    render(<SearchBar onSearch={onSearchMock} allProducts={products} />);
    const input = screen.getByPlaceholderText("Search for products...");

    fireEvent.change(input, { target: { value: "Product" } });
    fireEvent.focus(input);

    const suggestionItem = screen.getByText("Product 1");
    fireEvent.mouseDown(suggestionItem);

    fireEvent.blur(input);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
