module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/standard',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/vue',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/order-in-components': 'warn',
    'vue/attributes-order': 'warn',
    'vue/one-component-per-file': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
