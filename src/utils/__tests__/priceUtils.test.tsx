import { calculateInstallments } from "../priceUtils";

describe("priceUtils", () => {
  test("calculates installments correctly", () => {
    const prices = calculateInstallments(1200, 600, 300);
    expect(prices.installment12Months).toBe("100.00");
    expect(prices.installment6Months).toBe("100.00");
    expect(prices.installment3Months).toBe("100.00");
  });
});
