import MemoryFS from "memory-fs";

import { getTempFile } from "./util";

type WebpackConfig = {
  entry?: string;
  mode?: string;
  output?: {
    path: string;
    filename: string;
  };
};

type Webpack = (arg0: WebpackConfig) => {
  outputFileSystem: {
    data: Record<string, string>;
  };
  run: (
    arg0: (
      err: Error,
      stats: {
        hasErrors: () => boolean;
        hasWarnings: () => boolean;
        toString: (arg0: {
          errorDetails: boolean;
          warnings: boolean;
        }) => string;
      }
    ) => void
  ) => void;
};

export async function webpackCompile({
  webpack,
  config = {
    mode: "production",
  },
  code,
}: {
  webpack: Webpack;
  config?: WebpackConfig;
  code?: string;
}): Promise<string> {
  const webpackConfig = {
    ...config,
    output: { ...config.output, path: "/", filename: "output.js" },
  };
  let tempFile;

  if (code) {
    tempFile = getTempFile();
    await tempFile.write(code);
    webpackConfig.entry = tempFile.filepath;
  }

  const compiler = webpack(webpackConfig);
  compiler.outputFileSystem = new MemoryFS();

  const result = await new Promise<string>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);

        return;
      }

      if (stats.hasErrors()) {
        reject(
          new Error(
            stats.toString({
              errorDetails: true,
              warnings: true,
            })
          )
        );

        return;
      }

      resolve(compiler.outputFileSystem.data["output.js"].toString());
    });
  });

  if (tempFile) {
    await tempFile.remove();
  }

  return result;
}
