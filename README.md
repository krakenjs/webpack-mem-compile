## webpack memory compile

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![npm version][version-badge]][package]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/krakenjs/webpack-mem-compile/build?logo=github&style=flat-square
[build]: https://github.com/krakenjs/webpack-mem-compile/actions?query=workflow%3Abuild
[coverage-badge]: https://img.shields.io/codecov/c/github/krakenjs/webpack-mem-compile.svg?style=flat-square
[coverage]: https://codecov.io/github/krakenjs/webpack-mem-compile/
[version-badge]: https://img.shields.io/npm/v/@krakenjs/webpack-mem-compile.svg?style=flat-square
[package]: https://www.npmjs.com/package/@krakenjs/webpack-mem-compile
[license-badge]: https://img.shields.io/npm/l/@krakenjs/webpack-mem-compile.svg?style=flat-square
[license]: https://github.com/krakenjs/webpack-mem-compile/blob/main/LICENSE

Compile from a webpack config to a string in memory.

## Install

```bash
npm install --save @krakenjs/webpack-mem-compile
```

Note: this package is requires webpack@4 as a peer dependency

## Use

Using a webpack config with an entry point:

```javascript
import { webpackCompile } from '@krakenjs/webpack-mem-compile';

const code = await webpackCompile({
    webpack,
    config: {
        entry: 'foo.js';
    }
})
```

Using raw code:

```javascript
import { webpackCompile } from "@krakenjs/webpack-mem-compile";

const code = await webpackCompile({
  webpack,
  code: `
        console.log('Hello World!');
    `,
});
```
