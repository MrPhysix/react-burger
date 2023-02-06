module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 0,
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'react/prop-types': ['off'],
    'no-underscore-dangle': ['off'],
    'react/no-array-index-key': ['off'],
    'react/jsx-boolean-value': ['error', 'never', { always: ['personal'] }],
    'class-methods-use-this': ['off'],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
