/* eslint-disable */
export default {
  displayName: 'react-intl',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  coverageDirectory: '../../coverage/libs/react-intl',
  coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    'src/lib/**/*.tsx',
    '!src/lib/**/index.ts',
    // Only interface file
    '!src/lib/react-intl.controller.ts',
  ],
};
