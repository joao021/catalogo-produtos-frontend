import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header", () => {
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
});
