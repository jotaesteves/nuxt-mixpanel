module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.js", "!src/**/*.test.js", "!src/**/*.spec.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
  testMatch: ["**/test/**/*.test.js", "**/test/**/*.spec.js", "**/__tests__/**/*.js"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
  verbose: true,
};
