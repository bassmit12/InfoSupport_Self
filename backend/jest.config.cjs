// jest.config.js
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JavaScript files using babel-jest
  },
  setupFilesAfterEnv: ["./tests/jest.setup.js"], // Points to a setup file
};
