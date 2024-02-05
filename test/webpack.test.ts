import { join } from "path";

import { test, expect } from "vitest";
import webpack from "webpack";
import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";

import { webpackCompile } from "../src";

test("should webpack compile a module and successfully run the result", async () => {
  const config = getWebpackConfig({
    entry: join(__dirname, "test-module"),
  });

  const code = await webpackCompile({
    // @ts-expect-error webpack type does not match configuration
    webpack,
    // @ts-expect-error Configuration not assignable to WebpackConfig
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config,
  });

  if (!code || typeof code !== "string") {
    throw new Error(`Expected webpackCompile to return a code string`);
  }

  const module = {};
  // eslint-disable-next-line no-eval, security/detect-eval-with-expression
  eval(code);

  // @ts-expect-error module.exports
  // eslint-disable-next-line import/no-commonjs
  if (!module.exports.foo || typeof module.exports.foo !== "function") {
    throw new Error(`Expected module to export foo function`);
  }

  // @ts-expect-error module.exports
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(module.exports.foo(5)).toEqual(6);
});

test("should webpack compile a some raw code and successfully run the result", async () => {
  const code = await webpackCompile({
    // @ts-expect-error webpack type does not match configuration
    webpack,
    // @ts-expect-error Configuration not assignable to WebpackConfig
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  // @ts-expect-error global is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(module.exports.bar).toBeTypeOf("function");

  // @ts-expect-error global is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(module.exports.bar(5)).toEqual(10);
});

test("should webpack compile a some raw code without any config, and successfully run the result", async () => {
  const code = await webpackCompile({
    // @ts-expect-error webpack type does not match configuration
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

  // @ts-expect-error global is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(global.baz).toBeTypeOf("function");
  // @ts-expect-error global is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(global.baz(5)).toEqual(25);
});

test("should webpack compile with a basic config", async () => {
  const config = {
    entry: join(__dirname, "test-module/singleFile.js"),
    output: {
      library: "foo",
    },
    mode: "development",
    plugins: [],
    module: {
      rules: [],
    },
  };

  const code = await webpackCompile({
    // @ts-expect-error webpack type does not match configuration
    webpack,
    // @ts-expect-error custom config
    config,
  });

  if (!code || typeof code !== "string") {
    throw new Error(`Expected webpackCompile to return a code string`);
  }

  // eslint-disable-next-line no-eval, security/detect-eval-with-expression
  eval(code);

  // @ts-expect-error custom global
  expect(global.foo).toEqual(3);
});
