# Next.js + SVGR
[![npm package](https://img.shields.io/npm/v/next-plugin-svgr/latest.svg)](https://www.npmjs.com/package/next-plugin-svgr)
[![Dependencies](https://img.shields.io/david/platypusrex/next-plugin-svgr.svg)](https://david-dm.org/platypusrex/next-plugin-svgr)

Next plugin for transforming svg's into react components using the svgr library  [Next.js](https://github.com/zeit/next.js)

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
const withSvgr = require("next-svgr");

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

The plugins supports all available options of svgr webpack loader.
Check out the [svgr documentation](https://react-svgr.com/docs/options/) for the full list of options.

Example with options:

```js
module.exports = withSvgr({
  titleProp: true,
  icon: true,
  svgProps: {
    height: 'auto',
  },
});
```

You can optionally specify a project configuration file. SVGR uses 
[cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support,
which means that any file type accepted by cosmicconfig is supported.

* .svgrrc file, written in YAML or JSON, with optional extensions: .yaml/.yml/.json/.js.
* A svgr.config.js file that exports an object.
* A "svgr" key in your package.json file.

```js
// .svgrrc.js
module.exports = {
  icon: true,
  expandProps: false,
};

// next.config.js
module.exports = withSvgr({
  configFile: path.resolve(__dirname, '.svgrrc.js'),
});

// or with next-compose-plugins
module.exports = withPlugins([
  withGraphql,
  [withSvgr, {
    configFile: path.resolve(__dirname, '.svgrrc.js'),
  }],
]);
```

### Typescript

Create a image.d.ts file in your project and add the definition for svg modules below.

```js
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const _: FC<SVGProps<HTMLOrSVGElement>>;
  export = _;
}
```

**note:** If using titleProp you may want to extend the type 
```js
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const _: FC<SVGProps<HTMLOrSVGElement> & { title?: string }>;
  export = _;
}
```
