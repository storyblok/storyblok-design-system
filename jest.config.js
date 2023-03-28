module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
      require.resolve('jest-transform-stub'),
    '^.+\\.(j|t)sx?$': [
      require.resolve('ts-jest'),
      {
        babelConfig: true,
        useESM: true,
        tsconfig: './tsconfig.jest.json',
        diagnostics: {
          exclude: ['**'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '^vue$': '<rootDir>/node_modules/vue',
  },
  testMatch: [
    '<rootDir>/src/**/*.(test|specs|spec).(js|jsx|ts|tsx)|<rootDir>/__tests__/*.(js|jsx|ts|tsx)',
    '<rootDir>/tests/unit/**/*.spec.[jt]s?(x)',
  ],
  transformIgnorePatterns: [
    // ignores popper lib
    'node_modules/(?!(@popperjs)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
}
