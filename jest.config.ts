const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.(js|ts)(x)?", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/src/stories/"],
  coverageReporters: ["html", "text", "text-summary", "cobertura", "lcov"],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      branches: 80,
      functions: 80,
    },
  },
  globals: {
    window: {
      location: {},
    },
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/src/app/api/auth/"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/.jest/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!string-width).+\\.js$"],
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
