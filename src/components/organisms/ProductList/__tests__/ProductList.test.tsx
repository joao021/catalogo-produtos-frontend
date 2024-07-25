import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import ProductList from "../ProductList";
import {
  fetchProducts,
  fetchAllProducts,
} from "../../../../utils/fetchProducts";
import { isApproximateMatch } from "../../../../utils/MatchUtils";

jest.mock("../../../../utils/fetchProducts");
jest.mock("../../../../utils/MatchUtils");

const mockFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;
const mockFetchAllProducts = fetchAllProducts as jest.MockedFunction<
  typeof fetchAllProducts
>;
const mockIsApproximateMatch = isApproximateMatch as jest.MockedFunction<
  typeof isApproximateMatch
>;

const mockProducts = [
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
];

describe("ProductList", () => {
  let intersectionObserverCallback: IntersectionObserverCallback;
  let intersectionObserverInstance: IntersectionObserver;

  beforeEach(() => {
    mockFetchProducts.mockReset();
    mockFetchAllProducts.mockReset();
    mockIsApproximateMatch.mockReset();

    global.IntersectionObserver = jest.fn((callback) => {
      intersectionObserverCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    }) as jest.Mock;

    intersectionObserverInstance = new IntersectionObserver(
      intersectionObserverCallback
    );
  });

  it("renders the ProductList component", async () => {
    mockFetchProducts.mockResolvedValue(mockProducts);
    mockFetchAllProducts.mockResolvedValue(mockProducts);

    render(<ProductList />);

    expect(screen.getByText("Catálogo de Produtos")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("loads more products when scrolling to the bottom", async () => {
    mockFetchProducts.mockResolvedValue(mockProducts);
    mockFetchAllProducts.mockResolvedValue(mockProducts);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    mockFetchProducts.mockResolvedValueOnce(mockProducts);
    const lastProduct = screen.getByText("Product 2");

    act(() => {
      intersectionObserverCallback(
        [
          {
            isIntersecting: true,
            target: lastProduct,
            intersectionRatio: 0,
            rootBounds: null,
            time: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
          },
        ],
        intersectionObserverInstance
      );
    });

    await waitFor(() => {
      expect(mockFetchProducts).toHaveBeenCalledTimes(2);
      expect(screen.getAllByText("Product 1").length).toBeGreaterThan(1);
    });
  });

  it("displays an error message when fetching products fails", async () => {
    mockFetchProducts.mockRejectedValue(new Error("Failed to load products"));
    mockFetchAllProducts.mockResolvedValue(mockProducts);

    render(<ProductList />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load products. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("displays a message when no more products are available", async () => {
    mockFetchProducts.mockResolvedValue([]);
    mockFetchAllProducts.mockResolvedValue(mockProducts);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("No more products to load")).toBeInTheDocument();
    });
  });
});
