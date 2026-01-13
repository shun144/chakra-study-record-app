export default {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  testEnvironment: "jsdom",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  // testPathIgnorePatterns: ["/node_modules/", "/_.*\\.spec\\.js$"],
};

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   // moduleNameMapper: {
//   //   "\\.(css|less)$": "identity-obj-proxy",
//   // },
//   testPathIgnorePatterns: ["/node_modules/", "/_.*\\.spec\\.js$"],
// };
