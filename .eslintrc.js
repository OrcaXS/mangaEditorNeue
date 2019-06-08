const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  'plugins': [
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
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
