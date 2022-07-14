module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'plugin:vue/vue3-strongly-recommended', 'prettier', 'plugin:prettier/recommended', 'plugin:jest-dom/recommended', 'plugin:storybook/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser'
    }
  },
  rules: {
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', {
      allow: ['warn', 'error']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/order-in-components': 'warn',
    'vue/attributes-order': 'warn',
    'vue/one-component-per-file': 'off'
  },
  overrides: [{
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true
    }
  }]
};