module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {

      const configFile = nextConfig.configFile || null;
      const ext = nextConfig.ext || 'js';
      const icon = nextConfig.icon || false;
      const native = nextConfig.native || false;
      const dimensions = nextConfig.dimensions || true;
      const expandProps = nextConfig.expandProps || 'end';
      const prettier = nextConfig.prettier || true;
      const prettierConfig = nextConfig.prettierConfig || null;
      const svgo = nextConfig.svgo || true;
      const svgoConfig = nextConfig.svgoConfig || null;
      const ref = nextConfig.ref || false;
      const memo = nextConfig.memo || false;
      const replaceAttrValues = nextConfig.replaceAttrValues || [];
      const svgProps = nextConfig.svgProps || [];
      const titleProp = nextConfig.titleProp || false;

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              configFile,
              ext,
              icon,
              native,
              dimensions,
              expandProps,
              prettier,
              prettierConfig,
              svgo,
              svgoConfig,
              ref,
              memo,
              replaceAttrValues,
              svgProps,
              titleProp
            }
          }
        ]
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
