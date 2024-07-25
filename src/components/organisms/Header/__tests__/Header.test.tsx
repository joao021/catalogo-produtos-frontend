import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Header from "../Header";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header component", () => {
  it("should render the logo with correct src and alt text", () => {
    render(<Header />);

    const logo = screen.getByAltText("alluLogo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/allu-logo.png");
    expect(logo).toHaveAttribute("width", "50");
    expect(logo).toHaveAttribute("height", "30");
  });

  it("should render the shopping cart icon", () => {
    render(<Header />);

    const cartIcon = screen.getByRole("img", { hidden: true });
    expect(cartIcon).toBeInTheDocument();
  });

  it("should navigate to /products when logo is clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Header />);

    const logo = screen.getByAltText("alluLogo");
    fireEvent.click(logo);

    expect(push).toHaveBeenCalledWith("/products");
  });
});
