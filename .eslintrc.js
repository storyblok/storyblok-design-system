module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['testing-library', 'jest-dom', 'jest', 'vuejs-accessibility'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:jest-dom/recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ts: '@typescript-eslint/parser',
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
    'vue/no-mutating-props': 'off',
    'vuejs-accessibility/form-control-has-label': [
      'error',
      {
        labelComponents: ['SbFormItem'],
      },
    ],
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/no-static-element-interactions': 'off',
    'array-callback-return': 'off',
    'prefer-regex-literals': 'off',
    'vue/script-setup-uses-vars': 'off',
    'cypress/no-unnecessary-waiting': 'off',
    'vue/no-v-html': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests</**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
}
