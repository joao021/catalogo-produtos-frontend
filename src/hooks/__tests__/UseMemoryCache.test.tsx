import { renderHook, act } from "@testing-library/react-hooks";
import useMemoryCache from "../UserMemoryCache";

const mockNow = 1620000000000;
jest.spyOn(Date, "now").mockImplementation(() => mockNow);

const fetcherMock = jest.fn();

describe("useMemoryCache", () => {
  beforeEach(() => {
    fetcherMock.mockReset();
    fetcherMock.mockResolvedValue("fetched data");

    jest.resetModules();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should fetch data if there is no cached data", async () => {
    const cacheKey = "testKey";

    const { result, waitForNextUpdate } = renderHook(() =>
      useMemoryCache<string>(cacheKey, fetcherMock, 5000)
    );

    expect(result.current).toBe(null);
    await waitForNextUpdate();
    expect(result.current).toBe("fetched data");
    expect(fetcherMock).toHaveBeenCalledTimes(1);
  });
});
