import "@testing-library/jest-dom";
import nock from 'nock';

if (process.env.API_URL === 'http://mockserver') {
  nock('http://mockserver')
    .persist()
    .get('/products')
    .query(true)
    .reply(200, [
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
    ]);
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
