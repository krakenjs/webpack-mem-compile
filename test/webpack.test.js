/* @flow */

import { join } from "path";

import webpack from "webpack";
import { getWebpackConfig } from "@krakenjs/grumbler-scripts/config/webpack.config";

import { webpackCompile } from "../src";

test("should webpack compile a module and successfully run the result", async () => {
  const code = await webpackCompile({
    webpack,
    config: getWebpackConfig({
      entry: join(__dirname, "test-module"),
    }),
  });

  if (!code || typeof code !== "string") {
    throw new Error(`Expected webpackCompile to return a code string`);
  }

  const module = {};

  // eslint-disable-next-line no-eval, security/detect-eval-with-expression
  eval(code);

  // eslint-disable-next-line import/no-commonjs
  if (!module.exports.foo || typeof module.exports.foo !== "function") {
    throw new Error(`Expected module to export foo function`);
  }

  // eslint-disable-next-line import/no-commonjs
  if (module.exports.foo(5) !== 6) {
    throw new Error(`Expected foo to add 1 to input`);
  }
});

test("should webpack compile a some raw code and successfully run the result", async () => {
  const code = await webpackCompile({
    webpack,
    config: getWebpackConfig(),
    code: `
            export function bar(num : number) : number {
                return num * 2;
            }
        `,
  });

  if (!code || typeof code !== "string") {
    throw new Error(`Expected webpackCompile to return a code string`);
  }

  const module = {};

  // eslint-disable-next-line no-eval, security/detect-eval-with-expression
  eval(code);

  // eslint-disable-next-line import/no-commonjs
  if (!module.exports.bar || typeof module.exports.bar !== "function") {
    throw new Error(`Expected module to export bar function`);
  }

  // eslint-disable-next-line import/no-commonjs
  if (module.exports.bar(5) !== 10) {
    throw new Error(`Expected bar to multiply input by 2`);
  }
});

test("should webpack compile a some raw code without any config, and successfully run the result", async () => {
  const code = await webpackCompile({
    webpack,
    code: `
            global.baz = function baz(num) {
                return num * num;
            }
        `,
  });

  if (!code || typeof code !== "string") {
    throw new Error(`Expected webpackCompile to return a code string`);
  }

  // eslint-disable-next-line no-eval, security/detect-eval-with-expression
  eval(code);

  if (!global.baz || typeof global.baz !== "function") {
    throw new Error(`Expected module to export baz function`);
  }

  if (global.baz(5) !== 25) {
    throw new Error(`Expected baz to be squared`);
  }
});
