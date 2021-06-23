module.exports = {
  preset: 'react-native',
  testRegex: '(/__tests__/.*|.(test|spec)).(jsx?|tsx?|ts?)$',
  testPathIgnorePatterns: [
    '.snap$',
    '<rootDir>/node_modules/',
    'setup.js',
    '<rootDir>/__tests__/tests-cover.tsx',
    '<rootDir>/__tests__/setup.js',
    '<rootDir>/__tests__/test-navigation-cover.tsx',
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@invertase/react-native-apple-authentication|@react-native-community/google-signin)',
  ],
  setupFiles: ['<rootDir>/__tests__/setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    // '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  cacheDirectory: '.jest/cache',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  globals: {
    __DEV__: true,
  },
};
