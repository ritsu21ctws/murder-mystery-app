export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
