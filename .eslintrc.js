const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
  ],
  'plugins': [
    '@typescript-eslint',
    'promise',
    'unicorn',
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      }
    }
  },
  rules: {
    'max-len': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'state',
        'el',
        'config',
      ]
    }],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': 'warn',
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    // 'import/extensions': ['error', 'always', {
    //   'js': 'never',
    //   'vue': 'never',
    // }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    parser: 'babel-eslint',
    jsx: true,
  }
}
