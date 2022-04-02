module.exports = {
  setupFiles: ['dotenv/config'],
  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**'],
  preset: 'ts-jest',
  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      // babelConfig: true,
      isolatedModules: true
    }
  },

  // Reset the module registry before running each individual test
  resetModules: true,

  // The root directory that Jest should scan for tests and modules within
  roots: ['<rootDir>/src'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  transform: {
    '^.+\\.ts(|x)?$': 'ts-jest'
  },

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true
};
