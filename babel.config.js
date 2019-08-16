module.exports = api => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 'corejs@3',
    }],
    '@babel/typescript',
    '@babel/preset-react',
    'linaria/babel',
  ];
  const plugins = ['react-hot-loader/babel'];

  return {
    presets,
    plugins,
  };
};
