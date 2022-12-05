"use strict";

exports.__esModule = true;
exports.webpackCompile = webpackCompile;
var _memoryFs = _interopRequireDefault(require("memory-fs"));
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function webpackCompile({
  webpack,
  config = {
    mode: "production"
  },
  code
}) {
  const webpackConfig = {
    ...config,
    output: {
      ...config.output,
      path: "/",
      filename: "output.js"
    }
  };
  let tempFile;
  if (code) {
    tempFile = (0, _util.getTempFile)();
    await tempFile.write(code);
    webpackConfig.entry = tempFile.filepath;
  }
  const compiler = webpack(webpackConfig);
  compiler.outputFileSystem = new _memoryFs.default();
  const result = await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      if (stats.hasErrors()) {
        reject(new Error(stats.toString({
          errorDetails: true,
          warnings: true
        })));
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