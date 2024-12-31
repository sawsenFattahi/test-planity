module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',  // Use 'node' if you're testing Express/Node.js code
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transform .ts files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  testTimeout: 30000,
};
