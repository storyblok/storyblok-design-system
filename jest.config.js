module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    // ignores popper lib
    'node_modules/(?!(@popperjs)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
}
