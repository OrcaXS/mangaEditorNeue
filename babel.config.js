module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 'corejs@2',
    }],
    '@babel/preset-react',
    'linaria/babel',
  ];
  const plugins = ['react-hot-loader/babel'];

  return {
    presets,
    plugins,
  };
};
