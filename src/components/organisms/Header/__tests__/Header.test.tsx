import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header", () => {
  test("should render logo", () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText("alluLogo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("/assets/allu-logo.png");
  });

  test("should render cart icon", () => {
    const { getByRole } = render(<Header />);
    const cartButton = getByRole("button");
    expect(cartButton).toBeInTheDocument();
    expect(cartButton.querySelector("svg")).toBeInTheDocument();
  });
});
