module.exports = {
    testEnvironment: "node",
    testMatch: ["**/**/*.test.js"],
    setupFiles: ["<rootDir>/src/setup-tests.js"],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    testTimeout: 15000
};