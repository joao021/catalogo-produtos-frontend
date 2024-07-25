import { isApproximateMatch } from "../MatchUtils";

describe("isApproximateMatch", () => {
  it("should return true for exact match", () => {
    expect(isApproximateMatch("hello", "hello")).toBe(true);
  });

  it("should return false if query is longer than text", () => {
    expect(isApproximateMatch("hello world", "hello")).toBe(false);
  });

  it("should return false for empty query or text", () => {
    expect(isApproximateMatch("", "hello")).toBe(false);
    expect(isApproximateMatch("hello", "")).toBe(false);
    expect(isApproximateMatch("", "")).toBe(false);
  });

  it("should return false if query is not present in text", () => {
    expect(isApproximateMatch("world", "hello")).toBe(false);
  });

  it("should handle special characters correctly", () => {
    expect(isApproximateMatch("hello!", "hello!")).toBe(true);
    expect(isApproximateMatch("hello", "hello!")).toBe(true);
  });
});
