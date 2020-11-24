module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const { svgrOptions, fileLoader, assetPrefix } = nextConfig;

      const use = [
        {
          loader: require.resolve('@svgr/webpack'),
          options: svgrOptions || {},
        },
      ];

      if (fileLoader) {
        const defaultOptions = {
          limit: 8192,
          publicPath: `${assetPrefix}/_next/static/chunks/svg/`,
          outputPath: `${isServer ? "../" : ""}static/chunks/svg/`,
          name: '[name]-[hash].[ext]',
        }
        const options = typeof fileLoader === 'boolean'
          ? defaultOptions
          : { ...defaultOptions, ...fileLoader };

        use.push({ loader: 'file-loader', options });
      }

      config.module.rules.push({
        test: /\.svg$/,
        use,
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
