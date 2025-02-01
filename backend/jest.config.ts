/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts", "json", "node"],
  roots: ["<rootDir>/src"],
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: ['//node_modules'],
  verbose: true,
};

export default config;
