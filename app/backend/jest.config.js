/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*).js$": ["<rootDir>/src/$1"],
    "^@common/(.*).js$": ["../common/$1"]
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/']
};
