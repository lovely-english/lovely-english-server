module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.test.js', '!test'],
};
