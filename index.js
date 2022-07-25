module.exports = (nextConfig = {}) => {
  const svgrNextConfig = {
    ...nextConfig,
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
        const path = 'static/svg/';
        const defaultOptions = {
          limit: 8192,
          publicPath: `${assetPrefix ?? ''}/_next/${path}`,
          outputPath: `${isServer ? '../' : ''}${path}`,
          name: '[path][name].[hash].[ext]',
        };
        const options =
          typeof fileLoader === 'boolean' ? defaultOptions : { ...defaultOptions, ...fileLoader };

        use.push({ loader: require.resolve('file-loader'), options });
      }

      config.module.rules.push({
        test: /\.svg$/,
        use,
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
  delete svgrNextConfig.fileLoader;
  delete svgrNextConfig.svgrOptions;
  return svgrNextConfig;
};
