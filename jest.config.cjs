/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        configFile: false,
        babelrc: false,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^next/image$': '<rootDir>/src/test-utils/nextImageMock.tsx',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(?:next-intl|use-intl|@formatjs|intl-messageformat)/)',
  ],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/lib/**/*.ts',
    'src/utils/**/*.ts',
    'src/store/**/*.ts',
    'src/context/**/*.{ts,tsx}',
    'src/app/api/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/components/header/**',
  ],
  coverageThreshold: {
    global: { statements: 80, branches: 50, functions: 50, lines: 50 },
  },
};
