# Next.js + SVGR
[![npm package](https://img.shields.io/npm/v/next-plugin-svgr/latest.svg)](https://www.npmjs.com/package/next-plugin-svgr)
[![Dependencies](https://img.shields.io/npm/dm/next-plugin-svgr)](https://www.npmjs.com/package/next-plugin-svgr)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/platypusrex/next-merge-props/blob/master/LICENSE)

Flexible [Next.js](https://github.com/zeit/next.js) plugin for transforming svg's into react components using the svgr library

### Installation

npm

```
npm install --save next-plugin-svgr
```

or yarn

```
yarn add next-plugin-svgr
```
### Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr();
```

Optionally add Next.js configuration as a parameter

```js
// next.config.js
const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  webpack(config, options) {
    return config;
  },
});
```

Or with [`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins) when composing multiple plugins

```js
// next.config.js
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-plugin-svgr");

module.exports = withPlugins([
  withSvgr
  // your other plugins here
]);
```

And now in your components you can use the svg as a component

```js
import Icon from './icon.svg';

export default () => (
  <div>
    <Icon />
  </div>
);
```

### Options

#### svgrOptions

The plugins supports all available options of svgr webpack loader.
Check out the [svgr documentation](https://react-svgr.com/docs/options/) for the full list of options.

Example with options:

```js
module.exports = withSvgr({
  svgrOptions: {
    titleProp: true,
    icon: true,
    svgProps: {
      height: 'auto',
    },
  },
});
```

You can optionally specify a project configuration file. SVGR uses 
[cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support,
which means that any file type accepted by cosmicconfig is supported.

* .svgrrc file, written in YAML or JSON, with optional extensions: .yaml/.yml/.json/.js.
* A svgr.config.js file that exports an object.
* A "svgr" key in your package.json file.

**note:** The plugin will automatically detect your config file so you shouldn't have to include the `configFile`
property in `svgrOptions`. The option to specify exists and can be accomplished following the example below.

```js
// .svgrrc.js
module.exports = {
  icon: true,
  expandProps: false,
};

// next.config.js
module.exports = withSvgr({
  svgrOptions: {
    configFile: path.resolve(__dirname, '.svgrrc.js'),
  },
});

// or with next-compose-plugins
module.exports = withPlugins([
  withGraphql,
  [withSvgr, {
    svgrOptions: {
      configFile: path.resolve(__dirname, '.svgrrc.js'),
    },
  }],
]);
```

#### fileLoader

If you would like to use the svgr webpack loader with [file-loader](https://github.com/webpack-contrib/file-loader). 
Accepts a `boolean` or all available [options](https://github.com/webpack-contrib/file-loader#options) for file-loader.

The `fileLoader` option is `undefined` by default. If defined, it will apply the options below.

**note:** If using `file-loader` and typescript remember to reference the svgr/file-loader types. See [below](#typescript).

Default options:

```
{
  limit: 8192,
  publicPath: `${assetPrefix ?? ''}/_next/${path}`,
  outputPath: `${isServer ? '../' : ''}${path}`,
  name: '[path][name].[hash].[ext]',
}
```

```js
module.exports = withSvgr({
  fileLoader: true,
  svgrOptions: {
    ...options
  },
});
```

```js
module.exports = withSvgr({
  fileLoader: {
    limit: 16384,
    name(resourcePath, resourceQuery) {
      if (process.env.NODE_ENV === 'development') {
        return '[path][name].[ext]';
      } 
      return '[contenthash].[ext]';
    }
  },
  svgrOptions: {
    ...options
  },
});
```

```js
import url, { ReactComponent as Icon } from './icon.svg';

export default () => (
  <div>
    <Icon title="my awesome icon" />
    <img src={url} alt="my awesome image" />
  </div>
);
```

### Typescript

Typescript is unable to interpret imported svg files, so `next-plugin-svgr` includes definitions
for svg modules depending on your use case. Per the recommendations of the Next.js maintainers you
should no longer reference these types in the `next-env.d.ts` file. You can instead create a `typings`
directory inside your `src` directory. Then simple create a definitions file (ie: `index.d.ts`) and 
reference any of the definitions there. There shouldn't be any need to adjust your `tsconfig.json` 
for your project.

1. if using the plugin without the `fileLoader` option

`src/typings/index.d.ts`
```js
/// <reference types="next-plugin-svgr/types/svg" />
```

2. If using the plugin with the `fileLoader` option

`src/typings/index.d.ts`
```js
/// <reference types="next-plugin-svgr/types/svgFileLoader" />
```

### Contributors
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## LICENSE
MIT
