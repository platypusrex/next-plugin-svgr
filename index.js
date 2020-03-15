module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const { svgrOptions, includeFileLoader, assetPrefix } = nextConfig;

      const use = [
        {
          loader: require.resolve('@svgr/webpack'),
          options: svgrOptions || {},
        },
      ];

      if (includeFileLoader) {
        use.push({
          loader: 'file-loader',
          options: {
            limit: 8192,
            publicPath: `${assetPrefix}/_next/static/chunks/svg/`,
            outputPath: `${isServer ? "../" : ""}static/chunks/svg/`,
            name: '[name]-[hash].[ext]'
          }
        });
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
