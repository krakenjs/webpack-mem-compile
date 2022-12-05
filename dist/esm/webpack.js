import _extends from "@babel/runtime/helpers/esm/extends";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import MemoryFS from "memory-fs";
import { getTempFile } from "./util";
export function webpackCompile(_x) {
  return _webpackCompile.apply(this, arguments);
}
function _webpackCompile() {
  _webpackCompile = _asyncToGenerator(function* (_ref) {
    var webpack = _ref.webpack,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? {
        mode: "production"
      } : _ref$config,
      code = _ref.code;
    var webpackConfig = _extends({}, config, {
      output: _extends({}, config.output, {
        path: "/",
        filename: "output.js"
      })
    });
    var tempFile;
    if (code) {
      tempFile = getTempFile();
      yield tempFile.write(code);
      webpackConfig.entry = tempFile.filepath;
    }
    var compiler = webpack(webpackConfig);
    compiler.outputFileSystem = new MemoryFS();
    var result = yield new Promise(function (resolve, reject) {
      compiler.run(function (err, stats) {
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
      yield tempFile.remove();
    }
    return result;
  });
  return _webpackCompile.apply(this, arguments);
}