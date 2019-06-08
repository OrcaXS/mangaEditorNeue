const { join } = require('path');
const createResolver = require('postcss-import-resolver');
// const tailwindcss = require('tailwindcss');
// const bemLinter = require('postcss-bem-linter');

module.exports = () => ({
  sourceMap: true,
  plugins: {
    'postcss-import': {
      resolve: createResolver({
        alias: {
          '~': join(__dirname),
          // '~~': join(__dirname),
          // '@': join(__dirname, 'src'),
          // '@@': join(__dirname),
        },
      }),
    },
    'postcss-url': {},
    tailwindcss: './tailwind.config.js',
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    },
    'postcss-easing-gradients': {},
    'postcss-hexrgba': {},
    'postcss-reporter': {},
  },
});
