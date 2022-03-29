
webpack memory compile
----------------------

Compile from a webpack config to a string in memory.

## Install

```bash
npm install --save @krakenjs/webpack-mem-compile
```

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
import { webpackCompile } from '@krakenjs/webpack-mem-compile';

const code = await webpackCompile({
    webpack,
    code: `
        console.log('Hello World!');
    `
})
```
